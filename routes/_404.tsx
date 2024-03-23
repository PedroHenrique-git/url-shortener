import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <section className="h-screen flex flex-col items-center justify-center mx-auto container px-4">
        <div className="mt-9 text-slate-950 text-xl">
          Page not found
        </div>
      </section>
    </>
  );
}
