import { Handlers, PageProps } from "$fresh/server.ts";
import { isURL } from "../sdk/helpers/isURL.ts";
import urlHandler from "../sdk/url/index.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    return await ctx.render({ url: "" });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const url = form.get("url")?.toString();

    if (!isURL(url)) {
      return ctx.render({ message: "Invalid url" });
    }

    const { origin } = new URL(req.url);

    const shortenUrl = await urlHandler.new(String(url), origin);

    return await ctx.render({ url: shortenUrl }, { status: 200 });
  },
};

export default function Home(
  { data }: PageProps<{ url: string; message?: string }>,
) {
  const { url, message } = data;

  return (
    <section className="h-screen flex flex-col items-center justify-center mx-auto container px-4">
      <form
        method="post"
        className="max-w-2xl w-full flex flex-col items-center justify-center gap-5"
      >
        <input
          type="text"
          name="url"
          id="url"
          className="border text-slate-950 border-gray-400 rounded-lg min-h-10 outline-none px-3 w-full"
        />
        <button className="bg-slate-950 text-lg min-h-10 rounded-lg text-gray-200 px-3 uppercase hover:opacity-70 transition-opacity">
          Shortener url
        </button>
      </form>

      {url && (
        <div className="mt-9 text-slate-950 text-xl">
          SHORTEN URL: <a href={url} className="underline">{url}</a>
        </div>
      )}

      {message && (
        <div className="mt-9 text-red-500 text-xl">
          {message}
        </div>
      )}
    </section>
  );
}
