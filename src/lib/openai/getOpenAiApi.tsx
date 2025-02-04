import { Messages } from "@/types";

export default async function getOpenAiApi({ messages }: Messages) {
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  return response;
}
