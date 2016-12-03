const bcrypt = require("bcrypt-nodejs");  

var hashed_one = bcrypt.hashSync("elementarymydearwatson");
var hashed_two = bcrypt.hashSync("damnyoujackdonaghy");
var hashed_three = bcrypt.hashSync("quidditch");


const usersList = [
    {
        "id": 1,
        "username": "masterdetective123",
        "first_name": "Sherlock",
        "last_name": "Holmes",
        "profession": "Detective",
        "bio": "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
        "password": hashed_one
    },
    {
        "id": 2,
        "username": "lemon",
        "first_name": "Elizabeth",
        "last_name": "Lemon",
        "profession": "Writer",
        "bio": "Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
        "password": hashed_two
    },
    {
        "id": 3,
        "username": "theboywholived",
        "first_name": "Harry",
        "last_name": "Potter",
        "profession": "Student",
        "bio": "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
        "password": hashed_three
    }
];

let exportedMethod = {

    /*
        Attention: spent so much time figure the getUser function, since we need to 
        async call a series of function and use the previous result, so we need to use
        promise in node. Also, it can avoid some error when use callback function. 
    */
    getUser: (user) => {
        if (user == undefined)
            return Promise.reject("No user provided");
        let userOne = usersList.filter(x => x.username == user).shift();
        if (!userOne)
            return Promise.reject("No user found");
        return Promise.resolve(userOne);
    }
    // getUser: (user, callback) => {
    //     if (user == undefined)
    //         callback("No username provided");
    //     else {
    //         try {
    //             let userOne = usersList.filter(x => x.username == user).shift();
    //             if (userOne)
    //                 callback(null, userOne);
    //             else    
    //                 callback("No user found.");
    //         } catch (error) {
    //             callback(error, null);
    //         }
    //     }
    // },

    // getPrivate: (id, callback) => {
    //     if (id == undefined)
    //         callback("Error in id");

    //     else {
    //         try {
    //             for (var i in usersList) {
    //                 if (usersList[i].id.toString() == id)
    //                     callback(null, usersList[i]);
    //                 else 
    //                     callback("Not found id");
    //             }
    //         } catch(error) {
    //             callback(error, null);
    //         }
    //     }    
    // }

    // getUser: (user, callback) => {
    //     if (user == undefined)
    //         callback("Please provide a username");
    //     let userOne = usersList.filter(x => x.username == user).shift();
    //     if (!userOne)
    //         callback("No user found");
    //     else    
    //         callback(null, userOne);
    // },

    // getPrivate: (id, callback) => {
    //     if (id == undefined) 
    //         callback("Error in id");

    //     for (var i in usersList) {
    //         if (usersList[i].id.toString() == id)
    //             callback(null, usersList[i]);
    //     }

    //     callback("Not found id");
    // }
    
    // validPassword: (password, hashedPassword) => {
    //     return new Promise((resolve, reject) => {
    //         bcrypt.compare(password, hashedPassword, function (error, res) {
    //             if (res === true) {
    //                 console.log("Match");
    //                 resolve(resolve);
    //             } else {
    //                 reject (error);
    //                 console.log("Not Match");
    //             }
    //         });
    //     });
    // }
};

module.exports = exportedMethod;