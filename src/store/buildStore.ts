import { create } from "zustand";

export interface Component {
  id: string;
  name: string;
  price: number;
  wattage: number;
}

interface BuildStore {
  cpu: Component | null;
  gpu: Component | null;
  motherboard: Component | null;
  ram: Component | null;

  setCPU: (cpu: Component) => void;
  setGPU: (gpu: Component) => void;
  setMotherboard: (motherboard: Component) => void;
  setRAM: (ram: Component) => void;
}

export const useBuildStore = create<BuildStore>((set) => ({
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,

  setCPU: (cpu) => set({ cpu }),
  setGPU: (gpu) => set({ gpu }),
  setMotherboard: (motherboard) => set({ motherboard }),
  setRAM: (ram) => set({ ram }),
}));