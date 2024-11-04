import type { NextRequest } from "next/server";
import { BarkUrl } from "./url";
import { parseSecrets } from "@/lib/parser";
export const runtime = "edge";

class BarkHandler {
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
    console.log(barkUrl);
    if (!barkUrl)
      return Response.json(
        { code: 400, message: "Invalid request" },
        { status: 400 }
      );

    return Response.redirect(barkUrl);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  return new BarkHandler().handle(request, params.token);
}
