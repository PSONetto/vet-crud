export default function formatZipCode(zipCode: string | undefined) {
  if (zipCode) {
    // Remove all non-numeric characters from the input string
    const cleaned = zipCode.replace(/\D/g, '');

    if (cleaned.length !== 5 && cleaned.length !== 9) {
      throw new Error(
        'Invalid zip code format. Please provide a 5-digit or 9-digit zip code.',
      );
    }

    if (cleaned.length === 5) {
      return cleaned;
    } else if (cleaned.length === 9) {
      const prefix = cleaned.substring(0, 5);
      const sufix = cleaned.substring(5, 9);

      return `${prefix}-${sufix}`;
    }
  } else {
    return '';
  }
}
