// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function ($) {

    var title = $("#Title");
    var datepicker = $("#datepicker");
    var summary = $("#Summary");
    var noteBody = $("#noteBody");
    var  backToList  = $("#backToList");
    var newNote = $("#newNote-form");
    var formAlert = $("#form-alert");
    var tableBody = $("#note-data tbody");
    var jumpToNewNote =   $("#jumpToNewNote");
    var next =   $("#next");
    // blind the date picker plugin
    datepicker.datepicker();
    datepicker.datepicker( "option", "dateFormat","yy/mm/dd" );
    // jump to new note file
    jumpToNewNote.click(function(){
        window.location.href = 'http://localhost:3000/note/add';
    });
    backToList.click(function(){
        window.location.href = 'http://localhost:3000/note';
    });
    next.click(function(){
        var id =   $("#noteId");
        var requestConfig = {
            method: "GET",
            url: "/note/"+id.val()+"/next"
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            if(responseMessage.status==="success"){
                var note = JSON.parse(responseMessage.note);
                var NoteTitle = $("#NoteTitle");
                var NoteDueDate = $("#NoteDueDate");
                var NoteSummary = $("#NoteSummary");
                var NoteBody =   $("#NoteBody");
                var noteId =   $("#noteId");
                NoteTitle.text(note.NoteTitle);
                NoteDueDate.text(note.NoteDueDate);
                NoteSummary.html(note.NoteSummary);
                NoteBody.html(note.NoteBody);
                noteId.val(note.id);
            }else{
                var message = "This is the last note order by due date";
                next.prop('disabled', true);
                formAlert.text(message);
                formAlert.removeClass('hidden');
            }
        })
    });
    function isdate(intYear,intMonth,intDay){
        if(isNaN(intYear)||isNaN(intMonth)||isNaN(intDay)) return false;
        if(intMonth>12||intMonth<1) return false;
        if ( intDay<1||intDay>31)return false;
        if((intMonth==4||intMonth==6||intMonth==9||intMonth==11)&&(intDay>30)) return false;
        if(intMonth==2){
            if(intDay>29) return false;
            if((((intYear%100==0)&&(intYear%400!=0))||(intYear%4!=0))&&(intDay>28))return false;
        }
        return true;
    }

    newNote.submit(function (event) {
        event.preventDefault();

        var newTile = title.val();
        var newDate = datepicker.val();
        var newSummary = summary.val();
        var newBody = noteBody.val();
        if (!newTile) {
            formAlert.text('You must provide a title');
            formAlert.removeClass('hidden');
            return;
        }
        if (!newDate) {
            formAlert.text('You must provide a date in correct form yyyy/mm/dd 1');
            formAlert.removeClass('hidden');
            return;
        }else{
            var matchArray = newDate.match(/^([0-9]{4})\/([0-1][0-9])\/([0-3][0-9])$/);
            if(matchArray==null){
                formAlert.text('You must provide a date in correct form yyyy/mm/dd 2');
                formAlert.removeClass('hidden');
                return;
            }else{
                if(!isdate(matchArray[1],matchArray[2],matchArray[3])){
                    formAlert.text('You must provide a date in correct form yyyy/mm/dd 3');
                    formAlert.removeClass('hidden');
                    return ;
                }
            }
        }
        if (!newSummary) {
            formAlert.text('You must provide a summary for new note');
            formAlert.removeClass('hidden');
            return;
        }
        if (!newBody) {
            formAlert.text('You must provide a body for new note');
            formAlert.removeClass('hidden');
            return;
        }
        if (newTile && newDate && newSummary && newBody) {
            var requestConfig = {
                method: "POST",
                url: "/note/new",
                contentType: 'application/json',
                data: JSON.stringify({
                    id: "",
                    NoteTitle: newTile,
                    NoteDueDate: newDate,
                    NoteSummary: newSummary,
                    NoteBody: newBody
                })
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                //console.log(responseMessage);
                if(responseMessage.status==="success"){
                    window.location.href = 'http://localhost:3000/note/'+responseMessage.id;
                }else{
                    formAlert.text(responseMessage);
                    formAlert.removeClass('hidden');
                }
            })
        }
    });
})(jQuery, window.localStorage);


// jQuery is exported as $ and jQuery
// the location API is accessed via the window.location variable
