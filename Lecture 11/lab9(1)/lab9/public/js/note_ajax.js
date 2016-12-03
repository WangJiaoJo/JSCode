(function ($) { 

    // $(document).ready(function () {
    //     // $("#new-content").load("/all");

        $("#link-all").click(function () {
            $("#new-content").load("/all");
            
            return false;
        });

        $("#link-new").click(function () {
            $("#new-content").load("/new");
            return false;
        });
        //Attention, you need to select class by using dot rather than #
        $(".track-single").click(function () {
            var page = $(this).attr('href');
            $("#new-content").load(page);
            return false;
            // event.preventDefault();
        })
        var myNoteForm = $("#new-note-form");
        // $("#add-button").click(function (event) {
        myNoteForm.submit(function (event) {
            event.preventDefault();
            // alert("hello");

            var newTitle = $("#new-title").val(),
                newDue = $("#new-due").val(),
                newSummary = $("#new-summary").val(),
                newBody = $("#new-body").val();

            if (!newTitle) {
                // alert("error");
                $("#error-title").append("<div style='color:#0000FF'>Please provide title</div>");
                event.preventDefault();
            }

            if (!newDue) {
                $("#error-due").append("<div style='color:#0000FF'>Please provide valid due date</div>");
                event.preventDefault();
            }

            if (!newSummary) {
                $("#error-summary").append("<div style='color:#0000FF'>Please provide summary</div>");
                event.preventDefault();
            }

            if (!newBody) {
                $("#error-body").append("<div style='color:#0000FF'>Please provide description</div>");
                event.preventDefault();
            }

            if (newTitle) {
                $("#error-title").remove();
                event.preventDefault();
            }

            if (newDue) {
                $("#error-due").remove();
                event.preventDefault();
            }

            if (newSummary) {
                $("#error-summary").remove();
                event.preventDefault();
            }

            if (newBody) {
                $("#error-body").remove();
                event.preventDefault();
            }

            if (newTitle && newDue && newSummary && newBody) {
                // alert("hello");
                $.ajax({
                    method: "POST",
                    url: "/new",
                    contentType: "application/json",
                    data: JSON.stringfy({
                        id: "",
                        title: newTitle,
                        due: newDue,
                        summary: newSummary,
                        body: newBody
                    })

                }).then(function (responseMessage) {
                        alert("helolo");
                        alert(responseMessage.id);
                        console.log(responseMessage.title);
                        $("#new-content").load("/single/"+responseMessage.id);
                    
                });
            }
        });
})(jQuery, window.localStorage);