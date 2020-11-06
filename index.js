const path = require('path');
const fs = require('fs-extra');
const db = require('./src/config');
const getFiles = require('./src/getMigrations');

db.promise()
  .query('SELECT version AS solution FROM db_version ')
  .then((results) => {
    console.log('Your DB version is: ', results[0][0].solution);
    const version = results[0][0].solution;
    getFiles('./src/migrations').then((files) => {
      const resFiles = files.slice(version);
      if (resFiles.length === 0) {
        console.log('You are on the latest db version');
        process.exit();
      }
      console.log('Versions that are not yet executed are');
      console.log(resFiles);
      console.log('Starting to execute migrations :');
      resFiles.forEach((file) => {
        const sql = fs
          .readFileSync(path.join(__dirname, './src/migrations/' + file))
          .toString();
        db.promise()
          .query(sql)
          .then(
            db
              .promise()
              .query(`UPDATE db_version SET version = ?`, [
                file.match(/\d+/)[0],
              ])
              .then(
                console.log(`version ${file.match(/\d+/)[0]} is added to db`)
              )
          )
          .then(console.log(file + ' is executed'));
      });
      console.log(
        '\x1b[36m%s\x1b[0m',
        'Latest version is active ! Exit with CTRL+C'
      );
    });
  })
  .catch((error) => {
    throw error;
  });
