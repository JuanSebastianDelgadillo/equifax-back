const axios = require('axios');

class ApiConnector {

    constructor({baseURL, headers ={}} = {}){
        this.baseURL = baseURL
        this.instance = axios.create({ baseURL, headers, timeout: 50000 })

    }

    $get(path, params = {}){
        return this.instance.get(path, { params })
    }

    $post(path, params = {}){
        return this.instance.post(path, { params })
    }

    $put(path, params = {}){
        return this.instance.put(path, { params })
    }

    $delete(path, params = {}){
        return this.instance.delete(path, { params })
    }
}

module.exports = ApiConnector;