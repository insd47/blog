export function truncate(text: string, length: number) {
  const chars = Array.from(text);
  if (chars.length <= length) return text;

  return `${chars
    .slice(0, length - 1)
    .join('')
    .trimEnd()}…`;
}
