document.addEventListener("DOMContentLoaded", function () {
    // Callback Form
    document.getElementById("callbackForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let anytime = document.getElementById("anytime").checked;
        let date = document.getElementById("date").value;
        let time = document.getElementById("time").value;

        let callbackData = {
            name: name,
            phone: phone,
            anytime: anytime,
            date: anytime ? "Anytime" : date,
            time: anytime ? "Anytime" : time
        };

        console.log("Callback Request:", callbackData);
        alert("Callback request sent!");
        this.reset();
    });

    // Contact Form
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let contactName = document.getElementById("contactName").value;
        let contactPhone = document.getElementById("contactPhone").value;
        let contactEmail = document.getElementById("contactEmail").value;
        let message = document.getElementById("message").value;

        let contactData = {
            name: contactName,
            phone: contactPhone,
            email: contactEmail,
            message: message
        };

        console.log("Contact Form Data:", contactData);
        alert("Message sent!");
        this.reset();
    });
});

