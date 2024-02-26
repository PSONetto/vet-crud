export default function formatString(str: string) {
  if (str) {
    return str
      .toLowerCase()
      .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  } else {
    return str;
  }
}
