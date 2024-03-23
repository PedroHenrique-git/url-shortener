import { Handlers } from "$fresh/server.ts";
import urlHandler from "../sdk/url/index.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const headers = new Headers();

    const fullUrl = await urlHandler.get(id);

    if (!fullUrl) {
      return ctx.renderNotFound();
    }

    await urlHandler.updateClicks(id);

    const { path } = fullUrl;

    headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");

    headers.set("location", path);

    return new Response(null, {
      status: 301,
      headers,
    });
  },
};
