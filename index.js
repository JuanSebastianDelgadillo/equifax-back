require('dotenv').config()
const express = require('express')
const app = express()
const moment = require('moment')

init = () => { 
    const port = process.env.PORT || 80
    const host = process.env.HOST || '0.0.0.0'
    const applicationConfig = require('./src/config/application')
    const apiRoutes = require('./src')
    const app = express()
    applicationConfig(app)
    apiRoutes(app)
    app.listen(port, host, err  => {
        if(err){ process.exit(err)}

        console.info(` =================================== ENVIRONMENT ${process.env.NODE_ENV} ${moment().format()} =================================== `)
        console.log(`
        Listening at PORT: ${host}:${port}
    
        @org: Banco BCI.
        @date: ${moment().format()}
        @enviroment: ${process.env.NODE_ENV}
      `)
      console.info(` =================================== ENVIRONMENT ${process.env.NODE_ENV} ${moment().format()} =================================== `)
    })
}


init()