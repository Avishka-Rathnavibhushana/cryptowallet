// index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const routes = require('./routes');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});