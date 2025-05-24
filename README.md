
# 🗃️ Inventory Management System using MongoDB

A lightweight and responsive Inventory Management System built using Node.js, Express, and MongoDB for the backend, and HTML, CSS, and JavaScript for the frontend. This application allows users to add, view, update, and delete inventory items in real time.

---

## 📦 Features

-  Add new inventory items with name, quantity, and price
-  Update existing items via modal form
-  Delete items with confirmation
-  Real-time inventory list rendering
-  RESTful API architecture using Express.js
-  MongoDB for database storage

---

## 🛠️ Tech Stack

| Layer        | Technology               |
|--------------|--------------------------|
| Frontend     | HTML5, CSS3, JavaScript  |
| Backend      | Node.js, Express.js      |
| Database     | MongoDB (via Mongoose)   |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud – [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### 📥 Installation

```bash
git clone https://github.com/WarwolfXR/Mongo-Inventory-Manager.git
cd inventory-manager
npm install
````

Create a `.env` file in the root with the following:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/inventorydb
```

---

### ▶️ Running the App

```bash
npm start
```

Then open your browser and navigate to:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
inventory-manager/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── models/
│   └── Item.js
├── routes/
│   └── items.js
├── .gitignore
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 📬 API Endpoints

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/items`     | Get all inventory items |
| POST   | `/api/items`     | Add a new item          |
| PUT    | `/api/items/:id` | Update item by ID       |
| DELETE | `/api/items/:id` | Delete item by ID       |

---

## 🧩 Future Enhancements

* Authentication (JWT or session-based)
* Category filtering and search
* Responsive design for mobile
* Export inventory as CSV or PDF
* Pagination for large inventories

---