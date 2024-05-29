import { UserType } from "../enums/global.enum";

const SEC = {
  PRE: "aoc",
  SUF: "gmg",
};

// Simple custom encryption function
export const encrypt = (text: UserType): string => {
  const prefix = SEC.PRE; // Random text prefix
  const suffix = SEC.SUF; // Random text suffix
  let encrypted = `${prefix}${text}${suffix}`;

  // Simple character shifting
  encrypted = encrypted
    .split("")
    .map((char) => {
      return String.fromCharCode(char.charCodeAt(0) + 3);
    })
    .join("");

  return encrypted;
};

// Simple custom decryption function
export const decrypt = (encryptedText: string): UserType => {
  // Revert character shifting
  let decrypted = encryptedText
    .split("")
    .map((char) => {
      return String.fromCharCode(char.charCodeAt(0) - 3);
    })
    .join("");

  const prefix = SEC.PRE; // Random text prefix used in encryption
  const suffix = SEC.SUF; // Random text suffix used in encryption

  // Remove the prefix and suffix
  decrypted = decrypted.replace(prefix, "").replace(suffix, "");

  return decrypted as UserType;
};
