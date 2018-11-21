/*
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'linkedIn'
})

if(pool)
    console.log(' Connected to database ... ')
else    
    console.log(' not Connected to database ... ')

module.exports = pool;
*/



var mysql = require('mysql')

var conn = mysql.createConnection({
    multipleStatements : true,
    host        : '127.0.0.1:3306',
    user        : 'root',
    password    : 'root1234',
    database    : 'linkedIn'   
})

if(conn){
    console.log(' mysql: connected to db.. ')
}

module.exports = conn;