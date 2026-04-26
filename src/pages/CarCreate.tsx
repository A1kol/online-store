import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createCar } from "../api/carService";
import type { CarFormData } from "../utils/constants";
import { CAR_BRANDS, FUEL_TYPES, TRANSMISSION_TYPES } from "../utils/constants";

export default function CarCreate() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CarFormData>({
    defaultValues: {
      year: new Date().getFullYear(),
      mileage: 0,
      fuelType: "Gasoline",
      transmission: "Automatic",
      featured: false,
    },
  });

  const onSubmit = async (data: CarFormData) => {
    try {
      setServerError("");
      await createCar({
        ...data,
        price: Number(data.price),
        year: Number(data.year),
        mileage: Number(data.mileage),
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Failed to create listing");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Sell Your Car</h1>
        <p className="mt-2 text-gray-400">
          Fill out the details below to list your car on AutoElite
        </p>
      </div>

      {serverError && (
        <div className="mb-6 rounded-lg border border-red-800/50 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Brand *</label>
            <select
              {...register("brand", { required: "Brand is required" })}
              className={inputClass}
            >
              <option value="">Select brand…</option>
              {CAR_BRANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {errors.brand && <p className="mt-1 text-xs text-red-400">{errors.brand.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Model *</label>
            <input
              {...register("model", {
                required: "Model is required",
                minLength: { value: 2, message: "Min 2 characters" },
              })}
              className={inputClass}
              placeholder="e.g. M4 Competition"
            />
            {errors.model && <p className="mt-1 text-xs text-red-400">{errors.model.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Year *</label>
            <input
              type="number"
              {...register("year", {
                required: "Year is required",
                min: { value: 1990, message: "Min 1990" },
                max: { value: 2026, message: "Max 2026" },
                valueAsNumber: true,
              })}
              className={inputClass}
            />
            {errors.year && <p className="mt-1 text-xs text-red-400">{errors.year.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Price ($) *</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 100, message: "Min $100" },
                max: { value: 10_000_000, message: "Max $10,000,000" },
                valueAsNumber: true,
              })}
              className={inputClass}
              placeholder="42500"
            />
            {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Mileage (mi)</label>
            <input
              type="number"
              {...register("mileage", {
                min: { value: 0, message: "Min 0" },
                valueAsNumber: true,
              })}
              className={inputClass}
              placeholder="5000"
            />
            {errors.mileage && <p className="mt-1 text-xs text-red-400">{errors.mileage.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Fuel Type *</label>
            <select
              {...register("fuelType", { required: "Fuel type is required" })}
              className={inputClass}
            >
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Transmission *</label>
            <select
              {...register("transmission", { required: "Transmission is required" })}
              className={inputClass}
            >
              {TRANSMISSION_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Image URL *</label>
          <input
            {...register("image", {
              required: "Image URL is required",
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Enter a valid URL (https://...)",
              },
            })}
            className={inputClass}
            placeholder="https://images.unsplash.com/photo-..."
          />
          {errors.image && <p className="mt-1 text-xs text-red-400">{errors.image.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Description *</label>
          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
              minLength: { value: 20, message: "Min 20 characters" },
            })}
            className={inputClass + " resize-none"}
            placeholder="Describe the car's condition, features, and history…"
          />
          {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
        </div>

        {/* Featured */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("featured")}
            className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300">Mark as Featured</span>
        </label>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create Listing"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-700 px-8 py-3 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
