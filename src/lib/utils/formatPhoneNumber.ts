export default function formatPhoneNumber(phoneNumber: string | undefined) {
  if (phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length !== 10) {
      throw new Error(
        'Invalid phone number format. Please provide a 10-digit phone number.',
      );
    }

    const areaCode = cleaned.substring(0, 3);
    const prefix = cleaned.substring(3, 6);
    const lineNumber = cleaned.substring(6);

    return `(${areaCode}) ${prefix}-${lineNumber}`;
  } else {
    return '';
  }
}
