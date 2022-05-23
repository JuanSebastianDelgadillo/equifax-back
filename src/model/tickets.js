const { getPool, execQuery, terminate } = require('../config/db');

let globalPool = null;

const setPool = async () => {
    if (globalPool) return globalPool 
    globalPool = await getPool()
    return globalPool
}

const getAllTickets = async () => {
    try{
        const pool = await setPool();
        const { results } = await execQuery(pool, 'SELECT * FROM tickets');
        await terminate(pool);
        return results[0];
    }
    catch(err){
        console.log("Usuarios no encontrado", err)
    }
}

module.exports = {
    getAllTickets
}