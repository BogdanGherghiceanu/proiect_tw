async function modalSignupHandle(e) {
    e.preventDefault();

    console.log(signupNume.value)
    console.log(signupPrenume.value)
    console.log(signupEmail.value)
    console.log(signupTelefon.value)
    console.log(signupParola.value)

    var myHeaders = new Headers();
    myHeaders.append("username", signupUserName.value);
    myHeaders.append("password", signupParola.value);
    myHeaders.append("nume", signupNume.value);
    myHeaders.append("prenume", signupPrenume.value);
    myHeaders.append("email", signupEmail.value);
    myHeaders.append("telefon", signupTelefon.value);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
    };

    var resp = await fetch('http://127.0.0.1:80/signup', requestOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    console.log(resp)

    if (resp.status === 200) {
        signupResponse("Success!", "Inregistrat cu succes!", "success")
    }
    else {
        console.log("eroare")
        signupResponse("Something went wrong. . .", "User existent!", "error")
    }
}

var signupModalForm = document.querySelector('#signupModalForm form')
var signupUserName = document.querySelector('#Username')
var signupNume = document.querySelector('#Nume')
var signupPrenume = document.querySelector('#Prenume')
var signupEmail = document.querySelector('#programeaza_email')
var signupTelefon = document.querySelector('#telefon')
var signupParola = document.querySelector('#programeaza_password')
signupModalForm.addEventListener('submit', modalSignupHandle)


var loginResponseModal = document.querySelector('.signup-modal-response')
var headerLoginResponseModal = document.querySelector('.signup-header-msg')
var headerClassLoginResponseModal = document.querySelector('.signup-modal-header')
var bodyLoginResponseModal = document.querySelector('.signup-body-msg')

function signupResponse(headerMsg, msg, customClass) {
    headerLoginResponseModal.textContent = headerMsg
    console.log("eroare2")
    // console.log(headerClassLoginResponseModal.classList)

    if (!headerClassLoginResponseModal.classList.contains('success') || !headerClassLoginResponseModal.classList.contains('error'))
        headerClassLoginResponseModal.classList.add(customClass)

    if (headerClassLoginResponseModal.classList.contains('success') && customClass === 'error')
        headerClassLoginResponseModal.classList.replace('success', 'error')
    else if (headerClassLoginResponseModal.classList.contains('error') && customClass === 'success')
        headerClassLoginResponseModal.classList.replace('error', 'success')

    bodyLoginResponseModal.textContent = msg
    loginResponseModal.style.display = 'block'

    // document.querySelector('.ProgrameazaModal').classList.add('hidden')
    document.getElementById("programeazaModal").style.display = "none"
    window.onclick = function (event) {
        if (event.target === loginResponseModal) {
            loginResponseModal.style.display = "none";
            // document.getElementById("programeazaModal").style.display = "none"
            // document.querySelector('.overlay').classList.add('hidden')
        }
    }
}