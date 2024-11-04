import { Locale } from "@/lib/i18n-config";
import { hermes } from "@/lib/i18n-config";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export default async function Home({ params }: { params: { lang: Locale } }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Usage</h1>
        <div className="relative rounded-xl">
          <div className="absolute top-3 left-4 flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <code className="block rounded-lg bg-gray-900 p-4 pt-8 text-gray-100 font-courier">
            $ curl -X POST
            https://ravensong.cufo.cc/token/platform/device/title/message?param=value
          </code>
        </div>
      </div>
    </div>
  );
}
