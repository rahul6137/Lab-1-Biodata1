document.getElementById('biodataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let form = e.target;

    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.innerText='');

    let fields = [
        {id:'firstName', name:'First Name'},
        {id:'lastName', name:'Last Name'},
        {id:'fatherName', name:"Father's Name"},
        {id:'motherName', name:"Mother's Name"},
        {id:'dob', name:'Date of Birth'},
        {id:'gender', name:'Gender'},
        {id:'nationality', name:'Nationality'},
        {id:'email', name:'Email'},
        {id:'phone', name:'Phone'},
        {id:'presentAddress', name:'Present Address'},
        {id:'city', name:'City'}
    ];

    let isValid = true;

    fields.forEach(f=>{
        let input = form[f.id];
        let errorEl = input?.parentElement.querySelector('.error-message');

        // Gender special case
        if(f.id==='gender'){
            let genderChecked = form.querySelector('input[name="gender"]:checked');
            if(!genderChecked){
                errorEl.innerText = f.name+" is required.";
                isValid=false;
            }
            return;
        }

        if(!input.value.trim()){
            if(errorEl) errorEl.innerText = f.name+" is required.";
            isValid=false;
        } else {
            if(f.id==='email'){
                let pattern=/^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
                if(!pattern.test(input.value.trim())){
                    if(errorEl) errorEl.innerText="Please enter a valid email.";
                    isValid=false;
                }
            }
            if(f.id==='phone'){
                let pattern=/^\d{11}$/;
                if(!pattern.test(input.value.trim())){
                    if(errorEl) errorEl.innerText="Phone number must be 11 digits.";
                    isValid=false;
                }
            }
            if(f.id==='dob'){
                let today=new Date();
                let birthDate=new Date(input.value);
                let age=today.getFullYear()-birthDate.getFullYear();
                let m=today.getMonth()-birthDate.getMonth();
                if(m<0||(m===0 && today.getDate()<birthDate.getDate())) age--;
                if(age<18){
                    if(errorEl) errorEl.innerText="Age is less than 18.";
                    isValid=false;
                }
            }
        }
    });

    // Photo validation
    let photoInput=document.getElementById('photo');
    let photoError = photoInput.parentElement.querySelector('.error-message');
    if(photoInput.files.length>0){
        let file = photoInput.files[0];
        if(!file.type.startsWith("image/")){
            if(photoError) photoError.innerText="Please upload a valid image file.";
            isValid=false;
        } else if(file.size > 5*1024*1024){
            if(photoError) photoError.innerText="Photo size must be less than 5MB.";
            isValid=false;
        }
    }

    if(isValid){
        alert("Form submitted successfully!");
        form.submit(); // optional
    }
});

// Photo preview functionality
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photoPreview');
const uploadPlaceholder = document.querySelector('.upload-placeholder');
const changePhotoBtn = document.getElementById('changePhotoBtn');

photoInput.addEventListener('change', function(e){
    if(e.target.files && e.target.files[0]){
        const reader=new FileReader();
        reader.onload=function(event){
            photoPreview.src=event.target.result;
            photoPreview.style.display='block';
            uploadPlaceholder.style.display='none';
            changePhotoBtn.style.display='block';
        }
        reader.readAsDataURL(e.target.files[0]);
    }
});

changePhotoBtn.addEventListener('click', function(e){
    e.preventDefault();
    photoInput.click();
});
