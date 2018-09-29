function reloadSellPage() {
    window.location.href = './myAds';
};

$(document).ready(function () {

    $(".sell-nav").addClass("active");
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
                    if (!searchKeyword) {
                        $(".messageModal-text").text("Please enter book title.").addClass("text-danger");
                        $("#messageModal").modal("show");
                        break;
                    } else {
                        queryURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + searchKeyword;
                        performBookSearch(queryURL);
                        break;
                    }
                case "isbn":
                    searchKeyword = encodeURI($("#isbn-search-input").val());
                    if (!searchKeyword) {
                        $(".messageModal-text").text("Please enter ISBN.").addClass("text-danger");
                        $("#messageModal").modal("show");
                        break;
                    } else {
                        queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + searchKeyword;
                        performBookSearch(queryURL)
                        break;
                    }
                case "manual":
                    firebase.auth().onAuthStateChanged(firebaseUser => {
                        var fbemail;

                        if (firebaseUser) {
                            fbemail = firebaseUser.email;
                        } else {
                            fbemail = "Please log in to to post a listing."
                        }
                        $("#manual-sellerEmail").text(fbemail);
                    });
                    $('#manualFormModal').modal('show');
                    break;
                default:
                    console.log("input needed");
            }
            return queryURL;
        };

        checkSearchMethod();

        function performBookSearch(queryURL) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var result = response.items;
                var r = result.length;

                for (i = 0; i < r; i++) {

                    var bookThumbnail = result[i].volumeInfo.imageLinks.thumbnail;
                    var bookTitle = result[i].volumeInfo.title;
                    var bookAuthor = result[i].volumeInfo.authors;
                    var bookCategory = result[i].volumeInfo.categories;
                    var bookLink = result[i].volumeInfo.previewLink;
                    var bookISBN = result[i].volumeInfo.industryIdentifiers[0].identifier;

                    var bookCard =
                        `<div class="card book-result-card" style="width: 18rem;">` +
                        `<img class="card-img-top card-image" src="${bookThumbnail}" alt="Card image cap">` +
                        `<div class="card-body">` +
                        `<h5 class="card-title card-bookTitle">${bookTitle}</h5>` +
                        `<p class="card-text card-bookAuthor" data-value="${bookAuthor}">Author(s): ${bookAuthor}</p>` +
                        `<p class="card-text card-bookCategory" data-value="${bookCategory}">Category: ${bookCategory}</p>` +
                        `<p class="card-text card-bookISBN" data-value="${bookISBN}">ISBN: ${bookISBN}</p>` +
                        `<a href="${bookLink}" target="_blank" class="btn btn-info btn-google" image-link="${bookThumbnail}">Google Books Page</a>` +
                        `<a target="_blank" class="btn btn-primary confirm-book-button">Create posting</a>` +
                        `</div>` +
                        `</div>`;

                    $(".results-here").append(bookCard);

                    $("#title-search-input").val("")
                    $("#isbn-search-input").val("")
                }
            }).catch(function () {
                var noResults = `<div class="container">
                <div class="jumbotron mt-4">
                    <h5 class="display-4 text-center">No results found. Try another search or fill in the book information manually.</h5> <br>
                </div></div>`;

                if ($(".results-here").children().length === 0)
                    $(".results-here").append(noResults);
            });
        }

    })

    $(document).on("click", "#manual-post-to-DB", function () {
        $(".bookPostingErrorMessage").empty();

        var bookTitle = $("#manual-title-input").val();
        var bookAuthor = $("#manual-author-input").val();
        var bookCategory = $("#manual-category-select").val();
        var bookISBN = $("#manual-isbn-input").val();
        var bookCondition = $("#manual-condition-select").val();
        var bookPrice = $("#manual-price-input").val();
        var bookComments = $("#manual-comment-input").val();
        var sellerEmail = $("#manual-sellerEmail").text();

        if (!bookTitle) {
            $(".bookPostingErrorMessage").empty();
            $(".bookPostingErrorMessage").text("Please fill in the title field.")
        } else if (!bookAuthor) {
            $(".bookPostingErrorMessage").empty();
            $(".bookPostingErrorMessage").text("Please fill in the author field.")
        } else if (!bookISBN) {
            $(".bookPostingErrorMessage").empty();
            $(".bookPostingErrorMessage").text("Please fill in the ISBN field.")
        } else if (!bookPrice) {
            $(".bookPostingErrorMessage").empty();
            $(".bookPostingErrorMessage").text("Please fill in the asking price field.")
        } else {
            $(".bookPostingErrorMessage").empty();
            postBooktoDB({
                title: bookTitle,
                author: bookAuthor,
                category: bookCategory,
                isbn: bookISBN,
                condition: bookCondition,
                price: bookPrice,
                comments: bookComments,
                email: sellerEmail
            })
        }
    });
});


$(document).on("click", ".confirm-book-button", function () {
    $(".bookPostingErrorMessage").empty();

    $("#price-input").val("");
    $("#comment-input").val("");

    var bookTitle = $(this).siblings(".card-bookTitle").text();
    var bookAuthor = $(this).siblings(".card-bookAuthor").attr("data-value");
    var bookCategory = $(this).siblings(".card-bookCategory").attr("data-value");
    var bookISBN = $(this).siblings(".card-bookISBN").attr("data-value");
    var bookImage = $(this).siblings(".btn-google").attr("image-link");

    //Auth State
    firebase.auth().onAuthStateChanged(firebaseUser => {
        var fbemail;

        if (firebaseUser) {
            fbemail = firebaseUser.email;
        } else {
            fbemail = "Please log in to to post a listing."
            $("#manual-sellerEmail").addClass("text-danger");
            $("#sellerEmail").addClass("text-danger");
        }
        $("#manual-sellerEmail").text(fbemail);
        $("#sellerEmail").text(fbemail);
    });

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
        var sellerEmail = $("#sellerEmail").text();

        if (!bookPrice) {
            $(".bookPostingErrorMessage").empty();
            $(".bookPostingErrorMessage").text("Please fill in the asking price field.")
        } else {
            $(".bookPostingErrorMessage").empty();
            postBooktoDB({
                title: bookTitle,
                author: bookAuthor,
                category: bookCategory,
                image: bookImage,
                isbn: bookISBN,
                condition: bookCondition,
                price: bookPrice,
                comments: bookComments,
                email: sellerEmail
            })
        }
    });
});

function postBooktoDB(newBookData) {
    $.post("/api/books", newBookData)
        .then(function () {
            resetForm();
            $(".messageModal-text").text("Your ad has been posted!").removeClass("text-danger");
            $("#messageModal").modal("show");
            $('#postBookModal').modal("hide");
            $('#manualFormModal').modal("hide");
            setTimeout(reloadSellPage, 1500);
        })
};

$(document).on("keypress", function () {
    if (event.keyCode === 13) {
        $("#book-search-button").click();
    }
});

function resetForm() {
    $("#condition-select").val("");
    $("#price-input").val("");
    $("#comment-input").val("");
    $("#manual-title-input").val("");
    $("#manual-author-input").val("");
    $("#manual-category-select").val("");
    $("#manual-isbn-input").val("");
    $("#manual-condition-select").val("");
    $("#manual-price-input").val("");
    $("#manual-comment-input").val("");

    $(".results-here").empty();

    result = [];
};