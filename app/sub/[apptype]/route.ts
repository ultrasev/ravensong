import { NextRequest } from "next/server";
import redis from "@/app/libs/redis";
import { addLog } from "@/utils/log";
import { createClient } from "@/utils/supabase/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { apptype: string } }
) {
  const apptype = params.apptype;
  const token = request.nextUrl.searchParams.get("token");
  console.log(token);
  await addLog(`fgfw GET /sub/${apptype}?token=${token}`, "INFO");

  if (!apptype || !token) {
    return new Response("Missing apptype or token", { status: 400 });
  }

  const supabase = createClient();

  const { data: session, error } = await supabase.auth.getSession();

  if (error || !session) {
    // If there's no valid session, try to sign in with the token
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: token, // Use the token as the email
        password: token, // Use the token as the password
      });

    if (signInError || !signInData.user) {
      const errorMessage = signInError ? signInError.message : "Unknown error";
      await addLog(
        `fgfw GET /sub/${apptype}?token=${token}, ${errorMessage}`,
        "ERROR"
      );
      return new Response("Invalid token", { status: 401 });
    }
  }

  try {
    const response = await redis.get(`FGFW:${apptype}`);
    console.log("response", response);

    if (!response) {
      return new Response("Configuration not found", { status: 404 });
    }

    let finalResponse: string;
    if (apptype === "rocket") {
      // Convert to base64 only for 'rocket' apptype
      finalResponse = Buffer.from(response as string).toString("base64");
    } else {
      finalResponse = response as string;
    }

    return new Response(finalResponse, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error: any) {
    console.error("Error fetching configuration:", error);
    await addLog(
      `fgfw GET /sub/${apptype}?token=${token}, ${error.message}`,
      "ERROR"
    );
    return new Response("Failed to fetch configuration", { status: 500 });
  }
}
