export const filename = () => new URL("", import.meta.url).pathname;

export const logError = (filename: string, error: unknown) =>
  globalThis.console.error({
    path: filename,
    error,
  });
