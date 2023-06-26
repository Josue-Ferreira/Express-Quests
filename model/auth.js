require('dotenv').config();
const argon = require('argon2');
const jwt = require('jsonwebtoken');

const hashPassword = async(req, res, next) => {
    try{
        req.body.hashedPassword = await argon.hash(req.body.password, {
            type: argon.argon2id,
            memoryCost: 2**14,
            parallelism: 1,
            timeCost: 2
        });
        req.body.password = null;
        next();
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }  
}

const verifyPassword = async(req, res) => {
    try{
        if(await argon.verify(req.body.user.hashedPassword, req.body.password)){
            const token = jwt.sign({sub: req.body.user.id},process.env.JWT_SECRET, {expiresIn: '1h'});
            delete req.body.user.hashedPassword;
            res.status(201).send({token, user: req.body.user});
        }else{
            res.sendStatus(401);
        }
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

const verifyToken = (req, res, next) => {
    try{
        const headerAuth = req.get('Authorization');
        const headerAuthJSON = JSON.parse(headerAuth);
        if(headerAuth && headerAuthJSON.type === 'Bearer'){
            req.payload = jwt.verify(headerAuthJSON.token,process.env.JWT_SECRET);
            next();
        }else{
            throw "Header error";
        }
    }catch(e){
        console.error(e);
        res.sendStatus(401);
    }
}

module.exports={
    verifyPassword,
    hashPassword,
    verifyToken
}