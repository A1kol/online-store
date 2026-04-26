import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCarById, deleteCar } from "../api/carService";
import type { Car } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getCarById(id)
      .then((c) => {
        if (c) setCar(c);
        else setIsError(true);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this listing?")) return;
    setDeleting(true);
    try {
      await deleteCar(id);
      navigate("/items");
    } catch {
      alert("Failed to delete car.");
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading) return <LoadingSpinner text="Loading car details…" />;
  if (isError || !car)
    return (
      <div className="py-20">
        <ErrorMessage message="Car not found." />
      </div>
    );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(car.price);

  const formattedMileage = new Intl.NumberFormat("en-US").format(car.mileage);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/items" className="hover:text-blue-400">
          Browse Cars
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-300">
          {car.brand} {car.model}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&auto=format&fit=crop&q=60";
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                {car.brand}
              </p>
              <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                {car.model}
              </h1>
            </div>
            <p className="whitespace-nowrap text-3xl font-bold text-green-400">
              {formattedPrice}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Year", car.year],
              ["Mileage", `${formattedMileage} mi`],
              ["Fuel", car.fuelType],
              ["Transmission", car.transmission],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center"
              >
                <p className="text-xs text-gray-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-gray-200">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-800 pt-6">
            <h3 className="text-lg font-semibold text-white">Description</h3>
            <p className="mt-3 leading-relaxed text-gray-400">{car.description}</p>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
            <Link
              to="/items"
              className="flex-1 rounded-xl border border-gray-700 py-3 text-center text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:text-white"
            >
              ← Back to Listings
            </Link>

            {isAdmin && (
              <>
                <Link
                  to={`/items/${car.id}/edit`}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Edit Listing
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 rounded-xl border border-red-700 py-3 text-center text-sm font-semibold text-red-400 transition hover:bg-red-950 disabled:opacity-50"
                >
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
