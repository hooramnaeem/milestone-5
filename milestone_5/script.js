(function () {
    // Select necessary HTML elements
    var form = document.getElementById('form');
    var educationButton = document.getElementById('edubutton');
    var skillsButton = document.getElementById('skillsbutton');
    var profilePictureInput = document.getElementById('profilePicture');
    var profilePreview = document.getElementById('profilePreview');
    var generatedResume = document.getElementById('generated-resume');
    var shareableLink = document.getElementById('shareable-link');
    var downloadPdfButton = document.getElementById('download-pdf');
    // Create containers to hold dynamic education and skills fields
    var educationContainer = document.createElement('div');
    var skillsContainer = document.createElement('div');
    // Append these containers before the buttons
    educationButton.before(educationContainer);
    skillsButton.before(skillsContainer);
    // Variable to store the image data URL
    var profilePictureDataUrl = null;
    // Function to handle profile picture preview and store the base64 data URL
    profilePictureInput.addEventListener('change', function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                profilePictureDataUrl = reader_1.result;
                profilePreview.src = profilePictureDataUrl; // Show the preview of the image
            };
            reader_1.readAsDataURL(file);
        }
    });
    // Function to add more education fields
    educationButton.addEventListener('click', function () {
        var newEducationField = document.createElement('input');
        newEducationField.type = 'text';
        newEducationField.placeholder = 'Write your education';
        newEducationField.style.marginTop = '10px';
        educationContainer.appendChild(newEducationField);
    });
    // Function to add more skills fields
    skillsButton.addEventListener('click', function () {
        var newSkillField = document.createElement('input');
        newSkillField.type = 'text';
        newSkillField.placeholder = 'Write your skill';
        newSkillField.style.marginTop = '10px';
        skillsContainer.appendChild(newSkillField);
    });
    // Function to handle form submission and generate the resume
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from refreshing the page
        // Get form values
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value; // Fixed ID here
        var phone = document.getElementById('phone').value;
        var objective = document.getElementById('objective').value; // Fixed ID here
        var experience = document.getElementById('experience').value;
        // Collect values from dynamically added education and skills fields
        var educationFields = educationContainer.querySelectorAll('input');
        var skillsFields = skillsContainer.querySelectorAll('input');
        var educationList = '';
        educationFields.forEach(function (input) {
            if (input.value) {
                educationList += "<li>".concat(input.value, "</li>");
            }
        });
        var skillsList = '';
        skillsFields.forEach(function (input) {
            if (input.value) {
                skillsList += "<li>".concat(input.value, "</li>");
            }
        });
        // Create the resume layout including profile picture
        var resumeContent = "\n            <h2>".concat(name, "'s Resume</h2>\n            ").concat(profilePictureDataUrl ? "<img src=\"".concat(profilePictureDataUrl, "\" alt=\"Profile Picture\" style=\"max-width: 150px; border-radius: 50%;\" />") : '', "\n            <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <p><strong>Career Objective:</strong> <span contenteditable=\"true\">").concat(objective, "</span></p>\n            <p><strong>Experience:</strong> <span contenteditable=\"true\">").concat(experience, "</span></p>\n            <p><strong>Education:</strong></p>\n            <ul contenteditable=\"true\">").concat(educationList, "</ul>\n            <p><strong>Skills:</strong></p>\n            <ul contenteditable=\"true\">").concat(skillsList, "</ul>\n        ");
        // Display the generated resume
        generatedResume.innerHTML = resumeContent;
        // Generate a unique link
        var uniqueHash = btoa(Math.random().toString()).slice(0, 8); // Base64 encoding of random number
        shareableLink.href = "#resume=".concat(uniqueHash);
        shareableLink.textContent = "https://yourdomain.com/resume?hash=".concat(uniqueHash); // Change to your domain
    });
    // Function to download the resume as PDF
    downloadPdfButton.addEventListener('click', function () {
        var printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Resume PDF</title></head><body>');
            printWindow.document.write(generatedResume.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }
    });
})();
