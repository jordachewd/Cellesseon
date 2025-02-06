interface OpenAiError {
  title: string;
  error: Error | unknown;
}

export default function manageOpenAiError({ title, error }: OpenAiError) {
  return {
    taskError: {
      title,
      error:
        error instanceof Error ? error.message : "Unexpected error occurred.",
      status: 500,
    },
  };
}
