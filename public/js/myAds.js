$(document).ready(function () {
    var bookList = $("tbody");
    $(".myAds-nav").addClass("active");

    getBooks();

    function createBookRow(bookData) {
        var newTr = $("<tr>");
        var deleteButton = $("<input>").addClass('btn btn-warning my-2 delete-item-button').attr("type", 'delete').attr("value", 'Delete ad').attr("id", bookData.id).attr("data-toggle", "modal").attr("data-target", "#delete-modal");

        newTr.data("books", bookData);
        newTr.append("<td>" + "<a href=" + "'./viewBook?bid=" + bookData.id + "'>" + bookData.title + "</a></td>");
        newTr.append("<td>" + bookData.isbn + "</td>");
        newTr.append("<td>" + bookData.author + "</td>");
        newTr.append("<td>" + bookData.category + "</td>");
        newTr.append("<td>" + bookData.condition + "</td>");
        newTr.append("<td> $" + bookData.price + "</td>");
        newTr.append(deleteButton);

        return newTr;
    }

    function getBooks() {
        var email;
        firebase.auth().onAuthStateChanged(firebaseUser => {

            if (firebaseUser) {
                email = firebaseUser.email;
                $.get("/api/myAds/" + email, function (data) {

                    var rowsToAdd = [];
                    for (var i = 0; i < data.length; i++) {
                        rowsToAdd.push(createBookRow(data[i]));
                    }
                    renderBookList(rowsToAdd);
                });
            } else {
                console.log("Not logged in");
            }
            return email;
        });

    };


    //-----------RENDER ROWS---------------------------//

    function renderBookList(rows) {
        $("tbody").empty();

        if (rows.length) {
            bookList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no books
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.text("No books found.");
        bookList.append(alertDiv);
    }

    function resetSearch() {
        $("#titleSearch").val("");
        $("#isbnSearch").val("");
        $("#authorSearch").val("");
        $("#categorySelectGroup").val("All");
    };

    $(document).on("click", ".delete-item-button", function () {
        $("#delete-ad-modal").modal("show");

        var id=$(this).attr("id");

        $("#delete-ad-modal").on("click", ".yes-delete-button", function () {
            $.ajax("/api/myAds/" + id, {
                type: "DELETE"
            }).then(
                function () {
                    window.location.reload();
                }
            );
        });
    });
});