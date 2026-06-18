import fs from 'fs';

const CPUs = [];
const GPUs = [];
const MOBOs = [];
const RAMs = [];
const STORAGE = [];
const COOLERS = [];
const PSUs = [];
const CASEs = [];

// Helper to generate a component
const makeCpu = (id, name, price, specs, wattage, brand, socket, supportedMemory) => ({ id, name, price, specs, wattage, brand, socket, supportedMemory });
const makeGpu = (id, name, price, specs, wattage, brand) => ({ id, name, price, specs, wattage, brand });
const makeMobo = (id, name, price, specs, brand, socket, supportedMemory) => ({ id, name, price, specs, brand, socket, supportedMemory });
const makeRam = (id, name, price, specs, brand, supportedMemory) => ({ id, name, price, specs, brand, supportedMemory });
const makeStorage = (id, name, price, specs, brand) => ({ id, name, price, specs, brand });
const makeCooler = (id, name, price, specs, brand) => ({ id, name, price, specs, brand });
const makePsu = (id, name, price, specs, wattage, brand) => ({ id, name, price, specs, wattage, brand });
const makeCase = (id, name, price, specs, brand) => ({ id, name, price, specs, brand });

// 1. INTEL CPUs (Exhaustive Desktop)
const intelGenerations = [
  { gen: 2, socket: "LGA1155", prefix: "Intel Core", variants: {
    i3: ["2100", "2100T", "2120", "2120T", "2125", "2130"],
    i5: ["2300", "2310", "2320", "2380P", "2400", "2400S", "2405S", "2500", "2500K", "2500S", "2500T"],
    i7: ["2600", "2600K", "2600S", "2700K"]
  }},
  { gen: 3, socket: "LGA1155", prefix: "Intel Core", variants: {
    i3: ["3210", "3220", "3220T", "3225", "3240", "3240T", "3250", "3250T"],
    i5: ["3330", "3330S", "3340", "3340S", "3350P", "3450", "3450S", "3470", "3470S", "3470T", "3550", "3550S", "3570", "3570K", "3570S", "3570T"],
    i7: ["3770", "3770K", "3770S", "3770T"]
  }},
  { gen: 4, socket: "LGA1150", prefix: "Intel Core", variants: {
    i3: ["4130", "4130T", "4150", "4150T", "4160", "4160T", "4170", "4170T", "4330", "4330T", "4340", "4350", "4360", "4370"],
    i5: ["4430", "4430S", "4440", "4440S", "4460", "4460S", "4460T", "4570", "4570S", "4570T", "4590", "4590S", "4590T", "4670", "4670K", "4670S", "4670T", "4690", "4690K", "4690S", "4690T"],
    i7: ["4765T", "4770", "4770K", "4770S", "4770T", "4771", "4785T", "4790", "4790K", "4790S", "4790T"]
  }},
  { gen: 6, socket: "LGA1151", prefix: "Intel Core", variants: {
    i3: ["6098P", "6100", "6100T", "6300", "6300T", "6320"],
    i5: ["6400", "6400T", "6402P", "6500", "6500T", "6600", "6600K", "6600T"],
    i7: ["6700", "6700K", "6700T"]
  }},
  { gen: 7, socket: "LGA1151", prefix: "Intel Core", variants: {
    i3: ["7100", "7100T", "7300", "7300T", "7320", "7350K"],
    i5: ["7400", "7400T", "7500", "7500T", "7600", "7600K", "7600T"],
    i7: ["7700", "7700K", "7700T"]
  }},
  { gen: 8, socket: "LGA1151", prefix: "Intel Core", variants: {
    i3: ["8100", "8100T", "8300", "8300T", "8350K"],
    i5: ["8400", "8400T", "8500", "8500T", "8600", "8600K", "8600T"],
    i7: ["8700", "8700K", "8700T"],
    i9: [] // None in 8th gen mainstream desktop except later 9900K which is 9th
  }},
  { gen: 9, socket: "LGA1151", prefix: "Intel Core", variants: {
    i3: ["9100", "9100F", "9100T", "9300", "9300T", "9320", "9350K", "9350KF"],
    i5: ["9400", "9400F", "9400T", "9500", "9500F", "9500T", "9600", "9600K", "9600KF", "9600T"],
    i7: ["9700", "9700F", "9700K", "9700KF", "9700T"],
    i9: ["9900", "9900K", "9900KF", "9900KS", "9900T"]
  }},
  { gen: 10, socket: "LGA1200", prefix: "Intel Core", variants: {
    i3: ["10100", "10100F", "10100T", "10105", "10105F", "10105T", "10300", "10300T", "10320"],
    i5: ["10400", "10400F", "10400T", "10500", "10500T", "10600", "10600K", "10600KF", "10600T"],
    i7: ["10700", "10700F", "10700K", "10700KF", "10700T"],
    i9: ["10850K", "10900", "10900F", "10900K", "10900KF", "10900T"]
  }},
  { gen: 11, socket: "LGA1200", prefix: "Intel Core", variants: {
    i3: [], // 10th gen refresh was used
    i5: ["11400", "11400F", "11400T", "11500", "11500T", "11600", "11600K", "11600KF", "11600T"],
    i7: ["11700", "11700F", "11700K", "11700KF", "11700T"],
    i9: ["11900", "11900F", "11900K", "11900KF", "11900T"]
  }},
  { gen: 12, socket: "LGA1700", prefix: "Intel Core", variants: {
    i3: ["12100", "12100F", "12100T", "12300", "12300T"],
    i5: ["12400", "12400F", "12400T", "12500", "12500T", "12600", "12600K", "12600KF", "12600T"],
    i7: ["12700", "12700F", "12700K", "12700KF", "12700T"],
    i9: ["12900", "12900F", "12900K", "12900KF", "12900KS", "12900T"]
  }},
  { gen: 13, socket: "LGA1700", prefix: "Intel Core", variants: {
    i3: ["13100", "13100F", "13100T"],
    i5: ["13400", "13400F", "13400T", "13500", "13500T", "13600", "13600K", "13600KF", "13600T"],
    i7: ["13700", "13700F", "13700K", "13700KF", "13700T"],
    i9: ["13900", "13900F", "13900K", "13900KF", "13900KS", "13900T"]
  }},
  { gen: 14, socket: "LGA1700", prefix: "Intel Core", variants: {
    i3: ["14100", "14100F", "14100T"],
    i5: ["14400", "14400F", "14400T", "14500", "14500T", "14600", "14600K", "14600KF", "14600T"],
    i7: ["14700", "14700F", "14700K", "14700KF", "14700T"],
    i9: ["14900", "14900F", "14900K", "14900KF", "14900KS", "14900T"]
  }},
  { gen: "Ultra", socket: "LGA1851", prefix: "Intel Core Ultra", variants: {
    5: ["245K", "245KF", "235", "225", "225F"],
    7: ["265K", "265KF", "255", "255F"],
    9: ["285K"]
  }}
];

intelGenerations.forEach(gen => {
  for (const [tier, models] of Object.entries(gen.variants)) {
    models.forEach(mod => {
      let tierStr = tier;
      if (gen.gen !== "Ultra") {
        tierStr = tier; // e.g. "i3"
      }
      const fullName = gen.prefix + " " + tierStr + "-" + mod;
      const id = "cpu-intel-" + gen.gen + "-" + tierStr + "-" + mod.toLowerCase();
      let basePrice = 100;
      if (tierStr.includes("i5") || tierStr === "5") basePrice = 200;
      if (tierStr.includes("i7") || tierStr === "7") basePrice = 320;
      if (tierStr.includes("i9") || tierStr === "9") basePrice = 500;
      
      // Price discounting for older gens
      const genNum = parseInt(gen.gen) || 15;
      const discount = Math.max(0.1, (genNum / 15));
      const price = Math.round(basePrice * discount);
      
      let wattage = 65;
      if (mod.includes("K") || mod.includes("KS")) wattage = 125;
      if (mod.includes("T")) wattage = 35;
      
      let memType = "DDR4";
      if (gen.socket === "LGA1155" || gen.socket === "LGA1150") memType = "DDR3";
      if (gen.socket === "LGA1700") memType = "DDR4/DDR5";
      if (gen.socket === "LGA1851") memType = "DDR5";
      CPUs.push(makeCpu(id, fullName, price, gen.socket + ", " + gen.gen + " Gen/Series", wattage, "Intel", gen.socket, memType));
    });
  }
});

// 2. AMD CPUs
const amdGenerations = [
  { arch: "AM3+", prefix: "AMD FX", variants: {
    4: ["4100", "4130", "4300", "4350"],
    6: ["6100", "6200", "6300", "6350"],
    8: ["8120", "8150", "8300", "8320", "8320E", "8350", "8370", "8370E", "9370", "9590"]
  }},
  { arch: "AM4", prefix: "AMD Ryzen", variants: {
    3: ["1200", "1300X", "2200G", "3100", "3200G", "3300X", "4100", "4300G", "5300G"],
    5: ["1400", "1500X", "1600", "1600AF", "2400G", "2600", "2600X", "3400G", "3600", "3600X", "3600XT", "4500", "4600G", "5500", "5600", "5600G", "5600GT", "5600X", "5600X3D"],
    7: ["1700", "1700X", "1800X", "2700", "2700X", "3700X", "3800X", "3800XT", "4700G", "5700", "5700G", "5700X", "5700X3D", "5800X", "5800X3D"],
    9: ["3900X", "3900XT", "3950X", "5900X", "5950X"]
  }},
  { arch: "AM5", prefix: "AMD Ryzen", variants: {
    5: ["7500F", "7600", "7600X", "8500G", "8600G", "9600X"],
    7: ["7700", "7700X", "7800X3D", "8700F", "8700G", "9700X", "9800X3D"],
    9: ["7900", "7900X", "7900X3D", "7950X", "7950X3D", "9900X", "9950X"]
  }}
];

amdGenerations.forEach(gen => {
  for (const [tier, models] of Object.entries(gen.variants)) {
    models.forEach(mod => {
      const fullName = gen.prefix + " " + tier + " " + mod;
      const id = "cpu-amd-" + gen.arch + "-" + mod.toLowerCase();
      
      let basePrice = 120;
      if (tier === "5" || tier === "6") basePrice = 200;
      if (tier === "7" || tier === "8") basePrice = 300;
      if (tier === "9") basePrice = 500;
      
      let genFactor = 1;
      if (gen.arch === "AM3+") genFactor = 0.15;
      if (gen.arch === "AM4" && mod.startsWith("1")) genFactor = 0.25;
      if (gen.arch === "AM4" && mod.startsWith("2")) genFactor = 0.35;
      if (gen.arch === "AM4" && mod.startsWith("3")) genFactor = 0.5;
      if (gen.arch === "AM4" && mod.startsWith("5")) genFactor = 0.75;
      
      const price = Math.round(basePrice * genFactor);
      
      let wattage = 65;
      if (mod.includes("X") || gen.arch === "AM3+") wattage = 105;
      if (mod === "9590") wattage = 220;
      if (mod.includes("9950X")) wattage = 170;
      
      let memType = "DDR4";
      if (gen.arch === "AM3+") memType = "DDR3";
      if (gen.arch === "AM5") memType = "DDR5";
      CPUs.push(makeCpu(id, fullName, price, gen.arch + " Socket", wattage, "AMD", gen.arch, memType));
    });
  }
});

// 3. NVIDIA GPUs
const nvidiaGpus = [
  { series: "GT 700", models: ["710", "720", "730", "740"], prefix: "NVIDIA GeForce GT" },
  { series: "GTX 700", models: ["750", "750 Ti", "760", "770", "780", "780 Ti", "Titan"], prefix: "NVIDIA GeForce GTX" },
  { series: "GTX 900", models: ["950", "960", "970", "980", "980 Ti", "Titan X"], prefix: "NVIDIA GeForce GTX" },
  { series: "GTX 10", models: ["1030 (GT)", "1050", "1050 Ti", "1060 3GB", "1060 6GB", "1070", "1070 Ti", "1080", "1080 Ti", "Titan Xp"], prefix: "NVIDIA GeForce GTX" },
  { series: "GTX 16", models: ["1630", "1650", "1650 Super", "1660", "1660 Super", "1660 Ti"], prefix: "NVIDIA GeForce GTX" },
  { series: "RTX 20", models: ["2060", "2060 Super", "2060 12GB", "2070", "2070 Super", "2080", "2080 Super", "2080 Ti", "Titan RTX"], prefix: "NVIDIA GeForce RTX" },
  { series: "RTX 30", models: ["3050 6GB", "3050 8GB", "3060 8GB", "3060 12GB", "3060 Ti", "3070", "3070 Ti", "3080 10GB", "3080 12GB", "3080 Ti", "3090", "3090 Ti"], prefix: "NVIDIA GeForce RTX" },
  { series: "RTX 40", models: ["4060", "4060 Ti 8GB", "4060 Ti 16GB", "4070", "4070 Super", "4070 Ti", "4070 Ti Super", "4080", "4080 Super", "4090", "4090 D"], prefix: "NVIDIA GeForce RTX" },
  { series: "RTX 50", models: ["5060", "5060 Ti", "5070", "5070 Ti", "5080", "5090"], prefix: "NVIDIA GeForce RTX" }
];

nvidiaGpus.forEach(g => {
  g.models.forEach(mod => {
    let name = g.prefix + " " + mod;
    if (mod.includes("(GT)")) {
      name = "NVIDIA GeForce GT " + mod.split(" ")[0];
    }
    const id = "gpu-nv-" + mod.toLowerCase().replace(/\\s+/g, '-');
    let price = 300;
    if (mod.includes("50")) price = 150;
    if (mod.includes("60")) price = 250;
    if (mod.includes("70")) price = 400;
    if (mod.includes("80")) price = 700;
    if (mod.includes("90")) price = 1200;
    if (mod.includes("Ti") || mod.includes("Super")) price *= 1.2;
    if (g.series.includes("50")) price *= 1.3;
    
    let wattage = 150;
    if (mod.includes("80")) wattage = 300;
    if (mod.includes("90")) wattage = 450;
    
    GPUs.push(makeGpu(id, name, Math.round(price), g.series + " Series", wattage, "NVIDIA"));
  });
});

// 4. AMD GPUs
const amdGpus = [
  { series: "RX 400", models: ["460", "470", "480"], prefix: "AMD Radeon RX" },
  { series: "RX 500", models: ["550", "560", "570", "580", "590"], prefix: "AMD Radeon RX" },
  { series: "RX 5000", models: ["5500 XT", "5600 XT", "5700", "5700 XT"], prefix: "AMD Radeon RX" },
  { series: "RX 6000", models: ["6400", "6500 XT", "6600", "6600 XT", "6650 XT", "6700", "6700 XT", "6750 XT", "6800", "6800 XT", "6900 XT", "6950 XT"], prefix: "AMD Radeon RX" },
  { series: "RX 7000", models: ["7600", "7600 XT", "7700 XT", "7800 XT", "7900 GRE", "7900 XT", "7900 XTX"], prefix: "AMD Radeon RX" },
  { series: "RX 9000", models: ["9070", "9070 XT"], prefix: "AMD Radeon RX" }
];

amdGpus.forEach(g => {
  g.models.forEach(mod => {
    const name = g.prefix + " " + mod;
    const id = "gpu-amd-" + mod.toLowerCase().replace(/\\s+/g, '-');
    let price = 250;
    if (mod.includes("400") || mod.includes("500") || mod.includes("600")) price = 200;
    if (mod.includes("700")) price = 350;
    if (mod.includes("800")) price = 500;
    if (mod.includes("900")) price = 800;
    if (mod.includes("XT")) price *= 1.15;
    
    let wattage = 150;
    if (mod.includes("800") || mod.includes("900")) wattage = 280;
    
    GPUs.push(makeGpu(id, name, Math.round(price), g.series + " Series", wattage, "AMD"));
  });
});

// 5. MOTHERBOARDS (Exhaustive sockets)
const moboSockets = [
  { socket: "LGA1155", chipsets: ["H61", "B75", "Z77"] },
  { socket: "LGA1150", chipsets: ["H81", "B85", "Z97"] },
  { socket: "LGA1151", chipsets: ["H110", "B150", "Z170", "B250", "Z270", "H310", "B365", "Z390"] },
  { socket: "LGA1200", chipsets: ["H410", "B460", "Z490", "H510", "B560", "Z590"] },
  { socket: "LGA1700", chipsets: ["H610", "B660", "Z690", "B760", "Z790"] },
  { socket: "LGA1851", chipsets: ["Z890", "B860"] }, // Added B860 for LGA1851 as typical future fallback
  { socket: "AM3+", chipsets: ["760G", "970", "990FX"] },
  { socket: "AM4", chipsets: ["A320", "B350", "X370", "B450", "X470", "A520", "B550", "X570"] },
  { socket: "AM5", chipsets: ["A620", "B650", "X670E", "B850", "X870E"] }
];

const brands = ["ASUS", "MSI", "Gigabyte", "ASRock"];

moboSockets.forEach(s => {
  s.chipsets.forEach(chip => {
    brands.forEach(brand => {
      // Create at least one board per brand per chipset
      let tier = "Pro";
      let price = 100;
      if (chip.includes("Z") || chip.includes("X")) { tier = "Gaming WiFi"; price = 250; }
      if (chip.includes("B")) { tier = "Tomahawk / Elite"; price = 150; }
      
      let name = brand + " " + chip + " " + tier;
      
      // Specifically ensure we have EXACT names for AIRecommendation matching
      if (chip === "X870E" && brand === "ASUS") name = "ASUS ROG Crosshair X870E Hero";
      if (chip === "X870E" && brand === "MSI") name = "MSI MPG X870E Carbon WiFi";
      if (chip === "B850" && brand === "Gigabyte") name = "Gigabyte B850 AORUS Elite";
      if (chip === "B650" && brand === "ASUS") name = "ASUS TUF Gaming B650-PLUS WiFi";
      if (chip === "Z890" && brand === "ASUS") name = "ASUS ROG Maximus Z890 Hero";
      if (chip === "Z890" && brand === "MSI") name = "MSI MAG Z890 Tomahawk WiFi";
      if (chip === "B760" && brand === "ASRock") name = "ASRock B760M Pro RS";

      const id = "mobo-" + brand.toLowerCase() + "-" + chip.toLowerCase();
      
      let memType = "DDR4";
      if (s.socket === "LGA1155" || s.socket === "LGA1150" || s.socket === "AM3+") memType = "DDR3";
      if (s.socket === "LGA1851" || s.socket === "AM5") memType = "DDR5";
      if (s.socket === "LGA1700" && (chip.includes("Z790") || chip.includes("B760"))) memType = "DDR5"; // Simplified assumption for newer LGA1700
      
      MOBOs.push(makeMobo(id, name, price, s.socket + " Socket", brand, s.socket, memType));
    });
  });
});

// Remove duplicates if any (due to exact name forcing)
const uniqueMobos = [];
const moboNames = new Set();
MOBOs.forEach(m => {
  if (!moboNames.has(m.name)) {
    moboNames.add(m.name);
    uniqueMobos.push(m);
  }
});

// 6. RAM, Storage, Coolers, PSU, Case
// Just keeping the high quality ones already defined plus some generic expansions
const defaultRAMs = [
    { id: "ram-ddr4-8g", name: "G.Skill Aegis 8GB DDR4-3200", price: 22, specs: "1x8GB DDR4-3200", brand: "G.Skill", supportedMemory: "DDR4" },
    { id: "ram-ddr4-16g-corsair", name: "Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200", price: 39, specs: "2x8GB DDR4-3200", brand: "Corsair", supportedMemory: "DDR4" },
    { id: "ram-ddr5-16g-crucial", name: "Crucial Pro 16GB (2x8GB) DDR5-5600", price: 59, specs: "2x8GB DDR5-5600", brand: "Crucial", supportedMemory: "DDR5" },
    { id: "ram-ddr5-32g-corsair", name: "Corsair Vengeance 32GB (2x16GB) DDR5-5600", price: 95, specs: "2x16GB DDR5-5600", brand: "Corsair", supportedMemory: "DDR5" },
    { id: "ram-ddr5-64g-trident", name: "G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000", price: 289, specs: "2x32GB DDR5-6000", brand: "G.Skill", supportedMemory: "DDR5" },
    { id: "ram-ddr5-32g-dom", name: "Corsair Dominator Titanium 32GB (2x16GB) DDR5-7200", price: 229, specs: "2x16GB DDR5-7200", brand: "Corsair", supportedMemory: "DDR5" },
    { id: "ram-ddr5-64g-dom", name: "Corsair Dominator Titanium 64GB (2x32GB) DDR5-7200", price: 399, specs: "2x32GB DDR5-7200", brand: "Corsair", supportedMemory: "DDR5" },
    { id: "ram-ddr3-8g", name: "Corsair Vengeance 8GB (2x4GB) DDR3-1600", price: 19, specs: "2x4GB DDR3-1600", brand: "Corsair", supportedMemory: "DDR3" },
    { id: "ram-ddr3-16g", name: "G.Skill Ripjaws X 16GB (2x8GB) DDR3-1600", price: 32, specs: "2x8GB DDR3-1600", brand: "G.Skill", supportedMemory: "DDR3" }
];
defaultRAMs.forEach(r => RAMs.push(r));

const defaultStorage = [
    { id: "ssd-crucial-p3-1t", name: "Crucial P3 1TB", price: 55, specs: "NVMe PCIe Gen3", brand: "Crucial" },
    { id: "ssd-samsung-980pro-1t", name: "Samsung 980 Pro 1TB", price: 95, specs: "NVMe PCIe Gen4", brand: "Samsung" },
    { id: "ssd-crucial-p5plus-1t", name: "Crucial P5 Plus 1TB", price: 79, specs: "NVMe PCIe Gen4", brand: "Crucial" },
    { id: "ssd-crucial-t700-2t", name: "Crucial T700 2TB", price: 229, specs: "NVMe PCIe Gen5", brand: "Crucial" },
    { id: "ssd-samsung-990evo-4t", name: "Samsung 990 Evo Plus 4TB", price: 299, specs: "NVMe PCIe Gen5", brand: "Samsung" },
    { id: "hdd-seagate-2t", name: "Seagate BarraCuda 2TB", price: 50, specs: "3.5-inch HDD", brand: "Seagate" }
];
defaultStorage.forEach(s => STORAGE.push(s));

const defaultCoolers = [
    { id: "cooler-ag300", name: "DeepCool AG300", price: 18, specs: "Air Cooler", brand: "DeepCool" },
    { id: "cooler-peerless-120", name: "Thermalright Peerless Assassin 120 SE", price: 35, specs: "Air Cooler", brand: "Thermalright" },
    { id: "cooler-dark-rock-5", name: "be quiet! Dark Rock Pro 5", price: 89, specs: "Air Cooler", brand: "be quiet!" },
    { id: "cooler-arctic-360", name: "Arctic Liquid Freezer III 360", price: 99, specs: "AIO Liquid Cooler", brand: "Arctic" },
    { id: "cooler-kraken-elite", name: "NZXT Kraken Elite 360 RGB", price: 279, specs: "AIO Liquid Cooler", brand: "NZXT" },
    { id: "cooler-corsair-h170i", name: "Corsair iCUE H170i Elite LCD", price: 299, specs: "AIO Liquid Cooler", brand: "Corsair" }
];
defaultCoolers.forEach(c => COOLERS.push(c));

const defaultPsus = [
    { id: "psu-corsair-650", name: "Corsair CX650M", price: 70, specs: "650W, 80+ Bronze", wattage: 650, brand: "Corsair" },
    { id: "psu-corsair-750e", name: "Corsair RM750e", price: 89, specs: "750W, 80+ Gold", wattage: 750, brand: "Corsair" },
    { id: "psu-evga-850", name: "EVGA SuperNOVA 850 G7", price: 129, specs: "850W, 80+ Gold", wattage: 850, brand: "EVGA" },
    { id: "psu-corsair-1000", name: "Corsair RM1000x 2024", price: 189, specs: "1000W, 80+ Gold", wattage: 1000, brand: "Corsair" },
    { id: "psu-bq-1000", name: "be quiet! Dark Power 13 1000W", price: 249, specs: "1000W, 80+ Titanium", wattage: 1000, brand: "be quiet!" },
    { id: "psu-seasonic-1600", name: "Seasonic Prime TX-1600", price: 499, specs: "1600W, 80+ Titanium", wattage: 1600, brand: "Seasonic" }
];
defaultPsus.forEach(p => PSUs.push(p));

const defaultCases = [
    { id: "case-corsair-4000d", name: "Corsair 4000D Airflow", price: 89, specs: "Mid Tower", brand: "Corsair" },
    { id: "case-fractal-north", name: "Fractal Design North", price: 139, specs: "Mid Tower", brand: "Fractal Design" },
    { id: "case-lianli-o11", name: "Lian Li O11 Dynamic EVO 2", price: 189, specs: "Mid Tower", brand: "Lian Li" },
    { id: "case-corsair-6500", name: "Corsair 6500X", price: 229, specs: "Mid Tower", brand: "Corsair" },
    { id: "case-bq-901", name: "be quiet! Dark Base Pro 901", price: 279, specs: "Full Tower", brand: "be quiet!" },
    { id: "case-cm-700", name: "Cooler Master HAF 700 EVO", price: 449, specs: "Full Tower", brand: "Cooler Master" }
];
defaultCases.forEach(c => CASEs.push(c));

const fileContent = `export interface Component {
  id: string;
  name: string;
  price: number;
  specs: string;
  wattage?: number;
  brand?: string;
  socket?: string;
  supportedMemory?: string;
}

export const COMPONENTS_DATABASE: {
  cpu: Component[];
  gpu: Component[];
  motherboard: Component[];
  ram: Component[];
  storage: Component[];
  psu: Component[];
  case: Component[];
  cooler: Component[];
} = {
  cpu: CPUs,
  gpu: GPUs,
  motherboard: uniqueMobos,
  ram: RAMs,
  storage: STORAGE,
  psu: PSUs,
  case: CASEs,
  cooler: COOLERS
};
`;

fs.writeFileSync('src/data/components.ts', fileContent.replace("CPUs", JSON.stringify(CPUs, null, 4)).replace("GPUs", JSON.stringify(GPUs, null, 4)).replace("uniqueMobos", JSON.stringify(uniqueMobos, null, 4)).replace("RAMs", JSON.stringify(RAMs, null, 4)).replace("STORAGE", JSON.stringify(STORAGE, null, 4)).replace("PSUs", JSON.stringify(PSUs, null, 4)).replace("CASEs", JSON.stringify(CASEs, null, 4)).replace("COOLERS", JSON.stringify(COOLERS, null, 4)), 'utf8');
console.log('Successfully generated exhaustive components.ts database.');
