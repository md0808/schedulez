var generatedScheduleShifts = [];
var dbSchedule = [];

$(document).ready(() => {
    var locationNum = window.location.pathname[1];

    $.get(`/api/getSchedule/${locationNum}`, (result) => {
    }).then((result) => {
        if (result !== null) {
            $("#location-schedule").empty();

            var allDivs = $(`
            <div id="main-day1">              
            </div>
            <div id="main-day2">             
            </div>
            <div id="main-day3">    
            </div>
            <div id="main-day4">
            </div>
            <div id="main-day5">
            </div>
            <div id="main-day6">
            </div>
            <div id="main-day7">
            </div>
            <div id="main-day8">
            </div>
            <div id="main-day9">
            </div>
            <div id="main-day10">
            </div>
            <div id="main-day11">
            </div>
            <div id="main-day12">
            </div>
            <div id="main-day13">
            </div>
            <div id="main-day14">
            </div>
            `);

            $("#location-schedule").append(allDivs);

            hideAndShowScheduleDays();

            var scheduleDate = [];
            var date = new Date(result.ScheduleStartDate);
            var formattedDate = formatDate(date);
            scheduleDate.push(formattedDate);

            for(var i = 0; i < 14; i++){
                var employeeNums = result[`Day${i + 1}Employees`].split(",");
                var position = i;
                showSchedule(position);

                function showSchedule(position){
                    var employeeNames = [];

                    for(var j = 0; j < employeeNums.length; j++){
                        var employeeNum = employeeNums[j];                        
                        getEmployeeName(employeeNum, (name) => {
                            employeeNames.push(name)
                        }); 
                    }

                    setTimeout(function () {
                        createShiftObject(employeeNames, position);
                    }, 200);
                }

                function getEmployeeName(employeeNum, cb){
                    $.get(`/api/employee/find/${employeeNum}`, (result) => {
                    }).then((result) => {
                        cb(result.FullName);
                    })
                }
            }
            
            for (var i = 1; i < 14; i++){
                date.setDate(date.getDate() +1);

                var newFormattedDate = formatDate(date);
                scheduleDate.push(newFormattedDate);
            }

            function createShiftObject(employeesNames, position){
                var newShift = {};
                newShift.dayPosition = position + 1;
                newShift.date = scheduleDate[position];
                newShift.shiftTimes = result[`Day${position + 1}Shift`];
                newShift.scheduledEmployees = result[`Day${position + 1}Employees`];
                newShift.employeeNames = employeesNames;

                dbSchedule.push(newShift);
            }

            setTimeout(function (){
                createScheduleTable();
            }, 300);

            function createScheduleTable(){
                for (var i = 0; i < 14; i++) {
                    var shift = dbSchedule[i];
                    var dayPosition = shift["dayPosition"];
                    var date = shift["date"];
                    var shiftSplit = shift["shiftTimes"].split(",");
                    var employees = shift["scheduledEmployees"];
                    var employeeNames = shift["employeeNames"];

                    shiftStartTimes = [];
                    shiftEndTimes = [];

                    var dateSplit = date.split("/");
                    var newDate = `${dateSplit[0]}T${dateSplit[1]}T${dateSplit[2]}`;

                    $(`#date${dayPosition}`).text(date);
                    $(`#date${dayPosition}`).attr("data-date", date);

                    for(var j = 0; j < shiftSplit.length; j++){
                        var shiftTimeSplit = shiftSplit[j].split("-");

                        shiftStartTimes.push(shiftTimeSplit[0]);
                        shiftEndTimes.push(shiftTimeSplit[1]);
                    }
    
                    var table = $(`
                    <table>
                        <tr>
                            <th>Employee Name</th>
                            <th>Start-Time</th>
                            <th>End-Time</th>
                            <th>Hours Scheduled</th>
                        </tr>
                    </table>
                    `);
    
                    //does this for each shift and employee
                    for (var j = 0; j < shiftSplit.length; j++) {
                        var employeeName = employeeNames[j];

                        var shiftStart = shiftStartTimes[j];
                        var shiftEnd = shiftEndTimes[j];
    

                        var convertedStartTime = moment(shiftStart, ["HH:mm"]).format("h:mm A");
                        var convertedEndTime = moment(shiftEnd, ["HH:mm"]).format("h:mm A");

                        var diff = findMilitaryTimeDifference(shiftStart, shiftEnd);

                        var row = $(`
                        <tr>
                            <td>${employeeName}</td>
                            <td>${convertedStartTime}</td>
                            <td>${convertedEndTime}</td>
                            <td>${diff}</td>
                        </tr>
                        `);

                        $(table).append(row);
                        $(`#main-day${dayPosition}`).append(table);
                    }
                }

                hideAndShowScheduleDays("1");

                var startDate = dbSchedule[0]["date"];
                $("#schedule-date").text(startDate);
            }
        }

        else {
            $("#location-schedule").empty();

            var noScheduleText = $("<p> There is no schedule currently... </p>");
            $("#location-schedule").append(noScheduleText);
        }
    });
});

function findMilitaryTimeDifference(shiftStart, shiftEnd){
    var shiftStartHr = parseInt(shiftStart.split(":")[0]);
    var shiftStartMin = parseInt(shiftStart.split(":")[1]);
    var shiftEndHr = parseInt(shiftEnd.split(":")[0]);
    var shiftEndMin = parseInt(shiftEnd.split(":")[1]);

    console.log("start: " + shiftStart + " end: " + shiftEnd);

    var diff = moment.utc(moment(shiftEnd, "HH:mm").diff(moment(shiftStart, "HH:mm"))).format("HH:mm");
    console.log("diff: " + diff);

    // var hrDiff = 0;
    // var minDiff = 0;

    // if(shiftStartMin !== shiftEndMin || shiftStartMin > shiftEndMin){
    //     console.log("infunc -- start: " + shiftStartMin + " min: " + shiftEndMin);
    //     hrDiff = hrDiff -1;
    //     minDiffVal = shiftStartMin - shiftEndMin;
    //     minDiff = 60 - minDiffVal; 
    // }
    // else{
    //     hrDiff = shiftEndHr - shiftStartHr;
    //     minDiff = shiftEndMin - shiftStartMin;
    // }

    // if(minDiff < 0){
    //     minDiff = minDiff * -1;
    // }

    // var diff = hrDiff + ":" + minDiff;
    return diff;
}

function hideAndShowScheduleDays(dayToShow){
    $("#main-day1").hide();
    $("#main-day2").hide();
    $("#main-day3").hide();
    $("#main-day4").hide();
    $("#main-day5").hide();
    $("#main-day6").hide();
    $("#main-day7").hide();
    $("#main-day8").hide();
    $("#main-day9").hide();
    $("#main-day10").hide();
    $("#main-day11").hide();
    $("#main-day12").hide();
    $("#main-day13").hide();
    $("#main-day14").hide();

    if(dayToShow !== null){
        $(`#main-day${dayToShow}`).show();
    }
}

$("#new-schedule-add-btn").on("click", () => {
    getGeneratedSchedule();

    setTimeout(function () {
        $("#loadingGeneratingSchedule").hide();
        $("#generated-schedule-section").show();
    }, 7000);

    function getGeneratedSchedule() {
        clearDivs();

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

            var newFormattedDate = formatDate(newDate);
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
                var employeesNames = [];

                for (var i = 0; i < shiftTimes.length; i++) {
                    findEmployeesForSchedule(shiftTimes[i], weekday, (employeeToWork, employeeName) => {
                        employeesScheduledToWork.push(employeeToWork);
                        employeesNames.push(employeeName);
                    });
                }

                createShift(date, weekday, dayPosition, employeesScheduledToWork, employeesNames);
            }

            function createShift(date, weekday, dayPosition, employeesToWork, employeesNames) {
                var newShift = {};
                newShift.dayPosition = dayPosition;
                newShift.date = date;
                newShift.weekday = weekday;
                newShift.shiftTimes = shiftTimes;
                newShift.numberOfEmployees = numOfEmployeesNeeded;
                newShift.scheduledEmployees = employeesToWork;
                newShift.employeeNames = employeesNames;
                scheduleShifts.push(newShift);
            }
        }

        setTimeout(function () {
            showScheduleInfo(scheduleShifts);
        }, 5000);

    }
});

function clearDivs(){
    $("#div1Shift").empty();
    $("#div2Shift").empty();
    $("#div3Shift").empty();
    $("#div4Shift").empty();
    $("#div5Shift").empty();
    $("#div6Shift").empty();
    $("#div7Shift").empty();
    $("#div8Shift").empty();
    $("#div9Shift").empty();
    $("#div10Shift").empty();
    $("#div11Shift").empty();
    $("#div12Shift").empty();
    $("#div13Shift").empty();
    $("#div14Shift").empty();
}

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
}

function findEmployeesForSchedule(shiftTime, weekday, cb) {
    var startHR = shiftTime.split(":")[0];
    var employeesAvailableForShift = [];
    var locationNum = window.location.pathname[1];
    var employeeNum = [];

    $.get(`/api/allEmployees/${locationNum}`, (result) => {
    }).then((result) => {

        //gets all employee nums
        for (var i = 0; i < result.length; i++) {
            employeeNum.push(result[i].id);
        }

        //gets all the employees availability
        for (var i = 0; i < employeeNum.length; i++) {
            $.get(`/api/availability/${employeeNum[i]}`, (result) => {
            }).then((result) => {
                var employeeAvailability = [result.sunday, result.monday, result.tuesday, result.wednesday, result.thursday, result.friday, result.saturday];
                var thisEmployeeNum = result.EmployeeNum;

                switch (weekday) {
                    case "sunday":
                        checkAvailability("sunday", employeeAvailability[0], startHR, thisEmployeeNum);
                        break;
                    case "monday":
                        checkAvailability("monday", employeeAvailability[1], startHR, thisEmployeeNum);
                        break;
                    case "tuesday":
                        checkAvailability("tuesday", employeeAvailability[2], startHR, thisEmployeeNum);
                        break;
                    case "wednesday":
                        checkAvailability("wednesday", employeeAvailability[3], startHR, thisEmployeeNum);
                        break;
                    case "thursday":
                        checkAvailability("thursday", employeeAvailability[4], startHR, thisEmployeeNum);
                        break;
                    case "friday":
                        checkAvailability("friday", employeeAvailability[5], startHR, thisEmployeeNum);
                        break;
                    case "saturday":
                        checkAvailability("saturday", employeeAvailability[6], startHR, thisEmployeeNum);
                        break;

                }

                if (thisEmployeeNum === employeeNum[employeeNum.length - 1]) {
                    var employeeChose = selectEmployee();

                    $.get(`/api/employee/find/${employeeChose}`, (result) => {                        
                    }).then((result) => {
                        var employeeName = result.FullName
                        cb(employeeChose, employeeName);
                    })
                }
            });


        }

        function checkAvailability(weekday, availability, shiftStartHR, employeeNum) {
            var employeeAvailability = parseInt(availability.split(":")[0]);
            if (shiftStartHR >= employeeAvailability) {
                employeesAvailableForShift.push(employeeNum);
            }
        }

        function selectEmployee() {
            if (employeesAvailableForShift.length > 1) {
                var numberOfEmployeesAvailable = employeesAvailableForShift.length;
                var randomNum = Math.floor(Math.random() * Math.floor(numberOfEmployeesAvailable));
                var employeeSelected = employeesAvailableForShift[randomNum];
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
    for (var i = 0; i < shifts.length; i++) {
        // console.log(shifts[i]);
        var objectValues = Object.values(shifts[i]);
        var allShiftTimes = [];
        var shiftPosition = shifts[i].dayPosition;
        var shiftDate = shifts[i].date;
        var shiftWeekday = shifts[i].weekday;
        var allShiftValues = shifts[i].shiftTimes;

        var table = $(`
        <table>
            <tr>
                <th>Employee Name</th>
                <th>Start-Time</th>
                <th>End-Time</th>
                <th>Hours Scheduled</th>
            </tr>
        </table>   
        `);

        //Pushes shiftTimes to arr
        for (var j = 0; j < allShiftValues.length; j++) {
            allShiftTimes.push(allShiftValues[j]);
        }

        //tracks employee num
        var allEmployeesScheduled = []
        var employeesScheduled = shifts[i].scheduledEmployees;

        //tracks employee name
        var allEmployeeNames = [];
        var employeesScheduledNames = shifts[i].employeeNames;

        //Pushes employee to arr
        for (var j = 0; j < employeesScheduled.length; j++) {
            allEmployeesScheduled.push(employeesScheduled[j]);
        }

        //Pushed employee names to arr
        for(var j = 0; j < employeesScheduledNames.length; j++){
            allEmployeeNames.push(employeesScheduledNames[j]);
        }

        //creates a new row for every shift
        for (var j = 0; j < allEmployeesScheduled.length; j++) {
            var employeeNum = allEmployeesScheduled[j];
            var employeeName = allEmployeeNames[j];
            var shiftTimeSplit = allShiftTimes[j].split("-");
            var shiftStart = shiftTimeSplit[0];
            var convertedStartTime = moment(shiftStart, ["HH:mm"]).format("h:mm A");
            var shiftEnd = shiftTimeSplit[1];
            var convertedEndTime = moment(shiftEnd, ["HH:mm"]).format("h:mm A");

            var diff = findMilitaryTimeDifference(shiftStart, shiftEnd);

            var row = $(`
            <tr>
                <td>${employeeName}</td>
                <td>${convertedStartTime}</td>
                <td>${convertedEndTime}</td>
                <td>${diff}</td>
            </tr>
            `);

            $(`#day${shiftPosition}-title`).text(shiftDate);

            $(table).append(row);
            $(`#day${shiftPosition}Shift`).append(table);
        }
    }

    generatedScheduleShifts.push(shifts);
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