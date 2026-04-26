import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../api/carService";
import type { Car } from "../utils/constants";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [featured, setFeatured] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars()
      .then((res) => {
        setFeatured(res.data.filter((c) => c.featured).slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 py-24 sm:py-32">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Premium Car Marketplace
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Dream Car
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Browse our curated collection of premium vehicles. From electric
            luxury to raw horsepower — discover the car that matches your
            passion.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/items"
              className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              Browse All Cars
            </Link>
            <Link
              to="/register"
              className="rounded-xl border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 transition hover:border-gray-600 hover:text-white"
            >
              Create Account
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="mt-1 text-sm text-gray-500">Cars Listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">200+</p>
              <p className="mt-1 text-sm text-gray-500">Happy Buyers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="mt-1 text-sm text-gray-500">Top Brands</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Cars</h2>
            <p className="mt-2 text-gray-400">
              Hand-picked premium vehicles just for you
            </p>
          </div>
          <Link
            to="/items"
            className="hidden text-sm font-medium text-blue-400 hover:text-blue-300 sm:block"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading featured cars…" />
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
