// index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const routes = require('./routes');
app.use('/', routes);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});