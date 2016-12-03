const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const education = data.education;
const hobbies = data.hobbies;
const classes = data.classes;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    })
    .then((db) => {
        return education.addEdu(
            "Tangshan Qianxi First High School", 
            "Master of Science", 
            "highschool"
        );
    })
    .then((data) => {
        return education.addEdu(
            "Shijiazhuang Tiedao University", 
            "Bachelor of Engineering",
            "undergrad"
        );
    })
    .then((data) => {
        return hobbies.addHob(
            "piano", 
            "I started to learn piano since I was seven years old. I love playing piano. "
        );
    })
    .then((data) => {
        return hobbies.addHob(
            "photography",
            "Take good pictures can record my life which is an important and amazing thing."
        );
    })
    .then((data) => {
        return hobbies.addHob(
            "reading",
            "I like reading some history book since I want to know what’s happened at that old time. "
        );
    })
    .then((data) => {
        return hobbies.addHob(
            "cooking",
            "I love cooking for my friends and family, such as noodles, sushi, chicken and grilled beef. "
        );
    })
    .then((data) => {
        return classes.addClass(
            "CS570",
            "Intro to Programming Data Structure Algorithms",
            "David Pfeffer",
            "This course introduces strudels to the C and C++ programming languages, programming concepts and basic data structures, algorithms."
        );
    })
    .then((data) => {
        return classes.addClass(
            "CS561",
            "Database Management Systems I",
            "Samuel Kim",
            "Students will become acquainted with the fundamental concepts of database management systems during class."
        );
    })
    .then((data) =>{
        return classes.addClass(
            "CS545",
            "Human Computer Interaction",
            "Gregg T. Vesonder",
            "This course targets how to create effective, efficient and enjoyable human computer interactions using both standard and emerging techniques."
        );
    })
    .then((data) => {
        return classes.addClass(
            "CS546",
            "Web Programming",
            "Philip Barresi",
            "This course will provide students with a first strong approach of internet programming. It will give the basic knowledge on how the Internet works and how to create advanced web sites by the use of script languages, after learning the basics of HTML."
        );
    })
    .then(() => {
        console.log("Finished seeding database!");
        db.close();
    });
}, (error) => {
    console.error(error);
});