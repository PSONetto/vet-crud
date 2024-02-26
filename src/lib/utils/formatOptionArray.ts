import formatString from './formatString';

export default function formatOptionArray(options: string[]) {
  if (options) {
    return options.map((str) => ({
      label: formatString(str.trim()),
      value: formatString(str.trim()),
    }));
  } else {
    return options;
  }
}
