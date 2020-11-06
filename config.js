require('dotenv').config();

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: process.env.HOST || 'remotemysql.com',
  port: process.env.PORT || 3306,
  user: process.env.USER || 'uqnz1Tj5AJ',
  password: process.env.PASSWORD || 'avR4fPp7JM',
  database: process.env.DATABASE || 'uqnz1Tj5AJ',
  multipleStatements: true,
});

module.exports = db;
