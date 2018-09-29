    var firstName;
    var lastName;
    var phoneNumber;
    var email;
    var userName;
    var postalCode;
    var school;

    function handleUserFormSubmit() {

        $('#signUpModal').modal('hide');
        $('#account-created-modal').modal('show');

        firstName = $("#reg-firstName").val().trim();
        lastName = $("#reg-lastName").val().trim();
        phoneNumber = $("#reg-userPhone").val().trim();
        email = $("#reg-inputEmail").val().trim();
        userName = $("#reg-userName").val().trim();
        postalCode = $("#reg-userPostalCode").val().trim();
        school = $("#reg-userSchool").val().trim();

        postUser({
            firstName: firstName,
            lastName: lastName,
            number: phoneNumber,
            email: email,
            postalCode: postalCode,
            userName: userName,
            school: school
        });

        resetForm();

        setTimeout(reloadHome, 2000);
    };


    //route for posting a new user
    function postUser(newUserData) {
        $.post("/api/users", newUserData)
            .then(function () {
                console.log();
            })
    };

    function resetForm() {
        $("#reg-firstName").val("");
        $("#reg-lastName").val("");
        $("#reg-userPhone").val("")
        $("#reg-inputEmail").val("")
        $("#reg-userName").val("")
        $("#reg-userPostalCode").val("")
        $("#reg-userSchool").val("")
    }

    function reloadHome() {
        window.location.href = './';
    };

    $(document).ready(function () {

        var loginModal = `<div class="modal" tabindex="-1" role="dialog" id="login-modal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Message</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Welcome to Book Buddies!</p>
            </div>
          </div>
        </div>
      </div>`;


        //Log in
        $("#log-in-button").on("click", function () {
            event.preventDefault();
            var email = $("#inputEmail").val();
            var pass = $("#inputPassword").val();
            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.then(function () {
                $("#loginErrorMessage").empty();
                $('#loginModal').modal('hide');
                $(document.body).append(loginModal);
                $("#login-modal").modal("show");
                setTimeout(reloadHome, 2000);
            });
            promise.catch(e => {
                $("#loginErrorMessage").empty();
                $("#loginErrorMessage").append(e.message);
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
                var passVerify = $("#reg-inputPassword-verify").val();
                firstName = $("#reg-firstName").val().trim();
                lastName = $("#reg-lastName").val().trim();
                phoneNumber = $("#reg-userPhone").val().trim();
                userName = $("#reg-userName").val().trim();
                postalCode = $("#reg-userPostalCode").val().trim();
                school = $("#reg-userSchool").val().trim();

                if (!firstName || !lastName || !email || !phoneNumber || !userName || !postalCode) {
                    $("#signUpErrorMessage").empty();
                    $("#signUpErrorMessage").text("Please fill in all fields.")
                } else if (pass !== passVerify) {
                    $("#signUpErrorMessage").empty();
                    $("#signUpErrorMessage").text("Please ensure both password fields match.");
                } else {
                    $("#signUpErrorMessage").empty();
                    const auth = firebase.auth();
                    const promise = auth.createUserWithEmailAndPassword(email, pass);
                    promise.then(function () {
                        handleUserFormSubmit();
                    });
                    promise.catch(e => {
                        $("#signUpErrorMessage").empty();
                        $("#signUpErrorMessage").text(e.message);
                    });
                };
            })
        })
    });