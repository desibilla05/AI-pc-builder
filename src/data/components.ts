export interface Component {
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
  cpu: [
    {
        "id": "cpu-intel-2-i3-2100",
        "name": "Intel Core i3-2100",
        "price": 13,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i3-2100t",
        "name": "Intel Core i3-2100T",
        "price": 13,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i3-2120",
        "name": "Intel Core i3-2120",
        "price": 13,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i3-2120t",
        "name": "Intel Core i3-2120T",
        "price": 13,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i3-2125",
        "name": "Intel Core i3-2125",
        "price": 13,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i3-2130",
        "name": "Intel Core i3-2130",
        "price": 13,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2300",
        "name": "Intel Core i5-2300",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2310",
        "name": "Intel Core i5-2310",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2320",
        "name": "Intel Core i5-2320",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2380p",
        "name": "Intel Core i5-2380P",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2400",
        "name": "Intel Core i5-2400",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2400s",
        "name": "Intel Core i5-2400S",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2405s",
        "name": "Intel Core i5-2405S",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2500",
        "name": "Intel Core i5-2500",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2500k",
        "name": "Intel Core i5-2500K",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2500s",
        "name": "Intel Core i5-2500S",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i5-2500t",
        "name": "Intel Core i5-2500T",
        "price": 27,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i7-2600",
        "name": "Intel Core i7-2600",
        "price": 43,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i7-2600k",
        "name": "Intel Core i7-2600K",
        "price": 43,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i7-2600s",
        "name": "Intel Core i7-2600S",
        "price": 43,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-2-i7-2700k",
        "name": "Intel Core i7-2700K",
        "price": 43,
        "specs": "LGA1155, 2 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i3-3210",
        "name": "Intel Core i3-3210",
        "price": 20,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i3-3220",
        "name": "Intel Core i3-3220",
        "price": 20,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i3-3220t",
        "name": "Intel Core i3-3220T",
        "price": 20,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i3-3225",
        "name": "Intel Core i3-3225",
        "price": 20,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i3-3240",
        "name": "Intel Core i3-3240",
        "price": 20,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i3-3240t",
        "name": "Intel Core i3-3240T",
        "price": 20,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i3-3250",
        "name": "Intel Core i3-3250",
        "price": 20,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i3-3250t",
        "name": "Intel Core i3-3250T",
        "price": 20,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3330",
        "name": "Intel Core i5-3330",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3330s",
        "name": "Intel Core i5-3330S",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3340",
        "name": "Intel Core i5-3340",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3340s",
        "name": "Intel Core i5-3340S",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3350p",
        "name": "Intel Core i5-3350P",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3450",
        "name": "Intel Core i5-3450",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3450s",
        "name": "Intel Core i5-3450S",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3470",
        "name": "Intel Core i5-3470",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3470s",
        "name": "Intel Core i5-3470S",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3470t",
        "name": "Intel Core i5-3470T",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3550",
        "name": "Intel Core i5-3550",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3550s",
        "name": "Intel Core i5-3550S",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3570",
        "name": "Intel Core i5-3570",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3570k",
        "name": "Intel Core i5-3570K",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3570s",
        "name": "Intel Core i5-3570S",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i5-3570t",
        "name": "Intel Core i5-3570T",
        "price": 40,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i7-3770",
        "name": "Intel Core i7-3770",
        "price": 64,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i7-3770k",
        "name": "Intel Core i7-3770K",
        "price": 64,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i7-3770s",
        "name": "Intel Core i7-3770S",
        "price": 64,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-3-i7-3770t",
        "name": "Intel Core i7-3770T",
        "price": 64,
        "specs": "LGA1155, 3 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4130",
        "name": "Intel Core i3-4130",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4130t",
        "name": "Intel Core i3-4130T",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4150",
        "name": "Intel Core i3-4150",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4150t",
        "name": "Intel Core i3-4150T",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4160",
        "name": "Intel Core i3-4160",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4160t",
        "name": "Intel Core i3-4160T",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4170",
        "name": "Intel Core i3-4170",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4170t",
        "name": "Intel Core i3-4170T",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4330",
        "name": "Intel Core i3-4330",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4330t",
        "name": "Intel Core i3-4330T",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4340",
        "name": "Intel Core i3-4340",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4350",
        "name": "Intel Core i3-4350",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4360",
        "name": "Intel Core i3-4360",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i3-4370",
        "name": "Intel Core i3-4370",
        "price": 27,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4430",
        "name": "Intel Core i5-4430",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4430s",
        "name": "Intel Core i5-4430S",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4440",
        "name": "Intel Core i5-4440",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4440s",
        "name": "Intel Core i5-4440S",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4460",
        "name": "Intel Core i5-4460",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4460s",
        "name": "Intel Core i5-4460S",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4460t",
        "name": "Intel Core i5-4460T",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4570",
        "name": "Intel Core i5-4570",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4570s",
        "name": "Intel Core i5-4570S",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4570t",
        "name": "Intel Core i5-4570T",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4590",
        "name": "Intel Core i5-4590",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4590s",
        "name": "Intel Core i5-4590S",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4590t",
        "name": "Intel Core i5-4590T",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4670",
        "name": "Intel Core i5-4670",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4670k",
        "name": "Intel Core i5-4670K",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4670s",
        "name": "Intel Core i5-4670S",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4670t",
        "name": "Intel Core i5-4670T",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4690",
        "name": "Intel Core i5-4690",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4690k",
        "name": "Intel Core i5-4690K",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4690s",
        "name": "Intel Core i5-4690S",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i5-4690t",
        "name": "Intel Core i5-4690T",
        "price": 53,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4765t",
        "name": "Intel Core i7-4765T",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4770",
        "name": "Intel Core i7-4770",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4770k",
        "name": "Intel Core i7-4770K",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4770s",
        "name": "Intel Core i7-4770S",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4770t",
        "name": "Intel Core i7-4770T",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4771",
        "name": "Intel Core i7-4771",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4785t",
        "name": "Intel Core i7-4785T",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4790",
        "name": "Intel Core i7-4790",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4790k",
        "name": "Intel Core i7-4790K",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4790s",
        "name": "Intel Core i7-4790S",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-4-i7-4790t",
        "name": "Intel Core i7-4790T",
        "price": 85,
        "specs": "LGA1150, 4 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-intel-6-i3-6098p",
        "name": "Intel Core i3-6098P",
        "price": 40,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i3-6100",
        "name": "Intel Core i3-6100",
        "price": 40,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i3-6100t",
        "name": "Intel Core i3-6100T",
        "price": 40,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i3-6300",
        "name": "Intel Core i3-6300",
        "price": 40,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i3-6300t",
        "name": "Intel Core i3-6300T",
        "price": 40,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i3-6320",
        "name": "Intel Core i3-6320",
        "price": 40,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i5-6400",
        "name": "Intel Core i5-6400",
        "price": 80,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i5-6400t",
        "name": "Intel Core i5-6400T",
        "price": 80,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i5-6402p",
        "name": "Intel Core i5-6402P",
        "price": 80,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i5-6500",
        "name": "Intel Core i5-6500",
        "price": 80,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i5-6500t",
        "name": "Intel Core i5-6500T",
        "price": 80,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i5-6600",
        "name": "Intel Core i5-6600",
        "price": 80,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i5-6600k",
        "name": "Intel Core i5-6600K",
        "price": 80,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i5-6600t",
        "name": "Intel Core i5-6600T",
        "price": 80,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i7-6700",
        "name": "Intel Core i7-6700",
        "price": 128,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i7-6700k",
        "name": "Intel Core i7-6700K",
        "price": 128,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-6-i7-6700t",
        "name": "Intel Core i7-6700T",
        "price": 128,
        "specs": "LGA1151, 6 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i3-7100",
        "name": "Intel Core i3-7100",
        "price": 47,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i3-7100t",
        "name": "Intel Core i3-7100T",
        "price": 47,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i3-7300",
        "name": "Intel Core i3-7300",
        "price": 47,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i3-7300t",
        "name": "Intel Core i3-7300T",
        "price": 47,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i3-7320",
        "name": "Intel Core i3-7320",
        "price": 47,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i3-7350k",
        "name": "Intel Core i3-7350K",
        "price": 47,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i5-7400",
        "name": "Intel Core i5-7400",
        "price": 93,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i5-7400t",
        "name": "Intel Core i5-7400T",
        "price": 93,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i5-7500",
        "name": "Intel Core i5-7500",
        "price": 93,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i5-7500t",
        "name": "Intel Core i5-7500T",
        "price": 93,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i5-7600",
        "name": "Intel Core i5-7600",
        "price": 93,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i5-7600k",
        "name": "Intel Core i5-7600K",
        "price": 93,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i5-7600t",
        "name": "Intel Core i5-7600T",
        "price": 93,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i7-7700",
        "name": "Intel Core i7-7700",
        "price": 149,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i7-7700k",
        "name": "Intel Core i7-7700K",
        "price": 149,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-7-i7-7700t",
        "name": "Intel Core i7-7700T",
        "price": 149,
        "specs": "LGA1151, 7 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i3-8100",
        "name": "Intel Core i3-8100",
        "price": 53,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i3-8100t",
        "name": "Intel Core i3-8100T",
        "price": 53,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i3-8300",
        "name": "Intel Core i3-8300",
        "price": 53,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i3-8300t",
        "name": "Intel Core i3-8300T",
        "price": 53,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i3-8350k",
        "name": "Intel Core i3-8350K",
        "price": 53,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i5-8400",
        "name": "Intel Core i5-8400",
        "price": 107,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i5-8400t",
        "name": "Intel Core i5-8400T",
        "price": 107,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i5-8500",
        "name": "Intel Core i5-8500",
        "price": 107,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i5-8500t",
        "name": "Intel Core i5-8500T",
        "price": 107,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i5-8600",
        "name": "Intel Core i5-8600",
        "price": 107,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i5-8600k",
        "name": "Intel Core i5-8600K",
        "price": 107,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i5-8600t",
        "name": "Intel Core i5-8600T",
        "price": 107,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i7-8700",
        "name": "Intel Core i7-8700",
        "price": 171,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i7-8700k",
        "name": "Intel Core i7-8700K",
        "price": 171,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-8-i7-8700t",
        "name": "Intel Core i7-8700T",
        "price": 171,
        "specs": "LGA1151, 8 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i3-9100",
        "name": "Intel Core i3-9100",
        "price": 60,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i3-9100f",
        "name": "Intel Core i3-9100F",
        "price": 60,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i3-9100t",
        "name": "Intel Core i3-9100T",
        "price": 60,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i3-9300",
        "name": "Intel Core i3-9300",
        "price": 60,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i3-9300t",
        "name": "Intel Core i3-9300T",
        "price": 60,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i3-9320",
        "name": "Intel Core i3-9320",
        "price": 60,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i3-9350k",
        "name": "Intel Core i3-9350K",
        "price": 60,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i3-9350kf",
        "name": "Intel Core i3-9350KF",
        "price": 60,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9400",
        "name": "Intel Core i5-9400",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9400f",
        "name": "Intel Core i5-9400F",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9400t",
        "name": "Intel Core i5-9400T",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9500",
        "name": "Intel Core i5-9500",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9500f",
        "name": "Intel Core i5-9500F",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9500t",
        "name": "Intel Core i5-9500T",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9600",
        "name": "Intel Core i5-9600",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9600k",
        "name": "Intel Core i5-9600K",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9600kf",
        "name": "Intel Core i5-9600KF",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i5-9600t",
        "name": "Intel Core i5-9600T",
        "price": 120,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i7-9700",
        "name": "Intel Core i7-9700",
        "price": 192,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i7-9700f",
        "name": "Intel Core i7-9700F",
        "price": 192,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i7-9700k",
        "name": "Intel Core i7-9700K",
        "price": 192,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i7-9700kf",
        "name": "Intel Core i7-9700KF",
        "price": 192,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i7-9700t",
        "name": "Intel Core i7-9700T",
        "price": 192,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i9-9900",
        "name": "Intel Core i9-9900",
        "price": 300,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i9-9900k",
        "name": "Intel Core i9-9900K",
        "price": 300,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i9-9900kf",
        "name": "Intel Core i9-9900KF",
        "price": 300,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i9-9900ks",
        "name": "Intel Core i9-9900KS",
        "price": 300,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-9-i9-9900t",
        "name": "Intel Core i9-9900T",
        "price": 300,
        "specs": "LGA1151, 9 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10100",
        "name": "Intel Core i3-10100",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10100f",
        "name": "Intel Core i3-10100F",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10100t",
        "name": "Intel Core i3-10100T",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10105",
        "name": "Intel Core i3-10105",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10105f",
        "name": "Intel Core i3-10105F",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10105t",
        "name": "Intel Core i3-10105T",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10300",
        "name": "Intel Core i3-10300",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10300t",
        "name": "Intel Core i3-10300T",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i3-10320",
        "name": "Intel Core i3-10320",
        "price": 67,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10400",
        "name": "Intel Core i5-10400",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10400f",
        "name": "Intel Core i5-10400F",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10400t",
        "name": "Intel Core i5-10400T",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10500",
        "name": "Intel Core i5-10500",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10500t",
        "name": "Intel Core i5-10500T",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10600",
        "name": "Intel Core i5-10600",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10600k",
        "name": "Intel Core i5-10600K",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10600kf",
        "name": "Intel Core i5-10600KF",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i5-10600t",
        "name": "Intel Core i5-10600T",
        "price": 133,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i7-10700",
        "name": "Intel Core i7-10700",
        "price": 213,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i7-10700f",
        "name": "Intel Core i7-10700F",
        "price": 213,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i7-10700k",
        "name": "Intel Core i7-10700K",
        "price": 213,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i7-10700kf",
        "name": "Intel Core i7-10700KF",
        "price": 213,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i7-10700t",
        "name": "Intel Core i7-10700T",
        "price": 213,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i9-10850k",
        "name": "Intel Core i9-10850K",
        "price": 333,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i9-10900",
        "name": "Intel Core i9-10900",
        "price": 333,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i9-10900f",
        "name": "Intel Core i9-10900F",
        "price": 333,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i9-10900k",
        "name": "Intel Core i9-10900K",
        "price": 333,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i9-10900kf",
        "name": "Intel Core i9-10900KF",
        "price": 333,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-10-i9-10900t",
        "name": "Intel Core i9-10900T",
        "price": 333,
        "specs": "LGA1200, 10 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11400",
        "name": "Intel Core i5-11400",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11400f",
        "name": "Intel Core i5-11400F",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11400t",
        "name": "Intel Core i5-11400T",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11500",
        "name": "Intel Core i5-11500",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11500t",
        "name": "Intel Core i5-11500T",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11600",
        "name": "Intel Core i5-11600",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11600k",
        "name": "Intel Core i5-11600K",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11600kf",
        "name": "Intel Core i5-11600KF",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i5-11600t",
        "name": "Intel Core i5-11600T",
        "price": 147,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i7-11700",
        "name": "Intel Core i7-11700",
        "price": 235,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i7-11700f",
        "name": "Intel Core i7-11700F",
        "price": 235,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i7-11700k",
        "name": "Intel Core i7-11700K",
        "price": 235,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i7-11700kf",
        "name": "Intel Core i7-11700KF",
        "price": 235,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i7-11700t",
        "name": "Intel Core i7-11700T",
        "price": 235,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i9-11900",
        "name": "Intel Core i9-11900",
        "price": 367,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i9-11900f",
        "name": "Intel Core i9-11900F",
        "price": 367,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i9-11900k",
        "name": "Intel Core i9-11900K",
        "price": 367,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i9-11900kf",
        "name": "Intel Core i9-11900KF",
        "price": 367,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-11-i9-11900t",
        "name": "Intel Core i9-11900T",
        "price": 367,
        "specs": "LGA1200, 11 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-intel-12-i3-12100",
        "name": "Intel Core i3-12100",
        "price": 80,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i3-12100f",
        "name": "Intel Core i3-12100F",
        "price": 80,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i3-12100t",
        "name": "Intel Core i3-12100T",
        "price": 80,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i3-12300",
        "name": "Intel Core i3-12300",
        "price": 80,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i3-12300t",
        "name": "Intel Core i3-12300T",
        "price": 80,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12400",
        "name": "Intel Core i5-12400",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12400f",
        "name": "Intel Core i5-12400F",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12400t",
        "name": "Intel Core i5-12400T",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12500",
        "name": "Intel Core i5-12500",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12500t",
        "name": "Intel Core i5-12500T",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12600",
        "name": "Intel Core i5-12600",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12600k",
        "name": "Intel Core i5-12600K",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12600kf",
        "name": "Intel Core i5-12600KF",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i5-12600t",
        "name": "Intel Core i5-12600T",
        "price": 160,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i7-12700",
        "name": "Intel Core i7-12700",
        "price": 256,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i7-12700f",
        "name": "Intel Core i7-12700F",
        "price": 256,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i7-12700k",
        "name": "Intel Core i7-12700K",
        "price": 256,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i7-12700kf",
        "name": "Intel Core i7-12700KF",
        "price": 256,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i7-12700t",
        "name": "Intel Core i7-12700T",
        "price": 256,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i9-12900",
        "name": "Intel Core i9-12900",
        "price": 400,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i9-12900f",
        "name": "Intel Core i9-12900F",
        "price": 400,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i9-12900k",
        "name": "Intel Core i9-12900K",
        "price": 400,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i9-12900kf",
        "name": "Intel Core i9-12900KF",
        "price": 400,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i9-12900ks",
        "name": "Intel Core i9-12900KS",
        "price": 400,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-12-i9-12900t",
        "name": "Intel Core i9-12900T",
        "price": 400,
        "specs": "LGA1700, 12 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i3-13100",
        "name": "Intel Core i3-13100",
        "price": 87,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i3-13100f",
        "name": "Intel Core i3-13100F",
        "price": 87,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i3-13100t",
        "name": "Intel Core i3-13100T",
        "price": 87,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13400",
        "name": "Intel Core i5-13400",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13400f",
        "name": "Intel Core i5-13400F",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13400t",
        "name": "Intel Core i5-13400T",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13500",
        "name": "Intel Core i5-13500",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13500t",
        "name": "Intel Core i5-13500T",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13600",
        "name": "Intel Core i5-13600",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13600k",
        "name": "Intel Core i5-13600K",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13600kf",
        "name": "Intel Core i5-13600KF",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i5-13600t",
        "name": "Intel Core i5-13600T",
        "price": 173,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i7-13700",
        "name": "Intel Core i7-13700",
        "price": 277,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i7-13700f",
        "name": "Intel Core i7-13700F",
        "price": 277,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i7-13700k",
        "name": "Intel Core i7-13700K",
        "price": 277,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i7-13700kf",
        "name": "Intel Core i7-13700KF",
        "price": 277,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i7-13700t",
        "name": "Intel Core i7-13700T",
        "price": 277,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i9-13900",
        "name": "Intel Core i9-13900",
        "price": 433,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i9-13900f",
        "name": "Intel Core i9-13900F",
        "price": 433,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i9-13900k",
        "name": "Intel Core i9-13900K",
        "price": 433,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i9-13900kf",
        "name": "Intel Core i9-13900KF",
        "price": 433,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i9-13900ks",
        "name": "Intel Core i9-13900KS",
        "price": 433,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-13-i9-13900t",
        "name": "Intel Core i9-13900T",
        "price": 433,
        "specs": "LGA1700, 13 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i3-14100",
        "name": "Intel Core i3-14100",
        "price": 93,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i3-14100f",
        "name": "Intel Core i3-14100F",
        "price": 93,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i3-14100t",
        "name": "Intel Core i3-14100T",
        "price": 93,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14400",
        "name": "Intel Core i5-14400",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14400f",
        "name": "Intel Core i5-14400F",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14400t",
        "name": "Intel Core i5-14400T",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14500",
        "name": "Intel Core i5-14500",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14500t",
        "name": "Intel Core i5-14500T",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14600",
        "name": "Intel Core i5-14600",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14600k",
        "name": "Intel Core i5-14600K",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14600kf",
        "name": "Intel Core i5-14600KF",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i5-14600t",
        "name": "Intel Core i5-14600T",
        "price": 187,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i7-14700",
        "name": "Intel Core i7-14700",
        "price": 299,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i7-14700f",
        "name": "Intel Core i7-14700F",
        "price": 299,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i7-14700k",
        "name": "Intel Core i7-14700K",
        "price": 299,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i7-14700kf",
        "name": "Intel Core i7-14700KF",
        "price": 299,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i7-14700t",
        "name": "Intel Core i7-14700T",
        "price": 299,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i9-14900",
        "name": "Intel Core i9-14900",
        "price": 467,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i9-14900f",
        "name": "Intel Core i9-14900F",
        "price": 467,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i9-14900k",
        "name": "Intel Core i9-14900K",
        "price": 467,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i9-14900kf",
        "name": "Intel Core i9-14900KF",
        "price": 467,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i9-14900ks",
        "name": "Intel Core i9-14900KS",
        "price": 467,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-14-i9-14900t",
        "name": "Intel Core i9-14900T",
        "price": 467,
        "specs": "LGA1700, 14 Gen/Series",
        "wattage": 35,
        "brand": "Intel",
        "socket": "LGA1700",
        "supportedMemory": "DDR4/DDR5"
    },
    {
        "id": "cpu-intel-Ultra-5-245k",
        "name": "Intel Core Ultra 5-245K",
        "price": 200,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-5-245kf",
        "name": "Intel Core Ultra 5-245KF",
        "price": 200,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-5-235",
        "name": "Intel Core Ultra 5-235",
        "price": 200,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-5-225",
        "name": "Intel Core Ultra 5-225",
        "price": 200,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-5-225f",
        "name": "Intel Core Ultra 5-225F",
        "price": 200,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-7-265k",
        "name": "Intel Core Ultra 7-265K",
        "price": 320,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-7-265kf",
        "name": "Intel Core Ultra 7-265KF",
        "price": 320,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-7-255",
        "name": "Intel Core Ultra 7-255",
        "price": 320,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-7-255f",
        "name": "Intel Core Ultra 7-255F",
        "price": 320,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 65,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-intel-Ultra-9-285k",
        "name": "Intel Core Ultra 9-285K",
        "price": 500,
        "specs": "LGA1851, Ultra Gen/Series",
        "wattage": 125,
        "brand": "Intel",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM3+-4100",
        "name": "AMD FX 4 4100",
        "price": 18,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-4130",
        "name": "AMD FX 4 4130",
        "price": 18,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-4300",
        "name": "AMD FX 4 4300",
        "price": 18,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-4350",
        "name": "AMD FX 4 4350",
        "price": 18,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-6100",
        "name": "AMD FX 6 6100",
        "price": 30,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-6200",
        "name": "AMD FX 6 6200",
        "price": 30,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-6300",
        "name": "AMD FX 6 6300",
        "price": 30,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-6350",
        "name": "AMD FX 6 6350",
        "price": 30,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-8120",
        "name": "AMD FX 8 8120",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-8150",
        "name": "AMD FX 8 8150",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-8300",
        "name": "AMD FX 8 8300",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-8320",
        "name": "AMD FX 8 8320",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-8320e",
        "name": "AMD FX 8 8320E",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-8350",
        "name": "AMD FX 8 8350",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-8370",
        "name": "AMD FX 8 8370",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-8370e",
        "name": "AMD FX 8 8370E",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-9370",
        "name": "AMD FX 8 9370",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM3+-9590",
        "name": "AMD FX 8 9590",
        "price": 45,
        "specs": "AM3+ Socket",
        "wattage": 220,
        "brand": "AMD",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "cpu-amd-AM4-1200",
        "name": "AMD Ryzen 3 1200",
        "price": 30,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-1300x",
        "name": "AMD Ryzen 3 1300X",
        "price": 30,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-2200g",
        "name": "AMD Ryzen 3 2200G",
        "price": 42,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3100",
        "name": "AMD Ryzen 3 3100",
        "price": 60,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3200g",
        "name": "AMD Ryzen 3 3200G",
        "price": 60,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3300x",
        "name": "AMD Ryzen 3 3300X",
        "price": 60,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-4100",
        "name": "AMD Ryzen 3 4100",
        "price": 120,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-4300g",
        "name": "AMD Ryzen 3 4300G",
        "price": 120,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5300g",
        "name": "AMD Ryzen 3 5300G",
        "price": 90,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-1400",
        "name": "AMD Ryzen 5 1400",
        "price": 50,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-1500x",
        "name": "AMD Ryzen 5 1500X",
        "price": 50,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-1600",
        "name": "AMD Ryzen 5 1600",
        "price": 50,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-1600af",
        "name": "AMD Ryzen 5 1600AF",
        "price": 50,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-2400g",
        "name": "AMD Ryzen 5 2400G",
        "price": 70,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-2600",
        "name": "AMD Ryzen 5 2600",
        "price": 70,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-2600x",
        "name": "AMD Ryzen 5 2600X",
        "price": 70,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3400g",
        "name": "AMD Ryzen 5 3400G",
        "price": 100,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3600",
        "name": "AMD Ryzen 5 3600",
        "price": 100,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3600x",
        "name": "AMD Ryzen 5 3600X",
        "price": 100,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3600xt",
        "name": "AMD Ryzen 5 3600XT",
        "price": 100,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-4500",
        "name": "AMD Ryzen 5 4500",
        "price": 200,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-4600g",
        "name": "AMD Ryzen 5 4600G",
        "price": 200,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5500",
        "name": "AMD Ryzen 5 5500",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5600",
        "name": "AMD Ryzen 5 5600",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5600g",
        "name": "AMD Ryzen 5 5600G",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5600gt",
        "name": "AMD Ryzen 5 5600GT",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5600x",
        "name": "AMD Ryzen 5 5600X",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5600x3d",
        "name": "AMD Ryzen 5 5600X3D",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-1700",
        "name": "AMD Ryzen 7 1700",
        "price": 75,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-1700x",
        "name": "AMD Ryzen 7 1700X",
        "price": 75,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-1800x",
        "name": "AMD Ryzen 7 1800X",
        "price": 75,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-2700",
        "name": "AMD Ryzen 7 2700",
        "price": 105,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-2700x",
        "name": "AMD Ryzen 7 2700X",
        "price": 105,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3700x",
        "name": "AMD Ryzen 7 3700X",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3800x",
        "name": "AMD Ryzen 7 3800X",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3800xt",
        "name": "AMD Ryzen 7 3800XT",
        "price": 150,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-4700g",
        "name": "AMD Ryzen 7 4700G",
        "price": 300,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5700",
        "name": "AMD Ryzen 7 5700",
        "price": 225,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5700g",
        "name": "AMD Ryzen 7 5700G",
        "price": 225,
        "specs": "AM4 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5700x",
        "name": "AMD Ryzen 7 5700X",
        "price": 225,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5700x3d",
        "name": "AMD Ryzen 7 5700X3D",
        "price": 225,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5800x",
        "name": "AMD Ryzen 7 5800X",
        "price": 225,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5800x3d",
        "name": "AMD Ryzen 7 5800X3D",
        "price": 225,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3900x",
        "name": "AMD Ryzen 9 3900X",
        "price": 250,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3900xt",
        "name": "AMD Ryzen 9 3900XT",
        "price": 250,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-3950x",
        "name": "AMD Ryzen 9 3950X",
        "price": 250,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5900x",
        "name": "AMD Ryzen 9 5900X",
        "price": 375,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM4-5950x",
        "name": "AMD Ryzen 9 5950X",
        "price": 375,
        "specs": "AM4 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "cpu-amd-AM5-7500f",
        "name": "AMD Ryzen 5 7500F",
        "price": 200,
        "specs": "AM5 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7600",
        "name": "AMD Ryzen 5 7600",
        "price": 200,
        "specs": "AM5 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7600x",
        "name": "AMD Ryzen 5 7600X",
        "price": 200,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-8500g",
        "name": "AMD Ryzen 5 8500G",
        "price": 200,
        "specs": "AM5 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-8600g",
        "name": "AMD Ryzen 5 8600G",
        "price": 200,
        "specs": "AM5 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-9600x",
        "name": "AMD Ryzen 5 9600X",
        "price": 200,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7700",
        "name": "AMD Ryzen 7 7700",
        "price": 300,
        "specs": "AM5 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7700x",
        "name": "AMD Ryzen 7 7700X",
        "price": 300,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7800x3d",
        "name": "AMD Ryzen 7 7800X3D",
        "price": 300,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-8700f",
        "name": "AMD Ryzen 7 8700F",
        "price": 300,
        "specs": "AM5 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-8700g",
        "name": "AMD Ryzen 7 8700G",
        "price": 300,
        "specs": "AM5 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-9700x",
        "name": "AMD Ryzen 7 9700X",
        "price": 300,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-9800x3d",
        "name": "AMD Ryzen 7 9800X3D",
        "price": 300,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7900",
        "name": "AMD Ryzen 9 7900",
        "price": 500,
        "specs": "AM5 Socket",
        "wattage": 65,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7900x",
        "name": "AMD Ryzen 9 7900X",
        "price": 500,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7900x3d",
        "name": "AMD Ryzen 9 7900X3D",
        "price": 500,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7950x",
        "name": "AMD Ryzen 9 7950X",
        "price": 500,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-7950x3d",
        "name": "AMD Ryzen 9 7950X3D",
        "price": 500,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-9900x",
        "name": "AMD Ryzen 9 9900X",
        "price": 500,
        "specs": "AM5 Socket",
        "wattage": 105,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "cpu-amd-AM5-9950x",
        "name": "AMD Ryzen 9 9950X",
        "price": 500,
        "specs": "AM5 Socket",
        "wattage": 170,
        "brand": "AMD",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    }
],
  gpu: [
    {
        "id": "gpu-nv-710",
        "name": "NVIDIA GeForce GT 710",
        "price": 300,
        "specs": "GT 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-720",
        "name": "NVIDIA GeForce GT 720",
        "price": 300,
        "specs": "GT 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-730",
        "name": "NVIDIA GeForce GT 730",
        "price": 300,
        "specs": "GT 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-740",
        "name": "NVIDIA GeForce GT 740",
        "price": 300,
        "specs": "GT 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-750",
        "name": "NVIDIA GeForce GTX 750",
        "price": 150,
        "specs": "GTX 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-750 ti",
        "name": "NVIDIA GeForce GTX 750 Ti",
        "price": 180,
        "specs": "GTX 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-760",
        "name": "NVIDIA GeForce GTX 760",
        "price": 250,
        "specs": "GTX 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-770",
        "name": "NVIDIA GeForce GTX 770",
        "price": 400,
        "specs": "GTX 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-780",
        "name": "NVIDIA GeForce GTX 780",
        "price": 700,
        "specs": "GTX 700 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-780 ti",
        "name": "NVIDIA GeForce GTX 780 Ti",
        "price": 840,
        "specs": "GTX 700 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-titan",
        "name": "NVIDIA GeForce GTX Titan",
        "price": 360,
        "specs": "GTX 700 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-950",
        "name": "NVIDIA GeForce GTX 950",
        "price": 150,
        "specs": "GTX 900 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-960",
        "name": "NVIDIA GeForce GTX 960",
        "price": 250,
        "specs": "GTX 900 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-970",
        "name": "NVIDIA GeForce GTX 970",
        "price": 400,
        "specs": "GTX 900 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-980",
        "name": "NVIDIA GeForce GTX 980",
        "price": 700,
        "specs": "GTX 900 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-980 ti",
        "name": "NVIDIA GeForce GTX 980 Ti",
        "price": 840,
        "specs": "GTX 900 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-titan x",
        "name": "NVIDIA GeForce GTX Titan X",
        "price": 360,
        "specs": "GTX 900 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1030 (gt)",
        "name": "NVIDIA GeForce GT 1030",
        "price": 300,
        "specs": "GTX 10 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1050",
        "name": "NVIDIA GeForce GTX 1050",
        "price": 150,
        "specs": "GTX 10 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1050 ti",
        "name": "NVIDIA GeForce GTX 1050 Ti",
        "price": 180,
        "specs": "GTX 10 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1060 3gb",
        "name": "NVIDIA GeForce GTX 1060 3GB",
        "price": 250,
        "specs": "GTX 10 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1060 6gb",
        "name": "NVIDIA GeForce GTX 1060 6GB",
        "price": 250,
        "specs": "GTX 10 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1070",
        "name": "NVIDIA GeForce GTX 1070",
        "price": 400,
        "specs": "GTX 10 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1070 ti",
        "name": "NVIDIA GeForce GTX 1070 Ti",
        "price": 480,
        "specs": "GTX 10 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1080",
        "name": "NVIDIA GeForce GTX 1080",
        "price": 700,
        "specs": "GTX 10 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1080 ti",
        "name": "NVIDIA GeForce GTX 1080 Ti",
        "price": 840,
        "specs": "GTX 10 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-titan xp",
        "name": "NVIDIA GeForce GTX Titan Xp",
        "price": 360,
        "specs": "GTX 10 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1630",
        "name": "NVIDIA GeForce GTX 1630",
        "price": 300,
        "specs": "GTX 16 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1650",
        "name": "NVIDIA GeForce GTX 1650",
        "price": 150,
        "specs": "GTX 16 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1650 super",
        "name": "NVIDIA GeForce GTX 1650 Super",
        "price": 180,
        "specs": "GTX 16 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1660",
        "name": "NVIDIA GeForce GTX 1660",
        "price": 250,
        "specs": "GTX 16 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1660 super",
        "name": "NVIDIA GeForce GTX 1660 Super",
        "price": 300,
        "specs": "GTX 16 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-1660 ti",
        "name": "NVIDIA GeForce GTX 1660 Ti",
        "price": 300,
        "specs": "GTX 16 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-2060",
        "name": "NVIDIA GeForce RTX 2060",
        "price": 250,
        "specs": "RTX 20 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-2060 super",
        "name": "NVIDIA GeForce RTX 2060 Super",
        "price": 300,
        "specs": "RTX 20 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-2060 12gb",
        "name": "NVIDIA GeForce RTX 2060 12GB",
        "price": 250,
        "specs": "RTX 20 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-2070",
        "name": "NVIDIA GeForce RTX 2070",
        "price": 400,
        "specs": "RTX 20 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-2070 super",
        "name": "NVIDIA GeForce RTX 2070 Super",
        "price": 480,
        "specs": "RTX 20 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-2080",
        "name": "NVIDIA GeForce RTX 2080",
        "price": 700,
        "specs": "RTX 20 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-2080 super",
        "name": "NVIDIA GeForce RTX 2080 Super",
        "price": 840,
        "specs": "RTX 20 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-2080 ti",
        "name": "NVIDIA GeForce RTX 2080 Ti",
        "price": 840,
        "specs": "RTX 20 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-titan rtx",
        "name": "NVIDIA GeForce RTX Titan RTX",
        "price": 360,
        "specs": "RTX 20 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3050 6gb",
        "name": "NVIDIA GeForce RTX 3050 6GB",
        "price": 150,
        "specs": "RTX 30 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3050 8gb",
        "name": "NVIDIA GeForce RTX 3050 8GB",
        "price": 150,
        "specs": "RTX 30 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3060 8gb",
        "name": "NVIDIA GeForce RTX 3060 8GB",
        "price": 250,
        "specs": "RTX 30 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3060 12gb",
        "name": "NVIDIA GeForce RTX 3060 12GB",
        "price": 250,
        "specs": "RTX 30 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3060 ti",
        "name": "NVIDIA GeForce RTX 3060 Ti",
        "price": 300,
        "specs": "RTX 30 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3070",
        "name": "NVIDIA GeForce RTX 3070",
        "price": 400,
        "specs": "RTX 30 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3070 ti",
        "name": "NVIDIA GeForce RTX 3070 Ti",
        "price": 480,
        "specs": "RTX 30 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3080 10gb",
        "name": "NVIDIA GeForce RTX 3080 10GB",
        "price": 700,
        "specs": "RTX 30 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3080 12gb",
        "name": "NVIDIA GeForce RTX 3080 12GB",
        "price": 700,
        "specs": "RTX 30 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3080 ti",
        "name": "NVIDIA GeForce RTX 3080 Ti",
        "price": 840,
        "specs": "RTX 30 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3090",
        "name": "NVIDIA GeForce RTX 3090",
        "price": 1200,
        "specs": "RTX 30 Series",
        "wattage": 450,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-3090 ti",
        "name": "NVIDIA GeForce RTX 3090 Ti",
        "price": 1440,
        "specs": "RTX 30 Series",
        "wattage": 450,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4060",
        "name": "NVIDIA GeForce RTX 4060",
        "price": 250,
        "specs": "RTX 40 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4060 ti 8gb",
        "name": "NVIDIA GeForce RTX 4060 Ti 8GB",
        "price": 300,
        "specs": "RTX 40 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4060 ti 16gb",
        "name": "NVIDIA GeForce RTX 4060 Ti 16GB",
        "price": 300,
        "specs": "RTX 40 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4070",
        "name": "NVIDIA GeForce RTX 4070",
        "price": 400,
        "specs": "RTX 40 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4070 super",
        "name": "NVIDIA GeForce RTX 4070 Super",
        "price": 480,
        "specs": "RTX 40 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4070 ti",
        "name": "NVIDIA GeForce RTX 4070 Ti",
        "price": 480,
        "specs": "RTX 40 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4070 ti super",
        "name": "NVIDIA GeForce RTX 4070 Ti Super",
        "price": 480,
        "specs": "RTX 40 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4080",
        "name": "NVIDIA GeForce RTX 4080",
        "price": 700,
        "specs": "RTX 40 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4080 super",
        "name": "NVIDIA GeForce RTX 4080 Super",
        "price": 840,
        "specs": "RTX 40 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4090",
        "name": "NVIDIA GeForce RTX 4090",
        "price": 1200,
        "specs": "RTX 40 Series",
        "wattage": 450,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-4090 d",
        "name": "NVIDIA GeForce RTX 4090 D",
        "price": 1200,
        "specs": "RTX 40 Series",
        "wattage": 450,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-5060",
        "name": "NVIDIA GeForce RTX 5060",
        "price": 325,
        "specs": "RTX 50 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-5060 ti",
        "name": "NVIDIA GeForce RTX 5060 Ti",
        "price": 390,
        "specs": "RTX 50 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-5070",
        "name": "NVIDIA GeForce RTX 5070",
        "price": 520,
        "specs": "RTX 50 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-5070 ti",
        "name": "NVIDIA GeForce RTX 5070 Ti",
        "price": 624,
        "specs": "RTX 50 Series",
        "wattage": 150,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-5080",
        "name": "NVIDIA GeForce RTX 5080",
        "price": 910,
        "specs": "RTX 50 Series",
        "wattage": 300,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-nv-5090",
        "name": "NVIDIA GeForce RTX 5090",
        "price": 1560,
        "specs": "RTX 50 Series",
        "wattage": 450,
        "brand": "NVIDIA"
    },
    {
        "id": "gpu-amd-460",
        "name": "AMD Radeon RX 460",
        "price": 250,
        "specs": "RX 400 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-470",
        "name": "AMD Radeon RX 470",
        "price": 250,
        "specs": "RX 400 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-480",
        "name": "AMD Radeon RX 480",
        "price": 250,
        "specs": "RX 400 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-550",
        "name": "AMD Radeon RX 550",
        "price": 250,
        "specs": "RX 500 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-560",
        "name": "AMD Radeon RX 560",
        "price": 250,
        "specs": "RX 500 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-570",
        "name": "AMD Radeon RX 570",
        "price": 250,
        "specs": "RX 500 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-580",
        "name": "AMD Radeon RX 580",
        "price": 250,
        "specs": "RX 500 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-590",
        "name": "AMD Radeon RX 590",
        "price": 250,
        "specs": "RX 500 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-5500 xt",
        "name": "AMD Radeon RX 5500 XT",
        "price": 230,
        "specs": "RX 5000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-5600 xt",
        "name": "AMD Radeon RX 5600 XT",
        "price": 230,
        "specs": "RX 5000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-5700",
        "name": "AMD Radeon RX 5700",
        "price": 350,
        "specs": "RX 5000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-5700 xt",
        "name": "AMD Radeon RX 5700 XT",
        "price": 402,
        "specs": "RX 5000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6400",
        "name": "AMD Radeon RX 6400",
        "price": 200,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6500 xt",
        "name": "AMD Radeon RX 6500 XT",
        "price": 230,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6600",
        "name": "AMD Radeon RX 6600",
        "price": 200,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6600 xt",
        "name": "AMD Radeon RX 6600 XT",
        "price": 230,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6650 xt",
        "name": "AMD Radeon RX 6650 XT",
        "price": 288,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6700",
        "name": "AMD Radeon RX 6700",
        "price": 350,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6700 xt",
        "name": "AMD Radeon RX 6700 XT",
        "price": 402,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6750 xt",
        "name": "AMD Radeon RX 6750 XT",
        "price": 288,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6800",
        "name": "AMD Radeon RX 6800",
        "price": 500,
        "specs": "RX 6000 Series",
        "wattage": 280,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6800 xt",
        "name": "AMD Radeon RX 6800 XT",
        "price": 575,
        "specs": "RX 6000 Series",
        "wattage": 280,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6900 xt",
        "name": "AMD Radeon RX 6900 XT",
        "price": 920,
        "specs": "RX 6000 Series",
        "wattage": 280,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-6950 xt",
        "name": "AMD Radeon RX 6950 XT",
        "price": 288,
        "specs": "RX 6000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-7600",
        "name": "AMD Radeon RX 7600",
        "price": 200,
        "specs": "RX 7000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-7600 xt",
        "name": "AMD Radeon RX 7600 XT",
        "price": 230,
        "specs": "RX 7000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-7700 xt",
        "name": "AMD Radeon RX 7700 XT",
        "price": 402,
        "specs": "RX 7000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-7800 xt",
        "name": "AMD Radeon RX 7800 XT",
        "price": 575,
        "specs": "RX 7000 Series",
        "wattage": 280,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-7900 gre",
        "name": "AMD Radeon RX 7900 GRE",
        "price": 800,
        "specs": "RX 7000 Series",
        "wattage": 280,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-7900 xt",
        "name": "AMD Radeon RX 7900 XT",
        "price": 920,
        "specs": "RX 7000 Series",
        "wattage": 280,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-7900 xtx",
        "name": "AMD Radeon RX 7900 XTX",
        "price": 920,
        "specs": "RX 7000 Series",
        "wattage": 280,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-9070",
        "name": "AMD Radeon RX 9070",
        "price": 250,
        "specs": "RX 9000 Series",
        "wattage": 150,
        "brand": "AMD"
    },
    {
        "id": "gpu-amd-9070 xt",
        "name": "AMD Radeon RX 9070 XT",
        "price": 288,
        "specs": "RX 9000 Series",
        "wattage": 150,
        "brand": "AMD"
    }
],
  motherboard: [
    {
        "id": "mobo-asus-h61",
        "name": "ASUS H61 Pro",
        "price": 100,
        "specs": "LGA1155 Socket",
        "brand": "ASUS",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-h61",
        "name": "MSI H61 Pro",
        "price": 100,
        "specs": "LGA1155 Socket",
        "brand": "MSI",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-h61",
        "name": "Gigabyte H61 Pro",
        "price": 100,
        "specs": "LGA1155 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-h61",
        "name": "ASRock H61 Pro",
        "price": 100,
        "specs": "LGA1155 Socket",
        "brand": "ASRock",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-b75",
        "name": "ASUS B75 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1155 Socket",
        "brand": "ASUS",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-b75",
        "name": "MSI B75 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1155 Socket",
        "brand": "MSI",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-b75",
        "name": "Gigabyte B75 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1155 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-b75",
        "name": "ASRock B75 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1155 Socket",
        "brand": "ASRock",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-z77",
        "name": "ASUS Z77 Gaming WiFi",
        "price": 250,
        "specs": "LGA1155 Socket",
        "brand": "ASUS",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-z77",
        "name": "MSI Z77 Gaming WiFi",
        "price": 250,
        "specs": "LGA1155 Socket",
        "brand": "MSI",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-z77",
        "name": "Gigabyte Z77 Gaming WiFi",
        "price": 250,
        "specs": "LGA1155 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-z77",
        "name": "ASRock Z77 Gaming WiFi",
        "price": 250,
        "specs": "LGA1155 Socket",
        "brand": "ASRock",
        "socket": "LGA1155",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-h81",
        "name": "ASUS H81 Pro",
        "price": 100,
        "specs": "LGA1150 Socket",
        "brand": "ASUS",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-h81",
        "name": "MSI H81 Pro",
        "price": 100,
        "specs": "LGA1150 Socket",
        "brand": "MSI",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-h81",
        "name": "Gigabyte H81 Pro",
        "price": 100,
        "specs": "LGA1150 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-h81",
        "name": "ASRock H81 Pro",
        "price": 100,
        "specs": "LGA1150 Socket",
        "brand": "ASRock",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-b85",
        "name": "ASUS B85 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1150 Socket",
        "brand": "ASUS",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-b85",
        "name": "MSI B85 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1150 Socket",
        "brand": "MSI",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-b85",
        "name": "Gigabyte B85 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1150 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-b85",
        "name": "ASRock B85 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1150 Socket",
        "brand": "ASRock",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-z97",
        "name": "ASUS Z97 Gaming WiFi",
        "price": 250,
        "specs": "LGA1150 Socket",
        "brand": "ASUS",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-z97",
        "name": "MSI Z97 Gaming WiFi",
        "price": 250,
        "specs": "LGA1150 Socket",
        "brand": "MSI",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-z97",
        "name": "Gigabyte Z97 Gaming WiFi",
        "price": 250,
        "specs": "LGA1150 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-z97",
        "name": "ASRock Z97 Gaming WiFi",
        "price": 250,
        "specs": "LGA1150 Socket",
        "brand": "ASRock",
        "socket": "LGA1150",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-h110",
        "name": "ASUS H110 Pro",
        "price": 100,
        "specs": "LGA1151 Socket",
        "brand": "ASUS",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-h110",
        "name": "MSI H110 Pro",
        "price": 100,
        "specs": "LGA1151 Socket",
        "brand": "MSI",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-h110",
        "name": "Gigabyte H110 Pro",
        "price": 100,
        "specs": "LGA1151 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-h110",
        "name": "ASRock H110 Pro",
        "price": 100,
        "specs": "LGA1151 Socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b150",
        "name": "ASUS B150 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "ASUS",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b150",
        "name": "MSI B150 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "MSI",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b150",
        "name": "Gigabyte B150 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b150",
        "name": "ASRock B150 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-z170",
        "name": "ASUS Z170 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "ASUS",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-z170",
        "name": "MSI Z170 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "MSI",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-z170",
        "name": "Gigabyte Z170 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-z170",
        "name": "ASRock Z170 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b250",
        "name": "ASUS B250 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "ASUS",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b250",
        "name": "MSI B250 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "MSI",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b250",
        "name": "Gigabyte B250 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b250",
        "name": "ASRock B250 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-z270",
        "name": "ASUS Z270 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "ASUS",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-z270",
        "name": "MSI Z270 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "MSI",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-z270",
        "name": "Gigabyte Z270 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-z270",
        "name": "ASRock Z270 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-h310",
        "name": "ASUS H310 Pro",
        "price": 100,
        "specs": "LGA1151 Socket",
        "brand": "ASUS",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-h310",
        "name": "MSI H310 Pro",
        "price": 100,
        "specs": "LGA1151 Socket",
        "brand": "MSI",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-h310",
        "name": "Gigabyte H310 Pro",
        "price": 100,
        "specs": "LGA1151 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-h310",
        "name": "ASRock H310 Pro",
        "price": 100,
        "specs": "LGA1151 Socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b365",
        "name": "ASUS B365 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "ASUS",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b365",
        "name": "MSI B365 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "MSI",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b365",
        "name": "Gigabyte B365 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b365",
        "name": "ASRock B365 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1151 Socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-z390",
        "name": "ASUS Z390 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "ASUS",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-z390",
        "name": "MSI Z390 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "MSI",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-z390",
        "name": "Gigabyte Z390 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-z390",
        "name": "ASRock Z390 Gaming WiFi",
        "price": 250,
        "specs": "LGA1151 Socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-h410",
        "name": "ASUS H410 Pro",
        "price": 100,
        "specs": "LGA1200 Socket",
        "brand": "ASUS",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-h410",
        "name": "MSI H410 Pro",
        "price": 100,
        "specs": "LGA1200 Socket",
        "brand": "MSI",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-h410",
        "name": "Gigabyte H410 Pro",
        "price": 100,
        "specs": "LGA1200 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-h410",
        "name": "ASRock H410 Pro",
        "price": 100,
        "specs": "LGA1200 Socket",
        "brand": "ASRock",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b460",
        "name": "ASUS B460 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1200 Socket",
        "brand": "ASUS",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b460",
        "name": "MSI B460 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1200 Socket",
        "brand": "MSI",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b460",
        "name": "Gigabyte B460 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1200 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b460",
        "name": "ASRock B460 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1200 Socket",
        "brand": "ASRock",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-z490",
        "name": "ASUS Z490 Gaming WiFi",
        "price": 250,
        "specs": "LGA1200 Socket",
        "brand": "ASUS",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-z490",
        "name": "MSI Z490 Gaming WiFi",
        "price": 250,
        "specs": "LGA1200 Socket",
        "brand": "MSI",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-z490",
        "name": "Gigabyte Z490 Gaming WiFi",
        "price": 250,
        "specs": "LGA1200 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-z490",
        "name": "ASRock Z490 Gaming WiFi",
        "price": 250,
        "specs": "LGA1200 Socket",
        "brand": "ASRock",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-h510",
        "name": "ASUS H510 Pro",
        "price": 100,
        "specs": "LGA1200 Socket",
        "brand": "ASUS",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-h510",
        "name": "MSI H510 Pro",
        "price": 100,
        "specs": "LGA1200 Socket",
        "brand": "MSI",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-h510",
        "name": "Gigabyte H510 Pro",
        "price": 100,
        "specs": "LGA1200 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-h510",
        "name": "ASRock H510 Pro",
        "price": 100,
        "specs": "LGA1200 Socket",
        "brand": "ASRock",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b560",
        "name": "ASUS B560 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1200 Socket",
        "brand": "ASUS",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b560",
        "name": "MSI B560 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1200 Socket",
        "brand": "MSI",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b560",
        "name": "Gigabyte B560 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1200 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b560",
        "name": "ASRock B560 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1200 Socket",
        "brand": "ASRock",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-z590",
        "name": "ASUS Z590 Gaming WiFi",
        "price": 250,
        "specs": "LGA1200 Socket",
        "brand": "ASUS",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-z590",
        "name": "MSI Z590 Gaming WiFi",
        "price": 250,
        "specs": "LGA1200 Socket",
        "brand": "MSI",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-z590",
        "name": "Gigabyte Z590 Gaming WiFi",
        "price": 250,
        "specs": "LGA1200 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-z590",
        "name": "ASRock Z590 Gaming WiFi",
        "price": 250,
        "specs": "LGA1200 Socket",
        "brand": "ASRock",
        "socket": "LGA1200",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-h610",
        "name": "ASUS H610 Pro",
        "price": 100,
        "specs": "LGA1700 Socket",
        "brand": "ASUS",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-h610",
        "name": "MSI H610 Pro",
        "price": 100,
        "specs": "LGA1700 Socket",
        "brand": "MSI",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-h610",
        "name": "Gigabyte H610 Pro",
        "price": 100,
        "specs": "LGA1700 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-h610",
        "name": "ASRock H610 Pro",
        "price": 100,
        "specs": "LGA1700 Socket",
        "brand": "ASRock",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b660",
        "name": "ASUS B660 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1700 Socket",
        "brand": "ASUS",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b660",
        "name": "MSI B660 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1700 Socket",
        "brand": "MSI",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b660",
        "name": "Gigabyte B660 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1700 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b660",
        "name": "ASRock B660 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1700 Socket",
        "brand": "ASRock",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-z690",
        "name": "ASUS Z690 Gaming WiFi",
        "price": 250,
        "specs": "LGA1700 Socket",
        "brand": "ASUS",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-z690",
        "name": "MSI Z690 Gaming WiFi",
        "price": 250,
        "specs": "LGA1700 Socket",
        "brand": "MSI",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-z690",
        "name": "Gigabyte Z690 Gaming WiFi",
        "price": 250,
        "specs": "LGA1700 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-z690",
        "name": "ASRock Z690 Gaming WiFi",
        "price": 250,
        "specs": "LGA1700 Socket",
        "brand": "ASRock",
        "socket": "LGA1700",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b760",
        "name": "ASUS B760 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1700 Socket",
        "brand": "ASUS",
        "socket": "LGA1700",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-b760",
        "name": "MSI B760 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1700 Socket",
        "brand": "MSI",
        "socket": "LGA1700",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-b760",
        "name": "Gigabyte B760 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1700 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1700",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-b760",
        "name": "ASRock B760M Pro RS",
        "price": 150,
        "specs": "LGA1700 Socket",
        "brand": "ASRock",
        "socket": "LGA1700",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asus-z790",
        "name": "ASUS Z790 Gaming WiFi",
        "price": 250,
        "specs": "LGA1700 Socket",
        "brand": "ASUS",
        "socket": "LGA1700",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-z790",
        "name": "MSI Z790 Gaming WiFi",
        "price": 250,
        "specs": "LGA1700 Socket",
        "brand": "MSI",
        "socket": "LGA1700",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-z790",
        "name": "Gigabyte Z790 Gaming WiFi",
        "price": 250,
        "specs": "LGA1700 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1700",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-z790",
        "name": "ASRock Z790 Gaming WiFi",
        "price": 250,
        "specs": "LGA1700 Socket",
        "brand": "ASRock",
        "socket": "LGA1700",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asus-z890",
        "name": "ASUS ROG Maximus Z890 Hero",
        "price": 250,
        "specs": "LGA1851 Socket",
        "brand": "ASUS",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-z890",
        "name": "MSI MAG Z890 Tomahawk WiFi",
        "price": 250,
        "specs": "LGA1851 Socket",
        "brand": "MSI",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-z890",
        "name": "Gigabyte Z890 Gaming WiFi",
        "price": 250,
        "specs": "LGA1851 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-z890",
        "name": "ASRock Z890 Gaming WiFi",
        "price": 250,
        "specs": "LGA1851 Socket",
        "brand": "ASRock",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asus-b860",
        "name": "ASUS B860 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1851 Socket",
        "brand": "ASUS",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-b860",
        "name": "MSI B860 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1851 Socket",
        "brand": "MSI",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-b860",
        "name": "Gigabyte B860 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1851 Socket",
        "brand": "Gigabyte",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-b860",
        "name": "ASRock B860 Tomahawk / Elite",
        "price": 150,
        "specs": "LGA1851 Socket",
        "brand": "ASRock",
        "socket": "LGA1851",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asus-760g",
        "name": "ASUS 760G Pro",
        "price": 100,
        "specs": "AM3+ Socket",
        "brand": "ASUS",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-760g",
        "name": "MSI 760G Pro",
        "price": 100,
        "specs": "AM3+ Socket",
        "brand": "MSI",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-760g",
        "name": "Gigabyte 760G Pro",
        "price": 100,
        "specs": "AM3+ Socket",
        "brand": "Gigabyte",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-760g",
        "name": "ASRock 760G Pro",
        "price": 100,
        "specs": "AM3+ Socket",
        "brand": "ASRock",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-970",
        "name": "ASUS 970 Pro",
        "price": 100,
        "specs": "AM3+ Socket",
        "brand": "ASUS",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-970",
        "name": "MSI 970 Pro",
        "price": 100,
        "specs": "AM3+ Socket",
        "brand": "MSI",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-970",
        "name": "Gigabyte 970 Pro",
        "price": 100,
        "specs": "AM3+ Socket",
        "brand": "Gigabyte",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-970",
        "name": "ASRock 970 Pro",
        "price": 100,
        "specs": "AM3+ Socket",
        "brand": "ASRock",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-990fx",
        "name": "ASUS 990FX Gaming WiFi",
        "price": 250,
        "specs": "AM3+ Socket",
        "brand": "ASUS",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-msi-990fx",
        "name": "MSI 990FX Gaming WiFi",
        "price": 250,
        "specs": "AM3+ Socket",
        "brand": "MSI",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-gigabyte-990fx",
        "name": "Gigabyte 990FX Gaming WiFi",
        "price": 250,
        "specs": "AM3+ Socket",
        "brand": "Gigabyte",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asrock-990fx",
        "name": "ASRock 990FX Gaming WiFi",
        "price": 250,
        "specs": "AM3+ Socket",
        "brand": "ASRock",
        "socket": "AM3+",
        "supportedMemory": "DDR3"
    },
    {
        "id": "mobo-asus-a320",
        "name": "ASUS A320 Pro",
        "price": 100,
        "specs": "AM4 Socket",
        "brand": "ASUS",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-a320",
        "name": "MSI A320 Pro",
        "price": 100,
        "specs": "AM4 Socket",
        "brand": "MSI",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-a320",
        "name": "Gigabyte A320 Pro",
        "price": 100,
        "specs": "AM4 Socket",
        "brand": "Gigabyte",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-a320",
        "name": "ASRock A320 Pro",
        "price": 100,
        "specs": "AM4 Socket",
        "brand": "ASRock",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b350",
        "name": "ASUS B350 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "ASUS",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b350",
        "name": "MSI B350 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "MSI",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b350",
        "name": "Gigabyte B350 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "Gigabyte",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b350",
        "name": "ASRock B350 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "ASRock",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-x370",
        "name": "ASUS X370 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "ASUS",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-x370",
        "name": "MSI X370 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "MSI",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-x370",
        "name": "Gigabyte X370 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "Gigabyte",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-x370",
        "name": "ASRock X370 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "ASRock",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b450",
        "name": "ASUS B450 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "ASUS",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b450",
        "name": "MSI B450 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "MSI",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b450",
        "name": "Gigabyte B450 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "Gigabyte",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b450",
        "name": "ASRock B450 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "ASRock",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-x470",
        "name": "ASUS X470 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "ASUS",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-x470",
        "name": "MSI X470 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "MSI",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-x470",
        "name": "Gigabyte X470 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "Gigabyte",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-x470",
        "name": "ASRock X470 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "ASRock",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-a520",
        "name": "ASUS A520 Pro",
        "price": 100,
        "specs": "AM4 Socket",
        "brand": "ASUS",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-a520",
        "name": "MSI A520 Pro",
        "price": 100,
        "specs": "AM4 Socket",
        "brand": "MSI",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-a520",
        "name": "Gigabyte A520 Pro",
        "price": 100,
        "specs": "AM4 Socket",
        "brand": "Gigabyte",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-a520",
        "name": "ASRock A520 Pro",
        "price": 100,
        "specs": "AM4 Socket",
        "brand": "ASRock",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-b550",
        "name": "ASUS B550 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "ASUS",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-b550",
        "name": "MSI B550 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "MSI",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-b550",
        "name": "Gigabyte B550 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "Gigabyte",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-b550",
        "name": "ASRock B550 Tomahawk / Elite",
        "price": 150,
        "specs": "AM4 Socket",
        "brand": "ASRock",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-x570",
        "name": "ASUS X570 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "ASUS",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-msi-x570",
        "name": "MSI X570 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "MSI",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-gigabyte-x570",
        "name": "Gigabyte X570 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "Gigabyte",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asrock-x570",
        "name": "ASRock X570 Gaming WiFi",
        "price": 250,
        "specs": "AM4 Socket",
        "brand": "ASRock",
        "socket": "AM4",
        "supportedMemory": "DDR4"
    },
    {
        "id": "mobo-asus-a620",
        "name": "ASUS A620 Pro",
        "price": 100,
        "specs": "AM5 Socket",
        "brand": "ASUS",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-a620",
        "name": "MSI A620 Pro",
        "price": 100,
        "specs": "AM5 Socket",
        "brand": "MSI",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-a620",
        "name": "Gigabyte A620 Pro",
        "price": 100,
        "specs": "AM5 Socket",
        "brand": "Gigabyte",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-a620",
        "name": "ASRock A620 Pro",
        "price": 100,
        "specs": "AM5 Socket",
        "brand": "ASRock",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asus-b650",
        "name": "ASUS TUF Gaming B650-PLUS WiFi",
        "price": 150,
        "specs": "AM5 Socket",
        "brand": "ASUS",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-b650",
        "name": "MSI B650 Tomahawk / Elite",
        "price": 150,
        "specs": "AM5 Socket",
        "brand": "MSI",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-b650",
        "name": "Gigabyte B650 Tomahawk / Elite",
        "price": 150,
        "specs": "AM5 Socket",
        "brand": "Gigabyte",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-b650",
        "name": "ASRock B650 Tomahawk / Elite",
        "price": 150,
        "specs": "AM5 Socket",
        "brand": "ASRock",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asus-x670e",
        "name": "ASUS X670E Gaming WiFi",
        "price": 250,
        "specs": "AM5 Socket",
        "brand": "ASUS",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-x670e",
        "name": "MSI X670E Gaming WiFi",
        "price": 250,
        "specs": "AM5 Socket",
        "brand": "MSI",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-x670e",
        "name": "Gigabyte X670E Gaming WiFi",
        "price": 250,
        "specs": "AM5 Socket",
        "brand": "Gigabyte",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-x670e",
        "name": "ASRock X670E Gaming WiFi",
        "price": 250,
        "specs": "AM5 Socket",
        "brand": "ASRock",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asus-b850",
        "name": "ASUS B850 Tomahawk / Elite",
        "price": 150,
        "specs": "AM5 Socket",
        "brand": "ASUS",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-b850",
        "name": "MSI B850 Tomahawk / Elite",
        "price": 150,
        "specs": "AM5 Socket",
        "brand": "MSI",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-b850",
        "name": "Gigabyte B850 AORUS Elite",
        "price": 150,
        "specs": "AM5 Socket",
        "brand": "Gigabyte",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-b850",
        "name": "ASRock B850 Tomahawk / Elite",
        "price": 150,
        "specs": "AM5 Socket",
        "brand": "ASRock",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asus-x870e",
        "name": "ASUS ROG Crosshair X870E Hero",
        "price": 250,
        "specs": "AM5 Socket",
        "brand": "ASUS",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-msi-x870e",
        "name": "MSI MPG X870E Carbon WiFi",
        "price": 250,
        "specs": "AM5 Socket",
        "brand": "MSI",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-gigabyte-x870e",
        "name": "Gigabyte X870E Gaming WiFi",
        "price": 250,
        "specs": "AM5 Socket",
        "brand": "Gigabyte",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    },
    {
        "id": "mobo-asrock-x870e",
        "name": "ASRock X870E Gaming WiFi",
        "price": 250,
        "specs": "AM5 Socket",
        "brand": "ASRock",
        "socket": "AM5",
        "supportedMemory": "DDR5"
    }
],
  ram: [
    {
        "id": "ram-ddr4-8g",
        "name": "G.Skill Aegis 8GB DDR4-3200",
        "price": 22,
        "specs": "1x8GB DDR4-3200",
        "brand": "G.Skill",
        "supportedMemory": "DDR4"
    },
    {
        "id": "ram-ddr4-16g-corsair",
        "name": "Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200",
        "price": 39,
        "specs": "2x8GB DDR4-3200",
        "brand": "Corsair",
        "supportedMemory": "DDR4"
    },
    {
        "id": "ram-ddr5-16g-crucial",
        "name": "Crucial Pro 16GB (2x8GB) DDR5-5600",
        "price": 59,
        "specs": "2x8GB DDR5-5600",
        "brand": "Crucial",
        "supportedMemory": "DDR5"
    },
    {
        "id": "ram-ddr5-32g-corsair",
        "name": "Corsair Vengeance 32GB (2x16GB) DDR5-5600",
        "price": 95,
        "specs": "2x16GB DDR5-5600",
        "brand": "Corsair",
        "supportedMemory": "DDR5"
    },
    {
        "id": "ram-ddr5-64g-trident",
        "name": "G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000",
        "price": 289,
        "specs": "2x32GB DDR5-6000",
        "brand": "G.Skill",
        "supportedMemory": "DDR5"
    },
    {
        "id": "ram-ddr5-32g-dom",
        "name": "Corsair Dominator Titanium 32GB (2x16GB) DDR5-7200",
        "price": 229,
        "specs": "2x16GB DDR5-7200",
        "brand": "Corsair",
        "supportedMemory": "DDR5"
    },
    {
        "id": "ram-ddr5-64g-dom",
        "name": "Corsair Dominator Titanium 64GB (2x32GB) DDR5-7200",
        "price": 399,
        "specs": "2x32GB DDR5-7200",
        "brand": "Corsair",
        "supportedMemory": "DDR5"
    },
    {
        "id": "ram-ddr3-8g",
        "name": "Corsair Vengeance 8GB (2x4GB) DDR3-1600",
        "price": 19,
        "specs": "2x4GB DDR3-1600",
        "brand": "Corsair",
        "supportedMemory": "DDR3"
    },
    {
        "id": "ram-ddr3-16g",
        "name": "G.Skill Ripjaws X 16GB (2x8GB) DDR3-1600",
        "price": 32,
        "specs": "2x8GB DDR3-1600",
        "brand": "G.Skill",
        "supportedMemory": "DDR3"
    }
],
  storage: [
    {
        "id": "ssd-crucial-p3-1t",
        "name": "Crucial P3 1TB",
        "price": 55,
        "specs": "NVMe PCIe Gen3",
        "brand": "Crucial"
    },
    {
        "id": "ssd-samsung-980pro-1t",
        "name": "Samsung 980 Pro 1TB",
        "price": 95,
        "specs": "NVMe PCIe Gen4",
        "brand": "Samsung"
    },
    {
        "id": "ssd-crucial-p5plus-1t",
        "name": "Crucial P5 Plus 1TB",
        "price": 79,
        "specs": "NVMe PCIe Gen4",
        "brand": "Crucial"
    },
    {
        "id": "ssd-crucial-t700-2t",
        "name": "Crucial T700 2TB",
        "price": 229,
        "specs": "NVMe PCIe Gen5",
        "brand": "Crucial"
    },
    {
        "id": "ssd-samsung-990evo-4t",
        "name": "Samsung 990 Evo Plus 4TB",
        "price": 299,
        "specs": "NVMe PCIe Gen5",
        "brand": "Samsung"
    },
    {
        "id": "hdd-seagate-2t",
        "name": "Seagate BarraCuda 2TB",
        "price": 50,
        "specs": "3.5-inch HDD",
        "brand": "Seagate"
    }
],
  psu: [
    {
        "id": "psu-corsair-650",
        "name": "Corsair CX650M",
        "price": 70,
        "specs": "650W, 80+ Bronze",
        "wattage": 650,
        "brand": "Corsair"
    },
    {
        "id": "psu-corsair-750e",
        "name": "Corsair RM750e",
        "price": 89,
        "specs": "750W, 80+ Gold",
        "wattage": 750,
        "brand": "Corsair"
    },
    {
        "id": "psu-evga-850",
        "name": "EVGA SuperNOVA 850 G7",
        "price": 129,
        "specs": "850W, 80+ Gold",
        "wattage": 850,
        "brand": "EVGA"
    },
    {
        "id": "psu-corsair-1000",
        "name": "Corsair RM1000x 2024",
        "price": 189,
        "specs": "1000W, 80+ Gold",
        "wattage": 1000,
        "brand": "Corsair"
    },
    {
        "id": "psu-bq-1000",
        "name": "be quiet! Dark Power 13 1000W",
        "price": 249,
        "specs": "1000W, 80+ Titanium",
        "wattage": 1000,
        "brand": "be quiet!"
    },
    {
        "id": "psu-seasonic-1600",
        "name": "Seasonic Prime TX-1600",
        "price": 499,
        "specs": "1600W, 80+ Titanium",
        "wattage": 1600,
        "brand": "Seasonic"
    }
],
  case: [
    {
        "id": "case-corsair-4000d",
        "name": "Corsair 4000D Airflow",
        "price": 89,
        "specs": "Mid Tower",
        "brand": "Corsair"
    },
    {
        "id": "case-fractal-north",
        "name": "Fractal Design North",
        "price": 139,
        "specs": "Mid Tower",
        "brand": "Fractal Design"
    },
    {
        "id": "case-lianli-o11",
        "name": "Lian Li O11 Dynamic EVO 2",
        "price": 189,
        "specs": "Mid Tower",
        "brand": "Lian Li"
    },
    {
        "id": "case-corsair-6500",
        "name": "Corsair 6500X",
        "price": 229,
        "specs": "Mid Tower",
        "brand": "Corsair"
    },
    {
        "id": "case-bq-901",
        "name": "be quiet! Dark Base Pro 901",
        "price": 279,
        "specs": "Full Tower",
        "brand": "be quiet!"
    },
    {
        "id": "case-cm-700",
        "name": "Cooler Master HAF 700 EVO",
        "price": 449,
        "specs": "Full Tower",
        "brand": "Cooler Master"
    }
],
  cooler: [
    {
        "id": "cooler-ag300",
        "name": "DeepCool AG300",
        "price": 18,
        "specs": "Air Cooler",
        "brand": "DeepCool"
    },
    {
        "id": "cooler-peerless-120",
        "name": "Thermalright Peerless Assassin 120 SE",
        "price": 35,
        "specs": "Air Cooler",
        "brand": "Thermalright"
    },
    {
        "id": "cooler-dark-rock-5",
        "name": "be quiet! Dark Rock Pro 5",
        "price": 89,
        "specs": "Air Cooler",
        "brand": "be quiet!"
    },
    {
        "id": "cooler-arctic-360",
        "name": "Arctic Liquid Freezer III 360",
        "price": 99,
        "specs": "AIO Liquid Cooler",
        "brand": "Arctic"
    },
    {
        "id": "cooler-kraken-elite",
        "name": "NZXT Kraken Elite 360 RGB",
        "price": 279,
        "specs": "AIO Liquid Cooler",
        "brand": "NZXT"
    },
    {
        "id": "cooler-corsair-h170i",
        "name": "Corsair iCUE H170i Elite LCD",
        "price": 299,
        "specs": "AIO Liquid Cooler",
        "brand": "Corsair"
    }
]
};
