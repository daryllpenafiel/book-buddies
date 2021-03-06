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
            $(document.body).append(logoutModal);
            $("#logout-modal").modal("show");
            setTimeout(reloadHome, 2000);
        });
    });

    //Auth State
    firebase.auth().onAuthStateChanged(firebaseUser => {

        if (firebaseUser) {
            $("#log-out-button").removeClass("d-none");
            $("#my-ads-button").removeClass("d-none");
            $(".login-section").addClass("d-none");
            $(".personal-section").removeClass("d-none");
            $("#nav-log-in-button").addClass("d-none");
        } else {
            $("#nav-log-in-button").removeClass("d-none");
            $("#log-out-button").addClass("d-none");
            $("#my-ads-button").addClass("d-none");
            $(".login-section").removeClass("d-none")
            $(".personal-section").addClass("d-none");
            $("#manual-post-to-DB").prop("disabled",true).addClass("btn-secondary");
            $("#post-to-DB").prop("disabled",true).addClass("btn-secondary");
            $(".book-view-user-details").addClass("blur");
            $("#contact-poster-button").prop("disabled",true);
            $("#bookViewBlurMessage").text("You must be logged in to contact the poster.");
        }
    });

});