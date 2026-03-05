import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import fs from "fs";
import { POST } from "@/app/api/upload/route";

vi.mock("fs", () => ({
  default: {
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    writeFileSync: vi.fn(),
  },
}));

function buildRequestWithFormData(formData: FormData): NextRequest {
  return {
    formData: async () => formData,
  } as unknown as NextRequest;
}

describe("POST /api/upload", () => {
  const fsMock = vi.mocked(fs);

  beforeEach(() => {
    fsMock.existsSync.mockReturnValue(true);
    fsMock.writeFileSync.mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 400 when file is missing", async () => {
    const req = buildRequestWithFormData(new FormData());

    const response = await POST(req);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("No file uploaded.");
  });

  it("returns 400 for invalid file type", async () => {
    const formData = new FormData();
    formData.set(
      "file",
      new File([new Uint8Array([1, 2, 3])], "doc.pdf", {
        type: "application/pdf",
      }),
    );

    const response = await POST(buildRequestWithFormData(formData));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("Invalid file type");
  });

  it("writes valid files and returns generated filename", async () => {
    vi.spyOn(Date, "now").mockReturnValue(1_700_000_000_000);
    const formData = new FormData();
    formData.set(
      "file",
      new File([new Uint8Array([1, 2, 3])], "image.png", {
        type: "image/png",
      }),
    );

    const response = await POST(buildRequestWithFormData(formData));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.fileName).toBe("uploaded_file_1700000000000.png");
    expect(fsMock.writeFileSync).toHaveBeenCalledOnce();
  });

  it("returns 500 when writing file fails", async () => {
    fsMock.writeFileSync.mockImplementation(() => {
      throw new Error("disk full");
    });

    const formData = new FormData();
    formData.set(
      "file",
      new File([new Uint8Array([1])], "image.png", { type: "image/png" }),
    );

    const response = await POST(buildRequestWithFormData(formData));
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload.message).toBe("Failed to upload file.");
  });
});
