import { Locale } from "@/lib/i18n-config";
import { goblin } from "@/app/ui/Font";
export const runtime = "edge";
function CodeExample({ code }: { code: string }) {
  return (
    <div className="relative mb-8">
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

const ShortcodeDoc = () => {
  const shortcode_example = "https://raven.cufo.cc/shortcode?title=xxx";
  return (
    <div className="mt-4">
      <h2 className={`text-2xl font-bold ${goblin.className}`}> Shortcode</h2>
      <p>
        By manipulating middleware forwarding rules, you can use shortcode to
        send notification. The shortcode is defined in cloudflare secrets.
      </p>
      <CodeExample code={shortcode_example.toString()} />
      <h3 className={`text-xl font-bold ${goblin.className}`}>
        Shortcode formats
      </h3>
      <ul className="list-disc list-inside">
        <li>platform: e.g., b(bark), t(telegram)</li>
        <li>user shortname: e.g., al(alice), bob(bob)</li>
        <li>device: e.g., ip10(iphone 10), s20(samsung s20)</li>
      </ul>
      E.g., <span className="text-pink-500"> bbobs20 </span> represents sending
      a message to bob&apos;s samsung s20 via bark.
    </div>
  );
};

export default async function Home({ params }: { params: { lang: Locale } }) {
  const code1 =
    "curl -X POST https://raven.cufo.cc/api/token/platform?title=title&message=message";
  const code2 =
    "curl -X POST https://raven.cufo.cc/api/your-token/bark?title=raven unit test&message=some random  message&icon=https://ioly.cc/m4KDKLo";
  return (
    <div className="flex items-center justify-center max-w-5xl mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className={`text-4xl font-bold ${goblin.className}`}>Usage</h1>
        <CodeExample code={code1.toString()} />
        <p>
          For example, if you&apos;re using{" "}
          <a href="https://github.com/Finb/Bark">Bark</a>, you can use custom
          icon.
        </p>
        <CodeExample code={code2.toString()} />
        <ShortcodeDoc />
      </div>
    </div>
  );
}
