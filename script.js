var form = document.getElementById('resumeForm');
var resumeDisplayElement = document.getElementById('resumeOutput');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skill1 = document.getElementById('skill1').value;
    var skill2 = document.getElementById('skill2').value;
    var skill3 = document.getElementById('skill3').value;
    var skill4 = document.getElementById('skill4').value;
    var skill5 = document.getElementById('skill5').value;
    // Get profile picture (if selected)
    var profilePicture = document.getElementById('profilePicture').files;
    var profilePictureURL = profilePicture && profilePicture[0] ? URL.createObjectURL(profilePicture[0]) : '';
    // Save form data in localStorage with the username as the key
    var resumeData = { name: name, email: email, education: education, experience: experience, skills: [skill1, skill2, skill3, skill4, skill5], profilePictureURL: profilePictureURL };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Generate the resume content dynamically
    var resumeHTML = "\n        <h2>Editable Resume</h2>\n        <h3>Personal Information</h3>\n        <img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" style=\"max-width: 100px; border-radius: 50%; margin-bottom: 10px;\">\n        <p><b>Name:</b> <span contenteditable=\"true\">").concat(name, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n        <h3>Skills</h3>\n        <ul>\n            <li contenteditable=\"true\">").concat(skill1, "</li>\n            <li contenteditable=\"true\">").concat(skill2, "</li>\n            <li contenteditable=\"true\">").concat(skill3, "</li>\n            <li contenteditable=\"true\">").concat(skill4, "</li>\n            <li contenteditable=\"true\">").concat(skill5, "</li>\n        </ul>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skill1').value = resumeData.skills[0];
            document.getElementById('skill2').value = resumeData.skills[1];
            document.getElementById('skill3').value = resumeData.skills[2];
            document.getElementById('skill4').value = resumeData.skills[3];
            document.getElementById('skill5').value = resumeData.skills[4];
            if (resumeData.profilePictureURL) {
                document.getElementById('profilePicture').setAttribute('src', resumeData.profilePictureURL);
            }
        }
    }
});
