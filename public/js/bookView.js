var bookList = $("tbody");

function getBooks(bid) {
    $.get("/api/viewBook/" + bid, function (data) {
        inserBookData(data);
        insertUserData(data);
    });
};

function inserBookData(bookData) {
    $(".book-title").append(bookData.title);
    $(".book-isbn").append(bookData.isbn);
    $(".book-author").append(bookData.author);
    $(".book-price").append("$" + bookData.price);
    $(".book-category").append(bookData.category);
    $(".book-comments").append(bookData.comments);
};

function insertUserData(userData) {
    $(".user-username").append(userData.user.userName);
    $(".user-school").append(userData.user.school);
    $(".user-email").append(userData.user.email);
    $(".user-number").append(userData.user.number);
    $(".user-location").append(userData.user.postalCode);
};

// Function for handling what to render when there are no books
function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.text("No books in the database.");
    bookList.append(alertDiv);
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};




$(document).ready(function () {
    var bid = getUrlParameter('bid');
    getBooks(bid);


    $(document).on("click", "#contact-poster-button",function() {
        $('#contact-poster-modal').modal('show');
    });

});