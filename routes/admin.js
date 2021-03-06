var express = require("express")
var users = require("./../inc/users")
var admin = require("./../inc/admin")
var moment = require("moment")
var router = express.Router()
var menus = require("./../inc/menus")
var reservations = require("./../inc/reservations")

moment.locale("pt-BR")

router.use((req, res, next) => {
    if (['/login'].indexOf(req.url) == -1 && !req.session.user) {
        res.redirect("/admin/login")
    } else {
        next()
    }
})

router.use(function(req, res, next){
    req.menus = admin.getMenus(req)
    next()
})

router.get("/logout", (req, res, next) => {
    delete req.session.user;
    res.redirect("/admin/login")    
})

router.get("/", (req, res) => {
    admin.dashboard().then(data => {
        res.render("admin/index", admin.getParams(req, {
            data
        }))
    })
})

router.get("/login", (req, res) => {    
    users.render(req, res, null)
})

router.post("/login", (req, res) => {
    if (!req.body.email) {
        console.log("Mulher de fases")
        users.render(req, res, "Preencha o campo email")
    } else if(!req.body.password){
        users.render(req, res, "Preencha o campo senha")
    } else {
        users.login(req.body.email, req.body.password).then(user => {
            req.session.user = user
            res.redirect("/admin")
        }).catch(err => {
            users.render(req, res, err.message || err)
        })
    }
    
})

router.get("/contacts", (req, res) => {
    res.render("admin/contacts", admin.getParams(req))
})

router.get("/emails", (req, res) => {
    res.render("admin/emails", admin.getParams(req))
})

router.get("/menus", async (req, res) => {
    menus.getMenus().then(data => {        
        res.render("admin/menus", admin.getParams(req, {            
            data
        }))
    })    
})

router.post("/menus", (req, res) => {
    menus.save(req.fields, req.files).then(results => {
        res.send(results)
    }).catch(err => {
        res.send(err)
    })
})

router.get("/reservations", (req, res) => {
    reservations.getReservations().then(data => {
        res.render("admin/reservations", admin.getParams(req, {
            date: {},
            data,
            moment
        }))
    })
})

router.get("/users", (req, res) => {
    res.render("admin/users", admin.getParams(req))
})

router.delete("/menus/:id", function(req, res, next){
    menus.delete(req.params.id).then(results => {
        res.send(results)
    }).catch(err => {
        res.send(err)
    })
})

router.post("/reservations", (req, res) => {
    reservations.save(req.fields, req.files).then(results => {
        res.send(results)
    }).catch(err => {
        res.send(err)
    })
})

router.delete("/reservations/:id", function(req, res, next){
    reservations.delete(req.params.id).then(results => {
        res.send(results)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router