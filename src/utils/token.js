const jwt = require('jsonwebtoken')

class Token{

    constructor(){}

    async createToken(id){
        const payload = {
            check:  true,
            id
           };
           const token = jwt.sign(payload, process.env.TOKEN, {
            expiresIn: 1440
           });
        return token
    }

    validate_token(token){
        jwt.verify(token, process.env.TOKEN, (err, decoded) => { 
            if(err){
                return false
            }
            return decoded;
          });
        }
}

module.exports = Token