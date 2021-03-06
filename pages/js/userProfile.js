var today = new Date().toISOString().slice(0, 16);
document.getElementsByName("Data")[0].min = today;


function openNavBarMenu() {
    $('#mydropdown').toggleClass('show');
}

//loading
var loadingOverlay = document.querySelector('.loading');

function toggleLoading() {
    document.activeElement.blur();

    if (loadingOverlay.classList.contains('hidden')) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

setTimeout(toggleLoading, 2000);
//loading

// Populare my profile
loginData = localStorage.getItem("loginData");
loginDataJson = JSON.parse(loginData)
// console.log(loginDataJson)

const usernameBlockSpan = document.getElementById('usernameBlock');
usernameBlockSpan.innerHTML = "Hi " + loginDataJson.username

document.getElementById('Nume').value = loginDataJson.nume
document.getElementById('Prenume').value = loginDataJson.prenume
document.getElementById('email').value = loginDataJson.email
document.getElementById('telefon').value = loginDataJson.telefon
// Populare my profile

// Populare programarile mele
async function modalProgramariHandle() {
    var programariHeaders = new Headers();
    programariHeaders.append("token", loginDataJson.password);

    var requestprogramariOptions = {
        method: 'GET',
        headers: programariHeaders
    };

    var programariResp = await fetch('http://127.0.0.1:80/fisaService/getAllDocuments', requestprogramariOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            // console.error('Error:', error);
        });

    programariResponseArray = await programariResp.json()
    programariResponseArray = programariResponseArray.reverse();

    text = "";
    var count = 0
    for (let i = 0; i < programariResponseArray.length; i++) {
        // console.log(programariResponseArray[i])
        count += 1
        text += "<tr id = \"" + programariResponseArray[i].id + "\">";
        text += "<td>" + programariResponseArray[i].tip_vehicul + "<\/td>" //tip vehicul
        text += "<td>" + programariResponseArray[i].marca + "<\/td>" //marca vehicul
        text += "<td>" + programariResponseArray[i].model + "<\/td>" // model/serie

        var buttonStyleClass = ""
        var statusValue = ""

        if (programariResponseArray[i].status === null) {
            buttonStyleClass = "programareInregBtn"
            statusValue = "Inregistrata"
        } else if (programariResponseArray[i].status === "inregistrata") {
            buttonStyleClass = "programareInregBtn"
            statusValue = "Inregistrata"
        } else if (programariResponseArray[i].status === "acceptata") {
            buttonStyleClass = "programareAcceptataBtn"
            statusValue = "Acceptata"
        } else if (programariResponseArray[i].status === "finalizata") {
            buttonStyleClass = "programareFinalizataBtn"
            statusValue = "Finalizata"
        } else if (programariResponseArray[i].status === "inLucru") {
            buttonStyleClass = "programareInLucruBtn"
            statusValue = "In Lucru"
        } else if (programariResponseArray[i].status === "respinsa") {
            buttonStyleClass = "programareAnulataBtn"
            statusValue = "Respinsa"
        }

        // text += "<td>" + "<button class=\"programareInregBtn\"><span>" + "Inregistrata" + "<\/span>" + "<\/button>" + "<\/td>" // de actualizat status
        text += "<td>" + "<button class=\"" + buttonStyleClass + "\"><span>" + statusValue + "<\/span>" + "<\/button>" + "<\/td>" // de actualizat status

        creationDateArr = programariResponseArray[i].creation_date.split('/')
        creationDate = creationDateArr[0] + ':' + creationDateArr[1] + ' ' + creationDateArr[2] + '-' + creationDateArr[3] + '-' + creationDateArr[4]
        text += "<td>" + "<input type=\"text\" value=\"" + creationDate + "\" readonly>" + "<\/td>" // de actualizat data programarii
        // text += "<td>" + "<input type=\"datetime-local\" id=\"meeting-time132\" name=\"meeting-time\" value=\"" + "2018-06-12T19:30" + "\" min=\"2018-06-07T00:00\" max=\"2018-06-14T00:00\" readonly><\/input>" + "<\/td>" // de actualizat
        text += "<td>" + "<button class=\"detailsButton\" id = \"" + programariResponseArray[i].id + "\">Detalii<\/button>" + "<\/td>"
        text += "<\/tr>"

        count += 1
        text += "<tr id=\"hidden_row" + (count) + "\" class=\"hidden_row\">"
        text += "<td colspan=\"6\">"
        text += "<div class=\"detailsDiv\">"
        text += "<p>Detalii: " + programariResponseArray[i].titlu + "<\/p>"
        text += "<dl>"
        text += "<dt>ID Fisa:<\/dt>"
        text += "<dd>" + programariResponseArray[i].id + "<\/dd>"
        text += "<dt>Descriere:<\/dt>"
        text += "<dd>"
        text += "<textarea id=\"story\" name=\"story\" rows=\"5\" cols=\"60\" readonly>" + programariResponseArray[i].descriere + "<\/textarea>"
        text += "<\/dd>"
        text += "<dt>Actualizari:<\/dt>"
        text += "<dd>"
        text += "<textarea id=\"story\" name=\"textarea_" + programariResponseArray[i].id + "\" rows=\"5\" cols=\"60\" readonly><\/textarea>"
        text += "<\/dd>"
        text += "<\/dl>"
        text += "<\/div>"
        text += "<\/td>"
        text += "<\/tr>"
    }

    document.getElementById("programarile_mele_continut").innerHTML = text;
    // console.log(document.getElementById("programarile_mele").getElementsByTagName("tbody"))
}

function addUpdateStatus(obj, idFisa) {
    obj = obj.reverse()
    text = ''
    for (i = 0; i < obj.length; i++) {
        text += "Titlu: " + obj[i].titlu + "\r\n"
        text += "Status: " + obj[i].status + "\r\n"
        text += "Descriere: " + obj[i].descriere + "\r\n"
        text += "Data Actualizarii: " + obj[i].dataActualizarii + "\r\n"
        text += "________________" + "\r\n"
    }

    document.getElementsByName("textarea_" + idFisa)[0].value = text
}

async function modalProgramariHandle2() {
    $(".hidden_row").map(function () {
        $(".hidden_row").attr("hidden", true);
    })

    $(document).ready(function () {
        $('.detailsButton').click(function () {
            idFisa = this.id
            if ($("#hidden_row" + (this.parentNode.parentNode.rowIndex + 1)).attr("hidden")) {
                $.ajax({
                    type: "GET",
                    beforeSend: function (request) {
                        request.setRequestHeader("token", loginDataJson.password);
                        request.setRequestHeader("documentId", idFisa);

                    },
                    url: "http://127.0.0.1:80/actualizareFisaService/actualizari",
                    success: function (result) {
                        var obj = JSON.parse(result);
                        addUpdateStatus(obj, idFisa)
                    }
                });

                $("#hidden_row" + (this.parentNode.parentNode.rowIndex + 1)).removeAttr("hidden")
            } else
                $("#hidden_row" + (this.parentNode.parentNode.rowIndex + 1)).attr("hidden", true);
        });

        $('.collapseAll').click(function () {
            $(".hidden_row").map(function () {
                if ($(this).attr("hidden")) {
                    $(this).removeAttr("hidden")
                    $(".collapseAll").html('Expand all');
                }
                else {
                    $(this).attr("hidden", true);
                    $(".collapseAll").html('Collapse all');
                }
            })
        });
    });
}

setTimeout(modalProgramariHandle2, 1000);
// Populare programarile mele

window.onclick = function (event) {
    if (!event.target.matches('.navbar-icon')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

$(function () {
    $('#vehiculeleMeleButton').click(function () {
        var x_vehiculeleMeleBlock = document.getElementById("vehiculeleMeleBlock");
        var x_programarileMeleBlock = document.getElementById("programarileMeleBlock");

        x_programarileMeleBlock.style.display = "none";
        x_vehiculeleMeleBlock.style.display = "block";
    })

    $('#programarileMeleButton').click(function () {
        var x_vehiculeleMeleBlock = document.getElementById("vehiculeleMeleBlock");
        var x_programarileMeleBlock = document.getElementById("programarileMeleBlock");

        x_programarileMeleBlock.style.display = "block";
        x_vehiculeleMeleBlock.style.display = "none";
    })
});


function openMyProfileModal() {
    var btn = document.getElementById("myProfileButtonModal");

    var modal = document.getElementById("myProfileModal");
    var span = document.getElementsByClassName("close")[0];

    $('#mydropdown').toggleClass('show');
    modal.style.display = "block";

    // span.onclick = function() {
    //     modal.style.display = "none";
    // }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }

        if (!event.target.matches('.navbar-icon')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

//Programeaza-te
function openProgramareNouaModal() {
    var modal = document.getElementById("myProgramareNouaModal");

    $('#mydropdown').toggleClass('show');
    modal.style.display = "block";
    document.querySelector('.myProgramareNouaModal-content').classList.remove('hidden')


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }

        if (!event.target.matches('.navbar-icon')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

async function modalProgramareNouaHandle(e) {
    e.preventDefault();

    date = programareData.value.split('T')
    date_year = date[0].split('-')[2] + '/' + date[0].split('-')[1] + '/' + date[0].split('-')[0]
    today = date[1].replace(':', '/') + '/' + date_year

    var myHeaders = new Headers();
    myHeaders.append("token", loginDataJson.password);
    myHeaders.append("tip_vehicul", programareTipVehicul.value);
    myHeaders.append("marca", programareMarca.value);
    myHeaders.append("model", programareModel.value);
    myHeaders.append("titlu", programareTitlu.value);
    myHeaders.append("descriere", programareDescriere.value);
    myHeaders.append("dataProgramare", today);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
    };

    var resp = await fetch('http://127.0.0.1:80/fisaService/inregistrare', requestOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    if (resp.status === 200) {
        ProgrameazaResponse("Success!", "Success", "success")
    }
    else {
        ProgrameazaResponse("Something went wrong. . .", "Caractere invalide", "error")
    }
}

var programareResponseModal = document.querySelector('.programeaza-modal-response')
var headerprogramareResponseModal = document.querySelector('.header-msg')
var headerClassprogramareResponseModal = document.querySelector('.modal-header')
var bodyprogramareResponseModal = document.querySelector('.body-msg')

var programareNouaModalForm = document.querySelector('#ProgramareNouaModalForm form')
var programareTipVehicul = document.querySelector('#TipVehicul')
var programareMarca = document.querySelector('#Marca')
var programareModel = document.querySelector('#Model')
var programareTitlu = document.querySelector('#Titlu')
var programareDescriere = document.querySelector('#Descriere')
var programareData = document.querySelector('#Data')

programareNouaModalForm.addEventListener('submit', modalProgramareNouaHandle)

function ProgrameazaResponse(headerMsg, msg, customClass) {
    headerprogramareResponseModal.textContent = headerMsg

    if (!headerClassprogramareResponseModal.classList.contains('success') || !headerClassprogramareResponseModal.classList.contains('error'))
        headerClassprogramareResponseModal.classList.add(customClass)

    if (headerClassprogramareResponseModal.classList.contains('success') && customClass === 'error')
        headerClassprogramareResponseModal.classList.replace('success', 'error')
    else if (headerClassprogramareResponseModal.classList.contains('error') && customClass === 'success')
        headerClassprogramareResponseModal.classList.replace('error', 'success')

    bodyprogramareResponseModal.textContent = msg
    programareResponseModal.style.display = "block"

    document.querySelector('.myProgramareNouaModal-content').classList.add('hidden')

    window.onclick = function (event) {
        if (event.target === programareResponseModal) {
            programareResponseModal.style.display = "none";
            document.getElementById("myProgramareNouaModal").style.display = "none"
        }
        location.reload();
    }
    setTimeout(() => { responseModal.style.display = "none"; }, 1000);
    setTimeout(() => { location.reload(); }, 1000);
}
//Programeaza-te

window.onload = function () {
    modalProgramariHandle();

    //Update pagination
    // getPagination('#programarile_mele');

    function getPagination(table) {
        var x = document.getElementById(table.split('#')[1]).parentNode;

        var parentNodeName = x.className

        $('.' + parentNodeName + ' #maxRows').on('change', function (evt) {
            lastPage = 1;

            // var x = document.getElementById(table.split('#')[1]).parentNode;
            // var parentNodeName = x.className

            $('.' + parentNodeName + ' .pagination-content').find('li').slice(1, -1).remove();
            var trnum = 0;

            var maxRows = parseInt($(this).val());

            var totalRows = $(table + ' tbody tr').length;

            if (maxRows >= totalRows || maxRows === 5000) {
                $('.' + parentNodeName + ' .pagination-content').hide();
            } else {
                $('.' + parentNodeName + ' .pagination-content').show();
            }

            $(table + ' tr:gt(0)').each(function () {
                trnum++;
                if (trnum > maxRows) {
                    $(this).hide();
                }
                if (trnum <= maxRows) {
                    $(this).show();
                }
            });

            if (totalRows > maxRows) {
                var pagenum = Math.ceil(totalRows / maxRows);
                for (var i = 1; i <= pagenum; i++) {
                    $('.' + parentNodeName + ' .pagination-content #prev').before('<li data-page="' + i + '">\<span>' + i + '<span class="sr-only"></span></span>\</li>').show();
                }
            }

            $('.' + parentNodeName + ' .pagination-content [data-page="1"]').addClass('active');

            $('.' + parentNodeName + ' .pagination-content li').on('click', function (evt) {
                evt.stopImmediatePropagation();
                evt.preventDefault();
                var pageNum = $(this).attr('data-page');

                var maxRows = parseInt($('.' + parentNodeName + ' #maxRows').val());

                if (pageNum == 'prev') {
                    if (lastPage == 1) {
                        return;
                    }
                    pageNum = --lastPage;
                }

                if (pageNum == 'next') {
                    if (lastPage == $('.' + parentNodeName + ' .pagination-content li').length - 2 || lastPage == $('.' + parentNodeName + ' .pagination-content li').length - 1) {
                        return;
                    }
                    pageNum = ++lastPage;
                }

                lastPage = pageNum;
                var trIndex = 0;
                $('.' + parentNodeName + ' .pagination-content li').removeClass('active');
                $('.' + parentNodeName + ' .pagination-content [data-page="' + lastPage + '"]').addClass('active');

                limitPagging(parentNodeName);
                $(table + ' tr:gt(0)').each(function () {
                    trIndex++;

                    if (
                        trIndex > maxRows * pageNum ||
                        trIndex <= maxRows * pageNum - maxRows
                    ) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            });

        }).val(10)
            .change();;
    }

    function limitPagging(tableName) {
        if ($('.' + tableName + ' .pagination-content li').length > 7) {
            if ($('.' + tableName + ' .pagination-content li.active').attr('data-page') <= 3) {
                $('.' + tableName + ' .pagination-content li:gt(5)').hide();
                $('.' + tableName + ' .pagination-content li:lt(5)').show();
                $('.' + tableName + ' .pagination-content [data-page="next"]').show();
            }
            if ($('.' + tableName + ' .pagination-content li.active').attr('data-page') > 3) {
                $('.' + tableName + ' .pagination-content li:gt(0)').hide();
                $('.' + tableName + ' .pagination-content [data-page="next"]').show();
                for (let i = (parseInt($('.' + tableName + ' .pagination-content li.active').attr('data-page')) - 2); i <= (parseInt($('.' + tableName + ' .pagination-content li.active').attr('data-page')) + 2); i++) {
                    $('.' + tableName + ' .pagination-content [data-page="' + i + '"]').show();
                }
            }
        }
    }
}

function callLogout() {
    window.location.href = 'http://127.0.0.1:81/';
    window.localStorage.clear();
}