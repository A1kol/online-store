import { useCallback, useEffect, useState } from "react";
import { getCars } from "../api/carService";
import type { Car } from "../utils/constants";
import CarCard from "../components/CarCard";
import SearchFilter from "../components/SearchFilter";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchCars = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getCars({
        search: search || undefined,
        brand: brand || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
      setCars(res.data);
      setTotal(res.total);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [search, brand, minPrice, maxPrice]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleReset = () => {
    setSearch("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
  };

  const isEmpty = !isLoading && !isError && cars.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Browse Cars</h1>
        <p className="mt-2 text-gray-400">
          Explore our full collection of premium vehicles
        </p>
      </div>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        brand={brand}
        onBrandChange={setBrand}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        onReset={handleReset}
      />

      <div className="mt-6 mb-4">
        <p className="text-sm text-gray-500">
          {isLoading ? "Searching…" : `${total} car${total !== 1 ? "s" : ""} found`}
        </p>
      </div>


      {isLoading && <LoadingSpinner text="Finding your next car…" />}

      {isError && (
        <ErrorMessage message="Failed to load cars." onRetry={fetchCars} />
      )}

      {isEmpty && (
        <div className="flex flex-col items-center rounded-2xl border border-gray-800 bg-gray-900/50 py-20 text-center">
          <span className="text-5xl">🔍</span>
          <h3 className="mt-4 text-lg font-semibold text-white">No cars found</h3>
          <p className="mt-2 text-sm text-gray-400">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={handleReset}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {!isLoading && !isError && cars.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
