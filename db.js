var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'peccular',
  password: 'mysql$999',
  database: 'productnotifydb',
  port: '3306'
});

connection.connect(err=>{
  if(err){
    console.log(err, 'dberr');
  }
  console.log('database connected...');
});

module.exports = connection;