const cartDB = require('../models/cart');
const q = require('q');

let cartController = {
    cartPage: function(req, res) {
        if (!req.session.user)
            res.redirect('/login');
        else {
            let username = req.session.user.username;
            cartDB.findByProductIntoCart(username)
            .then(rows => {
                if (rows.length > 0) {
                    res.render('_cart/cart', {
                        user: req.session.user,
                        info: rows,
                        layout: 'index',
                    }) 
                }
                else {
                    res.render('_cart/cart', {
                        user: req.session.user,
                        layout: "index",
                        noCart: 'ok'
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    ,
    chooseProductToCart: function(req, res) {
        let idProduct = req.query.id;
        let price = req.query.price;
        if (!req.session.user)
            res.redirect('/login');
        else {
            let username = req.session.user.username;
            let idProduct_cart = username + '_' + idProduct;
            let idCart = username + '_1';
            let count = 1;

            cartDB.findByIdProductCart(idProduct_cart)
                .then(rows => {
                    let p1, p2;
                    if (rows.length > 0) {
                        // update count
                        let count_sql = rows[0].count;
                        p1 = cartDB.updateProductCart(idProduct_cart, +count_sql + count)
                            .catch(err => console.log(err));
                    }
                    else {
                        //insert idProductCart
                        let idCart = username + '_1';
                        p1 = cartDB.insertProductCart(idProduct_cart, idCart, idProduct, count)
                            .catch(err => console.log(err));
                    }
                    //Update cart
                    cartDB.findByCart(idCart).then(rows => {
                        if (rows.length > 0) {
                            let total = rows[0].total;
                            p2 = cartDB.updateCart(idCart, +total + (count * +price));
                        }
                    }).catch(err => console.log(err));

                    ////////////////
                    q.all([p1,p2]).spread(()=>{
                        res.redirect('/cart');
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }
    ,
    updateProductToCart: function(req, res) {
        var body = '';
        //Nhận dữ liệu
        req.on('data', function (chunk) {
            body += chunk;
        });

        req.on('end', () => {
            let data = JSON.parse(body);
            res.writeHeader(200, { 'Content-Type': 'text/plain' });
            res.end(body);
        })
    }
}

module.exports = cartController;