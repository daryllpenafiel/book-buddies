$(document).ready(function () {
    var bookList = $("tbody");
    getBooks();

    function createBookRow(bookData) {
        var newTr = $("<tr>");
        var deleteButton = $("<input>").addClass('btn btn-primary delete-item-button').attr("type",'delete').attr("value",'Delete').attr("id",bookData.id).attr("data-toggle","modal").attr("data-target","#delete-modal");

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
        $.get("/api/books/", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createBookRow(data[i]));
            }
            renderBookList(rowsToAdd);
        });
    };

    //-----------FILTER BY CATEGORY---------------------------//

    // $(document).on("click", "#category-filter-button", function () {
    //     var categorySelected = $("#categorySelectGroup").val();
    //     if (categorySelected === "All") {
    //         getBooks();
    //     } else {
    //         filterByCategory(categorySelected);
    //     }
    // });

    // function filterByCategory(category) {
    //     $.get("/api/filter-by-category/" + category, function (bookData) {
    //         var rowsToAdd = [];
    //         for (var i = 0; i < bookData.length; i++) {
    //             rowsToAdd.push(createBookRow(bookData[i]));
    //         }
    //         renderBookList(rowsToAdd);
    //         resetSearch();
    //     });
    // };


    // //-----------SEARCH BY TITLE---------------------------//
    // $(document).on("click", "#title-search-button", function () {
    //     var titleToSearch = $("#titleSearch").val();
    //     console.log(titleToSearch);

    //     searchByTitle(titleToSearch);
    // })

    // function searchByTitle(title) {
    //     $.get("/api/search-by-title/" + title, function (bookData) {
    //         var rowsToAdd = [];
    //         for (var i = 0; i < bookData.length; i++) {
    //             rowsToAdd.push(createBookRow(bookData[i]));
    //         }
    //         renderBookList(rowsToAdd);
    //         resetSearch();
    //     });
    // };

    // //-----------SEARCH BY AUTHOR---------------------------//
    // $(document).on("click", "#author-search-button", function () {
    //     var authorToSearch = $("#authorSearch").val();
    //     console.log(authorToSearch);
    //     searchByAuthor(authorToSearch);
    // })

    // function searchByAuthor(author) {
    //     $.get("/api/search-by-author/" + author, function (bookData) {
    //         var rowsToAdd = [];
    //         for (var i = 0; i < bookData.length; i++) {
    //             rowsToAdd.push(createBookRow(bookData[i]));
    //         }
    //         renderBookList(rowsToAdd);
    //         resetSearch();
    //     });
    // };


    // //-----------SEARCH BY ISBN---------------------------//
    // $(document).on("click", "#isbn-search-button", function () {
    //     var isbnToSearch = $("#isbnSearch").val();
    //     console.log(isbnToSearch);
    //     searchByISBN(isbnToSearch);
    // });

    // function searchByISBN(isbn) {
    //     $.get("/api/search-by-isbn/" + isbn, function (bookData) {
    //         var rowsToAdd = [];
    //         for (var i = 0; i < bookData.length; i++) {
    //             rowsToAdd.push(createBookRow(bookData[i]));
    //         }
    //         renderBookList(rowsToAdd);
    //         resetSearch();
    //     });
    // };


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
    
    function resetSearch(){
        $("#titleSearch").val("");
        $("#isbnSearch").val("");
        $("#authorSearch").val("");
        $("#categorySelectGroup").val("All");
    };

});