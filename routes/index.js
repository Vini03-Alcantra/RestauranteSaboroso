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

router.get("/contacts", function(req, res, next){
  res.render("contact", {
    title: 'Contact - Restaurante Saboroso'
  })
})

router.get("/menus", function(req, res, next){
  res.render("menu", {
    title: 'Menu - Restaurante Saboroso'
  })
})

router.get("/reservations", function(req, res, next){
  res.render("reservation", {
    title: 'Reservation - Restaurante Saboroso'
  })
})

router.get("/services", function(req, res, next){
  res.render("services", {
    title: 'Service - Restaurante Saboroso'
  })
})



module.exports = router;
