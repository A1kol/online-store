import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCars, deleteCar } from "../api/carService";
import type { Car } from "../utils/constants";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function Admin() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const fetchCars = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getCars();
      setCars(res.data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this listing permanently?")) return;
    try {
      await deleteCar(id);
      setCars((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage all car listings on AutoElite
          </p>
        </div>
        <Link
          to="/items/create"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          + Add Car
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Cars", value: cars.length, color: "text-white" },
          { label: "Featured", value: cars.filter((c) => c.featured).length, color: "text-yellow-400" },
          { label: "Electric", value: cars.filter((c) => c.fuelType === "Electric").length, color: "text-green-400" },
          { label: "Manual", value: cars.filter((c) => c.transmission === "Manual").length, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>


      <div className="mt-8 overflow-hidden rounded-xl border border-gray-800">
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorMessage message="Failed to load listings." onRetry={fetchCars} />}

        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-800 bg-gray-900/50">
                <tr>
                  <th className="px-5 py-3 font-medium text-gray-400">Car</th>
                  <th className="px-5 py-3 font-medium text-gray-400">Brand</th>
                  <th className="px-5 py-3 font-medium text-gray-400">Price</th>
                  <th className="px-5 py-3 font-medium text-gray-400">Year</th>
                  <th className="px-5 py-3 font-medium text-gray-400">Fuel</th>
                  <th className="px-5 py-3 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {cars.map((car) => {
                  const price = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(car.price);

                  return (
                    <tr key={car.id} className="bg-gray-900/30 transition hover:bg-gray-800/50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.image}
                            alt=""
                            className="h-10 w-16 rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=200&auto=format&fit=crop&q=60";
                            }}
                          />
                          <span className="font-medium text-white">
                            {car.model}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-300">{car.brand}</td>
                      <td className="px-5 py-4 text-green-400 font-semibold">{price}</td>
                      <td className="px-5 py-4 text-gray-400">{car.year}</td>
                      <td className="px-5 py-4 text-gray-400">{car.fuelType}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/items/${car.id}/edit`)}
                            className="rounded-lg bg-blue-600/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition hover:bg-blue-600 hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(car.id)}
                            className="rounded-lg bg-red-600/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-600 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
