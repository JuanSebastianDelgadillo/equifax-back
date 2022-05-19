const controller = require('./routes/routes')

module.exports = (app) => {
    app.get('/api/v1/health', function(req,res){
        res.status(200).send({data: 'OK'})
    })
    app.use('/api/v1/', controller.router)
}