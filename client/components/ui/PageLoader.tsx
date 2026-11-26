export function PageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center animate-pulse text-sm text-gray-500">
      {text}
    </div>
  );
}
