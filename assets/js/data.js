/* ============================================================
   SpinWheel — static data
   ============================================================ */

const CARS = [
  {
    id: 'creta',
    name: 'Hyundai Creta SX(O)',
    brand: 'Hyundai',
    img: 'assets/img/car-creta.png',
    price: 1485000,
    oldPrice: 1515000,
    year: 2023,
    km: 18500,
    fuel: 'Petrol',
    trans: 'Automatic',
    city: 'Mumbai',
    rating: 4.8,
    reviews: 214,
    seats: 5,
    owner: '1st Owner',
    badges: ['hot', 'best'],
    avail: 'now',
    moods: ['family', 'commute', 'luxury'],
    match: 92,
    health: { engine: 96, battery: 92, tyre: 88, interior: 94, exterior: 90 },
    cost: { fuel: 6200, maint: 1800 },
    desc: 'A feature-loaded premium SUV with a panoramic sunroof, ventilated seats and a refined automatic gearbox. Inspected across 200 points and certified.'
  },
  {
    id: 'nexon',
    name: 'Tata Nexon XZ+',
    brand: 'Tata',
    img: 'assets/img/car-nexon.png',
    price: 985000,
    oldPrice: 1015000,
    year: 2022,
    km: 24300,
    fuel: 'Diesel',
    trans: 'Manual',
    city: 'Pune',
    rating: 4.6,
    reviews: 158,
    seats: 5,
    owner: '1st Owner',
    badges: ['drop', 'new'],
    avail: 'left',
    moods: ['family', 'commute', 'adventure'],
    match: 86,
    health: { engine: 90, battery: 88, tyre: 82, interior: 89, exterior: 85 },
    cost: { fuel: 4800, maint: 1500 },
    desc: '5-star safety rated compact SUV with a punchy diesel engine, ideal for highways and city alike. Fresh service and new tyres.'
  },
  {
    id: 'city',
    name: 'Honda City VX',
    brand: 'Honda',
    img: 'assets/img/car-city.png',
    price: 1125000,
    oldPrice: 1125000,
    year: 2023,
    km: 15200,
    fuel: 'Petrol',
    trans: 'Automatic',
    city: 'Delhi',
    rating: 4.7,
    reviews: 192,
    seats: 5,
    owner: '1st Owner',
    badges: ['best'],
    avail: 'pop',
    moods: ['commute', 'luxury', 'first'],
    match: 89,
    health: { engine: 95, battery: 90, tyre: 86, interior: 93, exterior: 91 },
    cost: { fuel: 5600, maint: 1400 },
    desc: 'The benchmark premium sedan — buttery CVT, spacious cabin and rock-solid reliability. A genuine single-owner example.'
  },
  {
    id: 'xuv700',
    name: 'Mahindra XUV700 AX7',
    brand: 'Mahindra',
    img: 'assets/img/car-xuv700.png',
    price: 2185000,
    oldPrice: 2240000,
    year: 2023,
    km: 21000,
    fuel: 'Diesel',
    trans: 'Automatic',
    city: 'Bengaluru',
    rating: 4.9,
    reviews: 276,
    seats: 7,
    owner: '1st Owner',
    badges: ['hot', 'drop'],
    avail: 'left',
    moods: ['family', 'adventure', 'luxury'],
    match: 94,
    health: { engine: 97, battery: 95, tyre: 90, interior: 96, exterior: 93 },
    cost: { fuel: 7400, maint: 2200 },
    desc: 'A commanding 7-seater with ADAS, dual 10.25" screens and a torquey diesel. The flagship family SUV experience.'
  },
  {
    id: 'swift',
    name: 'Maruti Swift ZXi+',
    brand: 'Maruti',
    img: 'assets/img/car-swift.png',
    price: 685000,
    oldPrice: 715000,
    year: 2022,
    km: 28900,
    fuel: 'Petrol',
    trans: 'Manual',
    city: 'Hyderabad',
    rating: 4.5,
    reviews: 132,
    seats: 5,
    owner: '2nd Owner',
    badges: ['drop', 'new'],
    avail: 'now',
    moods: ['commute', 'first'],
    match: 81,
    health: { engine: 88, battery: 85, tyre: 80, interior: 86, exterior: 83 },
    cost: { fuel: 3900, maint: 1100 },
    desc: 'India\'s favourite hatchback — light, frugal and fun to drive. Perfect first car with low running costs.'
  },
  {
    id: 'seltos',
    name: 'Kia Seltos GTX+',
    brand: 'Kia',
    img: 'assets/img/car-seltos.png',
    price: 1595000,
    oldPrice: 1640000,
    year: 2023,
    km: 17600,
    fuel: 'Petrol',
    trans: 'Automatic',
    city: 'Chennai',
    rating: 4.7,
    reviews: 168,
    seats: 5,
    owner: '1st Owner',
    badges: ['new', 'best'],
    avail: 'pop',
    moods: ['family', 'luxury', 'adventure'],
    match: 90,
    health: { engine: 94, battery: 91, tyre: 87, interior: 92, exterior: 90 },
    cost: { fuel: 6000, maint: 1700 },
    desc: 'Turbo-petrol DCT, Bose sound and a bold design. The tech-lover\'s mid-size SUV, fully certified.'
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner 4x4',
    brand: 'Toyota',
    img: 'assets/img/car-fortuner.png',
    price: 3895000,
    oldPrice: 3950000,
    year: 2022,
    km: 32000,
    fuel: 'Diesel',
    trans: 'Automatic',
    city: 'Mumbai',
    rating: 4.9,
    reviews: 301,
    seats: 7,
    owner: '1st Owner',
    badges: ['hot', 'best'],
    avail: 'left',
    moods: ['adventure', 'luxury', 'family'],
    match: 88,
    health: { engine: 98, battery: 94, tyre: 89, interior: 95, exterior: 92 },
    cost: { fuel: 9200, maint: 2600 },
    desc: 'The legendary go-anywhere SUV with bulletproof reliability and unmatched road presence. 4x4 with full service history.'
  },
  {
    id: 'amaze',
    name: 'Honda Amaze VX',
    brand: 'Honda',
    img: 'assets/img/car-amaze.png',
    price: 745000,
    oldPrice: 765000,
    year: 2022,
    km: 22100,
    fuel: 'Petrol',
    trans: 'Manual',
    city: 'Pune',
    rating: 4.4,
    reviews: 98,
    seats: 5,
    owner: '1st Owner',
    badges: ['new'],
    avail: 'now',
    moods: ['commute', 'first', 'family'],
    match: 83,
    health: { engine: 90, battery: 87, tyre: 84, interior: 88, exterior: 86 },
    cost: { fuel: 4300, maint: 1200 },
    desc: 'A roomy and efficient compact sedan, perfect for families upgrading from a hatchback. Excellent resale value.'
  }
];

const BRANDS = [
  { name: 'Hyundai', count: 1240, abbr: 'H' },
  { name: 'Honda', count: 860, abbr: 'Ho' },
  { name: 'Toyota', count: 720, abbr: 'T' },
  { name: 'Tata', count: 980, abbr: 'Ta' },
  { name: 'Kia', count: 540, abbr: 'K' },
  { name: 'Mahindra', count: 610, abbr: 'M' },
  { name: 'Maruti', count: 1530, abbr: 'Ma' }
];

const WHY = [
  { icon: 'bi-clipboard2-check', title: '200-Point Inspection', text: 'Every car passes a rigorous multi-point check by certified engineers before listing.' },
  { icon: 'bi-car-front', title: 'Doorstep Test Drive', text: 'Experience your car at home. We bring it to your doorstep at a time you choose.' },
  { icon: 'bi-tags', title: 'Transparent Pricing', text: 'No hidden charges, ever. The price you see is the price you pay — guaranteed.' },
  { icon: 'bi-file-earmark-text', title: 'Easy Paperwork', text: 'We handle RC transfer, insurance and all documents end to end, hassle-free.' },
  { icon: 'bi-shield-check', title: 'Warranty Support', text: 'Drive worry-free with up to 1 year warranty and 6 months roadside assistance.' },
  { icon: 'bi-lightning-charge', title: 'Instant Loan Approval', text: 'Get pre-approved financing in minutes with our partner banks at the best rates.' }
];

const REVIEWS = [
  { name: 'Aarav Mehta', city: 'Mumbai', stars: 5, text: 'The buying experience felt like Apple meets cars. Spotless inspection report and zero haggling. Got my Creta in 3 days!' },
  { name: 'Priya Nair', city: 'Bengaluru', stars: 5, text: 'Doorstep test drive sealed the deal. The 360° health dashboard gave me total confidence in the XUV700.' },
  { name: 'Rohan Kapoor', city: 'Delhi', stars: 4, text: 'Transparent pricing is real here. The EMI calculator and instant loan approval made financing effortless.' },
  { name: 'Sneha Reddy', city: 'Hyderabad', stars: 5, text: 'As a first-time buyer the Smart Advisor matched me perfectly with a Swift. Premium feel throughout.' }
];

const FAQS = [
  { q: 'Are all cars inspected before being listed?', a: 'Yes. Every SpinWheel car undergoes a comprehensive 200-point inspection covering engine, transmission, electricals, interior and exterior. Only cars that pass are certified and listed.' },
  { q: 'Can I get a test drive at my home?', a: 'Absolutely. Choose a date and time and we will bring the car to your doorstep for a no-obligation test drive across most of our 25+ cities.' },
  { q: 'How does the warranty work?', a: 'Certified cars come with up to 12 months of comprehensive warranty on the engine and transmission, plus 6 months of 24x7 roadside assistance.' },
  { q: 'Do you offer financing and what are the rates?', a: 'Yes, we partner with leading banks to offer instant pre-approved loans starting at 8.9% p.a. Use our EMI calculator to plan your budget before you buy.' },
  { q: 'What if I am not satisfied after buying?', a: 'We offer a 7-day money-back guarantee. If the car is not right for you, return it within 7 days or 350 km for a full refund.' }
];

const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad'];

function inr(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}
function getCar(id) { return CARS.find(c => c.id === id); }
