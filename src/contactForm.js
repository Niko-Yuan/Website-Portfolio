// Make smoothing scrolling
document.addEventListener("DOMContentLoaded", function() {
    let contactLink = document.querySelector("#contact_button");

    contactLink.addEventListener("click", function(event) {
        event.preventDefault();
        let contactSection = document.querySelector("#contact");
        contactSection.scrollIntoView({ behavior: "smooth" });
    });
});