export interface Message {
  role: "user" | "assistant" | "system";
  content?: string;
  url?: string;
}


export interface ChoiceWithFunctionCall {
  delta: {
    content?: string;
    function_call?: {
      name: string;
      arguments: string;
    };
  };
  finish_reason?: string;
}
