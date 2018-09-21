$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDLSFxBJqWeoiQ3v1dLPzE4xdeLVV8SWa4",
        authDomain: "book-buddies-215701.firebaseapp.com",
        databaseURL: "https://book-buddies-215701.firebaseio.com",
        projectId: "book-buddies-215701",
        storageBucket: "book-buddies-215701.appspot.com",
        messagingSenderId: "93267305761"
    };

    firebase.initializeApp(config);


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
            promise.catch(e => console.log(e.message));
        });
    });

    //Log Out
    $("#log-out-button").on("click", function () {
        event.preventDefault();
        firebase.auth().signOut();
    });

    //Auth State
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            $("#log-out-button").removeClass("d-none");

        } else {
            console.log("Not logged in");
            $("#log-out-button").addClass("d-none");
        }
    });

});