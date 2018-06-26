const db = require("./database.js");
const q = require('q');

let cart = {
    findByProductIntoCart: function(username) {
        let d = q.defer();
        let sql = `Select p.id, p.picture, p.name, p.price, pc.count
                From cart c, product_cart pc, product p
                Where c.customer = ? and pc.idCart = c.idCart and pc.product = p.id`;
        db.query(sql, [username], (error, results) => {
            if (error)
                d.reject(error);
            d.resolve(results);
        });
        return d.promise;
    }
    ,
    findByIdProductCart: function(idProduct_Cart) {
        let d = q.defer();
        let sql = `Select * From product_cart Where idproduct_cart = ?`;
        db.query(sql, [idProduct_Cart], (error, results) => {
            if (error)
                d.reject(error);
            d.resolve(results);
        });
        return d.promise;
    } 
    ,
    findByCart: function(id_cart) {
        let d = q.defer();
        let sql = `Select * From cart Where idCart = ?`;
        db.query(sql, [id_cart], (error, results) => {
            if (error)
                d.reject(error);
            d.resolve(results);
        });
        return d.promise;
    }
    ,
    insertProductCart: function(idProduct_cart, idCart, idProduct, count) {
        let d = q.defer();
        let sql = `Insert into product_cart(idproduct_cart, idCart, product, count)
            values(?, ?, ?, ?) `;
        db.query(sql, [idProduct_cart, idCart, idProduct, count], (error, results) => {
            if (error)
                d.reject(error);
            d.resolve(results);
        });
        return d.promise;
    }
    ,
    updateProductCart: function(idProduct_cart, count) {
        let d = q.defer();
        let sql = `update product_cart set count=? where idproduct_cart = ?`;
        db.query(sql, [count, idProduct_cart], (error, results) => {
            if (error)
                d.reject(error);
            d.resolve(results);
        });
        return d.promise;
    },
    updateCart: function(idCart, total) {
        let d = q.defer();
        let sql = `update cart set total=? where idCart = ?`;
        db.query(sql, [total, idCart], (error, results) => {
            if (error)
                d.reject(error);
            d.resolve(results);
        });
        return d.promise;
    }

}

module.exports = cart;