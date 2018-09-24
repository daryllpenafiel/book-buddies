    var firstName;
    var lastName;
    var phoneNumber;
    var email;
    var userName;
    var postalCode;
    var school;

    function handleUserFormSubmit() {

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
            resetForm();
        };
    }

    //route for posting a new user
    function postUser(newUserData) {
        $.post("/api/users", newUserData)
            .then(function () {
                console.log();
            })
    };

    function resetForm() {
        console.log("reset done!");
        $("#reg-firstName").val("");
        $("#reg-lastName").val("");
        $("#reg-userPhone").val("")
        $("#reg-inputEmail").val("")
        $("#reg-userName").val("")
        $("#reg-userPostalCode").val("")
        $("#reg-userSchool").val("")
    }


    $(document).ready(function () {

        //Log in
        $("#log-in-modal-button").on("click", function () {
            event.preventDefault();
            $('#loginModal').modal('show');

            $("#log-in-button").on("click", function () {
                event.preventDefault();
                var email = $("#inputEmail").val();
                var pass = $("#inputPassword").val();

                console.log(email);
                console.log(pass);

                const auth = firebase.auth();
                const promise = auth.signInWithEmailAndPassword(email, pass);
                promise.then(function(){
                    alert("Welcome to Book Buddies!");
                    window.location.href = './';
                });
                promise.catch(e => console.log(e.message));
            });
        });

        //Sign up/Register
        $("#sign-up-modal-button").on("click", function () {
            event.preventDefault();
            $('#signUpModal').modal('show');

            $("#sign-up-button").on("click", function () {
                event.preventDefault();
                var email = $("#reg-inputEmail").val();
                var pass = $("#reg-inputPassword").val();

                console.log(email);
                console.log(pass);

                const auth = firebase.auth();
                const promise = auth.createUserWithEmailAndPassword(email, pass);
                promise.then(function(){
                    handleUserFormSubmit();
                });
                promise.catch(e => {
                    console.log(e.message);
                    alert(e.message);
                });
            });

        })
    });