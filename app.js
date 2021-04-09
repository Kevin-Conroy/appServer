const express = require("express");
const morgan = require("morgan");

const app = express();

const cors = require('cors');

app.use(morgan("common")); // let's see what 'common' format looks like

app.use(cors());

const apps = require("./app-data.js");


app.get('/apps', (req, res) => {
    const { genre = "", sort } = req.query;
  
    if (sort) {
      if (!['rating', 'app'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of rating or app');
      }
    }
  
    let results = apps.filter(app =>
            app
              .Genres
              .toLowerCase()
              .includes(genre.toLowerCase()));

  
    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  
    res
      .json(results);
  });

  app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });