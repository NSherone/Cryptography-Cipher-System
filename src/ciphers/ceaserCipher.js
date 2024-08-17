export const encodeCaesar = (text, shift) => {
  return text.split("").map((char) => {
    if (char.match(/[a-z]/i)) {
      let base = char === char.toUpperCase() ? 65 : 97;
      let code = char.charCodeAt();

      return String.fromCharCode(
        ((((code - base + shift) % 26) + 26) % 26) + base
      );
    }
    return char;
  }).join('');
};

export const decodeCaesar = (text, shift) => {
    return encodeCaesar(text, (26 - shift) % 26);
};