const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    database: "restaurantesaboroso",
    password: "admin123456"
})

module.exports = connection