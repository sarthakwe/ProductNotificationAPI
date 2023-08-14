var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/* get method for fetch all tblnotification. */
router.get('/', function (req, res, next) {
  var sql = "SELECT * FROM tblnotification";
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(rows)
  })
});

/*get method for fetch single product*/
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM tblnotification WHERE id=${id}`;
  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(row[0])
  })
});

/*post method for create product*/
router.post('/create', function (req, res, next) {
  var message = req.body.message;

  var sql = `INSERT INTO tblnotification (message, created_at) VALUES ("${message}", NOW())`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success', id: result.insertId })
  })
});

/*put method for update product*/
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var message = req.body.message;

  var sql = `UPDATE tblnotification SET message="${message}" WHERE id=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
});

/*delete method for delete product*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM tblnotification WHERE id=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
})

module.exports = router;