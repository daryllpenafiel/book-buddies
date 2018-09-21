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

        firstName = $("#reg-firstName").val().trim();
        lastName = $("#reg-lastName").val().trim();
        phoneNumber = $("#reg-userPhone").val().trim();
        email = $("#reg-inputEmail").val().trim();
        userName = $("#reg-userName").val().trim();
        postalCode = $("#reg-userPostalCode").val().trim();
        school = $("#reg-userSchool").val().trim();

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
        $("#reg-firstName").val("");
        $("#reg-lastName").val("");
        $("#reg-userPhone").val("")
        $("#reg-inputEmail").val("")
        $("#reg-userName").val("")
        $("#reg-userPostalCode").val("")
        $("#reg-userSchool").val("")
    }

$(document).ready(function (){

    $("#create-new-user-button").on("click", handleUserFormSubmit);

});