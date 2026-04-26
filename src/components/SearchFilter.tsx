import { useState, useCallback } from "react";
import { CAR_BRANDS } from "../utils/constants";

interface SearchFilterProps {
  search: string;
  onSearchChange: (v: string) => void;
  brand: string;
  onBrandChange: (v: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (v: string) => void;
  onMaxPriceChange: (v: string) => void;
  onReset: () => void;
}

export default function SearchFilter({
  search,
  onSearchChange,
  brand,
  onBrandChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: SearchFilterProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleReset = useCallback(() => {
    onReset();
    setFiltersOpen(false);
  }, [onReset]);

  const hasActiveFilters = brand || minPrice || maxPrice;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by brand, model, or keyword…"
            className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition ${
            filtersOpen || hasActiveFilters
              ? "border-blue-500 bg-blue-600/10 text-blue-400"
              : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters {hasActiveFilters && "●"}
        </button>
      </div>

      {filtersOpen && (
        <div className="grid gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-5 sm:grid-cols-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => onBrandChange(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Brands</option>
              {CAR_BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">
              Min Price ($)
            </label>
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">
              Max Price ($)
            </label>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              placeholder="Any"
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2.5 text-sm font-medium text-gray-400 transition hover:border-gray-600 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
