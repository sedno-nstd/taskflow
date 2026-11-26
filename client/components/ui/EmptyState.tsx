export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      {description && <p className="text-xs text-gray-400">{description}</p>}
    </div>
  );
}
