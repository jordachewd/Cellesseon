import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatly",
  description: "Your Smart Chat Companion",
};

export interface Message {
  sender: string;
  message: string;
}
