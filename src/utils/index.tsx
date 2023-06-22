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
