/** Сокращённый адрес для кнопки: первые символы + «...» в конце */
export function shortenTonAddress(address, headChars = 5) {
  if (!address || typeof address !== 'string') return '';
  const trimmed = address.trim();
  if (trimmed.length <= headChars + 3) return trimmed;
  return `${trimmed.slice(0, headChars)}...`;
}
