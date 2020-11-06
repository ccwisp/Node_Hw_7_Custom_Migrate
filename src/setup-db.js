const db = require('./config');
const fs = require('fs-extra');

db.connect();
const sql = fs.readFileSync('./sql/setup-db.sql').toString();

db.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('db version is initialized ! ');
});

db.end();
