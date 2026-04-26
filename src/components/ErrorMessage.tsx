export default function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-red-800/50 bg-red-950/40 px-6 py-8 text-center">
      <span className="text-4xl">⚠️</span>
      <p className="mt-3 text-red-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
