var express = require('express');
var router = express.Router();
var conn = require("./../inc/db")

/* GET home page. */
router.get('/', function(req, res, next) {
  
  conn.query(`SELECT * FROM tb_menus ORDER BY title`, (err, results) => {
    if (err) {
      console.log(err)
    }

    res.render('index', {
      title: 'Restaurante Saboroso',
      menus: results
    });
  })  
});

module.exports = router;
