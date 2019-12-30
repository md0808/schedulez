$(document).ready(() => {
    $("#new-schedule-section").hide();

    $(".sidenav").sidenav();
    $(".tooltipped").tooltip();
    $(".collapsible").collapsible();
    $(".modal").modal();
    $("select").formSelect();
    $(".datepicker").datepicker();
    $(".scrollspy").scrollSpy();
});

$("#schedule-btn").on("click", () => {
    $("#schedule").show();
    $("#notifications").hide();
    $("#employee-list").hide();
    $("#location-list").hide();

});
$("#notifications-btn").on("click", () => {
    $("#notifications").show();
    $("#schedule").hide();
    $("#employee-list").hide();
    $("#location-list").hide();
});
$("#employees-btn").on("click", () => {
    $("#employee-list").show();
    $("#notifications").hide();
    $("#schedule").hide();
    $("#location-list").hide();
});
$("#locations-btn").on("click", () => {
    $("#location-list").show();
    $("#schedule").hide();
    $("#employee-list").hide();
    $("#notifications").hide();
});

$("#new-schedule-btn").on("click", () => {
    console.log("new schedule");
    $("#new-schedule-section").show();
    $(".scrollspy").scrollSpy("activeClass");

});

$("#account-info-btn").on("click", () => {
    $("#account-info").show();
    $("#request-off").hide();
    $("#emp-notifications").hide();
    $("#emp-schedule").hide();

});

$("#emp-notifications-btn").on("click", () => {
    $("#emp-notifications").show();
    $("#emp-schedule").hide();
    $("#account-info").hide();
    $("#request-off").hide();

});
$("#request-off-btn").on("click", () => {
    $("#request-off").show();
    $("#emp-notifications").hide();
    $("#emp-schedule").hide();
    $("#account-info").hide();

});
$("#emp-schedule-btn").on("click", () => {
    $("#emp-schedule").show();
    $("#emp-notifications").hide();
    $("#request-off").hide();
    $("#account-info").hide();

});

var shifts = [1];
var numOfShifts = shifts.length;

$("#add_shift").on("click", () => {
    console.log("add shift clicked");

    numOfShifts++;
    shifts.push(numOfShifts);

    var newShift = $(
        "<div id='Shift'" + numOfShifts + "''>" +
        "<p class='white-text'>Shift" + numOfShifts + "</p>" +
        "<div class='row'>" +
        "<div class='col s4 offset-s2'>" +
        "<div class='row'>" +
        "<p class='white-text'>Shift Starts at:</p>" +
        "<div class='input-field col s6'>" +
        "<select id='shiftStart'" + numOfShifts + "' class='start-hour front'>" +
        "<option value='' disable selected>Hour</option>" +
        "<option value='00'>12am</option>" +
        "<option value='01'>1am</option>" +
        "<option value='02'>2am</option>" +
        "<option value='03'>3am</option>" +
        "<option value='04'>4am</option>" +
        "<option value='05'>5am</option>" +
        "<option value='06'>6am</option>" +
        "<option value='07'>7am</option>" +
        "<option value='08'>8am</option>" +
        "<option value='09'>9am</option>" +
        "<option value='10'>10am</option>" +
        "<option value='11'>11am</option>" +
        "<option value='12'>12pm</option>" +
        "<option value='13'>1pm</option>" +
        "<option value='14'>2pm</option>" +
        "<option value='15'>3pm</option>" +
        "<option value='16' > 4pm</option >" +
        "<option value='17'>5pm</option>" +
        "<option value='18'>6pm</option>" +
        "<option value='19'>7pm</option>" +
        "<option value='20'>8pm</option>" +
        "<option value='21'>9pm</option>" +
        "<option value='22'>10pm</option>" +
        "<option value='23'>11pm</option>" +
        "</select>" +
        "</div>" +
        "<div class='input-field col s6'>" +
        "<select class='start-minute front'>" +
        "<option value='' disable selected>minutes </option>" +
        "<option value='00'>00</option>" +
        "<option value='15'>15</option>" +
        "<option value='30'>30</option>" +
        "<option value='45'>45</option>" +
        "</select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col s4'>" +
        "<p class='white-text'>Shift Ends at:</p>" +
        "<div class='row'>" +
        "<div class='input-field col s6'>" +
        "<select class='start-hour front'>" +
        "<option value='' disable selected>Hour</option>" +
        "<option value='00'>12am</option>" +
        "<option value='01'>1am</option>" +
        "<option value='02'>2am</option>" +
        "<option value='03'>3am</option>" +
        "<option value='04'>4am</option>" +
        "<option value='05'>5am</option>" +
        "<option value='06'>6am</option>" +
        "<option value='07'>7am</option>" +
        "<option value='08'>8am</option>" +
        "<option value='09'>9am</option>" +
        "<option value='10'>10am</option>" +
        "<option value='11'>11am</option>" +
        "<option value='12'>12pm</option>" +
        "<option value='13'>1pm</option>" +
        "<option value='14'>2pm</option>" +
        "<option value='15'>3pm</option>" +
        "<option value='16'>4pm</option>" +
        "<option value='17'>5pm</option>" +
        "<option value='18'>6pm</option>" +
        "<option value='19'>7pm</option>" +
        "<option value='20'>8pm</option>" +
        "<option value='21'>9pm</option>" +
        "<option value='22'>10pm</option>" +
        "<option value='23'>11pm</option>" +
        "</select>" +
        "</div>" +
        "<div class='input-field col s6'>" +
        "<select class='start-minute front'>" +
        "<option value='' disable selected>minutes </option>" +
        "<option value='00'>00</option>" +
        "<option value='15'>15</option>" +
        "<option value='30'>30</option>" +
        "<option value='45'>45</option>" +
        "</select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col s8 offset-s2'>" +
        "<p class='white-text'>Number Of Employees Needed:</p>" +
        "<input id='numOfEmployees' type='text'>" +
        "<label for='numOfEmployees'># Of Employees</label>" +
        "</div>" +
        "</div>" +
        "</div>");

    $("#add-shift").append(newShift);
});

$("#new-schedule-add-btn").on("click", () => {
    $("#new-schedule-section").hide();
});

$("#new-schedule-cancel-btn").on("click", () => {
    $("#new-schedule-section").hide();
});

// DAYS OF THE WEEK FOR SCHEDULE ADD //
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

for (let i = 0; i < daysOfWeek.length; i++) {

    //To Append Date 
    let newWeekDate = $("<div>");
    $(newWeekDate).addClass("schedule-weekday-title col s8 offset-2");
    let newWeekLabel = $("<label>");
    $(newWeekLabel).addClass("newWeekLabel");
    $(newWeekLabel).text(daysOfWeek[i]);
    $(newWeekDate).append(newWeekLabel);

    //To Append Hours
    let newRow2 = $("<div>");
    $(newRow2).addClass("row");
    let newHourAvailability = $("<div>");
    $(newHourAvailability).addClass("input-field col s5 offset-1");

    let newSelectHours = $("<select>");
    $(newSelectHours).addClass("start-hour front");
    $(newHourAvailability).append(newSelectHours);

    let disableHours = $("<option value='' disable selected>Hours</options>");
    $(newSelectHours).append(disableHours);

    for (let j = 0; j < 24; j++) {
        let newOption = $(`<option value= ${j}>`);
        $(newOption).text(`${j}`);
        (newSelectHours).append(newOption);
    }

    //To Append Minutes
    let newMinuteAvailability = $("<div>");
    $(newMinuteAvailability).addClass("input-field col s5 offset-1");

    let newSelectMinutes = $("<select>");
    $(newSelectMinutes).addClass("start-minute front");
    $(newMinuteAvailability).append(newSelectMinutes);

    let disableMinutes = $("<option value='' disable selected>Minutes</options>");
    $(newSelectMinutes).append(disableMinutes);

    let newOptionMinutes00 = $("<option value=00>");
    $(newOptionMinutes00).text("00");

    let newOptionMinutes15 = $("<option value=15>");
    $(newOptionMinutes15).text("15");

    let newOptionMinutes30 = $("<option value=30>");
    $(newOptionMinutes30).text("30");

    let newOptionMinutes45 = $("<option value=45>");
    $(newOptionMinutes45).text("45");

    (newSelectMinutes).append(
        newOptionMinutes00,
        newOptionMinutes15,
        newOptionMinutes30,
        newOptionMinutes45
    );
    // New Day
    let newDay = $("<div>");
    $(newDay).addClass("row new-day");
    $(".select-hours-minutes").append(newDay);

    $(newDay).append(newWeekDate);
    $(newDay).append(newHourAvailability);
    $(newDay).append(newMinuteAvailability);

    $(".select-hours-minutes").append(newHourAvailability);
    $(".select-hours-minutes").append(newMinuteAvailability);
}