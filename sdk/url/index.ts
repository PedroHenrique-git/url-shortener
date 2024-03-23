import fileHandler from "../file/index.ts";
import { parseJson } from "../helpers/parseJson.ts";
import { filename, logError } from "../logger/index.ts";
import { shortUUID } from "../uuid/index.ts";

export interface Url {
  path: string;
  clicks: number;
}

export default {
  async new(url: string, origin: string): Promise<string> {
    try {
      const id = shortUUID();
      const db = await fileHandler.readTextFile(`${Deno.cwd()}/db/db.json`);
      const json = parseJson<Record<string, Url>>(
        db,
      );

      const shortenUrl = `${origin}/${id}`;

      json[id] = {
        path: url,
        clicks: 1,
      };

      await fileHandler.writeTextFile(
        `${Deno.cwd()}/db/db.json`,
        JSON.stringify(json),
      );

      return shortenUrl;
    } catch (err) {
      logError(filename(), err);

      return "";
    }
  },
  async get(id: string): Promise<Url | null> {
    try {
      const db = await fileHandler.readTextFile(`${Deno.cwd()}/db/db.json`);
      const json = parseJson<Record<string, Url>>(db);

      return json[id];
    } catch (err) {
      logError(filename(), err);

      return null;
    }
  },
  async updateClicks(id: string): Promise<boolean> {
    try {
      const db = await fileHandler.readTextFile(`${Deno.cwd()}/db/db.json`);
      const json = parseJson<Record<string, Url>>(db);

      json[id].clicks += 1;

      await fileHandler.writeTextFile(
        `${Deno.cwd()}/db/db.json`,
        JSON.stringify(json),
      );

      return true;
    } catch (err) {
      logError(filename(), err);

      return false;
    }
  },
};
