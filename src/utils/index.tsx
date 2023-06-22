export function onlyNumbers(string: string) {
  return string.replace(/[^0-9]/g, "").slice(1);
}

export function formatId(id: string) {
  if (id.length === 1) {
    return "00" + id;
  } else if (id.length === 2) {
    return "0" + id;
  } else {
    return id;
  }
}

export const typeColors = {
  bug: "#729f3f",
  dragon: "#53a4cf",
  fairy: "#fdb9e9",
  fire: "#fd7d24",
  ghost: "#7b62a3",
  ground: "#f7de3f",
  normal: "#a4acaf",
  psychic: "#f366b9",
  steel: "#9eb7b",
  dark: "#707070",
  electric: "#eed535",
  fighting: "#d56723",
  flying: "#3dc7ef",
  grass: "#9bcc50",
  ice: "#51c4e7",
  poison: "#b97fc9",
  rock: "#a38c21",
  water: "#4592c4",
};

export const pokemonTypeList = [
  "bug",
  "dragon",
  "fairy",
  "fire",
  "ghost",
  "ground",
  "normal",
  "psychic",
  "steel",
  "dark",
  "electric",
  "fighting",
  "flying",
  "grass",
  "ice",
  "poison",
  "rock",
  "water",
];
