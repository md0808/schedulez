var generatedScheduleShifts = [];

$(document).ready(() => {
    var locationNum = window.location.pathname[1];

    $.get(`/api/getSchedule/${locationNum}`, (result) => {
    }).then((result) => {
        console.log(result);

        if (result !== null) {
            $("#location-schedule").empty();

            var allDivs = $(`
            <div id="main-day1">
                    <p>Day 1:</p>
                </div>
                <div id="main-day2">
                    <p>Day 2:</p>
                </div>
                <div id="main-day3">
                    <p>Day 3:</p>
                </div>
                <div id="main-day4">
                    <p>Day 4:</p>
                </div>
                <div id="main-day5">
                    <p>Day 5:</p>
                </div>
                <div id="main-day6">
                    <p>Day 6:</p>
                </div>
                <div id="main-day7">
                    <p>Day 7:</p>
                </div>
                <div id="main-day8">
                    <p>Day 8:</p>
                </div>
                <div id="main-day9">
                    <p>Day 9:</p>
                </div>
                <div id="main-day10">
                    <p>Day 10:</p>
                </div>
                <div id="main-day11">
                    <p>Day 11:</p>
                </div>
                <div id="main-day12">
                    <p>Day 12:</p>
                </div>
                <div id="main-day13">
                    <p>Day 13:</p>
                </div>
                <div id="main-day14">
                    <p>Day 14:</p>
                </div>
            `);

            $("#location-schedule").append(allDivs);

            for (var i = 0; i < 14; i++) {
        
                var date = result[`ScheduleStartDate`];
                var shifts = result[`Day${i + 1}Shift`].split(",");
                var employees = result[`Day${i + 1}Employees`].split(",");

                for(var j = 0; j < shifts.length; j++){
                    pushMainScheduleToFrontEnd(i + 1, date, shifts[j], employees[j]);
                }
            }
        }

        else {
            $("#location-schedule").empty();

            var noScheduleText = $("<p> There is no schedule currently... </p>");
            $("#location-schedule").append(noScheduleText);
        }
    });
});

//Day1: (1/3/20) 1:30-2:00

function pushMainScheduleToFrontEnd(position, date, shift, employeeNum) {
    console.log("postion: " + " date: " + date + " shift: " + shift + " num: " + employeeNum);

    $.get(`/api/employee/find/${employeeNum}`, (result) => {           
    }).then((result) => {
        console.log(result.FullName);
        var name = result.FullName;

        var dateSentenceified = "(" + date + ") ";

        var shiftInfoSentence = dateSentenceified + shift + " : " + name + " Works";
        var shiftInfo = $(`<p>${shiftInfoSentence}</p>`)
        $(`#main-day${position }`).append(shiftInfo);
    });
}

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

    generateSchedule();

    function generateSchedule(cb) {
        for (var i = 0; i < scheduleDates.length; i++) {
            var weekday = scheduleDaysOfWeek[i];
            var date = scheduleDates[i];

            var dayPosition = i + 1;

            createShiftInfo(date, weekday, dayPosition);
        }

        function createShiftInfo(date, weekday, dayPosition) {
            var employeesScheduledToWork = [];

            for (var i = 0; i < shiftTimes.length; i++) {
                findEmployeesForSchedule(shiftTimes[i], weekday, (employeeToWork) => {
                    employeesScheduledToWork.push(employeeToWork);
                })
            }

            createShift(date, weekday, dayPosition, employeesScheduledToWork);
        }

        function createShift(date, weekday, dayPosition, employeesToWork) {
            var newShift = {};
            newShift.dayPosition = dayPosition;
            newShift.date = date;
            newShift.weekday = weekday;
            newShift.shiftTimes = shiftTimes;
            newShift.numberOfEmployees = numOfEmployeesNeeded;
            newShift.scheduledEmployees = employeesToWork;
            scheduleShifts.push(newShift);
        }
    }

    setTimeout(function () {
        showScheduleInfo(scheduleShifts);
    }, 2000);
});

$("#new-schedule-push-btn").on("click", () => {
    for (var i = 0; i < generatedScheduleShifts.length; i++) {
        addScheduleToDB(generatedScheduleShifts[i]);
    }
});

function addScheduleToDB(shiftInfo) {
    var locationNum = window.location.pathname[1];
    var scheduleStartDate = "";

    var info = {};

    for (var i = 0; i < shiftInfo.length; i++) {
        if (i === 0) {
            scheduleStartDate = shiftInfo[0].date;
        }

        var shiftTimes = shiftInfo[i].shiftTimes;
        var employees = shiftInfo[i].scheduledEmployees;

        info[`day${i + 1}Shift`] = shiftTimes;
        info[`day${i + 1}Employees`] = employees;

        // info.`day${i}Shift` = shiftTimes;
        // info.employeeInfoVarName = employees;
    }

    var day1Shift = info.day1Shift.toString();
    var day1Employees = info.day1Employees.toString();
    var day2Shift = info.day2Shift.toString();
    var day2Employees = info.day2Employees.toString();
    var day3Shift = info.day3Shift.toString();
    var day3Employees = info.day3Employees.toString();
    var day4Shift = info.day4Shift.toString();
    var day4Employees = info.day4Employees.toString();
    var day5Shift = info.day5Shift.toString();
    var day5Employees = info.day5Employees.toString();
    var day6Shift = info.day6Shift.toString();
    var day6Employees = info.day6Employees.toString();
    var day7Shift = info.day7Shift.toString();
    var day7Employees = info.day7Employees.toString();
    var day8Shift = info.day8Shift.toString();
    var day8Employees = info.day8Employees.toString();
    var day9Shift = info.day9Shift.toString();
    var day9Employees = info.day9Employees.toString();
    var day10Shift = info.day10Shift.toString();
    var day10Employees = info.day10Employees.toString();
    var day11Shift = info.day11Shift.toString();
    var day11Employees = info.day11Employees.toString();
    var day12Shift = info.day12Shift.toString();
    var day12Employees = info.day12Employees.toString();
    var day13Shift = info.day13Shift.toString();
    var day13Employees = info.day13Employees.toString();
    var day14Shift = info.day14Shift.toString();
    var day14Employees = info.day14Employees.toString();


    console.log(info);
    console.log(scheduleStartDate);

    var dbObject = {
        LocationNum: locationNum,
        ScheduleStartDate: scheduleStartDate,
        Day1Shift: day1Shift,
        Day1Employees: day1Employees,
        Day2Shift: day2Shift,
        Day2Employees: day2Employees,
        Day3Shift: day3Shift,
        Day3Employees: day3Employees,
        Day4Shift: day4Shift,
        Day4Employees: day4Employees,
        Day5Shift: day5Shift,
        Day5Employees: day5Employees,
        Day6Shift: day6Shift,
        Day6Employees: day6Employees,
        Day7Shift: day7Shift,
        Day7Employees: day7Employees,
        Day8Shift: day8Shift,
        Day8Employees: day8Employees,
        Day9Shift: day9Shift,
        Day9Employees: day9Employees,
        Day10Shift: day10Shift,
        Day10Employees: day10Employees,
        Day11Shift: day11Shift,
        Day11Employees: day11Employees,
        Day12Shift: day12Shift,
        Day12Employees: day12Employees,
        Day13Shift: day13Shift,
        Day13Employees: day13Employees,
        Day14Shift: day14Shift,
        Day14Employees: day14Employees
    }

    $.post("/api/newSchedule", dbObject)
        .then(() => {
            console.log("Schedule added to db");
        });

    // console.log("day1Shift: " + day1Shift);
    // console.log("day1Employees: " + day1Employees);
    // console.log("day2Shift: " + day2Shift);
    // console.log("day2Employees: " + day2Employees);
    // console.log("day3Shift: " + day3Shift);
    // console.log("day3Employees: " + day3Employees);
    // console.log("day4Shift: " + day4Shift);
    // console.log("day4Employees: " + day4Employees);
    // console.log("day5Shift: " + day5Shift);
    // console.log("day5Employees: " + day5Employees);
    // console.log("day6Shift: " + day6Shift);
    // console.log("day6Employees: " + day6Employees);
    // console.log("day7Shift: " + day7Shift);
    // console.log("day7Employees: " + day7Employees);
    // console.log("day8Shift: " + day8Shift);
    // console.log("day8Employees: " + day8Employees);
    // console.log("day9Shift: " + day9Shift);
    // console.log("day9Employees: " + day9Employees);
    // console.log("day10Shift: " + day10Shift);
    // console.log("day10Employees: " + day10Employees);
    // console.log("day11Shift: " + day11Shift);
    // console.log("day11Employees: " + day11Employees);
    // console.log("day12Shift: " + day12Shift);
    // console.log("day12Employees: " + day12Employees);
    // console.log("day13Shift: " + day13Shift);
    // console.log("day13Employees: " + day13Employees);
    // console.log("day14Shift: " + day14Shift);
    // console.log("day14Employees: " + day14Employees);
}

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
        for (var i = 0; i < employeeNum.length; i++) {
            $.get(`/api/availability/${employeeNum[i]}`, (result) => {
            }).then((result) => {
                var employeeAvailability = [result.sunday, result.monday, result.tuesday, result.wednesday, result.thursday, result.friday, result.saturday];
                //console.log(employeeAvailability);
                var thisEmployeeNum = result.EmployeeNum;

                switch (weekday) {
                    case "sunday":
                        //console.log("this sunday: " + thisEmployeeNum);
                        checkAvailability("sunday", employeeAvailability[0], startHR, thisEmployeeNum);
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

                if (thisEmployeeNum === employeeNum[employeeNum.length - 1]) {
                    //console.log("av: " + employeesAvailableForShift);
                    var employeeChose = selectEmployee();
                    //console.log("employeeChose: " + employeeChose);

                    cb(employeeChose);
                }
            });


        }

        function checkAvailability(weekday, availability, shiftStartHR, employeeNum) {
            //console.log("weekday: " + weekday + " availability: " + availability + " employeeNum: " + employeeNum);

            var employeeAvailability = parseInt(availability.split(":")[0]);
            if (shiftStartHR >= employeeAvailability) {
                //console.log("Employee-" + employeeNum + " can work one of the " + weekday + " shifts starting at " + shiftStartHR);
                employeesAvailableForShift.push(employeeNum);
            }
        }


        function selectEmployee() {
            if (employeesAvailableForShift.length > 1) {
                var numberOfEmployeesAvailable = employeesAvailableForShift.length;
                var randomNum = Math.floor(Math.random() * Math.floor(numberOfEmployeesAvailable));
                var employeeSelected = employeesAvailableForShift[randomNum];

                //console.log("Random number: " + randomNum + " -- employeeSelected: " + employeeSelected);

                return employeeSelected;
            }
            else {
                var employeeSelected = employeesAvailableForShift[0];
                return employeeSelected;
            }
        }
    });
}

function showScheduleInfo(shifts) {
    //console.log(JSON.stringify(shifts));

    for (var i = 0; i < shifts.length; i++) {
        var objectValues = Object.values(shifts[i]);
        var allShiftTimes = [];
        var shiftPosition = shifts[i].dayPosition;
        var shiftDate = "(" + shifts[i].date + ") ";
        var shiftWeekday = shifts[i].weekday;
        var allShiftValues = shifts[i].shiftTimes;

        //Pushes shiftTimes to arr
        for (var j = 0; j < allShiftValues.length; j++) {
            allShiftTimes.push(allShiftValues[j]);
        }

        var allEmployeesScheduled = []
        var employeesScheduled = shifts[i].scheduledEmployees;

        //Pushes employee to arr
        for (var j = 0; j < employeesScheduled.length; j++) {
            allEmployeesScheduled.push(employeesScheduled[j]);
        }

        //console.log("Position: " + shiftPosition + " Date: " + shiftDate + " Weekday: " + shiftWeekday + " Shifts: " + allShiftTimes + " Employee: " + allEmployeesScheduled);
        console.log("scheduled: " + allEmployeesScheduled);
        console.log("Position: " + shiftPosition + " Date: " + shiftDate + " Weekday: " + shiftWeekday + " Shifts: " + allShiftTimes + " Employee: " + allEmployeesScheduled);



        for (var j = 0; j < allEmployeesScheduled.length; j++) {
            var employeeNum = allEmployeesScheduled[j];
            var shiftTime = allShiftTimes[j];
            //console.log("num: " + employeeNum);

            pushScheduleInfoFrontEnd(shiftPosition, employeeNum, shiftDate, shiftTime);
        }
    }

    generatedScheduleShifts.push(shifts);
}

function pushScheduleInfoFrontEnd(position, employeeNum, shiftDate, shiftTime) {
    console.log("Position: " + position + " Date: " + shiftDate + " Shift: " + shiftTime + " Employee: " + employeeNum);

    $.get(`/api/employee/find/${employeeNum}`, (result) => {
    }).then((result) => {
        //console.log(result);
        employeeName = result.FullName;

        var shiftInfoSentence = shiftDate + shiftTime + " : " + employeeName + " Works";
        var shiftInfo = $(`<p>${shiftInfoSentence}</p>`)
        $(`#day${position}Shift`).append(shiftInfo);
    })
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