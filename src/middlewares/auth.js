const { get } = require('lodash')

module.exports = (req, res, next) => {
  // console.log('req', get(req, 'originalUrl'))
  // let token = get(req, 'headers.x-api-token')
  // if (!token || token !== process.env.API_TOKEN) return res.status(403).send({ 'internalCode': '403', 'message': 'Forbidden', 'payload': null })
  // console.log('TODO OK')
  next()
}
