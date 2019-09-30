const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config/keys');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 5000;
const db = config.DB_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

require('./routes/dialogflowRoutes')(app);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
