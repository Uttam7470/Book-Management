function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <p className="text-4xl">⚠️</p>
      <p className="font-semibold text-gray-700">Something went wrong</p>
      <p className="text-sm text-gray-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
