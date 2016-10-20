//this is the script that is moved into a file instead of being inline in the
//html
//
$(function() {

    var start = moment();
    var end = moment().add(3, 'years');

    function cb(start, end) {
        $('#reportrange span').html(start.format('YYYY-MM-DD') + ' à ' + end.format('YYYY-MM-DD'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        "locale": {
            "format": "YYYY-MM-DD",
            "separator": " - ",
            "applyLabel": "Appliquer",
            "cancelLabel": "Annuler",
            "fromLabel": "De",
            "toLabel": "À",
            "customRangeLabel": "Custom",
            "weekLabel": "S",
            "daysOfWeek": [
                "Di",
                "Lu",
                "Ma",
                "Me",
                "Je",
                "Ve",
                "Sa"
            ],
            "monthNames": [
                "Janvier",
                "Février",
                "Mars",
                "Avril",
                "Mai",
                "Juin",
                "Juillet",
                "Août",
                "Septembre",
                "Octobre",
                "Novembre",
                "Décembre"
            ],
            "firstDay": 1
        },
        "opens": "center",
        "drops": "down",
        "buttonClasses": "button button-small",
        "applyClass": "button-blue",
        "cancelClass": "button-red"

    }, cb);
    cb(start, end);

});
