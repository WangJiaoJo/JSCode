(function ($) {
     $("#all-notes").click(function () {
            $("#new-content").load("pages/all");
            
            return false;
        });

        $("#new-note").click(function () {
            $("#new-content").load("pages/new");
            return false;
        });
        //Attention, you need to select class by using dot rather than #
        $(".single").click(function () {
            var page = $(this).attr('href');
            $("#new-content").load(page);
            return false;
            // event.preventDefault();
        })

    var myNewNoteForm = $("#new-item-form");

    myNewNoteForm.submit(function (event) {
        event.preventDefault();

        newTitleInput = $("#new-note-title");
        newSummaryArea = $("#new-note-summary");
        newDateArea = $("#new-note-date");
        newBodyArea = $("#new-note-body");

        var newTitle = newTitleInput.val();
        var newSummary = newSummaryArea.val();
        var newDate = newDateArea.val();
        var newBody = newBodyArea.val();
        var newContent = $("#new-content");

            if (!newTitle) {
                // alert("error");
                $("#error-title").append("<div style='color:#0000FF'>Please provide title</div>");
                event.preventDefault();
            }

            if (!newSummary) {
                $("#error-summary").append("<div style='color:#0000FF'>Please provide summary</div>");
                event.preventDefault();
            }

            if (!newDate) {
                $("#error-date").append("<div style='color:#0000FF'>Please provide valid date</div>");
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

            if (newSummary) {
                $("#error-summary").remove();
                event.preventDefault();
            }

            if (newDate) {
                $("#error-date").remove();
                event.preventDefault();
            }

            if (newBody) {
                $("#error-body").remove();
                event.preventDefault();
            }

        if (newTitle && newSummary && newDate && newBody) {
            $.ajax ({
                method: "POST",
                url: "/pages/new/note",
                contentType: 'application/json',
                data: JSON.stringify({
                    id: "",
                    title: newTitle,
                    summary: newSummary,
                    date: newDate,
                    body: newBody,
                })
            })

            .then(function (responseMessage) {
                //console.log(responseMessage.title);
                $("#new-content").load("/pages/"+responseMessage.id);
            });
        }
    });
})(window.jQuery);