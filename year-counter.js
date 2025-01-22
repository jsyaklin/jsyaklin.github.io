
var startDate = new Date("May 31, 2018 12:00:00 GMT-4:00").getTime();

var yearsField = document.getElementById("years");

function updateTimer()
{
    var now = new Date().getTime();

    var distance = now - startDate;

    // if (distance < 0) distance = 0;

    var years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25));

    yearsField.innerHTML = years.toString();
}
updateTimer();
