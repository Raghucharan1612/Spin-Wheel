document.addEventListener("DOMContentLoaded", () => {
  setupImageFallbacks();
  setupNavigation();
  setupPage();
});

function setupImageFallbacks() {
  const applyFallback = (image) => {
    image.onerror = function () {
      this.onerror = null;
      this.src = "images/car-placeholder.jpg";
    };
  };

  document.querySelectorAll("img").forEach(applyFallback);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.tagName === "IMG") applyFallback(node);
        node.querySelectorAll?.("img").forEach(applyFallback);
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const loginButtons = document.querySelectorAll(".profile-button");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      toggle.closest(".navbar").classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  loginButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  });
}

function setupPage() {
  // Each HTML page declares its role through body[data-page].
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "listing") renderListing();
  if (page === "details") renderDetails();
  if (page === "compare") renderCompare();
  if (page === "loans") renderLoanPage();
  if (page === "login") renderLoginPage();
}

function renderHome() {
  const featured = document.querySelector("#featuredCars");
  if (!featured) return;

  showSkeletons(featured, 4);
  setTimeout(() => {
    featured.innerHTML = cars.slice(0, 4).map(createCarCard).join("");
  }, 500);
}

function renderListing() {
  const grid = document.querySelector("#carsGrid");
  const count = document.querySelector("#resultCount");
  const brandFilter = document.querySelector("#brandFilter");
  const fuelFilter = document.querySelector("#fuelFilter");
  const transmissionFilter = document.querySelector("#transmissionFilter");
  const priceFilter = document.querySelector("#priceFilter");
  const searchInput = document.querySelector("#carSearch");
  const searchForm = searchInput.closest("form");
  const clearButton = document.querySelector("#clearFilters");

  if (!grid) return;

  populateSelect(brandFilter, getUniqueValues("brand"), "All brands");
  populateSelect(fuelFilter, getUniqueValues("fuel"), "All fuel types");
  populateSelect(transmissionFilter, getUniqueValues("transmission"), "All transmissions");
  searchInput.value = new URLSearchParams(window.location.search).get("q") || "";

  const applyFilters = () => {
    // Combine all active controls so filters can be changed in any order.
    const query = searchInput.value.trim().toLowerCase();
    const maxPrice = Number(priceFilter.value);

    const filteredCars = cars.filter((car) => {
      const matchesBrand = !brandFilter.value || car.brand === brandFilter.value;
      const matchesFuel = !fuelFilter.value || car.fuel === fuelFilter.value;
      const matchesTransmission = !transmissionFilter.value || car.transmission === transmissionFilter.value;
      const matchesPrice = !maxPrice || car.price <= maxPrice;
      const matchesSearch = !query || car.name.toLowerCase().includes(query) || car.brand.toLowerCase().includes(query);
      return matchesBrand && matchesFuel && matchesTransmission && matchesPrice && matchesSearch;
    });

    count.textContent = `${filteredCars.length} cars found`;
    grid.innerHTML = filteredCars.length
      ? filteredCars.map(createCarCard).join("")
      : `<div class="empty-state">No cars matched your filters. Try a wider search.</div>`;
  };

  [brandFilter, fuelFilter, transmissionFilter, priceFilter, searchInput].forEach((control) => {
    control.addEventListener("input", applyFilters);
    control.addEventListener("change", applyFilters);
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters();
  });

  clearButton.addEventListener("click", () => {
    brandFilter.value = "";
    fuelFilter.value = "";
    transmissionFilter.value = "";
    priceFilter.value = "";
    searchInput.value = "";
    applyFilters();
  });

  showSkeletons(grid, 8);
  setTimeout(applyFilters, 500);
}

function renderDetails() {
  const params = new URLSearchParams(window.location.search);
  const car = getCarById(params.get("id")) || cars[0];
  const hero = document.querySelector("#detailsHero");
  const gallery = document.querySelector("#galleryThumbs");
  const specs = document.querySelector("#specsTable");
  const features = document.querySelector("#featuresList");
  const similar = document.querySelector("#similarCars");
  const emiResult = document.querySelector("#emiResult");
  const loanAmount = document.querySelector("#loanAmount");
  const tenure = document.querySelector("#tenure");
  const rate = document.querySelector("#rate");
  const mainImage = document.querySelector("#mainCarImage");

  document.title = `${car.name} | SpinWheel`;

  hero.innerHTML = `
    <p class="eyebrow">${car.city} inspected car</p>
    <h1>${car.name}</h1>
    <p>${car.year} • ${car.fuel} • ${car.transmission} • ${formatKm(car.kmDriven)}</p>
    <strong>${formatCurrency(car.price)}</strong>
  `;

  mainImage.src = car.images[0];
  mainImage.alt = car.name;
  mainImage.onerror = () => {
    mainImage.onerror = null;
    mainImage.src = "images/car-placeholder.jpg";
  };
  gallery.innerHTML = car.images
    .map((image, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button"><img src="${image}" alt="${car.name} view ${index + 1}" ${imageFallback}></button>`)
    .join("");

  gallery.querySelectorAll("button").forEach((button, index) => {
    button.addEventListener("click", () => {
      mainImage.src = car.images[index];
      gallery.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });

  specs.innerHTML = [
    ["Brand", car.brand],
    ["Year", car.year],
    ["Fuel", car.fuel],
    ["Transmission", car.transmission],
    ["Kilometers driven", formatKm(car.kmDriven)],
    ["Engine", car.engine],
    ["Mileage", car.mileage],
    ["Seats", car.seats],
    ["City", car.city]
  ]
    .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
    .join("");

  features.innerHTML = car.features.map((feature) => `<li>${feature}</li>`).join("");

  const calculateEmi = () => {
    // Standard reducing-balance EMI formula using static user inputs.
    const principal = Number(loanAmount.value) || car.price * 0.8;
    const months = Number(tenure.value) || 48;
    const monthlyRate = (Number(rate.value) || 10) / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    emiResult.textContent = formatCurrency(Math.round(emi));
  };

  loanAmount.value = Math.round(car.price * 0.8);
  [loanAmount, tenure, rate].forEach((input) => input.addEventListener("input", calculateEmi));
  calculateEmi();

  similar.innerHTML = cars
    .filter((item) => item.brand === car.brand && item.id !== car.id)
    .concat(cars.filter((item) => item.fuel === car.fuel && item.id !== car.id))
    .slice(0, 3)
    .map(createCarCard)
    .join("");

  document.querySelector("#bookDrive").addEventListener("click", () => {
    alert(`Test drive request received for ${car.name}. Our concierge will call you shortly.`);
  });
}

function renderCompare() {
  const firstSelect = document.querySelector("#firstCar");
  const secondSelect = document.querySelector("#secondCar");
  const table = document.querySelector("#compareTable");

  if (!firstSelect || !secondSelect) return;

  const options = cars.map((car) => `<option value="${car.id}">${car.name}</option>`).join("");
  firstSelect.innerHTML = options;
  secondSelect.innerHTML = options;
  firstSelect.value = "1";
  secondSelect.value = "6";

  const updateCompare = () => {
    const first = getCarById(firstSelect.value);
    const second = getCarById(secondSelect.value);
    table.innerHTML = `
      <thead>
        <tr>
          <th>Specification</th>
          <th>${first.name}</th>
          <th>${second.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Image</th>
          <td><img class="compare-image" src="${first.images[0]}" alt="${first.name}" ${imageFallback}></td>
          <td><img class="compare-image" src="${second.images[0]}" alt="${second.name}" ${imageFallback}></td>
        </tr>
        ${compareRow("Price", formatCurrency(first.price), formatCurrency(second.price))}
        ${compareRow("Mileage", first.mileage, second.mileage)}
        ${compareRow("Fuel type", first.fuel, second.fuel)}
        ${compareRow("Transmission", first.transmission, second.transmission)}
        ${compareRow("Engine", first.engine, second.engine)}
        ${compareRow("Seats", `${first.seats} seats`, `${second.seats} seats`)}
        ${compareRow("City", first.city, second.city)}
      </tbody>
    `;
  };

  firstSelect.addEventListener("change", updateCompare);
  secondSelect.addEventListener("change", updateCompare);
  updateCompare();
}

function compareRow(label, first, second) {
  return `<tr><th>${label}</th><td>${first}</td><td>${second}</td></tr>`;
}

function populateSelect(select, values, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>` + values.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function showSkeletons(container, count) {
  container.innerHTML = Array.from({ length: count }, () => `
    <div class="skeleton-card">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `).join("");
}

function renderLoanPage() {
  const amount = document.querySelector("#loanPageAmount");
  const tenure = document.querySelector("#loanPageTenure");
  const rate = document.querySelector("#loanPageRate");
  const result = document.querySelector("#loanPageEmi");

  if (!amount || !tenure || !rate || !result) return;

  const updateLoanEmi = () => {
    const principal = Number(amount.value) || 800000;
    const months = Number(tenure.value) || 48;
    const monthlyRate = (Number(rate.value) || 9.5) / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    result.textContent = formatCurrency(Math.round(emi));
  };

  [amount, tenure, rate].forEach((input) => input.addEventListener("input", updateLoanEmi));
  updateLoanEmi();
}

function renderLoginPage() {
  const form = document.querySelector("#loginForm");
  const email = document.querySelector("#loginEmail");
  const password = document.querySelector("#loginPassword");
  const passwordToggle = document.querySelector("#togglePassword");
  const message = document.querySelector("#loginMessage");

  if (!form) return;

  passwordToggle.addEventListener("click", () => {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
    passwordToggle.textContent = isPassword ? "Hide" : "Show";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const passwordValid = password.value.trim().length >= 6;

    if (!emailValid || !passwordValid) {
      message.textContent = "Enter a valid email and a password with at least 6 characters.";
      message.className = "form-message is-error";
      return;
    }

    message.textContent = "Login validated successfully for this static demo.";
    message.className = "form-message is-success";
    form.reset();
    password.type = "password";
    passwordToggle.textContent = "Show";
  });
}
