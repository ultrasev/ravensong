import { parseSecrets } from "@/lib/parser";

export class BarkUrl {
  private readonly DEVICE_ADDRESSES = parseSecrets(
    process.env.BARK_DEVICE_ADDRESSES ?? ""
  );

  parse(params: URLSearchParams): string {
    console.log(params);
    const device = params.get("device");
    const endpointUrl = device
      ? this.DEVICE_ADDRESSES[device as keyof typeof this.DEVICE_ADDRESSES]
      : null;
    if (!endpointUrl) return "";

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
