const axios = require('axios');

class Axios{
    constructor(){
        this.url = process.env.URL_BANKS
    }
    async search_banks(){
        return new Promise((resolve, reject) =>{
            try{
                axios({
                    method: 'get',
                    url: this.url
                  })
                .then(function (response) {
                    if(response.status == 200){
                        resolve({err: false, data: response.data})
                    }else{
                        resolve({err: true, message: `Error no ha podido conectar a la URL ${process.env.URL_BANKS}`})
                    }
                })
                .catch(err =>{
                    console.log("error en buscar bancos", err)
                });
            }
            catch(err){
                console.log("Error en la operacion: ", err)
                resolve({err: true, message: err})
            }

        })

    } 
}


module.exports = Axios


