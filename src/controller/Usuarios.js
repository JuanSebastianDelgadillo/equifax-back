const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const { getAllClients, newClient, getLoginModel } = require('../model/usuarios')

class Usuarios{
    constructor(){}
    
    async searchusuarios (req, res){
        try{
            const result = await getAllClients()
            res.send({internalCode: 200, message: "OK", payload: result})
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }

    async newusuarios (req, res){
        try{
            const result = await getAllClients()
            res.send({internalCode: 200, message: "OK", payload: result})
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }
    
    async searchClients (req, res){
        try{
            const result = await getAllClients()
            res.send({internalCode: 200, message: "OK", payload: result})
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }

    async newClients (req, res){
        const data = req.body
        try{
            const result = await newClient(data)
            if(result.err)
                res.send({internalCode: 400, message: "ERROR", payload: result.message})
            else
                res.send({internalCode: 200, message: "OK", payload: `Id Cliente : ${result.id}`})
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }

    async getLogin(req, res){
        const data = req.body
        const myPass = data.password
        console.log("data", data)

        try{
            const result = await getLoginModel(data)
            
            if(result.user != ''){
                const firebasePass = result.user
                console.log("datos", myPass, firebasePass) 
                bcrypt.compare(myPass, firebasePass, function(err, result) {
                    if(err){ console.log("Error en descifrar", err)}
                    res.send({internalCode: 200, message: "OK", client: result})
                })
            }else{
                res.send({internalCode: 200, message: "No hay usuario", client: false})
            } 
        }
        catch(err){
            console.log("Error en la operación model getLogin", err)
        }
    }


}

module.exports = Usuarios