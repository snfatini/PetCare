
new Cleave('.phone-input', {
    phone: true,
    phoneRegionCode: 'MY'
});

var nameInput = document.getElementById('name')
var email = document.getElementById('email')
var phone = document.getElementById('phone')
var subjectInput = document.getElementById('subject')

var form = document.querySelector('form')

form.onsubmit = function (e) {
    console.log(subjectInput.value)
    if (nameInput.value === '' || email.value === '' ||
        phone.value === '' || subjectInput.value === '') {
        e.preventDefault()
        alert("Please fill in your input first")
    } else {
        alert("Thank you for your response.\nHave a nice day!");
        nameInput.value = ''
        email.value = ''
        phone.value = ''
        subjectInput.value = ''
    }
}




// function submitForm() {
//   document.contact-form.submit();
//   document.contact-form.reset();
// }
