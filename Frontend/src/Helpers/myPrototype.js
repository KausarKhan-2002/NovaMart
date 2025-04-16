// Capitalize only first character
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Capitalize first character for each words
String.prototype.capitalizeWords = function () {
  return this.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Limit the characters
String.prototype.limitCharacters = function (limit) {
  return this.slice(0, limit || this.length);
};

// Limit the words
String.prototype.limitWords = function (limit) {
  return this.split(" ").slice(0, limit).join("");
};

// export reference object
const customPrototypeMethods = {
  capitalize: String.prototype.capitalize(),
  capitalizeWords: String.prototype.capitalizeWords,
  limitCharacters: String.prototype.limitCharacters,
  limitWords: String.prototype.limitWords,
};

export const OWN_PROTOTYPE_METHODS = () => {
  return customPrototypeMethods
}
