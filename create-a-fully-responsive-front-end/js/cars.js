const commonsImage = (fileName) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=1200`;

const modelImages = {
  creta: [
    "Moscow, Hyundai Creta (2nd gen) Aug 2025 01 (cropped).jpg",
    "Moscow, Hyundai Creta (2nd gen) Aug 2025 01 (cropped).jpg",
    "Moscow, Hyundai Creta (2nd gen) Aug 2025 01 (cropped).jpg"
  ].map(commonsImage),
  seltos: [
    "Kia Seltos SP2 PE Snow White Pearl (17) (cropped).jpg",
    "Moscow, Kia Seltos grey, Apr 2026 03.jpg",
    "4th International Auto Show, Bangalore (2025) 96.jpg"
  ].map(commonsImage),
  baleno: [
    "2020 Suzuki Baleno GL 1.4 (front).jpg",
    "2020 Suzuki Baleno GL 1.4 (rear).jpg",
    "2019 Suzuki Baleno 1.4 (Indonesia) front view.jpg"
  ].map(commonsImage),
  nexon: [
    "2023 Tata Nexon XZA+ front view.jpg",
    "2023 Tata Nexon XZA+ rear view.jpg",
    "Tata Nexon Blue Dual Tone.jpg"
  ].map(commonsImage),
  xuv700: [
    "2023 Mahindra XUV700 AX7L front.jpg",
    "2023 Mahindra XUV700 AX7L rear.jpg",
    "2021 Mahindra XUV700 2.2 AX7 (India) front view.png"
  ].map(commonsImage),
  city: [
    "2021 Honda City RS eHEV 1.5 Front.jpg",
    "2021 Honda City RS eHEV 1.5 Rear.jpg",
    "2020 Honda City RS sedan (GN) front view.jpg"
  ].map(commonsImage),
  innova: [
    "2021 Toyota Kijang Innova 2.4 V (GUN142R) front view 01.jpg",
    "2021 Toyota Kijang Innova 2.4 V (GUN142R) rear view 01.jpg",
    "2020 Toyota Kijang Innova 2.4 V (GUN142R) front view.jpg"
  ].map(commonsImage),
  verna: [
    "2023 Hyundai Verna SX 1.5 Turbo front view.jpg",
    "2023 Hyundai Verna SX 1.5 Turbo rear view.jpg",
    "Hyundai Verna CN7 front view.jpg"
  ].map(commonsImage),
  punch: [
    "Tata Punch Adventure Rhythm front view.jpg",
    "Tata Punch Adventure Rhythm rear view.jpg",
    "Tata Punch 2021 front view.jpg"
  ].map(commonsImage),
  brezza: [
    "2022 Suzuki Brezza ZXI+ front view.jpg",
    "2022 Suzuki Brezza ZXI+ rear view.jpg",
    "Maruti Suzuki Brezza 2022 front.jpg"
  ].map(commonsImage),
  i20: [
    "2020 Hyundai i20 (BC3) front view.jpg",
    "2020 Hyundai i20 (BC3) rear view.jpg",
    "Hyundai i20 BC3 front view.jpg"
  ].map(commonsImage),
  swift: [
    "2018 Suzuki Swift SZ5 Boosterjet SHVS 1.0 Front.jpg",
    "2018 Suzuki Swift SZ5 Boosterjet SHVS 1.0 Rear.jpg",
    "2021 Suzuki Swift Sport Series II front view.jpg"
  ].map(commonsImage),
  magnite: [
    "Nissan Magnite XV Premium 2021 front view.jpg",
    "Nissan Magnite XV Premium 2021 rear view.jpg",
    "Nissan Magnite front view.jpg"
  ].map(commonsImage),
  compass: [
    "2018 Jeep Compass Limited Multijet 2.0 Front.jpg",
    "2018 Jeep Compass Limited Multijet 2.0 Rear.jpg",
    "Jeep Compass 2.0 Multijet Limited 4WD front view.jpg"
  ].map(commonsImage),
  amaze: [
    "2018 Honda Amaze 1.2 VX i-VTEC front view.jpg",
    "2018 Honda Amaze 1.2 VX i-VTEC rear view.jpg",
    "Honda Amaze 2018 front.jpg"
  ].map(commonsImage),
  altroz: [
    "Tata Altroz XZ 2020 front view.jpg",
    "Tata Altroz XZ 2020 rear view.jpg",
    "Tata Altroz 2019 front view.jpg"
  ].map(commonsImage),
  carens: [
    "Kia Carens 1.5 Prestige Plus 2022 front view.jpg",
    "Kia Carens 1.5 Prestige Plus 2022 rear view.jpg",
    "Kia Carens 2022 front view.jpg"
  ].map(commonsImage),
  glanza: [
    "Toyota Glanza V 2019 front view.jpg",
    "Toyota Glanza V 2019 rear view.jpg",
    "2019 Toyota Glanza V front view.jpg"
  ].map(commonsImage)
};

const cars = [
  {
    id: 1,
    name: "Hyundai Creta SX",
    brand: "Hyundai",
    year: 2023,
    fuel: "Petrol",
    transmission: "Automatic",
    kmDriven: 18000,
    price: 1450000,
    city: "Bangalore",
    engine: "1497 cc",
    mileage: "17 kmpl",
    seats: 5,
    images: modelImages.creta,
    features: ["Touchscreen infotainment", "Sunroof", "Reverse camera", "Six airbags", "Cruise control"]
  },
  {
    id: 2,
    name: "Maruti Suzuki Baleno Zeta",
    brand: "Maruti",
    year: 2021,
    fuel: "Petrol",
    transmission: "Manual",
    kmDriven: 27400,
    price: 765000,
    city: "Delhi NCR",
    engine: "1197 cc",
    mileage: "22.3 kmpl",
    seats: 5,
    images: modelImages.baleno,
    features: ["SmartPlay studio", "LED projector lamps", "Auto climate control", "Rear parking sensors"]
  },
  {
    id: 3,
    name: "Honda City VX",
    brand: "Honda",
    year: 2020,
    fuel: "Petrol",
    transmission: "Manual",
    kmDriven: 35600,
    price: 1025000,
    city: "Mumbai",
    engine: "1498 cc",
    mileage: "17.8 kmpl",
    seats: 5,
    images: modelImages.city,
    features: ["Lane watch camera", "Electric sunroof", "Connected car tech", "Leatherette seats"]
  },
  {
    id: 4,
    name: "Tata Nexon XZ Plus",
    brand: "Tata",
    year: 2022,
    fuel: "Diesel",
    transmission: "Manual",
    kmDriven: 22200,
    price: 1120000,
    city: "Pune",
    engine: "1497 cc",
    mileage: "21.5 kmpl",
    seats: 5,
    images: modelImages.nexon,
    features: ["Five-star safety rating", "Drive modes", "Harman audio", "Rear AC vents"]
  },
  {
    id: 5,
    name: "Kia Seltos HTX",
    brand: "Kia",
    year: 2021,
    fuel: "Petrol",
    transmission: "Automatic",
    kmDriven: 29800,
    price: 1390000,
    city: "Hyderabad",
    engine: "1497 cc",
    mileage: "16.8 kmpl",
    seats: 5,
    images: modelImages.seltos,
    features: ["Ventilated seats", "Bose speakers", "Ambient lighting", "Wireless charger"]
  },
  {
    id: 6,
    name: "Mahindra XUV700 AX7",
    brand: "Mahindra",
    year: 2023,
    fuel: "Diesel",
    transmission: "Automatic",
    kmDriven: 11500,
    price: 2380000,
    city: "Chennai",
    engine: "2198 cc",
    mileage: "16.5 kmpl",
    seats: 7,
    images: modelImages.xuv700,
    features: ["ADAS", "Panoramic sunroof", "Dual HD displays", "Sony 3D sound"]
  },
  {
    id: 7,
    name: "Toyota Innova Crysta GX",
    brand: "Toyota",
    year: 2019,
    fuel: "Diesel",
    transmission: "Manual",
    kmDriven: 68200,
    price: 1675000,
    city: "Ahmedabad",
    engine: "2393 cc",
    mileage: "15.1 kmpl",
    seats: 7,
    images: modelImages.innova,
    features: ["Captain seats", "Rear AC", "ABS with EBD", "Touchscreen audio"]
  },
  {
    id: 8,
    name: "Hyundai Verna SX",
    brand: "Hyundai",
    year: 2022,
    fuel: "Petrol",
    transmission: "Automatic",
    kmDriven: 16600,
    price: 1275000,
    city: "Jaipur",
    engine: "1497 cc",
    mileage: "18.6 kmpl",
    seats: 5,
    images: modelImages.verna,
    features: ["Connected car tech", "Ventilated seats", "Digital cluster", "Drive modes"]
  },
  {
    id: 9,
    name: "Tata Punch Accomplished",
    brand: "Tata",
    year: 2023,
    fuel: "Petrol",
    transmission: "Automatic",
    kmDriven: 9400,
    price: 835000,
    city: "Kolkata",
    engine: "1199 cc",
    mileage: "18.8 kmpl",
    seats: 5,
    images: modelImages.punch,
    features: ["Five-star safety", "Projector lamps", "Cruise control", "Rear camera"]
  },
  {
    id: 10,
    name: "Maruti Suzuki Brezza ZXI",
    brand: "Maruti",
    year: 2022,
    fuel: "Petrol",
    transmission: "Automatic",
    kmDriven: 21400,
    price: 1110000,
    city: "Gurugram",
    engine: "1462 cc",
    mileage: "19.8 kmpl",
    seats: 5,
    images: modelImages.brezza,
    features: ["Smart Hybrid", "Head-up display", "360 camera", "LED headlamps"]
  },
  {
    id: 11,
    name: "Hyundai Creta SX Diesel",
    brand: "Hyundai",
    year: 2021,
    fuel: "Diesel",
    transmission: "Manual",
    kmDriven: 33100,
    price: 1425000,
    city: "Noida",
    engine: "1493 cc",
    mileage: "21.4 kmpl",
    seats: 5,
    images: modelImages.creta,
    features: ["BlueLink", "Rear AC vents", "Wireless charger", "Panoramic sunroof"]
  },
  {
    id: 12,
    name: "Kia Seltos GTX Plus",
    brand: "Kia",
    year: 2022,
    fuel: "Petrol",
    transmission: "Automatic",
    kmDriven: 18900,
    price: 1715000,
    city: "Lucknow",
    engine: "1353 cc",
    mileage: "16.5 kmpl",
    seats: 5,
    images: modelImages.seltos,
    features: ["Turbo petrol", "Bose speakers", "Six airbags", "Ventilated seats"]
  },
  {
    id: 13,
    name: "Hyundai i20 Asta",
    brand: "Hyundai",
    year: 2022,
    fuel: "Petrol",
    transmission: "Manual",
    kmDriven: 14250,
    price: 895000,
    city: "Bangalore",
    engine: "1197 cc",
    mileage: "20.3 kmpl",
    seats: 5,
    images: modelImages.i20,
    features: ["Digital cluster", "BlueLink", "Rear camera", "LED DRLs"]
  },
  {
    id: 14,
    name: "Maruti Suzuki Swift VXI",
    brand: "Maruti",
    year: 2020,
    fuel: "Petrol",
    transmission: "Manual",
    kmDriven: 31500,
    price: 615000,
    city: "Chandigarh",
    engine: "1197 cc",
    mileage: "23.2 kmpl",
    seats: 5,
    images: modelImages.swift,
    features: ["Dual airbags", "SmartPlay audio", "Steering controls", "ABS"]
  },
  {
    id: 15,
    name: "Nissan Magnite XV",
    brand: "Nissan",
    year: 2021,
    fuel: "Petrol",
    transmission: "Automatic",
    kmDriven: 24100,
    price: 790000,
    city: "Indore",
    engine: "999 cc",
    mileage: "17.7 kmpl",
    seats: 5,
    images: modelImages.magnite,
    features: ["Around view monitor", "Turbo CVT", "Wireless charging", "LED headlamps"]
  },
  {
    id: 16,
    name: "Jeep Compass Limited",
    brand: "Jeep",
    year: 2020,
    fuel: "Diesel",
    transmission: "Automatic",
    kmDriven: 42100,
    price: 1890000,
    city: "Kochi",
    engine: "1956 cc",
    mileage: "17.1 kmpl",
    seats: 5,
    images: modelImages.compass,
    features: ["4x4 system", "Terrain modes", "Leather seats", "Dual-zone climate"]
  },
  {
    id: 17,
    name: "Honda Amaze VX",
    brand: "Honda",
    year: 2019,
    fuel: "Diesel",
    transmission: "Manual",
    kmDriven: 46200,
    price: 695000,
    city: "Surat",
    engine: "1498 cc",
    mileage: "24.7 kmpl",
    seats: 5,
    images: modelImages.amaze,
    features: ["Cruise control", "Paddle-style display", "Rear camera", "Auto AC"]
  },
  {
    id: 18,
    name: "Tata Altroz XZ",
    brand: "Tata",
    year: 2021,
    fuel: "Petrol",
    transmission: "Manual",
    kmDriven: 26300,
    price: 730000,
    city: "Nagpur",
    engine: "1199 cc",
    mileage: "19.3 kmpl",
    seats: 5,
    images: modelImages.altroz,
    features: ["Five-star safety", "Ambient lighting", "Wearable key", "Rear armrest"]
  },
  {
    id: 19,
    name: "Kia Carens Prestige",
    brand: "Kia",
    year: 2023,
    fuel: "Diesel",
    transmission: "Manual",
    kmDriven: 12800,
    price: 1540000,
    city: "Bhopal",
    engine: "1493 cc",
    mileage: "21.3 kmpl",
    seats: 7,
    images: modelImages.carens,
    features: ["Six airbags", "Roof AC vents", "Captain seats", "Connected tech"]
  },
  {
    id: 20,
    name: "Toyota Glanza G",
    brand: "Toyota",
    year: 2022,
    fuel: "Petrol",
    transmission: "Automatic",
    kmDriven: 17300,
    price: 860000,
    city: "Coimbatore",
    engine: "1197 cc",
    mileage: "22.9 kmpl",
    seats: 5,
    images: modelImages.glanza,
    features: ["Head-up display", "360 camera", "Auto AC", "Connected features"]
  }
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

const formatKm = (km) => `${new Intl.NumberFormat("en-IN").format(km)} km`;

const imageFallback = `onerror="this.onerror=null;this.src='images/car-placeholder.jpg';"`;

function createCarCard(car) {
  return `
    <article class="car-card">
      <a class="car-card__image" href="details.html?id=${car.id}" aria-label="View ${car.name}">
        <img src="${car.images[0]}" alt="${car.name}" loading="lazy" ${imageFallback}>
        <span class="badge">${car.city}</span>
      </a>
      <div class="car-card__body">
        <p class="eyebrow">${car.year} model</p>
        <h3>${car.name}</h3>
        <div class="meta-grid">
          <span>${car.fuel}</span>
          <span>${car.transmission}</span>
          <span>${formatKm(car.kmDriven)}</span>
        </div>
        <div class="car-card__footer">
          <strong>${formatCurrency(car.price)}</strong>
          <a class="button button--small" href="details.html?id=${car.id}">View Details</a>
        </div>
      </div>
    </article>
  `;
}

function getCarById(id) {
  return cars.find((car) => car.id === Number(id));
}

function getUniqueValues(key) {
  return [...new Set(cars.map((car) => car[key]))].sort();
}
