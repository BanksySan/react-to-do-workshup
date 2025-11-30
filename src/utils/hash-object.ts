export default function hashObject(obj: unknown): string {
  const str = JSON.stringify(obj, Object.keys(obj as object).sort()); // stable order
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }

  return Math.abs(hash).toString(36);
}
