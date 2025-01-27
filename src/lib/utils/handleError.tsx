// ERROR HANDLER

 interface HdlErrorProps {
  error: Error | unknown;
  source?: string | undefined;
}

export const handleError = ({ error, source }: HdlErrorProps) => {
  if (source) {
    console.error(
      `%cError at ${source}:`,
      "color:yellow;background:red;padding:1px 2px",
      error
    );
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  } else if (typeof error === "string") {
    throw new Error(error);
  } else {
    throw new Error(JSON.stringify(error));
  }
};
