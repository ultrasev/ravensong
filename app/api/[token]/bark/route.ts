import type { NextRequest } from "next/server";
import { BarkHandler } from "./handlers";
export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  return new BarkHandler().handle(request, params.token);
}
