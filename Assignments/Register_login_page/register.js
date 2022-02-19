var form = document.getElementById('form')

var error = []


form.addEventListener('submit', function(e){
    e.preventDefault()

    var username = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confirm_password = document.getElementById('confirm-password');

    if(username.value == "") {
        // alert('Please fill all the blanks');
        error.push('Please enter the Username');
    }
    if(email.value == ""){
        error.push('Please enter the email');
    }
    if(password.value == ""){
        error.push('Please enter the password');
    }
    if(confirm_password.value == ""){
        error.push('Please re-enter the password');
    }


    var message = document.getElementById('message');

    message.innerText = error ;

    
})