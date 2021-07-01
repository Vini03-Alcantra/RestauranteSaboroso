let conn = require("./db")
let path = require('path')

module.exports = {
    getMenus(){
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT * FROM tb_menus ORDER BY title
            `, (err, results) => {
                if (err) {
                    reject(err)
                }

                resolve(results)
            })
        })
    },

    save(fields, files){
        return new Promise((resolve, reject) => {
            fields.photo = `images/${path.parse(files.photo.path).base}`;
            let query, params;

            if (parseInt(fields.id) > 0) {
                query = `
                    UPDATE tb_menus 
                    SET title = ?,
                        description = ?,
                        price = ?,
                        photo = ?
                    where id = ?
                `;
                params = [
                    fields.title,
                    fields.description,
                    fields.price,
                    fields.photo,
                    fields.id
                ];                
            }else {
                query = `
                    INSERT INTO tb_menus(title, description, price, photo)
                    values(?, ?, ?, ?)
                `;

                params = [
                    fields.title,
                    fields.description,
                    fields.price,
                    fields.photo
                ]
            }
            
            conn.query(query, params, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }
}