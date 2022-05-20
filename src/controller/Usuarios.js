const { get } = require('lodash');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const { getAllUsuarios, getLogin, getUsuario } = require('../model/usuarios');
const Encriptar = require('../utils/encript');
const encriptar = new Encriptar({ path: '' });
const Token = require('../utils/token');
const token = new Token({ path: '' });

class Usuarios{
    constructor(){}
    async testReciproca (req, res){
          const payload = {
           check:  true,
           valor: "etas"
          };
          const token = jwt.sign(payload, process.env.TOKEN, {
           expiresIn: 1440
          });
          res.json({
           mensaje: 'Autenticación correcta',
           token: token
          });
    }

    async testPrueba (req, res){
        res.status(200).send({internalCode: 200, message: "OK", payload: null})
    }

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

    async newUsuario (req, res){
        try{
            const pool = await setPool();
            const usuario = get(req, 'body', '');
            const passEncript = await encriptar.encriptar(usuario.password);
            await execQuery(pool, `INSERT INTO usuarios (nombre, apellido, email, login, password) VALUES ('${usuario.nombre}', '${usuario.apellido}', '${usuario.email}', '${usuario.login}', '${passEncript}')`);
            res.send({internalCode: 200, message: "OK", payload: "Operación correcta"})
            await terminate(pool);
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }
    
    async updateUsuario (req, res){
        try{
            const pool = await setPool();
            const id = get(req, 'params.id', '');
            const usuario = get(req, 'body', '');
            const passEncript = await encriptar.encriptar(usuario.password);
            await execQuery(pool, `UPDATE usuarios SET nombre = '${usuario.nombre}', apellido = '${usuario.apellido}', email = '${usuario.email}', login = '${usuario.login}', password = '${passEncript}' where id = ${id}`);
            res.send({internalCode: 200, message: "OK", payload: "Operación correcta"})
            await terminate(pool);
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }

    async deleteUsuario (req, res){
        try{
            const pool = await setPool();
            const id = get(req, 'params.id', '');
            await execQuery(pool, `DELETE FROM usuarios where id = ${id}`);
            res.send({internalCode: 200, message: "OK", payload: "Operación correcta"})
            await terminate(pool);
            
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
}

module.exports = Usuarios