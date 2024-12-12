export function CodeExample({ code }: { code: string }) {
  return (
    <div className="relative mb-4">
      <div className="absolute top-3 left-4 flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <code className="block rounded-xl bg-gray-900 p-4 pt-8 text-gray-100 font-courier whitespace-pre-wrap break-all text-lg">
          $ {code}
        </code>
      </div>
    );
  }
