import { Locale } from "@/lib/i18n-config";

export const runtime = "edge";
function CodeExample({ code }: { code: string }) {
  return (
    <div className="relative">
      <div className="absolute top-3 left-4 flex items-center gap-1">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <code className="block rounded-xl bg-gray-900 p-4 pt-8 text-gray-100 font-courier whitespace-pre-wrap break-all text-lg">
        $ {code}
      </code>
    </div>
  );
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const code1 =
    "curl -X POST https://raven.cufo.cc/api/token/platform?title=title&message=message";
  const code2 =
    "curl -X POST https://raven.cufo.cc/api/your-token/bark?title=raven unit test&message=some random  message&icon=https://ioly.cc/m4KDKLo";
  return (
    <div className="flex items-center justify-center max-w-5xl mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Usage</h1>
        <CodeExample code={code1.toString()} />
        <p>
          For example, if you&apos;re using{" "}
          <a href="https://github.com/Finb/Bark">Bark</a>, you can use custom
          icon.
        </p>
        <CodeExample code={code2.toString()} />
      </div>
    </div>
  );
}
