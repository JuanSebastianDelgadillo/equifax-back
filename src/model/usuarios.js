const getAllClients = async () => {
    try{
        return listClients = await firebase.searchAllClients()
    }catch(err){
        console.log("Error en la busqueda de clientes",err)
    }
}


const newClient = async (data) => {
    try{
        const response = await firebase.newClient(data)
        return response
    }catch(err){
        console.log("Error en la creacion de cliente",err)
    }
}

const getLoginModel = async (data) => {

    
    try{
        const response = await firebase.getLogin(data)
        return response
    }catch(err){
        console.log("Error en la creacion de cliente",err)
    }
}

module.exports = {
    getAllClients,
    newClient,
    getLoginModel
}