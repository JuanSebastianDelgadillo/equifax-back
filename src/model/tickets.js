const Axios = require('../api/AxiosRequest')
const axios = new Axios();


const getBanks = async () => {
    try{
        const result = await axios.search_banks()
        return result
    }catch(err){
        console.log("Error en la busqueda de bancos",err)
    }
}

const searchAccountType = async () => {
    try{
        const result = await firebase.searchAcountTypeAll()
        return result
    }catch(err){
        console.log("Error en la busqueda de tipos de cuenta",err)
    }
}

const searchTransfers = async() => {
    try{
        const result = await firebase.searchTransferHistory()
        return result
    }catch(err){
        console.log("Error en la busqueda de tipos de cuenta",err)
    }
}

const saveTranferencia = async(data) => {
    try{
        const result = await firebase.saveTranferencia(data)
        return result
    }catch(err){
        console.log("Error en la busqueda de tipos de cuenta",err)
    }
}

module.exports = {
    getBanks,
    searchAccountType,
    searchTransfers,
    saveTranferencia
}