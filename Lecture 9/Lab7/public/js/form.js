(function() {
    "use strict";
    let manipulateMethods = {
        insertText: function(originalText, insertedText, insertedTime, eachInsertNumber){
            if (insertedText == null || insertedText == undefined || insertedText == "") throw "Must provide insert text";
            if (typeof insertedTime !== "number") throw "Must provide a number of insert time";
            if (isNaN(insertedTime)) throw "Must provide a number of insert time";
            if (insertedTime <= 0) throw "Insert 0 or less time is nonsense";
            if (typeof eachInsertNumber !== "number") throw "Must provide a number of each inserted number";
            if (isNaN(eachInsertNumber)) throw "Must provide a number of each inserted number";
            if (eachInsertNumber < 0) throw "Each inserted number must be positive";
            if (eachInsertNumber > originalText.length)  throw "The number of each inserted number is greater than the length of moderate text";
            if (eachInsertNumber * insertedTime > originalText.length) throw "Each inserted number multiples the number of insert time is greater then the length of moderate text";
            
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
                        rs += originalText.substring(currentIndex, i+1);
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
    if (staticForm){
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