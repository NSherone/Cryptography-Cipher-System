import bigInt from "big-integer";

// Helper function: Modular exponentiation
const modExp = (base, exp, mod) => {
  let result = bigInt(1);
  base = bigInt(base).mod(mod);
  exp = bigInt(exp);
  mod = bigInt(mod);

  while (exp.gt(0)) {
    if (exp.isOdd()) {
      result = result.multiply(base).mod(mod);
    }
    base = base.multiply(base).mod(mod);
    exp = exp.shiftRight(1);
  }

  return result;
};

// RSA Encryption
export const encryptRSA = (plaintext, e = 65537, p = 61, q = 53) => {
  const n = bigInt(p).multiply(q);

  // Convert text to number (handling all Unicode characters)
  const textToNum = (text) => {
    return text
      .split("")
      .map((char) => char.codePointAt(0).toString())
      .join(" ");
  };

  // Split plaintext into words and convert to lowercase
  const words = plaintext.toLowerCase().split(" ");

  // Encrypt each word separately
  const encryptedWords = words.map((word) => {
    const numString = textToNum(word);
    console.log("Numeric String:", numString);

    // Determine chunk size based on modulus
    const chunkSize = Math.floor(Math.log10(n.toJSNumber())) - 1;
    const numArray = numString.split(" ").map(Number);

    // Encrypt each number
    const encryptedArray = numArray.map((num) => modExp(num, e, n));
    return encryptedArray.join(",");
  });

  return encryptedWords.join(" | ");
};

// RSA Decryption
export const decryptRSA = (cipherText, d = 2753, p = 61, q = 53) => {
  const n = bigInt(p).multiply(q);

  // Split ciphertext into words
  const encryptedWords = cipherText.split(" | ");

  // Decrypt each word separately
  const decryptedWords = encryptedWords.map((cipherWord) => {
    const cipherArray = cipherWord.split(",").map((num) => bigInt(num));

    // Decrypt each number
    const decryptedArray = cipherArray.map((num) =>
      modExp(num, d, n).toString()
    );

    console.log("Decrypted Numeric String:", decryptedArray.join(""));

    // Convert numeric string back to text
    const numToText = (numString) => {
      return numString
        .split(" ")
        .map((num) => String.fromCodePoint(parseInt(num, 10)))
        .join("");
    };

    return numToText(decryptedArray.join(" "));
  });

  return decryptedWords.join(" ");
};
