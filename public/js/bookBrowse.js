$(document).ready(function () {
    var bookList = $("tbody");
    getBooks();

    function createBookRow(bookData) {
        var newTr = $("<tr>");
        
        newTr.data("books", bookData);
        newTr.append("<td>" + "<a href=" + "'./viewBook?bid=" + bookData.id + "'>" + bookData.title + "</a></td>");
        newTr.append("<td>" + bookData.isbn + "</td>");
        newTr.append("<td>" + bookData.author + "</td>");
        newTr.append("<td>" + bookData.category + "</td>");
        newTr.append("<td>" + bookData.condition + "</td>");
        newTr.append("<td> $" + bookData.price + "</td>");
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
  
    $(document).on("click","#category-filter-button",function(){
        var categorySelected = $("#categorySelectGroup").val();
        if (categorySelected === "All"){
            getBooks();
        } else {
            filterByCategory(categorySelected);
        }
    });

    function filterByCategory(category) {
        $.get("/api/filter-by-category/"+category, function (bookData) {
            var rowsToAdd = [];
            for (var i = 0; i < bookData.length; i++) {
                rowsToAdd.push(createBookRow(bookData[i]));
            }
            renderBookList(rowsToAdd);
        });
    };


    //-----------SEARCH BY TITLE---------------------------//
    $(document).on("click","#title-search-button",function(){
        var titleToSearch = $("#titleSearch").val();
        console.log(titleToSearch);
        searchByTitle(titleToSearch);
    })

    function searchByTitle(title) {
        $.get("/api/search-by-title/"+title, function (bookData) {
            var rowsToAdd = [];
            for (var i = 0; i < bookData.length; i++) {
                rowsToAdd.push(createBookRow(bookData[i]));
            }
            renderBookList(rowsToAdd);
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
        alertDiv.text("No books in the database.");
        bookList.append(alertDiv);
    }

});