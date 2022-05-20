const bcrypt = require('bcrypt');
const saltRounds = 10;

class Encript{
    async encriptar(text){
        return new Promise((resolve, reject) => {
            bcrypt.hash(text, saltRounds).then(function(hash) {
                resolve(hash);
            });
        })
        
    }

    async comparar(text, hash){
        return new Promise((resolve, reject) => {
            bcrypt.compare(text, hash).then(function(result) {
                resolve(result)
            });
        })
       
    }

}

module.exports = Encript