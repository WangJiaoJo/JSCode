/**
 * This file is to create collections to the database created. 
 */
const dbConnection = require("./mongoConnection");

let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}

module.exports = {
    education: getCollectionFn("education"),
    hobbies: getCollectionFn("hobbies"),
    classes: getCollectionFn("classes")
};
