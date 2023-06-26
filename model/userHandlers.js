const database = require("./database");

const getUsers = (req, res) => {
    database
      .query("SELECT firstname, lastname, email, city, language FROM users")
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
        .query("SELECT firstname, lastname, email, city, language FROM users WHERE id=?", [id])
        .then(([user]) => {
        user[0] != null ? res.status(200).json(user[0]) : res.status(404).send("Page not found");
        })
        .catch(err => res.status(500).send("Error retrieving data from database"));
}

const createUser = (req, res) => {
    const {firstname, lastname, email, city, language, hashedPassword} = req.body;
    database
        .query("INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?,?,?,?,?,?)", 
        [firstname, lastname, email, city, language, hashedPassword])
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
    const {firstname, lastname, email, city, language, hashedPassword} = req.body;

    if(req.payload.sub == id){
      database
        .query("UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=?, hashedPassword=? WHERE id="+id,
        [firstname, lastname, email, city, language, hashedPassword])
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
    }else{
      res.sendStatus(403);
    }  
}

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const {email} = req.body;
  database
    .query("SELECT * FROM users WHERE email=?", [email])
    .then(([user]) => {
      if(user[0] != null){
        req.body.user = user[0];
        next();
      }else{
        res.sendStatus(401);
      }
    })
    .catch(err => res.status(500).send("Error retrieving data from database"));
}

const deleteUser = (req,res) => {
  const id = req.params.id;

  if(req.payload.sub == id){
    database
    .query('DELETE FROM users WHERE id=?', [id])
    .then((err, results, fields) => {
        res.sendStatus(200);
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500);
    })
  }else{
    res.sendStatus(403);
  }
}

module.exports={
  getUsers,
  getUserById,
  createUser,
  updateUser,
  getUserByEmailWithPasswordAndPassToNext,
  deleteUser
}
