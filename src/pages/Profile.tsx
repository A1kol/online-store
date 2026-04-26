import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">My Profile</h1>

      <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-8">
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-3xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
            <span className="mt-2 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase text-blue-400">
              {user.role}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-4 border-t border-gray-800 pt-6">
          <DetailRow label="User ID" value={user.id} />
          <DetailRow label="Name" value={user.name} />
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="Role" value={user.role} />
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            to="/dashboard"
            className="rounded-xl border border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:text-white"
          >
            ← Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-800/50 px-4 py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-200">{value}</span>
    </div>
  );
}
