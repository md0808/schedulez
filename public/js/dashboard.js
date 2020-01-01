$("#new-schedule-section").hide();
var url = window.location.href;
var splitUrl = url.split("/");

console.log(url);

$(document).ready(() => {
    //shows correct div on page refresh
    if (url.includes("notifications")) {
        showAndHideDiv("notifications");
    } else if (url.includes("employee-list")) {
        showAndHideDiv("employee-list");
    } else if (url.includes("locations-list")) {
        showAndHideDiv("employee-list");
    } else if (url.includes("emp-schedule")) {
        showAndHideDiv("emp-schedule");
    } else if (url.includes("emp-notifications")) {
        showAndHideDiv("emp-notifications");
    } else if (url.includes("request-off")) {
        showAndHideDiv("request-off");
    } else if (url.includes("account-info")) {
        showAndHideDiv("account-info");
    } 

    if (url.includes("schedule/add")) {
        $("#new-schedule-section").show();
    }
    if (url.includes("schedule/add/shifts")) {
        $("#add-shifts-dropdown").addClass("active");
    }

    $(".sidenav").sidenav();
    $(".tooltipped").tooltip();
    $(".collapsible").collapsible();
    $(".modal").modal();
    $("select").formSelect();
    $(".datepicker").datepicker();
    $(".scrollspy").scrollSpy();
    $("input#input_text, textarea#request-description").characterCounter();
});

$("#schedule-btn").on("click", () => {
    showAndHideDiv("schedule");
});
$("#notifications-btn").on("click", () => {
    showAndHideDiv("notifications");
});
$("#employees-btn").on("click", () => {
    showAndHideDiv("employee-list");
});
$("#locations-btn").on("click", () => {
    showAndHideDiv("location-list");
});
$("#emp-notifications-btn").on("click", () => {
    showAndHideDiv("emp-notifications");
});
$("#request-off-btn").on("click", () => {
    showAndHideDiv("request-off");
});
$("#emp-schedule-btn").on("click", () => {
    showAndHideDiv("emp-schedule");
});
$("#account-info-btn").on("click", () => {
    showAndHideDiv("account-info");
});

$("#new-schedule-btn").on("click", () => {
    console.log("new schedule");
    $("#new-schedule-section").show();
    //$(".scrollspy").scrollSpy("activeClass");
    console.log(splitUrl);

    var newUrl =
        "http://" +
        splitUrl[2] +
        "/" +
        splitUrl[3] +
        "/" +
        splitUrl[4] +
        "/" +
        splitUrl[5] +
        "/" +
        splitUrl[6] +
        "/add";
    //window.location.href = newUrl;
    console.log(newUrl);
});


function showAndHideDiv(divNameToShow) {
    $("#schedule").hide();
    $("#notifications").hide();
    $("#employee-list").hide();
    $("#location-list").hide();
    $("#emp-schedule").hide();
    $("#emp-notifications").hide();
    $("#request-off").hide();
    $("#account-info").hide();

    $("#" + divNameToShow).show();
}


var numOfShifts = parseInt(splitUrl[5]);

$("#add_shift").on("click", () => {
    console.log("add shift clicked");
    numOfShifts++;

    var newUrl =
        "http://" +
        splitUrl[2] +
        "/" +
        splitUrl[3] +
        "/" +
        splitUrl[4] +
        "/" +
        numOfShifts +
        "/" +
        "#schedule/add/shifts";
    window.location.href = newUrl;

    console.log("num: " + numOfShifts);
});

$("#add-shift-section").on("click", () => {
    var shiftDropdownClass = $("#add-shifts-dropdown").attr("class");

    if (shiftDropdownClass !== "active") {
        console.log("not active");
        window.location.href =
            "http://" +
            splitUrl[2] +
            "/" +
            splitUrl[3] +
            "/" +
            splitUrl[4] +
            "/" +
            splitUrl[5] +
            "/#schedule/add/shifts";
    } else {
        window.location.href =
            "http://" +
            splitUrl[2] +
            "/" +
            splitUrl[3] +
            "/" +
            splitUrl[4] +
            "/" +
            splitUrl[5] +
            "/#schedule/add";
    }
});

$("#new-schedule-add-btn").on("click", () => {
    $("#new-schedule-section").hide();
});

$("#new-schedule-cancel-btn").on("click", () => {
    $("#new-schedule-section").hide();
});

// DAYS OF THE WEEK FOR SCHEDULE ADD //
const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

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
        newSelectHours.append(newOption);
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

    newSelectMinutes.append(
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
};

//submit Notification to Database from Employee Dashboard
$("request-submit").on("click", =>(){
    submitNotificationToDB();
})
function submitNotificationToDB(){
    $.post("/api/newNotification", notification)
        .then(()=> {
            console.log(notification + "was added to DB")
        })
};
