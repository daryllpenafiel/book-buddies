$(document).ready(function () {

    var searchKeyword;
    var queryURL;
    
    $(document).on("click", "#book-search-button", function () {
        event.preventDefault();

        $(".results-here").empty();

        function checkSearchMethod() {
            var selection = $("input[type=radio][name=search-method]:checked").val();

            switch (selection) {
                case "title":
                    searchKeyword = encodeURI($("#title-search-input").val());
                    queryURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + searchKeyword;
                    console.log(queryURL);
                    break;
                case "isbn":
                    searchKeyword = encodeURI($("#isbn-search-input").val());
                    queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + searchKeyword;
                    console.log(queryURL);
                    break;
                case "manual":
                    console.log("manual");
                    $('#manualFormModal').modal('show');
                    break;
                default:
                    console.log("mehh");
            }
            return queryURL;
        };

        checkSearchMethod();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var result = response.items;
            var r = result.length;

            if (!result) {
                console.log("no results");
            } else {
                for (i = 0; i < r; i++) {

                    var bookThumbnail = result[i].volumeInfo.imageLinks.thumbnail;
                    var bookTitle = result[i].volumeInfo.title;
                    var bookAuthor = result[i].volumeInfo.authors;
                    var bookCategory = result[i].volumeInfo.categories;
                    var bookLink = result[i].volumeInfo.previewLink;
                    var bookISBN = result[i].volumeInfo.industryIdentifiers[0].identifier;

                    // console.log(`title: ${bookTitle}`);
                    // console.log(`authors: ${bookAuthor}`);
                    // console.log(`category: ${bookCategory}`);
                    // console.log(`image: ${bookThumbnail}`);
                    // console.log(`link: ${bookLink}`);
                    // console.log(`ISBN: ${bookISBN}`);
                    // console.log("-----------------------------");

                    var bookCard =
                        `<div class="card" style="width: 18rem;">` +
                        `<img class="card-img-top card-image" src="${bookThumbnail}" alt="Card image cap">` +
                        `<div class="card-body">` +
                        `<h5 class="card-title card-bookTitle">${bookTitle}</h5>` +
                        `<p class="card-text card-bookAuthor" data-value="${bookAuthor}">Author(s): ${bookAuthor}</p>` +
                        `<p class="card-text card-bookCategory" data-value="${bookCategory}">Category: ${bookCategory}</p>` +
                        `<p class="card-text card-bookISBN" data-value="${bookISBN}">ISBN: ${bookISBN}</p>` +
                        `<a href="${bookLink}" target="_blank" class="btn btn-primary">Google Books Page</a>` +
                        `<a target="_blank" class="btn btn-primary confirm-book-button">Create posting</a>` +
                        `</div>` +
                        `</div>`;

                    $(".results-here").append(bookCard);

                    $("#title-search-input").val("")
                    $("#isbn-search-input").val("")
                }
            }
        })
    })

    $(document).on("click", "#manual-post-to-DB", function () {
        var bookTitle = $("#manual-title-input").val();
        var bookAuthor = $("#manual-author-input").val();
        var bookCategory = $("#manual-category-select").val();
        var bookISBN = $("#manual-isbn-input").val();
        var bookCondition = $("#manual-condition-select").val();
        var bookPrice = $("#manual-price-input").val();
        var bookComments = $("#manual-comment-input").val();
        var sellerEmail = $("#manual-sellerEmail").val();

        // console.log(`title: ${bookTitle}`);
        // console.log(`authors: ${bookAuthor}`);
        // console.log(`category: ${bookCategory}`);
        // console.log(`ISBN: ${bookISBN}`);
        // console.log(`Condition: ${bookCondition}`);
        // console.log(`Price: ${bookPrice}`);
        // console.log(`Comments: ${bookComments}`);
        // console.log(`Email: ${sellerEmail}`);
        // console.log("-----------------------------");

        if (!bookPrice) {
            alert("Please fill in the asking price field.")
        } else {
            postBooktoDB({
                title: bookTitle,
                author: bookAuthor,
                category: bookCategory,
                isbn: bookISBN,
                condition: bookCondition,
                price: bookPrice,
                comments: bookComments,
                userId: sellerEmail
            })
        }
    });
});


    $(document).on("click", ".confirm-book-button", function () {

        var bookTitle = $(this).siblings(".card-bookTitle").text();
        var bookAuthor = $(this).siblings(".card-bookAuthor").attr("data-value");
        var bookCategory = $(this).siblings(".card-bookCategory").attr("data-value");
        var bookISBN = $(this).siblings(".card-bookISBN").attr("data-value");

        //-------Modal Input Values---------//

        $('#postBookModal').modal('show');

        $(".post-modal-bookTitle").text(`Title: ${bookTitle}`);
        $(".post-modal-bookAuthor").text(`Author: ${bookAuthor}`);
        $(".post-modal-bookCategory").text(`Category: ${bookCategory}`);
        $(".post-modal-bookISBN").text(`ISBN: ${bookISBN}`);

        $(document).on("click", "#post-to-DB", function () {

            var bookCondition = $("#condition-select").val();
            var bookPrice = $("#price-input").val();
            var bookComments = $("#comment-input").val();
            var sellerEmail = $("#sellerEmail").val();

            // console.log(`title: ${bookTitle}`);
            // console.log(`authors: ${bookAuthor}`);
            // console.log(`category: ${bookCategory}`);
            // console.log(`ISBN: ${bookISBN}`);
            // console.log(`Condition: ${bookCondition}`);
            // console.log(`Price: ${bookPrice}`);
            // console.log(`Comments: ${bookComments}`);
            // console.log(`Email: ${sellerEmail}`);
            // console.log("-----------------------------");

            if (!bookPrice) {
                alert("Please fill in the asking price field.")
            } else {
                postBooktoDB({
                    title: bookTitle,
                    author: bookAuthor,
                    category: bookCategory,
                    isbn: bookISBN,
                    condition: bookCondition,
                    price: bookPrice,
                    comments: bookComments,
                    userId: sellerEmail
                })
            }
        });
    });

    function postBooktoDB(newBookData) {
        $.post("/api/books", newBookData)
            .then(function () {
                resetForm();
            })
    };

    function resetForm() {
        console.log("reset done!");
        $("#condition-select").val("");
        $("#price-input").val("");
        $("#comment-input").val("");
        $("#sellerEmail").val("");
        $(".results-here").empty();
        bookTitle;
        bookAuthor;
        bookCategory;
        bookISBN;
    };