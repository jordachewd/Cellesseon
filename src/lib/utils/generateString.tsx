export function generateString(length?: number) {
  let result = "";
  const size = length || 16;
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const charsLength = chars.length;
  for (let i = 0; i < size; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}
