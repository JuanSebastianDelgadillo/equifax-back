const { get } = require('lodash');
const { getAllUsuarios, getLogin, getUsuario, newUser,updateUser, deleteUser } = require('../model/usuarios');
const { getAllTickets } = require('../model/tickets');

const Encriptar = require('../utils/encript');
const encriptar = new Encriptar({ path: '' });
const Token = require('../utils/token');
const token = new Token({ path: '' });

class Usuarios{
    constructor(){}

    async getAllUsuarios (req, res){
       
        try{
            const dataUsuarios = getAllUsuarios();
            res.status(200).send({internalCode: 200, message: "OK", payload: dataUsuarios});
        }
        catch(err){
            res.status(404).send("error");
            console.log("Usuarios no encontrado", err)
        }
    }

    async getUsuario (req, res){
        try{
            const usuario = get(req, 'body', '');
            const dataUsuario = getUsuario(usuario.id);
            res.status(200).send({internalCode: 200, message: "OK", payload: dataUsuario});
        }
        catch(err){
            res.status(404).send("error");
            console.log("Usuario no encontrado", err)
        }
    }

    async newUsuario (req, res){
        try{
            const usuario = get(req, 'body', '');
            const passEncript = await encriptar.encriptar(usuario.password);
            const datosUsuario = {
                nombre : usuario.nombre,
                apellido : usuario.apellido,
                email : usuario.email,
                login : usuario.login,
                password : passEncript,
            }
            const dataUsuarios = newUser(datosUsuario);
            if(!dataUsuarios){
                res.status(500).send({internalCode: 500, message: "ERROR"})
            }
            res.status(200).send({internalCode: 200, message: "OK", payload: "Operación correcta"})
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }
    
    async updateUsuario (req, res){
        try{
            const id = get(req, 'params.id', '');
            const usuario = get(req, 'body', '');
            const passEncript = await encriptar.encriptar(usuario.password);
            const datosUsuario = {
                nombre : usuario.nombre,
                apellido : usuario.apellido,
                email : usuario.email,
                login : usuario.login,
                password : passEncript,
            }
            const dataUsuarios = updateUser(id, datosUsuario);
            if(!dataUsuarios){
                res.status(500).send({internalCode: 500, message: "ERROR"})
            }
            res.status(200).send({internalCode: 200, message: "OK", payload: "Operación correcta"})
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }

    async deleteUsuario (req, res){
        try{
            const id = get(req, 'params.id', '');
            const dataUsuarios = deleteUser(id);
            if(!dataUsuarios){
                res.status(500).send({internalCode: 500, message: "ERROR"})
            }
            res.status(200).send({internalCode: 200, message: "OK", payload: "Operación correcta"})
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }

    async getLogin(req, res){
        try{
            const usuario = get(req, 'body', '');
            const dataLogin = await getLogin(usuario.login);
            const passComparada = await encriptar.comparar(usuario.password,dataLogin.password);
            if(passComparada){
                let dataUsuario = await getUsuario(dataLogin.id);
                const tokenCreated = await token.createToken(dataLogin.id);
                dataUsuario["token"] = tokenCreated;
                res.status(200).send({internalCode: 200, message: "OK", payload: dataUsuario});
            }else{
                res.status(500).send({internalCode: 500, message: "ERROR"});
            }
        }
        catch(err){
            console.log("Error en la operación model getLogin", err)
        }
    }

    async getAllTickets(req, res){
        try{
            const dataTickets = await getLgetAllTicketsogin();
            if(dataTickets){
                res.status(200).send({internalCode: 200, message: "OK", payload: dataTickets});
            }else{
                res.status(500).send({internalCode: 500, message: "ERROR"});
            }
        }
        catch(err){
            console.log("Error en la operación model getLogin", err)
        }
    }

    async validaToken(req, res){
        try{
            const token = get(req, 'body.token', '');
            const tokenValidate = await token.validate_token(token);
            if(tokenValidate){
                res.status(200).send({internalCode: 200, message: "OK", payload: dataTickets});
            }else{
                res.status(500).send({internalCode: 500, message: "ERROR"});
            }
        }
        catch(err){
            console.log("Error en la operación model getLogin", err)
        }
    }

    

}

module.exports = Usuarios