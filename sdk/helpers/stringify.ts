export function stringify(data: unknown): string {
  return JSON.stringify(data, undefined, 2);
}
