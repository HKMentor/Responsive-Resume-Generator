const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resumeOutput') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skill1 = (document.getElementById('skill1') as HTMLInputElement).value;
    const skill2 = (document.getElementById('skill2') as HTMLInputElement).value;
    const skill3 = (document.getElementById('skill3') as HTMLInputElement).value;
    const skill4 = (document.getElementById('skill4') as HTMLInputElement).value;
    const skill5 = (document.getElementById('skill5') as HTMLInputElement).value;

    // Get profile picture (if selected)
    const profilePicture = (document.getElementById('profilePicture') as HTMLInputElement).files;
    const profilePictureURL = profilePicture && profilePicture[0] ? URL.createObjectURL(profilePicture[0]) : '';

    // Save form data in localStorage with the username as the key
    const resumeData = { name, email, education, experience, skills: [skill1, skill2, skill3, skill4, skill5], profilePictureURL };
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate the resume content dynamically
    const resumeHTML = `
        <h2>Editable Resume</h2>
        <h3>Personal Information</h3>
        <img src="${profilePictureURL}" alt="Profile Picture" style="max-width: 100px; border-radius: 50%; margin-bottom: 10px;">
        <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <h3>Education</h3>
        <p contenteditable="true">${education}</p>
        <h3>Experience</h3>
        <p contenteditable="true">${experience}</p>
        <h3>Skills</h3>
        <ul>
            <li contenteditable="true">${skill1}</li>
            <li contenteditable="true">${skill2}</li>
            <li contenteditable="true">${skill3}</li>
            <li contenteditable="true">${skill4}</li>
            <li contenteditable="true">${skill5}</li>
        </ul>
    `;

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;

    // Generate a shareable URL with the username only
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skill1') as HTMLInputElement).value = resumeData.skills[0];
            (document.getElementById('skill2') as HTMLInputElement).value = resumeData.skills[1];
            (document.getElementById('skill3') as HTMLInputElement).value = resumeData.skills[2];
            (document.getElementById('skill4') as HTMLInputElement).value = resumeData.skills[3];
            (document.getElementById('skill5') as HTMLInputElement).value = resumeData.skills[4];
            if (resumeData.profilePictureURL) {
                (document.getElementById('profilePicture') as HTMLInputElement).setAttribute('src', resumeData.profilePictureURL);
            }
        }
    }
});
