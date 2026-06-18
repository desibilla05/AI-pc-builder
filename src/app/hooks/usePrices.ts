import { useState, useEffect } from "react";

interface ComponentPrice {
  price: number;
  formattedPrice: string;
  amazonUrl: string;
  inStock: boolean;
}

interface UsePricesReturn {
  prices: Record<string, ComponentPrice>;
  loading: boolean;
  error: string | null;
  getPrice: (componentName: string) => ComponentPrice | null;
}

export function usePrices(): UsePricesReturn {
  const [prices, setPrices] = useState<Record<string, ComponentPrice>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrices() {
      try {
        const backendUrl = (import.meta as any).env?.VITE_BACKEND_URL || "http://localhost:3001";
        const res = await fetch(`${backendUrl}/api/prices`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setPrices(data.prices ?? {});
      } catch (err) {
        console.warn("Could not load live prices:", err);
        setError("Live prices unavailable – showing estimates");
      } finally {
        setLoading(false);
      }
    }

    loadPrices();
  }, []);

  const getPrice = (componentName: string) =>
    prices[componentName] ?? null;

  return { prices, loading, error, getPrice };
}