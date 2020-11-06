const db = require('./config');
const fs = require('fs-extra');
const path = require('path');

db.connect();
const sql = fs
  .readFileSync(path.join(__dirname, './sql/setup-db.sql'))
  .toString();

db.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('db version is initialized ! ');
});

db.end();
