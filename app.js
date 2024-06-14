const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

app.myOwnSanitizer = (query) => {
return query;
}

const connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'password',
database : 'myDatabase'
});

connection.connect();

app.get('/users', (req, res) => {
let id = req.query.id;
 // Here's the SQL Injection vulnerability:
// The id is directly inserted into the SQL query without any sanitization
let sqlQuery = 'SELECT * FROM users WHERE id = ' + id;

sqlQuery = app.myOwnSanitizer(sqlQuery);

connection.query(sqlQuery, (error, results) => {
  if (error) {
    res.status(500).send('An error occurred: ' + error);
  } else {
    res.status(200).json(results);
  }
});
});

app.listen(3000, () => {
console.log('Server is running on port 3000');
let m = helper(10);
});
