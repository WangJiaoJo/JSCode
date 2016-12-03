let exportedMethods = {
    insertText(moderateText, insertedText, insertedTime, eachInsertNumber){
        if (insertedText == null || insertedText == undefined || insertedText == "") throw "InsertedText should be provided";
        if (typeof insertedTime !== "number") throw "insertedTime should be provided as a number";
        if (isNaN(insertedTime)) throw "insertedTime should be provided as a number";
        if (insertedTime <= 0) throw "insertedTime should be larger than 0";
        if (typeof eachInsertNumber !== "number") throw "eachInsertNumber should be provided as a number";
        if (isNaN(eachInsertNumber)) throw "eachInsertNumber should be provided as a number";
        if (eachInsertNumber < 0) throw "eachInsertNumber should be larger than 0";
        if (eachInsertNumber > moderateText.length) throw "The number of each insert number is larger than the length of moderate text";
        if (eachInsertNumber * insertedTime > moderateText.length) throw "eachInsertNumber multiples insertedTime is larger than the length of moderate text";

        var rs = "";
        var currentIndex = 0;
        if (eachInsertNumber == 0){
            for (var i = 0; i < insertedTime; i++){
                rs += insertedText;
            }
            rs += moderateText;
        } else {
            for (var i = 0; i < moderateText.length; i++){
                if ((i + 1) % eachInsertNumber == 0){
                    rs += moderateText.substring(currentIndex, i + 1);
                    currentIndex = i + 1;
                    rs += insertedText;
                    insertedTime--;
                }
                if (insertedTime == 0){
                    rs += moderateText.substring(currentIndex, moderateText.length);
                    break;
                }
            }
        }
        return rs;
    }
};

module.exports = exportedMethods;