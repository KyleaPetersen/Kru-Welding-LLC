// Send Email using emailjs

const msg = document.querySelector(".form-message");

(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init("Wxx65Zq_967hRzDkI");
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      document.querySelector(".loader").classList.add("show");
      // these IDs from the previous steps
      emailjs.sendForm("service_8feoypw", "template_dts15m7", this).then(
        function() {
            document.getElementById("contact-form").reset();
            document.querySelector(".loader").classList.remove("show");
            msg.innerHTML = "<span class='success-msg'>Email Sent</span>";
            msg.classList.add("show");
            setTimeout(() => msg.classList.remove("show"), 4000);
        },
        function (error) {
            document.querySelector(".loader").classList.toggle("show");
            msg.innerHTML = "<span class='error-msg'>Email Not Sent</span>";
            msg.classList.add("show");
        }
      );
    });
};  