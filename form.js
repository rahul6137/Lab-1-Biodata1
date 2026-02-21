document.getElementById('biodataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let form = e.target;

    function isValidEmail(email) {
        return /^[^ ]+@[^ ]+\.[a-z]{2,6}$/.test(email);
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    function showError(input, message) {
        let next = input.nextElementSibling;
        if (next && next.classList.contains('error-msg')) next.remove();
        let error = document.createElement('div');
        error.classList.add('error-msg');
        error.style.color = 'red';
        error.style.fontSize = '12px';
        error.innerText = message;
        input.parentNode.appendChild(error);
    }

    function clearError(input) {
        let next = input.nextElementSibling;
        if (next && next.classList.contains('error-msg')) next.remove();
    }

    let inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(i => clearError(i));
    let radioGroups = form.querySelectorAll('.radio-group');
    radioGroups.forEach(r => {
        let next = r.nextElementSibling;
        if (next && next.classList.contains('error-msg')) next.remove();
    });

    let firstName = form.firstName.value.trim();
    let lastName = form.lastName.value.trim();
    let fatherName = form.fatherName.value.trim();
    let motherName = form.motherName.value.trim();
    let genders = form.querySelectorAll('input[name="gender"]');
    let gender = '';
    genders.forEach(r => { if (r.checked) gender = r.value; });

    let dob = form.dob.value;
    let nationality = form.nationality.value;
    let email = form.email.value.trim();
    let phone = form.phone.value.trim();
    let alternatePhone = form.alternatePhone.value.trim();
    let emergencyContact = form.emergencyContact.value.trim();
    let presentAddress = form.presentAddress.value.trim();
    let city = form.city.value.trim();
    let qualification = form.qualification.value;
    let fieldOfStudy = form.fieldOfStudy.value.trim();
    let institution = form.institution.value.trim();
    let passingYear = form.passingYear.value.trim();
    let photoInput = document.getElementById('photo');

    let hasError = false;

    if (!firstName) { showError(form.firstName, 'First name is required'); hasError = true; }
    if (!lastName) { showError(form.lastName, 'Last name is required'); hasError = true; }
    if (!fatherName) { showError(form.fatherName, "Father's name is required"); hasError = true; }
    if (!motherName) { showError(form.motherName, "Mother's name is required"); hasError = true; }
    if (!gender) { 
        let container = form.querySelector('.radio-group'); 
        showError(container, 'Gender is required'); 
        hasError = true; 
    }
    if (!dob) { showError(form.dob, 'Date of birth is required'); hasError = true; }
    if (!nationality) { showError(form.nationality, 'Nationality is required'); hasError = true; }
    if (!email) { showError(form.email, 'Email is required'); hasError = true; }
    else if (!isValidEmail(email)) { showError(form.email, 'Invalid email address'); hasError = true; }

    if (!phone) { showError(form.phone, 'Phone number is required'); hasError = true; }
    else if (!isNumeric(phone)) { showError(form.phone, 'Phone number must contain only digits'); hasError = true; }
    else if (phone.length !== 11) { showError(form.phone, 'Phone number must be exactly 11 digits'); hasError = true; }

    if (alternatePhone) {
        if (!isNumeric(alternatePhone)) { showError(form.alternatePhone, 'Alternate phone must be digits only'); hasError = true; }
        else if (alternatePhone.length !== 11) { showError(form.alternatePhone, 'Alternate phone must be 11 digits'); hasError = true; }
    }

    if (emergencyContact) {
        if (!isNumeric(emergencyContact)) { showError(form.emergencyContact, 'Emergency contact must be digits only'); hasError = true; }
        else if (emergencyContact.length !== 11) { showError(form.emergencyContact, 'Emergency contact must be 11 digits'); hasError = true; }
    }

    if (!presentAddress) { showError(form.presentAddress, 'Present address is required'); hasError = true; }
    if (!city) { showError(form.city, 'City is required'); hasError = true; }
    if (!qualification) { showError(form.qualification, 'Qualification is required'); hasError = true; }
    if (!fieldOfStudy) { showError(form.fieldOfStudy, 'Field of study is required'); hasError = true; }
    if (!institution) { showError(form.institution, 'Institution name is required'); hasError = true; }
    if (passingYear && !isNumeric(passingYear)) { showError(form.passingYear, 'Passing year must be numeric'); hasError = true; }

    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 18 && !confirm("Your age is less than 18. Do you want to continue?")) hasError = true;

    if (photoInput.files.length > 0) {
        let file = photoInput.files[0];
        if (!file.type.startsWith("image/")) { alert("Please upload a valid image file"); hasError = true; }
        else if (file.size > 5 * 1024 * 1024) { alert("Photo size must be less than 5MB"); hasError = true; }
    }

    if (!hasError) {
        alert('Form submitted successfully!');
        form.submit();
    }
});
