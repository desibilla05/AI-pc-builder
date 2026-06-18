import { create } from "zustand";

export type Region = "US" | "IN";

interface RegionStore {
  region: Region;
  setRegion: (region: Region) => void;
  exchangeRate: number;
  loadingRate: boolean;
  fetchExchangeRate: () => Promise<void>;
}

// Indian Market markup: 18% GST + ~7% import customs / duty markup = ~25%
export const INDIAN_MARKUP = 1.25;

export const useRegionStore = create<RegionStore>((set) => ({
  region: (localStorage.getItem("buildforge-region") as Region) || "US",
  setRegion: (region) => {
    localStorage.setItem("buildforge-region", region);
    set({ region });
  },
  exchangeRate: parseFloat(localStorage.getItem("buildforge-exchange-rate") || "84.2"),
  loadingRate: false,
  fetchExchangeRate: async () => {
    set({ loadingRate: true });
    try {
      // Fetching live daily exchange rate from a public open exchange API
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!res.ok) throw new Error("Failed to fetch live exchange rate");
      const data = await res.json();
      const rate = data.rates?.INR;
      if (rate && typeof rate === "number") {
        localStorage.setItem("buildforge-exchange-rate", rate.toString());
        set({ exchangeRate: rate, loadingRate: false });
        console.log(`Live USD to INR exchange rate loaded: 1 USD = ${rate} INR. Applied Indian market pricing markup (+25% for GST and import duties).`);
      } else {
        throw new Error("Invalid rate format in response");
      }
    } catch (err) {
      console.warn("Could not fetch live exchange rate, using cache or fallback:", err);
      set({ loadingRate: false });
    }
  },
}));

// Auto-trigger exchange rate fetch on store load
setTimeout(() => {
  useRegionStore.getState().fetchExchangeRate();
}, 0);

export const formatPrice = (priceUSD: number, region: Region, rate?: number) => {
  const exchangeRate = rate !== undefined ? rate : useRegionStore.getState().exchangeRate;
  
  // Calculate dynamic INR price with Indian market pricing adjustment factor (+25%)
  const priceINR = Math.round(priceUSD * exchangeRate * INDIAN_MARKUP);
  
  const formattedUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(priceUSD);

  const formattedINR = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceINR);

  if (region === "IN") {
    return `${formattedINR} (${formattedUSD})`;
  }
  return `${formattedUSD} (${formattedINR})`;
};

export const formatPriceCompact = (priceUSD: number, region: Region, rate?: number) => {
  const exchangeRate = rate !== undefined ? rate : useRegionStore.getState().exchangeRate;
  const priceINR = Math.round(priceUSD * exchangeRate * INDIAN_MARKUP);
  if (region === "IN") {
    return `₹${priceINR.toLocaleString("en-IN")}`;
  }
  return `$${priceUSD.toLocaleString("en-US")}`;
};
