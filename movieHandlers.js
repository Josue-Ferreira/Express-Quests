// const movies = [
//   {
//     id: 1,
//     title: "Citizen Kane",
//     director: "Orson Wells",
//     year: "1941",
//     colors: false,
//     duration: 120,
//   },
//   {
//     id: 2,
//     title: "The Godfather",
//     director: "Francis Ford Coppola",
//     year: "1972",
//     colors: true,
//     duration: 180,
//   },
//   {
//     id: 3,
//     title: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     year: "1994",
//     color: true,
//     duration: 180,
//   },
// ];

const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("SELECT * FROM movies")
    .then(([movies]) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM movies WHERE id=?", [id])
    .then(([movie]) => {
      movie[0] != null ? res.status(200).json(movie[0]) : res.status(404).send("Page not found");
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    })
};

const createMovie = (req, res) => {
  const {title, director, year, color, duration} = req.body;

  database
    .query("INSERT INTO movies(title, director, year, color, duration) VALUES (?,?,?,?,?)", 
    [title, director, year, color, duration])
    .then(([result])=>{
      res.location('/api/movies/'+result.insertId);
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Error saving the movie");
    })
}

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const {title, director, year, color, duration} = req.body;

  database
    .query(`UPDATE movies SET title=?, director=?, year=?, color=?, duration=? WHERE id=${id}`,
    [title, director, year, color, duration])
    .then(([result]) => {
      if(result.affectedRows == 0)
        res.sendStatus(404);
      else {
        res.location("/api/movies/"+toto[0].insertId);
        res.sendStatus(200);
      }
    })
    .catch(err =>{
      console.log(err)
      res.sendStatus(500);
    })
}

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).send("Error retrieving data from database");
    })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM users WHERE id=?", [id])
    .then(([user]) => {
      user[0] != null ? res.status(200).json(user[0]) : res.status(404).send("Page not found");
    })
    .catch(err => res.status(500).send("Error retrieving data from database"));
}

const createUser = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;
  database
    .query("INSERT INTO users(firstname, lastname, email, city, language) VALUES (?,?,?,?,?)", 
    [firstname, lastname, email, city, language])
    .then(([result]) => {
      res.location("/api/users/"+result.insertId);
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500);
    })
}

const updateUser = (req, res) => {
  const id = req.params.id;
  const {firstname, lastname, email, city, language} = req.body;

  database
    .query("UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=? WHERE id="+id,
    [firstname, lastname, email, city, language])
    .then(([result]) => {
      if(result.affectedRows == 0)
        res.sendStatus(404);
      else
        res.sendStatus(200);
    })
    .catch(e =>{
      console.error(e)
      res.sendStatus(500);
    })
}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  getUsers,
  getUserById,
  createUser,
  updateUser
};
