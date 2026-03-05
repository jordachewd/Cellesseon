import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

type E2ETestUser = {
  identifier: string;
  password: string;
};

type DotEnvValues = Partial<
  Record<"E2E_TEST_USERNAME" | "E2E_TEST_EMAIL" | "E2E_TEST_PASSWORD", string>
>;

const missingCredentialsError =
  "Set E2E_TEST_USERNAME or E2E_TEST_EMAIL and E2E_TEST_PASSWORD in .env.local.";

function parseDotEnvValue(rawValue: string): string {
  const value = rawValue.trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function getDotEnvLocalValues(): DotEnvValues {
  const envPath = resolve(process.cwd(), ".env.local");

  if (!existsSync(envPath)) {
    return {};
  }

  const envFile = readFileSync(envPath, "utf-8");
  const lines = envFile.split(/\r?\n/);

  return lines.reduce<DotEnvValues>((accumulator, line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return accumulator;
    }

    const [rawKey, ...rawValueParts] = line.split("=");
    const key = rawKey?.trim();

    if (
      key !== "E2E_TEST_USERNAME" &&
      key !== "E2E_TEST_EMAIL" &&
      key !== "E2E_TEST_PASSWORD"
    ) {
      return accumulator;
    }

    accumulator[key] = parseDotEnvValue(rawValueParts.join("="));
    return accumulator;
  }, {});
}

function getE2EValue(
  key: keyof DotEnvValues,
  dotEnvValues: DotEnvValues,
): string | undefined {
  return process.env[key] || dotEnvValues[key];
}

export function getE2ETestUser(): E2ETestUser | null {
  const dotEnvValues = getDotEnvLocalValues();
  const username = getE2EValue("E2E_TEST_USERNAME", dotEnvValues);
  const email = getE2EValue("E2E_TEST_EMAIL", dotEnvValues);
  const password = getE2EValue("E2E_TEST_PASSWORD", dotEnvValues);
  const identifier = username || email;

  if (!identifier || !password) {
    return null;
  }

  return { identifier, password };
}

export function requireE2ETestUser(): E2ETestUser {
  const user = getE2ETestUser();

  if (!user) {
    throw new Error(missingCredentialsError);
  }

  return user;
}

export { missingCredentialsError };
