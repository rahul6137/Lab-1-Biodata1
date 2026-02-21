<script>
document.getElementById('biodataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let form = e.target;
    let firstName = form.firstName.value.trim();
    let lastName = form.lastName.value.trim();
    let fatherName = form.fatherName.value.trim();
    let motherName = form.motherName.value.trim();
    let gender = form.gender.value;
    let dob = form.dob.value;
    let nationality = form.nationality.value;
    let email = form.email.value.trim();
    let phone = form.phone.value.trim();
    let presentAddress = form.presentAddress.value.trim();
    let city = form.city.value.trim();
    let qualification = form.qualification.value;
    let fieldOfStudy = form.fieldOfStudy.value.trim();
    let institution = form.institution.value.trim();
    let photoInput = document.getElementById('photo');

    // Helper function for email validation
    function isValidEmail(email) {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
        return pattern.test(email);
    }

    // Helper function for phone validation
    function isValidPhone(phone) {
        return /^\d{11}$/.test(phone);
    }

    // Required fields check
    if (!firstName || !lastName || !fatherName || !motherName || !gender || !dob || !nationality || !email || !phone || !presentAddress || !city || !qualification || !fieldOfStudy || !institution) {
        alert("Please fill all required fields marked with *.");
        return;
    }

    // Email validation
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Phone validation
    if (!isValidPhone(phone)) {
        alert("Phone number must be 11 digits.");
        return;
    }

    // DOB validation (age >= 18)
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18) {
        if (!confirm("Your age is less than 18. Do you want to continue?")) {
            return;
        }
    }

    // Photo validation (optional)
    if (photoInput.files.length > 0) {
        let file = photoInput.files[0];
        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file for the photo.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert("Photo size must be less than 5MB.");
            return;
        }
    }

    // If all validations pass
    alert("Form submitted successfully!");
    form.submit(); // optionally remove if you handle submission via AJAX
});
</script>
