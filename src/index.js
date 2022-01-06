const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const route = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Connect MongDB
connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
