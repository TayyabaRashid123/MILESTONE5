var form = document.getElementById("resumeForm");
var resumeDisplayElement = document.getElementById("resumeOutput");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPDFButton = document.getElementById("download-pdf");
//handla form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    //collect input values..
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    var description = document.getElementById("description").value;
    //save form data in local storage with the username as the key
    var resumeData = { name: name, email: email, education: education, experience: experience, skills: skills, DecompressionStream: DecompressionStream };
    localStorage.setItem(username, JSON.stringify(resumeData));
    //GENERATE THE RESUME DYNAMICALLY
    var resumeHTML = "\n<h2>Personal Information</h2>\n<p><strong>Name:</strong> ".concat(name, "</p>\n<p><strong>Email:</strong> ").concat(email, "</p>\n<p><strong>Education:</strong> ").concat(education, "</p>\n<p><strong>Experience:</strong> ").concat(experience, "</p>\n<p><strong>Skills:</strong> ").concat(skills, "</p>\n<p><strong>Description:</strong> ").concat(description, "</p>\n\n\n\n\n");
    //dispay the generate resume
    resumeDisplayElement.innerHTML = resumeHTML;
    //generate a shareable url with the username only
    var shareableURL = "&{window.location.origin}?username=".concat(encodeURIComponent(username));
    //display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
//HANDLE PDF DOWNLOAD
downloadPDFButton.addEventListener("click", function () {
    window.print();
});
//prefill te form based on username url
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            //autofill form if data is found in local storage
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value = username;
            document.getElementById("name").value = resumeData.name;
            document.getElementById("email").value = resumeData.email;
            document.getElementById("education").value = resumeData.education;
            document.getElementById("experience").value = resumeData.experience;
            document.getElementById("skills").value = resumeData.skills;
            document.getElementById("description").value = resumeData.description;
        }
    }
});
