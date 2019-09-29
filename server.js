const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

require('./routes/dialogflowRoutes')(app);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
