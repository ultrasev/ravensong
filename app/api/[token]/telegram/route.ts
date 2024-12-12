import { addLog } from "@/utils/log";
import { NextResponse } from "next/server";
import { z } from "zod";

// 定义请求体的 schema
const telegramMessageSchema = z.object({
  message: z.string().min(1, "Message is required"),
  expireMinutes: z
    .number()
    .positive("Expire minutes must be positive")
    .default(10),
  imageUrl: z.string().url().optional(),
});

// 从 schema 推导出类型
type TelegramMessage = z.infer<typeof telegramMessageSchema>;

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    if (params.token !== process.env.API_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 解析并验证请求体
    const body = await request.json();
    const result = telegramMessageSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }

    const validatedData = result.data;

    // 添加请求URL调试日志
    addLog(
      `Attempting to call Telegram API: ${process.env.TELEGRAM_API_URL}`,
      "info"
    );

    const requestBody = {
      message: validatedData.message,
      expire_minutes: validatedData.expireMinutes,
      ...(validatedData.imageUrl && { image_url: validatedData.imageUrl }),
    };

    // 添加请求体调试日志（注意移除敏感信息）
    addLog(`Request body: ${JSON.stringify(requestBody)}`, "info");

    const response = await fetch(process.env.TELEGRAM_API_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorDetails = {
        message: validatedData.message,
        expireMinutes: validatedData.expireMinutes,
        imageUrl: validatedData.imageUrl,
        responseStatus: response.status,
        responseStatusText: response.statusText,
        error: "Telegram service error",
        env: {
          hasApiToken: !!process.env.API_TOKEN,
          hasTelegramApiUrl: !!process.env.TELEGRAM_API_URL,
          telegramApiUrlLength: (process.env.TELEGRAM_API_URL || "").length,
        },
      };

      const msg = JSON.stringify(errorDetails, null, 2);
      addLog(msg, "error");
      throw new Error(msg);
    }

    const telegramResponse = await response.json();

    return NextResponse.json(telegramResponse);
  } catch (error) {
    console.error("Error sending telegram message:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
