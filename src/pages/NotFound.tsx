import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <span className="text-7xl">🚗💨</span>
      <h1 className="mt-6 text-6xl font-extrabold text-white">404</h1>
      <p className="mt-4 text-lg text-gray-400">
        Oops — this page took a wrong turn and drove off into the sunset.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          to="/"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Go Home
        </Link>
        <Link
          to="/items"
          className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:text-white"
        >
          Browse Cars
        </Link>
      </div>
    </div>
  );
}
