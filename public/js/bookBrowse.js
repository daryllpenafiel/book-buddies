$(document).ready(function () {

    var bookList = $("tbody");
    getBooks();

    function createBookRow(bookData) {
        var newTr = $("<tr>");
        // var deleteButton = $("<input>").addClass('btn btn-primary delete-item-button').attr("type", 'delete').attr("value", 'Delete').attr("id", bookData.id).attr("data-toggle", "modal").attr("data-target", "#delete-modal");
        // var checkoutButton = $("<input>").addClass('btn btn-primary checkout-item-button').attr("type", 'checkout').attr("value", 'Checkout').attr("id", bookData.id);

        newTr.data("books", bookData);
        newTr.append("<td>" + "<a href=" + "'./viewBook?bid=" + bookData.id + "'>" + bookData.title + "</a></td>");
        newTr.append("<td>" + bookData.isbn + "</td>");
        newTr.append("<td>" + bookData.author + "</td>");
        newTr.append("<td>" + bookData.category + "</td>");
        newTr.append("<td>" + bookData.condition + "</td>");
        newTr.append("<td> $" + bookData.price + "</td>");
        // newTr.append("<td>" + bookData.comments + "</td>");
        // newTr.append(checkoutButton);
        // newTr.append(deleteButton);
        return newTr;
    }

    function getBooks() {
        $.get("/api/books/", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createBookRow(data[i]));
            }
            renderBookList(rowsToAdd);
        });
    };

    function renderBookList(rows) {
        if (rows.length) {
            bookList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no books
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.text("No books in the database.");
        bookList.append(alertDiv);
    }

});