/**
 * This module is to define collections in database.
 */
const dbConnection = require('./mongoConnection');

let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }
        return _col;
    };
};

module.exports = {
    todoItems: getCollectionFn('todoItems')
};


