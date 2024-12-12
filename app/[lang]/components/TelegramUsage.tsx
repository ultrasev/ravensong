import { CodeExample } from "./Card";

export const TelegramUsage = () => {
  const curlExample = `curl https://raven.cufo.cc/api/<token>/telegram \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, World!",
    "expireMinutes": 10,
    "imageUrl": "https://example.com/image.jpg"
  }'`;

  return (
    <div>
      <div className="border-b border-gray-200 my-8"></div>
      <div className="rounded-lg mt-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Telegram Usage</h1>

        <div className="mb-4">
          <p className="mb-2">
            Send messages to Telegram using our API endpoint. Here&apos;s an
            example:
          </p>

          <CodeExample code={curlExample} />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Parameters</h3>

          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">message</span> (required): The
              text message to send
            </li>
            <li>
              <span className="font-semibold">expireMinutes</span> (optional):
              Message expiration time in minutes
            </li>
            <li>
              <span className="font-semibold">imageUrl</span> (optional): URL of
              an image to attach to the message
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
