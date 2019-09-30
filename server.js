const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/keys');
const app = express();
app.use(express.json());

const db = config.DB_URI;

mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Database connection successful.'))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
require('./routes/dialogflowRoutes')(app);

app.listen(port, () => console.log(`Server is running on port ${port}`));
