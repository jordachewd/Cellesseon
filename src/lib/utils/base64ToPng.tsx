export const base64ToPng = (base64: string): string => {
  // Convert Base64 string to binary data
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/png" });

  // Generate a URL for the Blob and return it
  return URL.createObjectURL(blob);
};



// utils/base64ToPng.ts

export const base64ToPngBuffer = (base64: string): Buffer => {
  // Convert Base64 string to binary data
  const binaryString = Buffer.from(base64, 'base64');
  return binaryString;
};
