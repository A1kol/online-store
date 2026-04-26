import { Link } from "react-router-dom";
import type { Car } from "../utils/constants";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(car.price);

  const formattedMileage = new Intl.NumberFormat("en-US").format(car.mileage);

  return (
    <Link
      to={`/items/${car.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition hover:border-gray-700 hover:shadow-lg hover:shadow-blue-500/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-800">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&auto=format&fit=crop&q=60";
          }}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {car.featured && (
            <span className="rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-bold text-gray-900 shadow">
              ⭐ Featured
            </span>
          )}
          <span className="rounded-full bg-gray-900/80 px-3 py-1 text-xs font-medium text-gray-200 backdrop-blur">
            {car.fuelType}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              {car.brand}
            </p>
            <h3 className="mt-1 text-lg font-bold text-white">{car.model}</h3>
          </div>
          <p className="whitespace-nowrap text-lg font-bold text-green-400">
            {formattedPrice}
          </p>
        </div>

        <div className="my-4 border-t border-gray-800" />

        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-gray-500">Year</p>
            <p className="text-sm font-semibold text-gray-200">{car.year}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Mileage</p>
            <p className="text-sm font-semibold text-gray-200">{formattedMileage} mi</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Trans.</p>
            <p className="text-sm font-semibold text-gray-200">{car.transmission}</p>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <span className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600/10 py-2.5 text-sm font-semibold text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
