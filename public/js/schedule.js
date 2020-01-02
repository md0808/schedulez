console.log("schedule.js loaded");

$("#new-schedule-add-btn").on("click", () => {
    console.log("create schedule clicked");

    var scheduleStartShifthr = document.getElementsByClassName("schedule-shift-start-hr");
    var scheduleStartShiftmin = document.getElementsByClassName("schedule-shift-start-min");
    var scheduleEndShifthr = document.getElementsByClassName("schedule-shift-end-hr");
    var scheduleEndShiftmin = document.getElementsByClassName("schedule-shift-end-min");
    var scheduleNumOfEmployees = document.getElementsByClassName("schedule-numofemployees");


    //start-schedule
    var startHr = getAllShiftTimes(scheduleStartShifthr);
    var startMin = getAllShiftTimes(scheduleStartShiftmin);

    //end-schedule
    var endHr = getAllShiftTimes(scheduleEndShifthr);
    var endMin = getAllShiftTimes(scheduleEndShiftmin);

    var numOfEmployees = getNumOfEmployeesNeeded(scheduleNumOfEmployees);

    //Getting the schedule dates
    var scheduleDates = [];
    var scheduleDaysOfWeek = [];

    var startDate = $("#schedule-start-date").val();
    var date = new Date(startDate);
    var newDate = new Date(date);
    var formattedDate = formatDate(newDate);
    scheduleDates.push(formattedDate);

    //gets all dates for the 2 week schedule
    for (var i = 1; i < 14; i++) {
        newDate.setDate(newDate.getDate() + 1);

        var newFormattedDate = formatDate(newDate)
        scheduleDates.push(newFormattedDate);
    }

    //gets all the days of the week for the schedule;
    for (var i = 0; i < scheduleDates.length; i++) {
        var date = new Date(scheduleDates[i]);
        var day = date.getDay();

        switch (day) {
            case 0:
                scheduleDaysOfWeek.push("sunday")
                break;
            case 1:
                scheduleDaysOfWeek.push("monday")
                break;
            case 2:
                scheduleDaysOfWeek.push("tuesday")
                break;
            case 3:
                scheduleDaysOfWeek.push("wednesday")
                break;
            case 4:
                scheduleDaysOfWeek.push("thursday")
                break;
            case 5:
                scheduleDaysOfWeek.push("friday")
                break;
            case 6:
                scheduleDaysOfWeek.push("saturday")
                break;
        }
    }


    // var scheduleShifts = 
    //     { date:"12/31/2019", weekday="" shiftTimes:["10:00-15:00", "15:00-20:00"], employees:["2", "1"]},
    //     { date:"01/01/2020", shiftTimes:["12:00-15:00", "15:00-23:00"], employees:["2", "1"]}
    // ]

    //get all the shift times
    var shiftTimes = [];
    for (var i = 0; i < startHr.length; i++) {
        var time = startHr[i] + ":" + startMin[i] + "-" + endHr[i] + ":" + endMin[i];
        shiftTimes.push(time);
    }

    //get all the employee amount
    var numOfEmployeesNeeded = [];
    for (var i = 0; i < numOfEmployees.length; i++) {
        var shiftEmployeeAmt = numOfEmployees[i];
        numOfEmployeesNeeded.push(parseInt(shiftEmployeeAmt));
    }

    var scheduleShifts = [];
    var employeesScheduledToWork = [];

    for (var i = 0; i < scheduleDates.length; i++) {
        var weekday = scheduleDaysOfWeek[i];
        var date = scheduleDates[i];

        console.log("date: " + scheduleDates.length);

        for(var j = 0; j < shiftTimes.length; j++){
            findEmployeesForSchedule(shiftTimes[j], weekday, function(employeeToWork){
                employeesScheduledToWork.push(employeeToWork);
            });
        }

        createShift(date, weekday);

        console.log(scheduleShifts);
    }


    function createShift(date, weekday){
        var newShift = {};

        newShift.date = date;
        newShift.weekday = weekday;
        newShift.shiftTimes = shiftTimes;
        newShift.numberOfEmployees = numOfEmployeesNeeded;
        newShift.scheduledEmployees = employeesScheduledToWork;

        scheduleShifts.push(newShift);
    }
});

function findEmployeesForSchedule(shiftTime, weekday, cb) {
    var startHR = shiftTime.split(":")[0];
    var employeesAvailableForShift = [];
    var locationNum = window.location.pathname[1];
    var employeeNum = [];
    var employeeAvailability = [];

    $.get(`/api/allEmployees/${locationNum}`, (result) => {
    }).then((result) => {
        //     //gets all employee nums
        for (var i = 0; i < result.length; i++) {
            employeeNum.push(result[i].id);
        }

        //gets all the employees availability
        for(var i = 0; i < employeeNum.length; i++) {
            $.get(`/api/availability/${employeeNum[i]}`, (result) => {
            }).then((result) => {
                var employeeAvailability = [result.sunday, result.monday, result.tuesday, result.wednesday, result.thursday, result.friday, result.saturday];
                //console.log(employeeAvailability);
                var thisEmployeeNum = result.EmployeeNum;

                switch (day) {
                    case "sunday":
                        //console.log("this sunday: " + thisEmployeeNum);
                        checkAvailability("sunday", employeeAvailability[0], startHR, thisEmployeeNum);
                        //chosenEmployee = selectEmployee();
                        //choosenEmployee = selectEmployee();
                        console.log()
                        break;
                    case "monday":
                        //console.log("this sunday: " + thisEmployeeNum);
                        checkAvailability("monday", employeeAvailability[1], startHR, thisEmployeeNum);
                        break;
                    case "tuesday":
                        //console.log("this sunday: " + thisEmployeeNum);
                        checkAvailability("tuesday", employeeAvailability[2], startHR, thisEmployeeNum);
                        break;
                    case "wednesday":
                        //console.log("this sunday: " + thisEmployeeNum);
                        checkAvailability("wednesday", employeeAvailability[3], startHR, thisEmployeeNum);
                        break;
                    case "thursday":
                        //console.log("this sunday: " + thisEmployeeNum);
                        checkAvailability("thursday", employeeAvailability[4], startHR, thisEmployeeNum);
                        break;
                    case "friday":
                        //console.log("this sunday: " + thisEmployeeNum);
                        checkAvailability("friday", employeeAvailability[5], startHR, thisEmployeeNum);
                        break;
                    case "saturday":
                        //console.log("this sunday: " + thisEmployeeNum);
                        checkAvailability("saturday", employeeAvailability[6], startHR, thisEmployeeNum);
                        break;

                }

                if(thisEmployeeNum === employeeNum[employeeNum.length-1]){
                    console.log("av: " + employeesAvailableForShift);
                    var employeeChose = selectEmployee();
                    console.log("employeeChose: " + employeeChose);

                    cb(employeeChose);
                }
            });


        }

        console.log("av: " + employeesAvailableForShift)

        function checkAvailability(weekday, availability, shiftStartHR, employeeNum) {
            console.log("weekday: " + weekday + " availability: " + availability + " employeeNum: " + employeeNum);

            var employeeAvailability = parseInt(availability.split(":")[0]);
            //console.log("sunday: " + availability);
            //console.log("shiftstart: " + shift);

            if (shiftStartHR >= employeeAvailability) {
                console.log("Employee-" + employeeNum + " can work one of the " + weekday + " shifts starting at " + shiftStartHR);
                employeesAvailableForShift.push(employeeNum);
            }
        }


        function selectEmployee(){
            if(employeesAvailableForShift.length > 1){
                var numberOfEmployeesAvailable = employeesAvailableForShift.length;
                var randomNum = Math.floor(Math.random() * Math.floor(numberOfEmployeesAvailable));
                var employeeSelected = employeesAvailableForShift[randomNum];

               console.log("Random number: " + randomNum + " -- employeeSelected: " + employeeSelected);

                return employeeSelected;
            }
            else{
                var employeeSelected = employeesAvailableForShift[0];

                return employeeSelected;
            }
        }
    });

}

function formatDate(newDate) {
    var dd = newDate.getDate();
    var mm = newDate.getMonth() + 1;
    var y = newDate.getFullYear();

    var newFormattedDate = mm + "/" + dd + "/" + y;
    return newFormattedDate;
}

function getAllShiftTimes(allSelects) {
    var allShiftTimes = [];

    for (var i = 0; i < allSelects.length; i++) {
        elementId = allSelects[i].id;
        inputVal = $("#" + elementId).val().trim();
        allShiftTimes.push(inputVal);
    }

    return allShiftTimes;
}

function getNumOfEmployeesNeeded(allElements) {
    var allNumOfEmployees = [];

    for (var i = 0; i < allElements.length; i++) {
        elementId = allElements[i].id;
        inputVal = $("#" + elementId).val().trim();
        allNumOfEmployees.push(inputVal);
    }

    return allNumOfEmployees;
}