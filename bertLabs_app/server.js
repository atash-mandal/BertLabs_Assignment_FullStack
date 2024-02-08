const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors')
require('dotenv').config();

app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'bert_labs_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});


app.get('/', (req, res) => {
  console.log("Get requested!!!!");
  connection.query('SELECT * FROM transactions order by initiated DESC', (error, results) => {
    if (error) throw error;
    res.json(results)
  });
});



app.get('/charts', async (req, res) => {
  console.log("charts requested!!!!");
  connection.query('SELECT merchant, COUNT(*) AS order_count, SUM(amount) AS total_cost FROM transactions GROUP BY (merchant);', async (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/charts/:name', async (req, res) => {
  const name = req.params.name;
  console.log(name);
  connection.query(`SELECT initiated as date, amount FROM transactions WHERE merchant = "${name}" ORDER BY initiated ASC;`, async (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

