(() => {
    // Select necessary HTML elements
    const form = document.getElementById('form') as HTMLFormElement;
    const educationButton = document.getElementById('edubutton') as HTMLButtonElement;
    const skillsButton = document.getElementById('skillsbutton') as HTMLButtonElement;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const profilePreview = document.getElementById('profilePreview') as HTMLImageElement;
    const generatedResume = document.getElementById('generated-resume') as HTMLDivElement;
    const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
    const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

    // Create containers to hold dynamic education and skills fields
    const educationContainer = document.createElement('div');
    const skillsContainer = document.createElement('div');

    // Append these containers before the buttons
    educationButton.before(educationContainer);
    skillsButton.before(skillsContainer);

    // Variable to store the image data URL
    let profilePictureDataUrl: string | null = null;

    // Function to handle profile picture preview and store the base64 data URL
    profilePictureInput.addEventListener('change', (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profilePictureDataUrl = reader.result as string;
                profilePreview.src = profilePictureDataUrl; // Show the preview of the image
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to add more education fields
    educationButton.addEventListener('click', () => {
        const newEducationField = document.createElement('input');
        newEducationField.type = 'text';
        newEducationField.placeholder = 'Write your education';
        newEducationField.style.marginTop = '10px';
        educationContainer.appendChild(newEducationField);
    });

    // Function to add more skills fields
    skillsButton.addEventListener('click', () => {
        const newSkillField = document.createElement('input');
        newSkillField.type = 'text';
        newSkillField.placeholder = 'Write your skill';
        newSkillField.style.marginTop = '10px';
        skillsContainer.appendChild(newSkillField);
    });

    // Function to handle form submission and generate the resume
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        // Get form values
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value; // Fixed ID here
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const objective = (document.getElementById('objective') as HTMLTextAreaElement).value; // Fixed ID here
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

        // Collect values from dynamically added education and skills fields
        const educationFields = educationContainer.querySelectorAll('input');
        const skillsFields = skillsContainer.querySelectorAll('input');

        let educationList = '';
        educationFields.forEach((input) => {
            if (input.value) {
                educationList += `<li>${input.value}</li>`;
            }
        });

        let skillsList = '';
        skillsFields.forEach((input) => {
            if (input.value) {
                skillsList += `<li>${input.value}</li>`;
            }
        });

        // Create the resume layout including profile picture
        const resumeContent = `
            <h2>${name}'s Resume</h2>
            ${profilePictureDataUrl ? `<img src="${profilePictureDataUrl}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;" />` : ''}
            <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Career Objective:</strong> <span contenteditable="true">${objective}</span></p>
            <p><strong>Experience:</strong> <span contenteditable="true">${experience}</span></p>
            <p><strong>Education:</strong></p>
            <ul contenteditable="true">${educationList}</ul>
            <p><strong>Skills:</strong></p>
            <ul contenteditable="true">${skillsList}</ul>
        `;

        // Display the generated resume
        generatedResume.innerHTML = resumeContent;

        // Generate a unique link
        const uniqueHash = btoa(Math.random().toString()).slice(0, 8); // Base64 encoding of random number
        shareableLink.href = `#resume=${uniqueHash}`;
        shareableLink.textContent = `https://yourdomain.com/resume?hash=${uniqueHash}`; // Change to your domain
    });

    // Function to download the resume as PDF
    downloadPdfButton.addEventListener('click', () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Resume PDF</title></head><body>');
            printWindow.document.write(generatedResume.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }
    });
})();
