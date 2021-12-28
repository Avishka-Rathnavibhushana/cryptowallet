#### cryptowallet

## folllow code in below link for more information
https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

## backend
# How to create backend
1) run, npm init -y to initialize node project
2) add index.js file in root folder and following content in it

<!-
// index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}); 
->

4) run, npm i express to add express dependency to package.json
5) add folowing code to package.json

<!-
// package.json

...
"scripts": {
  "start": "node server/index.js"
},
... 
->

6) run, npm start to start server
7) now server is listening on port 3001

8) add folder structure and firstRequest as a  get request
root
  |--index.js
  |- -routes
  |      |- -index.js
  |
  |- -controlers
          |- -controller.js

9) add following codes
<!-
// index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const routes = require('./routes');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}); 
->

<!-
// routes/index.js
const express = require('express');
const router = express.Router();

const { firstRequest } = require('../controllers/controller');

router.get('/api', firstRequest);

module.exports = router; 
->

<!-
// controllers/controller.js
const firstRequest = async (req, res, next) => {
    try {
        res.json({ message: "Hello from server!" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    firstRequest
} 
->


## frontend
# How to create frontend
1) run, npx create-react-app client to initialize react project
2) add following code in client/srs/App.js file

<!- 
// client/src/App.js

import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(()=> 
    fetch("/api")
      .then((res)=>res.json())
      .then((data)=>setData(data.message))
  ,[]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!data?"Loading...":data}
        </p>
        
      </header>
    </div>
  );
}

export default App; 
->

3) run, npm start to run front end server
