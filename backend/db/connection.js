var mysql      = require('mysql');
var connect = mysql.createConnection({
    host: 'linkedin.c9bmoj3xcdg2.us-east-2.rds.amazonaws.com',
    user: 'patelharsh9999',
    password: '12345678',
    database: 'linkedin',
    port: 3306
})
// var connect = mysql.createPool({
//     connectionLimit: 10,
//     host: 'linkedin.c9bmoj3xcdg2.us-east-2.rds.amazonaws.com',
//     user: 'patelharsh9999',
//     password: '12345678',
//     database: 'linkedin',
//     port: 3306
// })

// connect.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Database connection was closed.')
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has too many connections.')
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused.')
//         }
//     }
//     if (connection) connection.release()
//     return
// })

connect.connect(function(err){
    if(err) throw err;
    console.log("Connected!")
})
module.exports = connect