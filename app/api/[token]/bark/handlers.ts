import type { NextRequest } from "next/server";
import { BarkUrl } from "./url";
import { parseSecrets } from "@/lib/parser";
export const runtime = "edge";
import { addLog } from "@/utils/log";
export class BarkHandler {
  private readonly barkUrl = new BarkUrl();
  private readonly tokens = parseSecrets(process.env.BARK_TOKENS || "");

  async handle(request: NextRequest, token: string) {
    const tokenList = this.tokens as string[];
    if (!tokenList.includes(token))
      return Response.json(
        { code: 401, message: "Invalid token" },
        { status: 401 }
      );

    const barkUrl = this.barkUrl.parse(new URL(request.url).searchParams);
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
