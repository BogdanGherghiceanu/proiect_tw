function openNavBarMenu() {
    //console.log("Apas");
    $('#mydropdown').toggleClass('show');
}

const form = exampleForm.querySelector("#loginPost");
console.log(form)


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

window.onload = function() {
    getPagination('#programarile_mele');

    function getPagination(table) {
        var x = document.getElementById(table.split('#')[1]).parentNode;
        var parentNodeName = x.className

        $('.' + parentNodeName + ' #maxRows').on('change', function(evt) {
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

                $(table + ' tr:gt(0)').each(function() {
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

                $('.' + parentNodeName + ' .pagination-content li').on('click', function(evt) {
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
                    $(table + ' tr:gt(0)').each(function() {
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