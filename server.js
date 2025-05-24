const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/items');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/inventoryDB');

app.use('/api/items', itemRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});