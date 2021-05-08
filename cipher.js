  module.exports = function cipherCaesar(str, shift) {
    if (shift < 0) {
      return cipherCaesar(str, shift + 26)
    }
    let output = "";
    for (let i = 0; i < str.length; i++) {
      let strI = str[i];
      if (strI.match(/[a-z]/i)) {
        let code = str.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          strI = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }else if (code >= 97 && code <= 122) {
          strI = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }
      output += strI;
    }
    return output;
  };