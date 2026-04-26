import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../api/carService";
import type { Car } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars()
      .then((res) => setCars(res.data.slice(0, 6)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-800 bg-gradient-to-r from-blue-950/50 to-gray-900 p-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 text-gray-400">
          Here's an overview of the latest cars on AutoElite.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            to="/items/create"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            + Sell a Car
          </Link>
          <Link
            to="/items"
            className="rounded-xl border border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:text-white"
          >
            Browse Cars
          </Link>
        </div>
      </div>


      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Listings", value: cars.length, icon: "🚗" },
          { label: "Electric Cars", value: cars.filter((c) => c.fuelType === "Electric").length, icon: "⚡" },
          { label: "Featured", value: cars.filter((c) => c.featured).length, icon: "⭐" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-800 bg-gray-900 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Listings</h2>
          <Link to="/items" className="text-sm text-blue-400 hover:text-blue-300">
            View All →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
