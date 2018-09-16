var bookList = $("tbody");

function getBooks(bid) {
    $.get("/api/viewBook/" + bid, function (data) {
        bookList.prepend(createBookRow(data));
        createBookCard(data);
        createUserCard(data);
    });
};

function renderBookList(rows) {
    if (rows.length) {
        bookList.prepend(rows);
    } else {
        renderEmpty();
    }
}

function createUserCard (userData) {
    var userCard =
        `<div class="card" style="width: 18rem;">` +
        `<img class="card-img-top" src="${userData.user.userName}" alt="Card image cap">` +
        `<div class="card-body">` +
        `<h5 class="card-title card-bookTitle">${userData.user.email}</h5>` +
        // `<p class="card-text card-bookAuthor" data-value="${bookData.author}">Author(s): ${bookData.author}</p>` +
        `<p class="card-text card-bookCategory" data-value="${userData.user.school}">Category: ${userData.user.school}</p>` +
        // `<p class="card-text card-bookISBN" data-value="${bookData.isbn}">ISBN: ${bookData.isbn}</p>` +
        `<a target="_blank" class="btn btn-primary confirm-book-button">Contact Poster</a>` +
        `</div>` +
        `</div>`;

    $("#user-here").append(userCard);
}

function createBookCard (bookData){
    var bookCard =
        `<div class="card" style="width: 18rem;">` +
        `<img class="card-img-top" src="${bookData.image}" alt="Card image cap">` +
        `<div class="card-body">` +
        `<h5 class="card-title card-bookTitle">${bookData.title}</h5>` +
        `<p class="card-text card-bookAuthor" data-value="${bookData.author}">Author(s): ${bookData.author}</p>` +
        `<p class="card-text card-bookCategory" data-value="${bookData.category}">Category: ${bookData.category}</p>` +
        `<p class="card-text card-bookISBN" data-value="${bookData.isbn}">ISBN: ${bookData.isbn}</p>` +
        `<a href="${"yay"}" target="_blank" class="btn btn-primary">Google Books Page</a>` +
        `<a target="_blank" class="btn btn-primary confirm-book-button">Create posting</a>` +
        `</div>` +
        `</div>`;

    $("#book-here").append(bookCard);
}

function createBookRow(bookData) {
    var newTr = $("<tr>");
    var deleteButton = $("<input>").addClass('btn btn-primary delete-item-button').attr("type", 'delete').attr("value", 'Delete').attr("id", bookData.id).attr("data-toggle", "modal").attr("data-target", "#delete-modal");
    // var checkoutButton = $("<input>").addClass('btn btn-primary checkout-item-button').attr("type", 'checkout').attr("value", 'Checkout').attr("id", bookData.id);

    newTr.data("books", bookData);
    newTr.append("<td>" + "<a href=" + "'./viewBook?bid=" + bookData.id + "'>" + bookData.title + "</a></td>");
    newTr.append("<td>" + bookData.isbn + "</td>");
    newTr.append("<td>" + bookData.author + "</td>");
    newTr.append("<td>" + bookData.category + "</td>");
    newTr.append("<td>" + bookData.condition + "</td>");
    newTr.append("<td>" + bookData.price + "</td>");
    newTr.append("<td>" + bookData.comments + "</td>");
    newTr.append("<td>" + bookData.user.id + "</td>");
    newTr.append("<td>" + bookData.user.email + "</td>");
    newTr.append("<td>" + bookData.user.school + "</td>");
    // newTr.append(checkoutButton);
    // newTr.append(deleteButton);
    return newTr;
}

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
});