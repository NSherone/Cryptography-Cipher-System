export const encodeVigenere = (text, key) => {
  const repeatedKey = key
    .repeat(Math.ceil(text.length / key.length))
    .slice(0, text.length);

  return text
    .split("")
    .map((char, index) => {
      if (char.match(/[a-z]/i)) {
        let base = char == char.toUpperCase() ? 65 : 97;
        let charCode = char.charCodeAt();
        let keyCode = repeatedKey[index].toUpperCase().charCodeAt() - 65;

        return String.fromCharCode(
          ((((charCode - base + keyCode) % 26) + 26) % 26) + base
        );
      }
      return char;
    })
    .join("");
};

export const decodeVigenere = (text, key) => {
  const repeatedKey = key
    .repeat(Math.ceil(text.length / key.length))
    .slice(0, text.length);

  return text
    .split("")
    .map((char, index) => {
      if (char.match(/[a-z]/i)) {
        let base = char === char.toUpperCase() ? 65 : 97;
        let charCode = char.charCodeAt();
        let keyCode = repeatedKey[index].toUpperCase().charCodeAt() - 65;

        return String.fromCharCode(
          ((((charCode - base - keyCode) % 26) + 26) % 26) + base
        );
      }
      return char;
    })
    .join("");
};
