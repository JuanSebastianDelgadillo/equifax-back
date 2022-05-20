const { get } = require('lodash');
const { getPool, execQuery, terminate } = require('../config/db');

let globalPool = null;

const setPool = async () => {
    if (globalPool) return globalPool 
    globalPool = await getPool()
    return globalPool
}

const getAllUsuarios = async () => {
    const pool = await setPool();
    try{
        const { results } = await execQuery(pool, 'SELECT * FROM usuarios');
        await terminate(pool);
        return results[0];
    }
    catch(err){
        console.log("Usuarios no encontrado", err)
    }
}

const getUsuario = async (id) => {
    try{
        const pool = await setPool();
        const { results } = await execQuery(pool, `SELECT * FROM usuarios where id = '${id}'`);
        const datos = results[0];
        const datosUsuario = {
            nombre: datos.nombre,
            apellido: datos.apellido,
            email: datos.email,
            login: datos.login
        }
        await terminate(pool);
        return datosUsuario
    }
    catch(err){
        console.log("Usuarios no encontrado", err)
    }
}

const getLogin = async(loginUser) => {
    try{
        const pool = await setPool();
        const { results } = await execQuery(pool, `SELECT id,password FROM usuarios where login = '${loginUser}'`);
        await terminate(pool);
        const data = results[0];
        return data;
    }
    catch(err){
        console.log("Error en la operación model getLogin", err)
    }
}

const newUser = async (usuario) => {
    try {
        const pool = await setPool();
        const res = await execQuery(pool, `INSERT INTO usuarios (nombre, apellido, email, login, password) VALUES ('${usuario.nombre}', '${usuario.apellido}', '${usuario.email}', '${usuario.login}', '${usuario.password}')`);
        await terminate(pool);
        if(res){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log("Error en la operación model new User", err)
    }
    
}

const updateUser = async (id,usuario) => {
    try {
        const pool = await setPool();
        const res = await execQuery(pool, `UPDATE usuarios SET nombre = '${usuario.nombre}', apellido = '${usuario.apellido}', email = '${usuario.email}', login = '${usuario.login}', password = '${usuario.password}' where id = ${id}`);
        await terminate(pool);
        if(res){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log("Error en la operación model updateUser", err)
    }
    
}

const deleteUser = async (id) => {
    try {
        const pool = await setPool();
        const res = await execQuery(pool, `DELETE FROM usuarios where id = ${id}`);
        await terminate(pool);
        if(res){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log("Error en la operación model updateUser", err)
    }
    
}

module.exports = {
    getAllUsuarios,
    getUsuario,
    getLogin,
    newUser,
    updateUser,
    deleteUser
}