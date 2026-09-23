# SpinWheel 🚗

## Overview

**SpinWheel** is a modern used-car marketplace web application that helps users discover, explore, compare, and save cars in one place.

The application provides a user-friendly interface for browsing cars, searching and filtering vehicles, viewing detailed car information, comparing cars, managing a wishlist, and calculating estimated car loan/EMI payments.

The project uses **LocalStorage** for client-side data persistence and does not require a backend server for the current implementation.

---

# Features

* Browse available cars
* Search cars
* Filter cars
* View detailed car information
* Compare multiple cars
* Add cars to wishlist
* View recently viewed cars
* User registration and login
* Forgot password functionality
* Car loan / EMI calculator
* Sell your car
* Responsive user interface
* Mobile-friendly design
* LocalStorage-based data persistence

---

# Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Bootstrap 5
* Bootstrap Icons
* LocalStorage

---

# Project Structure

```text
SpinWheel/
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── img/
│   │   └── car images
│   │
│   └── js/
│       ├── app.js
│       ├── car.js
│       ├── cars.js
│       ├── compare.js
│       ├── content.js
│       ├── data.js
│       ├── forgot.js
│       ├── index.js
│       ├── loan.js
│       ├── login.js
│       ├── register.js
│       ├── sell.js
│       └── wishlist.js
│
├── public/
│
├── index.html
├── cars.html
├── car.html
├── compare.html
├── loan.html
├── sell.html
├── wishlist.html
├── login.html
├── register.html
├── forgot.html
├── about.html
├── contact.html
├── faq.html
├── privacy.html
├── terms.html
│
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

# Application Modules

## Home

Provides the main landing page for the application.

### Functionalities

* Featured cars
* Car search
* Navigation to different modules
* Responsive interface

---

## Cars

Displays the available used cars.

### Functionalities

* Browse cars
* Search cars
* Filter cars
* View car details

---

## Car Details

Displays detailed information about a selected vehicle.

### Information Displayed

* Car images
* Car name
* Price
* Vehicle details
* Other available car information

---

## Compare Cars

Allows users to compare multiple cars.

### Functionalities

* Select cars for comparison
* View multiple car details
* Compare vehicle information

---

## Wishlist

Allows users to save cars for later.

### Functionalities

* Add cars to wishlist
* Remove cars from wishlist
* View saved cars

---

## Recently Viewed Cars

Keeps track of cars recently viewed by the user using LocalStorage.

---

## User Authentication

Provides basic user authentication functionality using browser LocalStorage.

### Functionalities

* User Registration
* Login
* Logout
* Forgot Password

> The current authentication implementation is intended for demonstration purposes. A production application should use secure backend authentication with password hashing, authorization, and database storage.

---

## Loan / EMI Calculator

Allows users to estimate their car loan payments.

### Functionalities

* Enter loan amount
* Enter interest rate
* Enter loan duration
* Calculate estimated EMI

---

## Sell Your Car

Allows users to provide information about a car they want to sell.

### Functionalities

* Enter car information
* Provide vehicle details
* Submit car selling information

---

# Data Storage

The application uses the browser's **LocalStorage API** for client-side data persistence.

### Data Stored

* User data
* Login state
* Wishlist
* Recently viewed cars
* Application preferences

---

# Pages

| Page            | Description                       |
| --------------- | --------------------------------- |
| Home            | Featured cars and car search      |
| Cars            | Browse and filter available cars  |
| Car Details     | View detailed car information     |
| Compare         | Compare multiple cars             |
| Wishlist        | View saved cars                   |
| Loan Calculator | Calculate estimated loan payments |
| Sell Car        | Submit car selling information    |
| Login           | User login                        |
| Register        | Create a new account              |
| Forgot Password | Password recovery                 |
| About           | About SpinWheel                   |
| Contact         | Contact information               |
| FAQ             | Frequently asked questions        |
| Privacy         | Privacy policy                    |
| Terms           | Terms and conditions              |

---

# Responsive Design

SpinWheel is designed to provide a responsive user experience across:

* Desktop
* Laptop
* Tablet
* Mobile

Bootstrap 5 and responsive CSS are used to adapt the interface to different screen sizes.

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/spinwheel.git
```

## Navigate to the Project

```bash
cd spinwheel
```

## Install Dependencies

```bash
npm install
```

## Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

---

# Usage

## Browse Cars

1. Open the application.
2. Navigate to the **Cars** page.
3. Browse the available vehicles.
4. Use search and filters to find specific cars.
5. Select a car to view its details.

## Compare Cars

1. Select the cars you want to compare.
2. Open the **Compare** page.
3. Review the vehicle information side by side.

## Add to Wishlist

1. Select a car.
2. Add it to the wishlist.
3. Open the **Wishlist** page to view saved cars.

## Calculate EMI

1. Open the **Loan Calculator**.
2. Enter the loan amount.
3. Enter the interest rate.
4. Enter the loan duration.
5. Calculate the estimated EMI.

---

# Deployment

SpinWheel is a frontend application and can be deployed using:

* Vercel
* Netlify
* GitHub Pages

## Vercel Deployment

1. Push the project to GitHub.
2. Sign in to Vercel.
3. Import the GitHub repository.
4. Select the **SpinWheel** repository.
5. Configure the project if required.
6. Click **Deploy**.
7. Open the generated deployment URL.

The current implementation does not require a backend server.

---

# Future Enhancements

* Backend REST API
* MySQL / MongoDB database integration
* Secure authentication
* Admin dashboard
* Seller dashboard
* Real-time car listings
* Cloud image storage
* Advanced search and filtering
* Payment integration
* User notifications
* AI-based car recommendations
* Car price prediction
* Financing integration
* Car booking functionality
* Dealer management

---

# Learning Outcomes

This project demonstrates practical knowledge of:

* HTML5
* CSS3
* JavaScript
* Bootstrap 5
* DOM Manipulation
* JavaScript Events
* LocalStorage
* CRUD Operations
* Form Validation
* Search and Filtering
* Responsive Web Design
* Client-Side Authentication
* Dynamic Content Rendering
* Array Methods
* Modular JavaScript
* Frontend Application Development

---

# Screens

* Home Page
* Cars Listing Page
* Car Details Page
* Compare Cars Page
* Wishlist Page
* Loan Calculator
* Sell Car Page
* Login Page
* Registration Page
* Forgot Password Page
* About Page
* Contact Page
* FAQ Page

---

# Author

**Raghu Charan R A**

Built as a frontend web application to practice **HTML, CSS, JavaScript, Bootstrap, LocalStorage, CRUD operations, responsive design, search and filtering, authentication flow, and marketplace application development.**

---

# License

This project is created for **learning and portfolio purposes**.
