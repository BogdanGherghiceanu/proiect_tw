async function modalLoginHandle(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("username", loginEmail.value);
    myHeaders.append("password", loginPassword.value);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
    };

    var resp = await fetch('http://127.0.0.1:80/login', requestOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    if (resp.status === 200) {
        response = await resp.json()

        console.log(response)
        loginResponse("Success!", "Success", "success")

        if (response.grad === 2) { // client
            localStorage.setItem('loginData', JSON.stringify(response))
            window.location.href = 'http://127.0.0.1:81/pages/userProfile.html';
        }
        else {// angajat / admin
            localStorage.setItem('loginData', JSON.stringify(response))
            window.location.href = 'http://127.0.0.1:81/pages/adminProfile.html';
        }
    }
    else {
        loginResponse("Something went wrong. . .", "User sau parola gresite!", "error")
    }
}

var loginResponseModal = document.querySelector('.login-modal-response')
var headerLoginResponseModal = document.querySelector('.header-msg')
var headerClassLoginResponseModal = document.querySelector('.modal-header')
var bodyLoginResponseModal = document.querySelector('.body-msg')


var loginModalForm = document.querySelector('#loginModalForm form')
var loginEmail = document.querySelector('#login_email')
var loginPassword = document.querySelector('#login_password')
loginModalForm.addEventListener('submit', modalLoginHandle)

function loginResponse(headerMsg, msg, customClass) {
    headerLoginResponseModal.textContent = headerMsg

    // console.log(headerClassLoginResponseModal.classList)

    if (!headerClassLoginResponseModal.classList.contains('success') || !headerClassLoginResponseModal.classList.contains('error'))
        headerClassLoginResponseModal.classList.add(customClass)

    if (headerClassLoginResponseModal.classList.contains('success') && customClass === 'error')
        headerClassLoginResponseModal.classList.replace('success', 'error')
    else if (headerClassLoginResponseModal.classList.contains('error') && customClass === 'success')
        headerClassLoginResponseModal.classList.replace('error', 'success')

    bodyLoginResponseModal.textContent = msg
    loginResponseModal.style.display = 'block'

    document.querySelector('.LoginModal').classList.add('hidden')
    window.onclick = function (event) {
        if (event.target === loginResponseModal) {
            loginResponseModal.style.display = "none";
            document.getElementById("loginModal").style.display = "none"
            // document.querySelector('.overlay').classList.add('hidden')
        }
    }
}