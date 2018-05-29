const db = require("./database.js");
const q = require('q');

let category = {
    getCategory: function() {
        let d = q.defer();
        let sql = "";
        db.query(sql, (error, results) => {
            if (error) {
                d.reject(error);
            }
            d.resolve(results);
        });
        return d.promise;
    }
}

module.exports = category;