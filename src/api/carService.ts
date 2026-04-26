import axios from "axios";
import type { Car, CarFormData } from "../utils/constants";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

const api = axios.create({
  baseURL: "https://mock-api.autoelite.dev",
  headers: { "Content-Type": "application/json" },
});


const generateId = () =>
  `car-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

let mockStore: Car[] = [
  {
    id: "1",
    brand: "BMW",
    model: "M4 Competition",
    year: 2024,
    price: 82900,
    fuelType: "Gasoline",
    transmission: "Automatic",
    mileage: 1200,
    image:
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=60",
    description:
      "Thrilling twin-turbo inline-six with 503 hp. Finished in Isle of Man Green with a fully loaded M Sport interior.",
    featured: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    brand: "Mercedes-Benz",
    model: "EQS 580",
    year: 2024,
    price: 125950,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 340,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60",
    description:
      "The pinnacle of electric luxury. 536 hp, 350-mile range, Hyperscreen dashboard, and Burmester 4D surround sound.",
    featured: true,
    createdAt: "2024-02-10T12:00:00Z",
  },
  {
    id: "3",
    brand: "Toyota",
    model: "GR Supra 3.0",
    year: 2023,
    price: 56250,
    fuelType: "Gasoline",
    transmission: "Automatic",
    mileage: 8400,
    image:
      "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=800&auto=format&fit=crop&q=60",
    description:
      "Iconic sports car reborn. 382-hp turbo inline-six, near-perfect 50/50 weight distribution, and adaptive suspension.",
    featured: true,
    createdAt: "2024-03-05T09:30:00Z",
  },
  {
    id: "4",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    price: 147800,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 560,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=60",
    description:
      "637 hp of electric fury. 0-60 in 3.1 s, carbon-ceramic brakes, and a stunning Daytona Grey matte finish.",
    featured: false,
    createdAt: "2024-03-20T14:00:00Z",
  },
  {
    id: "5",
    brand: "Ford",
    model: "Mustang GT",
    year: 2024,
    price: 42280,
    fuelType: "Gasoline",
    transmission: "Manual",
    mileage: 3100,
    image:
      "https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=800&auto=format&fit=crop&q=60",
    description:
      "The all-new seventh-generation Mustang. 5.0L V8 with 480 hp, 6-speed manual, and a head-turning Grabber Blue paint.",
    featured: false,
    createdAt: "2024-04-01T08:15:00Z",
  },
  {
    id: "7",
    brand: "Volkswagen",
    model: "Golf R",
    year: 2023,
    price: 45800,
    fuelType: "Gasoline",
    transmission: "Automatic",
    mileage: 12800,
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=60",
    description:
      "315 hp, 4MOTION all-wheel drive, and a refined interior make the Golf R the ultimate daily performance car.",
    featured: false,
    createdAt: "2024-05-02T16:30:00Z",
  },
  {
    id: "9",
    brand: "Chevrolet",
    model: "Corvette Stingray",
    year: 2024,
    price: 69500,
    fuelType: "Gasoline",
    transmission: "Automatic",
    mileage: 4500,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60",
    description:
      "Mid-engine revolution. 495-hp 6.2L V8, magnetic ride control, and exotic supercar looks at a fraction of the price.",
    featured: false,
    createdAt: "2024-06-01T13:20:00Z",
  },
  {
    id: "11",
    brand: "BMW",
    model: "i4 M50",
    year: 2024,
    price: 69900,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 1800,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=60",
    description:
      "536 hp of electric M performance. blistering acceleration, M Sport suspension, and a panoramic moonroof.",
    featured: false,
    createdAt: "2024-07-01T15:45:00Z",
  },
  {
    id: "12",
    brand: "Toyota",
    model: "Camry Hybrid",
    year: 2024,
    price: 29495,
    fuelType: "Hybrid",
    transmission: "Automatic",
    mileage: 15000,
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=60",
    description:
      "The best-selling sedan redesigned. 52 MPG combined, Toyota Safety Sense 3.0, and a spacious premium interior.",
    featured: false,
    createdAt: "2024-07-20T09:00:00Z",
  },
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const LATENCY = 400; 


export async function getCars(params?: {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Promise<PaginatedResponse<Car>> {
  await delay(LATENCY);

  let results = [...mockStore];

  if (params?.search) {
    const q = params.search.toLowerCase();
    results = results.filter(
      (c) =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }

  if (params?.brand) {
    results = results.filter((c) => c.brand === params.brand);
  }

  if (params?.minPrice !== undefined) {
    results = results.filter((c) => c.price >= params.minPrice!);
  }

  if (params?.maxPrice !== undefined) {
    results = results.filter((c) => c.price <= params.maxPrice!);
  }

  return {
    data: results,
    total: results.length,
    page: 1,
    limit: results.length,
  };
}

export async function getCarById(id: string): Promise<Car | null> {
  await delay(LATENCY);
  return mockStore.find((c) => c.id === id) ?? null;
}

export async function createCar(payload: CarFormData): Promise<Car> {
  await delay(LATENCY);
  const newCar: Car = {
    ...payload,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  mockStore.unshift(newCar);
  return newCar;
}

export async function updateCar(
  id: string,
  payload: Partial<CarFormData>
): Promise<Car> {
  await delay(LATENCY);
  const idx = mockStore.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error("Car not found");
  mockStore[idx] = { ...mockStore[idx], ...payload };
  return mockStore[idx];
}

export async function deleteCar(id: string): Promise<void> {
  await delay(LATENCY);
  mockStore = mockStore.filter((c) => c.id !== id);
}

export default api;
