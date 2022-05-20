const mysql = require('mysql')
const { truncate } = require('lodash')

let host, user, password, database

const getPool = () => {
  return new Promise(async (resolve, reject) => {
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
    host = process.env.DB_HOST
    user = process.env.DB_USER
    password = process.env.DB_PASS
    database = process.env.DB_DATABASE
    const pool = mysql.createPool({
      connectionLimit : 5,
      host,
      user,
      password,
      database
    })
    return resolve(pool)
  })
}

const execQuery = (pool, query, param) => {
  return new Promise(async (resolve, reject) => {
    try {
      pool.getConnection((err, conn) => {
        if (err) {
          console.log('getConnection err: ', err)
          return reject(err)
        }
        if (param) {
          conn.query(query, param, (error, results, fields) => {
            conn.release()
            if (error) {
              console.error('Error trying to run', truncate(query))
              return reject(error)
            }
            try {
              const jsonResult = JSON.parse(JSON.stringify(results))
              return resolve({ results: jsonResult, fields })
            } catch (error) {
              console.error('Error parsing JSON')
              return reject(error)
            }
          })
        } else {
          conn.query(query, (error, results, fields) => {
            conn.release()
            if (error) {
              console.error('Error trying to run', truncate(query))
              return reject(error)
            }
            try {
              const jsonResult = JSON.parse(JSON.stringify(results))
              return resolve({ results: jsonResult, fields })
            } catch (error) {
              console.error('Error parsing JSON')
              return reject(error)
            }
          })
        }
      })
    } catch (error) {
      console.log('execQuery error: ', error)
      return reject(error)
    }
  })
}

const terminate = (pool) => {
  return new Promise(async (resolve, reject) => {
    try {
      pool.getConnection((err, conn) => {
        conn.destroy()
        console.log('conexion Terminada',conn.threadId,conn.state)
        return resolve()
      })
    } catch (error) {
      console.log('terminate error: ', error)
      return reject(error)
    }
  })
}
module.exports = {
  getPool,
  execQuery,
  terminate
}