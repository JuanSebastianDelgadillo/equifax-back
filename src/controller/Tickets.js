const { getBanks, searchAccountType, searchTransfers, saveTranferencia } = require('../model/tickets')

class Tickets{
    constructor(){}

    async searchBanks (req, res){
        try{
            const result = await getBanks()
            if(result.err)
                res.send({internalCode: 400, message: "ERROR", payload: result.message})
            else    
                res.send({internalCode: 200, message: "OK", payload: result.data})
        }
        catch(err){
            console.log("Error en la operación de buscar bancos", err)
        }
    }

    async searchAccountTypeAll (req, res){
        try{
            const result = await searchAccountType()
            if(result.err)
                res.send({internalCode: 400, message: "ERROR", payload: result.message})
            else    
                res.send({internalCode: 200, message: "OK", payload: result.accounts})
        }
        catch(err){
            console.log("Error en la operación de buscar tipo de cuenta", err)
        }
    }

    async searchTransferHistory (req, res){
        try{
            const result = await searchTransfers()
            if(result.err)
                res.send({internalCode: 400, message: "ERROR", message: result.message})
            else
                res.send({internalCode: 200, message: "OK", payload: result.transfer})
        }
        catch(err){
            console.log("Error en la operación", err)
        }
    }

    async saveTranferencia(req, res){
        try{
            const result = await saveTranferencia(req.body)
            console.log("result",result)

            if(result.err)
                res.send({internalCode: 400, message: "ERROR", message: result.message})
            else
                res.send({internalCode: 200, message: "OK", payload: result.id})
        }
        catch(err){
            console.log("Error en la operación guardar tranferencia", err)
        }
    }
}

module.exports = Tickets