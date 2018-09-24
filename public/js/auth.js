$(document).ready(function(){

    $("#log-out-button").on("click", function () {
        event.preventDefault();
        firebase.auth().signOut().then(function(){
            alert("You have been signed out. See ya!");
            window.location.href = './';
        });
    });

    //Auth State
    firebase.auth().onAuthStateChanged(firebaseUser => {

        if (firebaseUser) {
            var email = firebaseUser.email;
            var uid = firebaseUser.uid;
            console.log(email);
            console.log(uid);
            $("#log-out-button").removeClass("d-none");
            $("#my-ads-button").removeClass("d-none");
            $("#log-in-modal-button").addClass("d-none");
            $("#sign-up-modal-button").addClass("d-none");
        } else {
            console.log("Not logged in");
            $("#log-out-button").addClass("d-none");
            $("#my-ads-button").addClass("d-none");
            $("#log-in-modal-button").removeClass("d-none");
            $("#sign-up-modal-button").removeClass("d-none");
        }
    });

});