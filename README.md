# 📊 Rewards Dashboard

A modern **React-based dashboard** to track customer transactions and calculate reward points with monthly and total aggregation.
Built with a clean architecture, scalable structure, and production-ready practices.

---

## 🚀 Features

### 🔹 Core Functionalities

* ✅ Transactions table with **search & date filtering**
* ✅ **Monthly rewards aggregation**
* ✅ **Total rewards per customer**
* ✅ Dynamic **reward points calculation**
* ✅ Pagination, sorting, and filtering
* ✅ Responsive UI (Tailwind CSS)
* ✅ Error boundary handling

---

## 🧮 Reward Calculation Logic

* 💰 **2 points** for every dollar spent above **$100**
* 💰 **1 point** for every dollar spent between **$50–$100**

**Example:**

```bash
$120 purchase = (20 × 2) + (50 × 1) = 90 points
```

---

## 🏗️ Project Architecture

```
src/
│
├── components/
│   └── common/
│       ├── card/
│       ├── header/
│       ├── rewards/
│       ├── table/
│       └── transactions/
│
├── hooks/
│   └── useTransactions.js
│
├── services/
│   └── transactionService.js
│
├── utils/
│   ├── aggregation.js
│   ├── rewardCalculator.js
│   ├── currencyFormat.js
│   ├── date.js
│   ├── constants.js
│   └── logger.js
│
├── App.js
├── main.js
└── index.css
```

### 🧩 Architecture Highlights

* Component-based reusable UI
* Custom hooks for data handling
* Service layer abstraction
* Utility-driven business logic
* Clean separation of concerns

---

## 🛠️ Tech Stack

### ⚛️ Frontend

* React.js (v19)
* Vite

### 🎨 UI & Styling

* Tailwind CSS
* Ant Design
* Lucide Icons

### 🧪 Testing

* Jest

### ⚙️ Others

* ESLint + Prettier
* react-error-boundary

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/pravasinibhuyan/reward-dashboard.git
cd reward-dashboard
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 🧪 Running Tests

```bash
npm test
```

---

## � JavaScript Documentation

JSDoc comments are included directly within component and utility file for better readability and maintainability.

---

## �👀 Dashboard Preview

### 🔹 Transactions Table

![Transactions](/public/assests/Screenshot%202026-04-20%20184044.png)

### 🔹 Rewards Table

![Rewards](/public/assests/Screenshot%202026-04-20%20184057.png)


