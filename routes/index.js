var express = require('express');
var router = express.Router();
var conn = require("./../inc/db")
var reservations = require('./../inc/reservations')

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
    title: 'Contact - Restaurante Saboroso',
    background: "images/img_bg_3.jpg",
    h1: "Say Hello"
  })
})

router.get("/menus", function(req, res, next){

  conn.query(`SELECT * FROM tb_menus ORDER BY title`, (err, results) => {
    if (err) {
      console.log(err)
    }

  res.render("menu", {
    title: 'Menu - Restaurante Saboroso',
    background: "images/img_bg_1.jpg",
    h1: "Saborei nosso menu",
    menus: results
  })
})
})

router.get("/reservations", function(req, res, next){
  reservations.render(req, res)
})

router.post("/reservations", function(req, res, next){
  if (!req.body.name) {
    reservations.render(req, res, "Digite o nome")
  }else if(!req.body.email){
    reservations.render(req, res, "Digite o e-mail")
  }else if(!req.body.people){
    reservations.render(req, res, "Selecione o número de pessoas")
  }else if(!req.body.date){
    reservations.render(req, res, "Selecione a data")
  }else if(!req.body.time){
    reservations.render(req, res, "Selecione a hora")
  }else{
    reservations.save(req.body).then(results => {
      req.body = {}
      reservations.render(req, res, null, "Reserva realizada com sucesso")
    }).catch(err => {
      reservations.render(req, res, err.message)
    })
  }
})

router.get("/services", function(req, res, next){
  res.render("services", {
    title: 'Service - Restaurante Saboroso',
    background: "images/img_bg_1.jpg",
    h1: "É um prazer poder servir"
  })
})



module.exports = router;
