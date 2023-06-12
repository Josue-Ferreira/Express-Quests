require('dotenv').config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const moviesRouter = require('./router/moviesRouter');
app.use('/api/movies', moviesRouter);

const usersRouter = require('./router/usersRouter');
app.use('/api/users', usersRouter);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
