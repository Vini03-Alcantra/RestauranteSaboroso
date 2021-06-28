var express = require("express")
var users = require("./../inc/users")
var admin = require("./../inc/admin")
var router = express.Router()

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
    res.render("admin/index", {
        menus: req.menus
    })
})

router.get("/login", (req, res) => {    
    users.render(req, res, null)
})

router.post("/login", (req, res) => {
    if (!req.body.email) {
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
    res.render("admin/contacts", {
        menus: req.menus
    })
})

router.get("/emails", (req, res) => {
    res.render("admin/emails", {
        menus: req.menus
    })
})

router.get("/menus", (req, res) => {
    res.render("admin/menus", {
        menus: req.menus
    })
})

router.get("/reservations", (req, res) => {
    res.render("admin/reservations", {
        date: {},
        menus: req.menus
    })
})

router.get("/users", (req, res) => {
    res.render("admin/users", {
        menus: req.menus
    })
})



module.exports = router