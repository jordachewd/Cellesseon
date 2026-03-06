import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { createTransaction } from "@/lib/actions/transaction.action";
import { getExpiresOn } from "@/constants/plans";
import { connectToDatabase } from "@/lib/database/mongoose";
import Transaction from "@/lib/database/models/transaction.model";
import User from "@/lib/database/models/user.model";
import { POST } from "@/app/api/webhooks/stripe/route";

const constructEventMock = vi.hoisted(() => vi.fn());

vi.mock("stripe", () => ({
  default: {
    webhooks: {
      constructEvent: constructEventMock,
    },
  },
}));

vi.mock("@/lib/actions/transaction.action", () => ({
  createTransaction: vi.fn(),
}));

vi.mock("@/constants/plans", () => ({
  getExpiresOn: vi.fn(),
}));

vi.mock("@/lib/database/mongoose", () => ({
  connectToDatabase: vi.fn(),
}));

vi.mock("@/lib/database/models/transaction.model", () => ({
  default: {
    findOne: vi.fn(),
  },
}));

vi.mock("@/lib/database/models/user.model", () => ({
  default: {
    findOneAndUpdate: vi.fn(),
  },
}));

function buildRequest(body: string, signature?: string): NextRequest {
  const headers = new Headers();

  if (signature) {
    headers.set("stripe-signature", signature);
  }

  return new NextRequest("http://localhost:3000/api/webhooks/stripe", {
    method: "POST",
    headers,
    body,
  });
}

describe("POST /api/webhooks/stripe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    vi.mocked(connectToDatabase).mockResolvedValue(undefined as never);
    vi.mocked(Transaction.findOne).mockResolvedValue(null);
    vi.mocked(User.findOneAndUpdate).mockResolvedValue({
      mongoResponse: {},
    } as never);
  });

  it("returns 400 when stripe-signature header is missing", async () => {
    const response = await POST(buildRequest("{}"));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.message).toBe("Webhook error");
    expect(payload.error).toContain("Missing stripe-signature header");
  });

  it("returns 400 when webhook signature verification fails", async () => {
    constructEventMock.mockImplementation(() => {
      throw new Error("Invalid signature");
    });

    const response = await POST(buildRequest('{"hello":"world"}', "sig_123"));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.message).toBe("Webhook error");
    expect(payload.error).toBe("Invalid webhook signature");
  });

  it("persists transaction and updates user plan on checkout completion", async () => {
    const expiresOn = new Date("2026-04-05T10:00:00.000Z");
    vi.mocked(getExpiresOn).mockReturnValue(expiresOn);

    constructEventMock.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          amount_total: 2900,
          metadata: {
            userId: "mongo_user_1",
            clerkId: "clerk_user_1",
            planId: "1",
            plan: "Pro",
            billing: "Monthly",
          },
        },
      },
    });

    vi.mocked(createTransaction).mockResolvedValue({ _id: "txn_1" } as never);

    const response = await POST(buildRequest('{"valid":"payload"}', "sig_123"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(getExpiresOn).toHaveBeenCalledWith("Pro", "Monthly");
    expect(createTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        stripeId: "cs_test_123",
        userId: "mongo_user_1",
        clerkId: "clerk_user_1",
        amount: 29,
        plan: "Pro",
        billing: "Monthly",
      }),
    );
    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { clerkId: "clerk_user_1" },
      expect.objectContaining({
        plan: expect.objectContaining({
          name: "Pro",
          billing: "Monthly",
          amount: 29,
          stripeId: "cs_test_123",
        }),
      }),
      expect.objectContaining({
        new: true,
        strict: false,
        upsert: true,
      }),
    );
    expect(payload.message).toBe("OK");
  });

  it("returns 500 when transaction creation fails", async () => {
    vi.mocked(getExpiresOn).mockReturnValue(
      new Date("2026-04-05T10:00:00.000Z"),
    );
    constructEventMock.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          amount_total: 2900,
          metadata: {
            userId: "mongo_user_1",
            clerkId: "clerk_user_1",
            planId: "1",
            plan: "Pro",
            billing: "Monthly",
          },
        },
      },
    });
    vi.mocked(createTransaction).mockResolvedValue(null as never);

    const response = await POST(buildRequest('{"valid":"payload"}', "sig_123"));
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload.message).toBe("STRIPE: Transaction failed!");
    expect(User.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("returns a handled response for non-checkout webhook events", async () => {
    constructEventMock.mockReturnValue({
      type: "customer.created",
      data: { object: {} },
    });

    const response = await POST(buildRequest('{"valid":"payload"}', "sig_123"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.message).toContain("Unhandled event type: customer.created");
  });

  it("returns 200 without creating duplicate transaction for replayed webhook", async () => {
    vi.mocked(getExpiresOn).mockReturnValue(
      new Date("2026-04-05T10:00:00.000Z"),
    );
    constructEventMock.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_duplicate",
          amount_total: 2900,
          metadata: {
            userId: "mongo_user_1",
            clerkId: "clerk_user_1",
            planId: "1",
            plan: "Pro",
            billing: "Monthly",
          },
        },
      },
    });
    vi.mocked(Transaction.findOne).mockResolvedValue({
      stripeId: "cs_test_duplicate",
    } as never);

    const response = await POST(buildRequest('{"valid":"payload"}', "sig_123"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.message).toBe("Already processed");
    expect(createTransaction).not.toHaveBeenCalled();
    expect(User.findOneAndUpdate).not.toHaveBeenCalled();
  });
});
