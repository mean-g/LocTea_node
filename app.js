const express = require("express");
const cors    = require("cors");
const morgan  = require('morgan');
const dotenv  = require('dotenv');
dotenv.config();

const app     = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

const routes  = require("./routes");
app.use(routes);

const port = 4000;

const start = async () => {
    try {
      app.listen(port, () => {
        console.log(`Server on in ${port}port`);
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  start();