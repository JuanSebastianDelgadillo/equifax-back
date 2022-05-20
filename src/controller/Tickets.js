const { get } = require('lodash');
const { getPool, execQuery, terminate } = require('../config/db');
const { getBanks, searchAccountType, searchTransfers, saveTranferencia } = require('../model/tickets');

let globalPool = null;

const setPool = async () => {
    if (globalPool) return globalPool 
    globalPool = await getPool()
    return globalPool
}


class Tickets{
    constructor(){}

    async getTickets (req, res){
        const pool = await setPool();
        try{
            const { results } = await execQuery(pool, 'SELECT * FROM tickets');
            await terminate(pool);
            res.status(200).send({internalCode: 200, message: "OK", payload: results});
        }
        catch(err){
            res.status(404).send("error");
            console.log("Usuarios no encontrado", err)
        }
    }
}

module.exports = Tickets