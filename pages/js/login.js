async function modalLoginHandle(e) {
    e.preventDefault();

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
        .then(response => {
            return response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    resp = resp.data
    if (resp.code === 200) {
        console.log(resp.msg)
        console.log(resp.body)
        req_userData = JSON.parse(resp.body)
        loginResponse("Success!", resp.msg, "success")

        var redirectUrl = "http://127.0.0.1:80/pages/userProfile.html"
        var input_part = '';
        for (id in req_userData) {
            console.log(id + " " + req_userData[id])
            input_part += '<input type="hidden" name="' + id + '" value="' + req_userData[id] + '"></input>';
        }
        var form_part = '<form action="' + redirectUrl + '" method="post" id="loginPost">' + input_part + '</form>';
        console.log(form_part);

        var form = $(form_part);
        $('body').append(form);
        $(form).submit();
        // window.location.href = 'http://127.0.0.1:80/pages/userProfile.html';
    }
    else {
        console.log(resp.msg)
        loginResponse("Something went wrong. . .", resp.msg, "error")
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

    console.log(headerClassLoginResponseModal.classList)

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