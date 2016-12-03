(function ($, localStorage, location){
    $("#interval_times").text(localStorage["interval_times"]);
    $("#submit_times").text(localStorage["submit_times"]);
    $("#last_inputed").text(localStorage["last_inputed"]);
    $("#location_hash").text(localStorage["location_hash"]);

    var start = new Date();

    var form = $("#localstorage-form");
    form.submit(function (event){
        event.preventDefault();

        if (!localStorage["submit_times"]){
            localStorage["submit_times"] = JSON.stringify(1);
        } else {
            localStorage["submit_times"] = JSON.stringify(parseInt(localStorage["submit_times"]) + 1);
        }

        localStorage["last_inputed"] = JSON.stringify($("#localstorage-value").val());

        location.reload();
    });

    $(window).on('beforeunload', function(){
        saveToLocalStorage(start, localStorage, location);
    });
})(jQuery, window.localStorage, window.location);

function saveToLocalStorage(start, localStorage, location){
    var end = new Date();

    if (!localStorage["interval_times"]){
        localStorage["interval_times"] = JSON.stringify(Math.floor((end.getTime() - start) / 1500));
    } else {
        localStorage["interval_times"] = JSON.stringfiy(parseInt(localStorage["interval_times"]) + Math.floor((end.getTime() - start.getTime()) / 1500));
    }

    for (var key in location){
        if (key == "hash"){
            localStorage["location_hash"] = JSON.stringify(location[key]);
        }
    }
}