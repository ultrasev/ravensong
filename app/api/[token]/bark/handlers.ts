import type { NextRequest } from "next/server";
import { BarkUrl } from "./url";
import { parseSecrets } from "@/lib/parser";
import { addLog } from "@/utils/log";

export const runtime = "edge";

export class BarkHandler {
  private readonly barkUrl = new BarkUrl();
  async handle(request: NextRequest, token: string) {
    const maps = parseSecrets(process.env.BARK_TOKENS || "") as Record<
      string,
      string
    >;

    const endpointUrl = maps[token] || "";
    if (!endpointUrl)
      return Response.json(
        { code: 401, message: "Invalid token" },
        { status: 401 }
      );

    const barkUrl = this.barkUrl.parse(
      new URL(request.url).searchParams,
      endpointUrl
    );

    addLog(`barkUrl: ${barkUrl}`, "info");
    if (!barkUrl)
      return Response.json(
        { code: 400, message: "Invalid request" },
        { status: 400 }
      );

    const response = await fetch(barkUrl);
    return response;
  }
}
