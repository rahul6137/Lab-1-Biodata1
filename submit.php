<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "biodata_db";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

function clean($conn, $value) {
    return mysqli_real_escape_string($conn, trim($value ?? ''));
}

$firstName        = clean($conn, $_POST['firstName']);
$lastName         = clean($conn, $_POST['lastName']);
$fatherName       = clean($conn, $_POST['fatherName']);
$motherName       = clean($conn, $_POST['motherName']);
$gender           = clean($conn, $_POST['gender']);
$dob              = clean($conn, $_POST['dob']);
$age              = clean($conn, $_POST['age']);
$bloodGroup       = clean($conn, $_POST['bloodGroup']);
$nationality      = clean($conn, $_POST['nationality']);
$religion         = clean($conn, $_POST['religion']);
$maritalStatus    = clean($conn, $_POST['maritalStatus']);
$nid              = clean($conn, $_POST['nid']);
$email            = clean($conn, $_POST['email']);
$phone            = clean($conn, $_POST['phone']);
$alternatePhone   = clean($conn, $_POST['alternatePhone']);
$emergencyContact = clean($conn, $_POST['emergencyContact']);
$presentAddress   = clean($conn, $_POST['presentAddress']);
$city             = clean($conn, $_POST['city']);
$state            = clean($conn, $_POST['state']);
$zipcode          = clean($conn, $_POST['zipcode']);
$permanentAddress = clean($conn, $_POST['permanentAddress']);
$qualification    = clean($conn, $_POST['qualification']);
$fieldOfStudy     = clean($conn, $_POST['fieldOfStudy']);
$institution      = clean($conn, $_POST['institution']);
$passingYear      = clean($conn, $_POST['passingYear']);
$grade            = clean($conn, $_POST['grade']);
$board            = clean($conn, $_POST['board']);
$languages        = clean($conn, $_POST['languages']);
$occupation       = clean($conn, $_POST['occupation']);
$designation      = clean($conn, $_POST['designation']);
$organization     = clean($conn, $_POST['organization']);
$experience       = clean($conn, $_POST['experience']);
$salary           = clean($conn, $_POST['salary']);
$website          = clean($conn, $_POST['website']);

$skills = '';
if (isset($_POST['skills']) && is_array($_POST['skills'])) {
    $skills = clean($conn, implode(', ', $_POST['skills']));
}

$photoName = '';
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === 0) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    $ext = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    $photoName = uniqid('photo_') . '.' . $ext;
    move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $photoName);
}

$sql = "INSERT INTO biodata (
    first_name, last_name, father_name, mother_name, gender, dob, age,
    blood_group, nationality, religion, marital_status, nid, skills,
    email, phone, alternate_phone, emergency_contact,
    present_address, city, state, zipcode, permanent_address,
    qualification, field_of_study, institution, passing_year, grade, board, languages,
    occupation, designation, organization, experience, salary, website, photo
) VALUES (
    '$firstName','$lastName','$fatherName','$motherName','$gender','$dob','$age',
    '$bloodGroup','$nationality','$religion','$maritalStatus','$nid','$skills',
    '$email','$phone','$alternatePhone','$emergencyContact',
    '$presentAddress','$city','$state','$zipcode','$permanentAddress',
    '$qualification','$fieldOfStudy','$institution','$passingYear','$grade','$board','$languages',
    '$occupation','$designation','$organization','$experience','$salary','$website','$photoName'
)";

if (mysqli_query($conn, $sql)) {
    echo "<script>
        alert('Biodata submitted successfully!');
        window.location.href='index.html';
    </script>";
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
