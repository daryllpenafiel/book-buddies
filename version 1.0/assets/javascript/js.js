$(document).ready(function () {

    $(document).on("click", "#book-search-button", function () {
        event.preventDefault();

        

        var isbn = $("#isbn-search-input").val();
        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + encodeURI(isbn);

        // var queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + encodeURI(isbn) + "&key=" + APIkey;

        // console.log(`isbn: ${isbn}`);
        console.log(queryURL);
        $("#isbn-search-input").val("");

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

                    console.log(`title: ${bookTitle}`);
                    console.log(`authors: ${bookAuthor}`);
                    console.log(`category: ${bookCategory}`);
                    console.log(`image: ${bookThumbnail}`);
                    console.log(`link: ${bookLink}`);
                    console.log("-----------------------------");

                    var bookCard =
                        `<div class="card" style="width: 18rem;">` +
                        `<img class="card-img-top" src="${bookThumbnail}" alt="Card image cap">` +
                        `<div class="card-body">` +
                        `<h5 class="card-title">${bookTitle}</h5>` +
                        `<p class="card-text">Author(s): ${bookAuthor}</p>` +
                        `<p class="card-text">Category: ${bookCategory}</p>` +
                        `<a href="${bookLink}" target="_blank" class="btn btn-primary">Google Books Page</a>` +
                        `</div>` +
                        `</div>`;

                    $(".results-here").append(bookCard);

                    console.log("appended");
                }
            }
        })

    })

});