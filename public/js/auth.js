$(document).ready(function () {

    var logoutModal = `<div class="modal" tabindex="-1" role="dialog" id="logout-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>You have been logged out. See ya!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;

    function reloadHome() {
        window.location.href = './';
    };

    $("#log-out-button").on("click", function () {
        event.preventDefault();
        firebase.auth().signOut().then(function () {
            // alert("You have been signed out. See ya!");

            $(document.body).append(logoutModal);
            $("#logout-modal").modal("show");
            setTimeout(reloadHome, 2000);

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
            $(".login-section").addClass("d-none");
            $(".personal-section").removeClass("d-none");
        } else {
            console.log("Not logged in");
            $("#log-out-button").addClass("d-none");
            $("#my-ads-button").addClass("d-none");
            $(".login-section").removeClass("d-none")
            $(".personal-section").addClass("d-none");
            $("#manual-post-to-DB").prop("disabled",true);
            $("#post-to-DB").prop("disabled",true);
        }
    });

});