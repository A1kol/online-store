export const API_BASE_URL = "https://mock-api.autoelite.dev";

export const CAR_BRANDS = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Ford",
  "Honda",
  "Hyundai",
  "Mercedes-Benz",
  "Nissan",
  "Toyota",
  "Volkswagen",
] as const;


export const FUEL_TYPES = [
  "Gasoline",
  "Diesel",
  "Electric",
  "Hybrid",
] as const;


export const TRANSMISSION_TYPES = ["Automatic", "Manual"] as const;

export const PRICE_MIN = 0;
export const PRICE_MAX = 10_000_000;

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  transmission: string;
  mileage: number;
  image: string;
  description: string;
  featured?: boolean;
  createdAt: string;
}

export interface CarFormData {
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  transmission: string;
  mileage: number;
  image: string;
  description: string;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
