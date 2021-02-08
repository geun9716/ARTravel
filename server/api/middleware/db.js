import mysql from 'mysql2/promise'

//const config = require('../../config/config.json')["production"]
const config = require('../config/config.json')["development"]

const pool = mysql.createPool({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function query(sql, args) {
    return new Promise(async (resolve, reject) => {
        // Arrow Function
        try {
            // Check to connection of database
            const conn = await pool.getConnection()

            // 정규표현식 : Regular Expression
            // const query = xss.encode(args)
            // console.log(query)

            const [rows, fields] = await pool.query(sql, args)

            conn.release()

            resolve(rows)
        } catch(err) {
            console.error(err)

            resolve(err)
        }
    })
}

export default {
    query
}