var express = require("express")
var router = express.Router()

router.get("/", (req, res) => {
    res.render("admin/index", {
        
    })
})

router.get("/login", (req, res) => {
    res.render("admin/login")
})

router.get("/contacts", (req, res) => {
    res.render("admin/contacts")
})

router.get("/emails", (req, res) => {
    res.render("admin/emails")
})

router.get("/menus", (req, res) => {
    res.render("admin/menus")
})

router.get("/reservations", (req, res) => {
    res.render("admin/reservations", {
        date: {}
    })
})

router.get("/users", (req, res) => {
    res.render("admin/users")
})

module.exports = router