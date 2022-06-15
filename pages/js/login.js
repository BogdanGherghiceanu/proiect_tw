async function modalLoginHandle(e) {
    e.preventDefault();
    console.log("Test login")

    let formData = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    console.log(formData)

    var resp = await fetch('http://127.0.0.1:80/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        // .then(response => {
        //     return response.json()
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
}

var loginModalForm = document.querySelector('#loginModalForm form')
var loginEmail = document.querySelector('#login_email')
var loginPassword = document.querySelector('#login_password')
loginModalForm.addEventListener('submit', modalLoginHandle)