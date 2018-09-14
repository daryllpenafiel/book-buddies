console.log("hello");

    var firstName;
    var lastName;
    var phoneNumber;
    var email;
    var userName;
    var postalCode;
    var school;

    function handleUserFormSubmit(event) {
        event.preventDefault();

        firstName = $("#firstName").val().trim();
        lastName = $("#lastName").val().trim();
        phoneNumber = $("#userPhone").val().trim();
        email = $("#userEmail").val().trim();
        userName = $("#userName").val().trim();
        postalCode = $("#userPostalCode").val().trim();
        school = $("#userSchool").val().trim();

        if (!firstName || !lastName || !email || !phoneNumber || !userName || !postalCode) {
            alert("Please fill in all fields.");
        } else {
            postUser({
                firstName: firstName,
                lastName: lastName,
                number: phoneNumber,
                email: email,
                postalCode: postalCode,
                userName: userName,
                school: school
            })
        };
    }

    //route for posting a new user
    function postUser(newUserData) {
        $.post("/api/users", newUserData)
            .then(function () {
                console.log();
                resetForm();
            })
    };

    function resetForm(){
        console.log("reset done!");
        $("#firstName").val("");
        $("#lastName").val("");
        $("#userPhone").val("")
        $("#userEmail").val("")
        $("#userName").val("")
        $("#userPostalCode").val("")
        $("#userSchool").val("")
    }

$(document).ready(function (){

    $("#create-new-user-button").on("click", handleUserFormSubmit);

});