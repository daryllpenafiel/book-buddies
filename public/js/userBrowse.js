$(document).ready(function () {

    var userList = $("tbody");
    getUsers();

    function createUserRow(userData) {
        var newTr = $("<tr>");

        newTr.data("users", userData);
        newTr.append("<td>" + "<a href='https://www.google.com'>" + userData.firstName + "</a></td>");
        newTr.append("<td>" + userData.lastName + "</td>");
        newTr.append("<td>" + userData.userName + "</td>");
        newTr.append("<td>" + userData.email + "</td>");
        newTr.append("<td>" + userData.number + "</td>");
        newTr.append("<td>" + userData.postalCode + "</td>");
        newTr.append("<td>" + userData.school + "</td>");

        return newTr;
    }

    function getUsers() {
        $.get("/api/users", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createUserRow(data[i]));
            }
            renderUserList(rowsToAdd);
        });
    };

    function renderUserList(rows) {
        if (rows.length) {
            userList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no books
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.text("No users in the database.");
        userList.append(alertDiv);
    }

});