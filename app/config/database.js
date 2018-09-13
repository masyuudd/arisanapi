const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arisan'
});


db.connect(function (err){
  if(err) throw err;
  console.log('MySQL connected..');
});

module.exports = db;
