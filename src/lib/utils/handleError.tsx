// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else if (typeof error === "string") {
    throw new Error(error);
  } else {
    throw new Error(JSON.stringify(error));
  }
};
