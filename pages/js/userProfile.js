function openNavBarMenu() {
    //console.log("Apas");
    $('#mydropdown').toggleClass('show');
}

window.onclick = function(event) {
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

$(function() {
    $('#vehiculeleMeleButton').click(function() {
        var x_vehiculeleMeleBlock = document.getElementById("vehiculeleMeleBlock");
        var x_programarileMeleBlock = document.getElementById("programarileMeleBlock");

        x_programarileMeleBlock.style.display = "none";
        x_vehiculeleMeleBlock.style.display = "block";
    })

    $('#programarileMeleButton').click(function() {
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

    window.onclick = function(event) {
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