const mysql = require('mysql2/promise');

const mysqlpool = mysql.createPool({
    host: 'localhost',
    user: 'new',
    password: 'example-password',
    database: 'new_schema',
  });

  module.exports = mysqlpool;