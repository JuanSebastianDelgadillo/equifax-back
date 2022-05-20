const { get } = require('lodash')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log('req', get(req, 'originalUrl'))
  let token = get(req, 'headers.x-api-token')
  try {
    if(token){
      jwt.verify(token, process.env.TOKEN, (err, decoded) => { 
        if(err){
          res.status(403).send({ internalCode: '403', message: 'Forbidden', payload: null })
        }
        req.decoded = decoded;
        next();
      });
    }else{
      res.status(403).send(
        { 'internalCode': '403', 'message': 'Forbidden', 'payload': null }
      )
    }
  } catch (error) {
    res.status(403).send(
      { 'internalCode': '403', 'message': 'Forbidden', 'payload': null }
    )
  }
}
