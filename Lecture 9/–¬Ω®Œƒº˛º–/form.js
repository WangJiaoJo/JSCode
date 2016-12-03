(function() {
    "use strict";
    let manipulateMethods = {
        insertText: function(originalText, insertedText, insertedTime, eachInsertNumber){
            if (insertedText == null || insertedText == undefined || insertedText == "") throw "InsertedText should be provided";
            if (typeof insertedTime !== "number") throw "insertedTime should be provided as a number";
            if (isNaN(insertedTime)) throw "insertedTime should be provided as a number";
            if (insertedTime <= 0) throw "insertedTime should be larger than 0";
            if (typeof eachInsertNumber !== "number") throw "eachInsertNumber should be provided as a number";
            if (isNaN(eachInsertNumber)) throw "eachInsertNumber should be provided as a number";
            if (eachInsertNumber < 0) throw "eachInsertNumber should be larger than 0";
            if (eachInsertNumber > originalText.length) throw "The number of each insert number is larger than the length of moderate text";
            if (eachInsertNumber * insertedTime > originalText.length) throw "eachInsertNumber multiples insertedTime is larger than the length of moderate text";

            var rs = "";
            var currentIndex = 0;
            if (eachInsertNumber == 0){
                for (var i = 0; i < insertedTime; i++){
                    rs += insertedText;
                }
                rs += originalText;
            } else {
                for (var i = 0; i < originalText.length; i++){
                    if ((i + 1) % eachInsertNumber == 0){
                        rs += originalText.substring(currentIndex, i + 1);
                        currentIndex = i + 1;
                        rs += insertedText;
                        insertedTime--;
                    }
                    if (insertedTime == 0){
                        rs += originalText.substring(currentIndex, originalText.length);
                        break;
                    }
                }
            }
            return rs;
         }
    };

    var staticForm = document.getElementById("static-form");
    if (staticform){
        var moderateTextElement = $("#moderateText");
        var insertedTextElement = $("#insertedText");
        var insertedTimeElement = $("#insertedTime");
        var eachInsertNumberElement = $("#eachInsertNumber");

        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        staticForm.addEventListener("submit", function(event){
            event.preventDefault();

            try {
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                var moderateTextValue = moderateTextElement.val();
                var insertedTextValue = insertedTextElement.val();
                var insertedTimeValue = insertedTimeElement.val();
                var eachInsertNumberValue = eachInsertNumberElement.val();

                var parsedInsertedTimeValue = parseInt(insertedTimeValue);
                var parsedEachInsertNumberValue = parseInt(eachInsertNumberValue);

                var result = manipulateMethods["insertText"](moderateTextValue, insertedTextValue, parsedInsertedTimeValue, parsedEachInsertNumberValue);
                resultTextElement.textContent = "The result is: " + result;
                resultContainer.classList.remove("hidden");
            } catch (e){
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    };
})();