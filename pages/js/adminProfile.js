// const { text } = require("stream/consumers");
var globalProgramariResponseArray = ""
var globalStocResponseArray = ""
var globalComenziResponseArray = ""

function openNavBarMenu() {
    document.getElementById("mydropdown").classList.toggle('show');
}

loginData = localStorage.getItem("loginData");
loginDataJson = JSON.parse(loginData)
// console.log(loginDataJson)

const usernameBlockSpan = document.getElementById('usernameBlock');
usernameBlockSpan.innerHTML = "Hi " + loginDataJson.username

document.getElementById('Nume').value = loginDataJson.nume
document.getElementById('Prenume').value = loginDataJson.prenume
document.getElementById('email').value = loginDataJson.email
document.getElementById('telefon').value = loginDataJson.telefon

// Populare tabel programari
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
    globalProgramariResponseArray = programariResponseArray;

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

        text += "<td>" + "<button class=\"" + buttonStyleClass + "\"><span>" + statusValue + "<\/span>" + "<\/button>" + "<\/td>" // de actualizat status
        creationDateArr = programariResponseArray[i].creation_date.split('/')
        creationDate = creationDateArr[0] + ':' + creationDateArr[1] + ' ' + creationDateArr[2] + '-' + creationDateArr[3] + '-' + creationDateArr[4]
        text += "<td>" + "<input type=\"text\" value=\"" + creationDate + "\" readonly>" + "<\/td>" // de actualizat data programarii
        // text += "<td>" + "<input type=\"datetime-local\" id=\"meeting-time132\" name=\"meeting-time\" value=\"" + "2018-06-12T19:30" + "\" min=\"2018-06-07T00:00\" max=\"2018-06-14T00:00\" readonly><\/input>" + "<\/td>" // de actualizat
        text += "<td>" + "<button class=\"detailsButton\" id = \"" + programariResponseArray[i].id + "\">Detalii<\/button>" + "<\/td>"
        text += "<\/tr>"

        count += 1
        // text += "<div class=\"flex-container\">"
        // text += "<div class=\"flex-child magenta\">"

        text += "<tr id=\"hidden_row" + (count) + "\" class=\"hidden_row\">"
        text += "<td colspan=\"6\">"
        text += "<div class=\"flex-container\">"
        text += "<div class=\"flex-child magenta\">"
        text += "<p>Detalii: " + programariResponseArray[i].titlu + "<\/p>"
        text += "<dl>"
        text += "<dt>ID Fisa:<\/dt>"
        text += "<dd>" + programariResponseArray[i].id + "<\/dd>"
        text += "<dt>Descriere:<\/dt>"
        text += "<dd>"
        text += "<textarea id=\"story\" name=\"story\" rows=\"5\" cols=\"40\" readonly>" + programariResponseArray[i].descriere + "<\/textarea>"
        text += "<\/dd>"
        text += "<dt>Actualizari:<\/dt>"
        text += "<dd>"
        text += "<textarea id=\"story\" name=\"textarea_" + programariResponseArray[i].id + "\" rows=\"5\" cols=\"40\" readonly><\/textarea>"
        text += "<\/dd>"
        text += "<dt>Actiuni:<\/dt>"
        text += "<dd><button class=\"stergereButton\" id = \"" + programariResponseArray[i].id + "\">Sterge<\/button><\/dd>"
        text += "<\/dl>"
        text += "<\/div>"

        text += "<div class=\"flex-child magenta\">"
        text += "<p>Actualizari: " + programariResponseArray[i].titlu + "<\/p>"
        text += "<dl>"
        text += "<dt>Status<\/dt>"
        text += "<dd>" + "<select name=\"status\" id=\"status_" + programariResponseArray[i].id + "\"><option value=\"default\"></option><option value=\"inregistrata\">Inregistrata</option><option value=\"acceptata\">Acceptata</option><option value=\"finalizata\">Finalizata</option><option value=\"inLucru\">In Lucru</option><option value=\"respinsa\">Respinsa</option></select>" + "<\/dd>"
        text += "<dt>Descriere:<\/dt>"
        text += "<dd>"
        text += "<textarea id=\"updateTextarea_" + programariResponseArray[i].id + "\" name=\"updateTextarea_" + programariResponseArray[i].id + "\" rows=\"5\" cols=\"40\"><\/textarea>"
        text += "<\/dd>"
        text += "<dt>Actiuni:<\/dt>"
        text += "<dd><button class=\"actualizeazaButton\" id=\"" + programariResponseArray[i].id + "\">Actualizeaza<\/button><\/dd>"
        text += "<\/dl>"
        text += "<\/div>"
        text += "<\/div>"
        text += "<\/td>"
        text += "<\/tr>"

        // text += "<\/div>"
        // text += "<\/div>"
    }

    document.getElementById("programarile_mele_continut").innerHTML = text;

}

async function modalStocHandle() {

    var requestStocOptions = {
        method: 'GET',
    };

    var stocResp = await fetch('http://127.0.0.1:80/stocuri/getAllDocuments', requestStocOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            // console.error('Error:', error);
        });

    stocResponseArray = await stocResp.json()
    stocResponseArray = stocResponseArray.reverse();
    stocResponseArray = stocResponseArray;
    globalStocResponseArray = stocResponseArray

    text = "";
    var count = 0
    for (let i = 0; i < stocResponseArray.length; i++) {
        // console.log(stocResponseArray[i])
        count += 1
        text += "<tr id = \"" + stocResponseArray[i].cod_produs + "\">";
        text += "<td>" + stocResponseArray[i].cod_produs + "<\/td>" //Cod Produs
        text += "<td>" + stocResponseArray[i].nume + "<\/td>" //Marca
        text += "<td>" + stocResponseArray[i].cantitate_ramasa + "<\/td>" //Stoc
        text += "<td>" + stocResponseArray[i].unitatemasura + "<\/td>" // Unitate masura
        text += "<td>" + stocResponseArray[i].pret + " Lei<\/td>" // Pret
        text += "<td>" + stocResponseArray[i].descriere + "<\/td>" // Descriere
        text += "<\/tr>"
    }

    document.getElementById("stocIntern_continut").innerHTML = text;
}

async function modalComenziHandle() {

    var requestStocOptions = {
        method: 'GET',
    };

    var stocResp = await fetch('http://127.0.0.1:80/comandaFurnizor/getAllDocuments', requestStocOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            // console.error('Error:', error);
        });

    stocResponseArray = await stocResp.json()
    stocResponseArray = stocResponseArray.reverse();
    stocResponseArray = stocResponseArray;
    globalComenziResponseArray = stocResponseArray

    text = "";
    var count = 0
    for (let i = 0; i < stocResponseArray.length; i++) {
        // console.log(stocResponseArray[i])
        count += 1
        text += "<tr id = \"" + stocResponseArray[i].id + "\">";
        text += "<td>" + stocResponseArray[i].id + "<\/td>" //Cod Produs
        text += "<td>" + "<textarea id=\"updateTextarea_" + stocResponseArray[i].id + "\" name=\"updateTextarea_" + stocResponseArray[i].id + "\" rows=\"3\" cols=\"17\">" + stocResponseArray[i].numeFurnizor + "<\/textarea>" + "<\/td>" //Cod Produs
        // text += "<td>" + stocResponseArray[i].numeFurnizor + "<\/td>" //Cod Produs
        text += "<td>" + stocResponseArray[i].detalii + "<\/td>" //Marca

        creationDateArr = stocResponseArray[i].dataComanda.split('/')
        creationDate = creationDateArr[0] + ':' + creationDateArr[1] + ' ' + creationDateArr[2] + '-' + creationDateArr[3] + '-' + creationDateArr[4]

        text += "<td>" + creationDate + "<\/td>" //Stoc
        text += "<\/tr>"
    }

    document.getElementById("comenzi_continut").innerHTML = text;
}

async function stergeProgramare(id) {
    var programariHeaders = new Headers();
    programariHeaders.append("token", loginDataJson.password);
    programariHeaders.append("documentId", id);

    var requestprogramariOptions = {
        method: 'DELETE',
        headers: programariHeaders
    };

    var programariResp = await fetch('http://127.0.0.1:80/fisaService/deleteDocument', requestprogramariOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            // console.error('Error:', error);
        });

    var responseModal = document.querySelector('.modal-response')
    var headerModal = document.querySelector('.header-msg')
    var headerClassModal = document.querySelector('.modal-header')
    var bodyModal = document.querySelector('.body-msg')

    if (programariResp.status === 200) {
        ProgrameazaResponse("Success!", "Stergere realizata cu success.", "success", responseModal, headerModal, headerClassModal, bodyModal)
    }
    else {
        ProgrameazaResponse("Something went wrong. . .", "Nu ai permisiunea pentru a sterge programari.", "error", responseModal, headerModal, headerClassModal, bodyModal)
    }
}

async function actualizeazaProgramare(id) {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var minutes = today.getMinutes();
    var hour = today.getHours();

    today = hour + '/' + minutes + '/' + dd + '/' + mm + '/' + yyyy;

    var programariHeaders = new Headers();
    programariHeaders.append("token", loginDataJson.password);
    programariHeaders.append("id_fisa", id);
    programariHeaders.append("id_user", loginDataJson.id);
    programariHeaders.append("status", document.querySelector('#status_' + id).value);
    programariHeaders.append("titlu", "Modificare status");
    programariHeaders.append("descriere", document.querySelector('#updateTextarea_' + id).value);
    programariHeaders.append("dataProgramare", today);

    var requestprogramariOptions = {
        method: 'POST',
        headers: programariHeaders
    };

    var programariResp = await fetch('http://127.0.0.1:80/actualizareFisaService/inregistrare', requestprogramariOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            // console.error('Error:', error);
        });
    var responseModal = document.querySelector('.modal-response')
    var headerModal = document.querySelector('.header-msg')
    var headerClassModal = document.querySelector('.modal-header')
    var bodyModal = document.querySelector('.body-msg')

    if (programariResp.status === 200) {


        ProgrameazaResponse("Success!", "Actualizare realizata cu success.", "success", responseModal, headerModal, headerClassModal, bodyModal)
    }
    else {
        ProgrameazaResponse("Something went wrong. . .", "Ceva nu a functionat ok....", "error", responseModal, headerModal, headerClassModal, bodyModal)
    }
}

function ProgrameazaResponse(headerMsg, msg, customClass, responseModal, headerModal, headerClassModal, bodyModal) {

    headerModal.textContent = headerMsg

    if (!headerClassModal.classList.contains('success') || !headerClassModal.classList.contains('error'))
        headerClassModal.classList.add(customClass)

    if (headerClassModal.classList.contains('success') && customClass === 'error')
        headerClassModal.classList.replace('success', 'error')
    else if (headerClassModal.classList.contains('error') && customClass === 'success')
        headerClassModal.classList.replace('error', 'success')

    bodyModal.textContent = msg
    responseModal.style.display = "block"

    window.onclick = function (event) {
        if (event.target === responseModal) {
            responseModal.style.display = "none";
        }
        location.reload();
    }
    setTimeout(() => { responseModal.style.display = "none"; }, 1000);
    setTimeout(() => { location.reload(); }, 1000);
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
            }
            else
                $("#hidden_row" + (this.parentNode.parentNode.rowIndex + 1)).attr("hidden", true);
        });

        $('.stergereButton').click(function () {
            stergeProgramare(this.id)
        });

        $('.actualizeazaButton').click(function () {
            actualizeazaProgramare(this.id)
        });

        $('.exportJSONButton').click(function () {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(globalProgramariResponseArray, null, 2)], {
                type: "text/plain"
            }));
            a.setAttribute("download", "fiseService.json");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

        $('.exportJSONStocButton').click(function () {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(stocResponseArray, null, 2)], {
                type: "text/plain"
            }));
            a.setAttribute("download", "stoc.json");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

        $('.exportJSONComenziButton').click(function () {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(globalComenziResponseArray, null, 2)], {
                type: "text/plain"
            }));
            a.setAttribute("download", "comenzi.json");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });


        // $('.importJSONButton').click(function () {
        //     console.log("importJSONButton")
        //     $.getJSON("data.json", function (json) {
        //         console.log(json);
        //     });
        // });

        $('input[type=file]').change(function () {
            console.log(this.files[0]);

            const reader = new FileReader();
            reader.readAsText(this.files[0]);

            reader.onload = function () {
                console.log(reader.result);
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        });
    });
}

setTimeout(modalProgramariHandle2, 1500);
// Populare tabel programari

//Adauga produs stoc
function openAdaugaProdusModalModal() {
    var modal = document.getElementById("myStocInternModal");

    $('#mydropdown').toggleClass('show');
    modal.style.display = "block";
    document.querySelector('.myStocInternModal-content').classList.remove('hidden')

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

async function modalAdaugaProdusHandle(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("cantitate_ramasa", stocInternStoc.value);
    myHeaders.append("unitatemasura", stocInternUnitate_masura.value);
    myHeaders.append("descriere", stocInternDescriere.value);
    myHeaders.append("nume", stocInternMarca.value);
    myHeaders.append("pret", stocInternPret.value);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
    };

    var resp = await fetch('http://127.0.0.1:80/stocuri/inregistrare', requestOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    var responseModal = document.querySelector('.modal-response')
    var headerModal = document.querySelector('.header-msg')
    var headerClassModal = document.querySelector('.modal-header')
    var bodyModal = document.querySelector('.body-msg')

    if (resp.status === 200) {
        ProgrameazaResponse("Success!", "Stoc actualizat", "success", responseModal, headerModal, headerClassModal, bodyModal)
    }
    else {
        ProgrameazaResponse("Something went wrong. . .", "Ceva nu a functionat ok....", "error", responseModal, headerModal, headerClassModal, bodyModal)
    }
}

var stocInternModalForm = document.querySelector('#StocInternModalForm form')
var stocInternMarca = document.querySelector('#Marca')
var stocInternStoc = document.querySelector('#Stoc')
var stocInternUnitate_masura = document.querySelector('#Unitate_masura')
var stocInternPret = document.querySelector('#Pret')
var stocInternDescriere = document.querySelector('#DescriereStocIntern')

stocInternModalForm.addEventListener('submit', modalAdaugaProdusHandle)
//Adauga produs stoc

//Adauga produs stoc
function openCreeazaComandaModalModal() {
    var modal = document.getElementById("myComenziModal");

    $('#mydropdown').toggleClass('show');
    modal.style.display = "block";
    document.querySelector('.myComenziModal-content').classList.remove('hidden')

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

async function modalCreeazaComenziHandle(e) {
    e.preventDefault();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var minutes = today.getMinutes();
    var hour = today.getHours();

    today = hour + '/' + minutes + '/' + dd + '/' + mm + '/' + yyyy;

    var myHeaders = new Headers();
    myHeaders.append("numeFurnizor", comandaNume_Furnizor.value);
    myHeaders.append("detalii", comandaDetalii_Comanda.value);
    myHeaders.append("dataComanda", today);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
    };

    var resp = await fetch('http://127.0.0.1:80/comandaFurnizor/inregistrare', requestOptions)
        .then(response => {
            return response
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    var responseModal = document.querySelector('.modal-response')
    var headerModal = document.querySelector('.header-msg')
    var headerClassModal = document.querySelector('.modal-header')
    var bodyModal = document.querySelector('.body-msg')

    if (resp.status === 200) {
        ProgrameazaResponse("Success!", "Stoc actualizat", "success", responseModal, headerModal, headerClassModal, bodyModal)
    }
    else {
        ProgrameazaResponse("Something went wrong. . .", "Ceva nu a functionat ok....", "error", responseModal, headerModal, headerClassModal, bodyModal)
    }
}

var comandaModalForm = document.querySelector('#ComenziModalForm form')
var comandaNume_Furnizor = document.querySelector('#Nume_Furnizor')
var comandaDetalii_Comanda = document.querySelector('#Detalii_Comanda')

comandaModalForm.addEventListener('submit', modalCreeazaComenziHandle)
//Adauga Comenzi

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

window.onload = function () {

    modalProgramariHandle();
    modalStocHandle();
    modalComenziHandle();

    document.getElementById('stocInternButton').onclick = function () {
        var x_stocInternBlock = document.getElementById("stocInternBlock");
        var x_programarileMeleBlock = document.getElementById("programarileMeleBlock");
        var x_comenziBlock = document.getElementById("comenziBlock");

        x_stocInternBlock.style.display = "block";
        x_programarileMeleBlock.style.display = "none";
        x_comenziBlock.style.display = "none";
    };

    document.getElementById('programarileMeleButton').onclick = function () {
        var x_stocInternBlock = document.getElementById("stocInternBlock");
        var x_programarileMeleBlock = document.getElementById("programarileMeleBlock");
        var x_comenziBlock = document.getElementById("comenziBlock");

        x_stocInternBlock.style.display = "none";
        x_programarileMeleBlock.style.display = "block";
        x_comenziBlock.style.display = "none";
    };

    document.getElementById('comenziButton').onclick = function () {
        var x_stocInternBlock = document.getElementById("stocInternBlock");
        var x_programarileMeleBlock = document.getElementById("programarileMeleBlock");
        var x_comenziBlock = document.getElementById("comenziBlock");

        x_stocInternBlock.style.display = "none";
        x_programarileMeleBlock.style.display = "none";
        x_comenziBlock.style.display = "block";
    };

    //de verificat paginarea
    // getPagination1('#tabel_programarileMele');
    // getPagination2('#tabel_stocIntern');
    // getPagination3('#tabel_comenzi');

    function getPagination1(table) {
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

    function getPagination2(table) {
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

    function getPagination3(table) {
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
};

function openMyProfileModal() {
    var btn = document.getElementById("myProfileButtonModal");

    var modal = document.getElementById("myProfileModal");
    var span = document.getElementsByClassName("close")[0];

    document.getElementById("mydropdown").classList.toggle('show');

    modal.style.display = "block";

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

function callLogout() {
    window.location.href = 'http://127.0.0.1:81/';
    window.localStorage.clear();
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

setTimeout(toggleLoading, 2500);
//loading