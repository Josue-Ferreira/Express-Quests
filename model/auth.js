const argon = require('argon2');

const hashPassword = async(req, res, next) => {
    req.body.hashedPassword = await argon.hash(req.body.password, {
        type: argon.argon2id,
        memoryCost: 2**14,
        parallelism: 1,
        timeCost: 2
    });
    req.body.password = null;
    next();
}

module.exports={
    hashPassword
}