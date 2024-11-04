import { parseSecrets } from "@/lib/parser";

export class BarkUrl {
  parse(params: URLSearchParams, endpointUrl: string): string {
    const title = params.get("title") || "";
    const message = params.get("message") || "";
    const barkUrl = new URL(
      `${endpointUrl}/${encodeURIComponent(title)}/${encodeURIComponent(
        message
      )}`
    );

    params.forEach((value, key) => {
      if (!["device", "title", "message"].includes(key)) {
        barkUrl.searchParams.append(key, value);
      }
    });

    return barkUrl.toString();
  }
}
