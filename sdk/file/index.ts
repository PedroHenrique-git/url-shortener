import { filename, logError } from "../logger/index.ts";

export default {
  async readTextFile(path: string) {
    try {
      return await Deno.readTextFile(path);
    } catch (err) {
      logError(filename(), err);

      return "";
    }
  },
  async writeTextFile(path: string, content: string) {
    try {
      return await Deno.writeTextFile(path, content);
    } catch (err) {
      logError(filename(), err);
    }
  },
};
