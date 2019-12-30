$(".addEmployee-btn").on("click", () => {
    console.log("addEmployee btn clicked...");

    var employeeName = $("#employee-name").val().trim();
    var employeeEmail = $("#employee-email").val().trim();
    var employeePassword = $("#employee-password").val().trim();
    var employeeRole = $("#employee-role").val().trim();
    var employeeStatus = $("#employee-status").val().trim();
    var employeePositionType = $("#employee-positionType").val().trim();
    var locationNum = window.location.pathname[1];

    var employeeInfo = {
        LocationNum: locationNum,
        Email: employeeEmail,
        FullName: employeeName,
        Password: employeePassword,
        Status: employeeStatus,
        Role: employeeRole,
        PositionType: employeePositionType
    };

    addEmployeeToDB(() => {
        addAvailabilityToDB();
    })

    function addEmployeeToDB(cb) {
        console.log("in addEmployeeToDB");

        $.post("/api/newEmployee", employeeInfo)
            .then(() => {
                console.log("Added employee to db")
                cb();
            })
    }

    function addAvailabilityToDB() {
        console.log("in getEmployeeInfo");

        var fullName = employeeName.split(" ");
        var firstName = fullName[0];
        var lastName = fullName[1];

        //Sunday
        var sundayStarthr = $("#ea-sun-start-hr").val().trim();
        var sundayStartmin = $("#ea-sun-start-min").val().trim();
        var sundayEndhr = $("#ea-sun-end-hr").val().trim();
        var sundayEndmin = $("#ea-sun-end-min").val().trim();
        var sundayAvailability = sundayStarthr + ":" + sundayStartmin + "-" + sundayEndhr + ":" + sundayEndmin;
        //Monday
        var mondayStarthr = $("#ea-mon-start-hr").val().trim();
        var mondayStartmin = $("#ea-mon-start-min").val().trim();
        var mondayEndhr = $("#ea-mon-end-hr").val().trim();
        var mondayEndmin = $("#ea-mon-end-min").val().trim();
        var mondayAvailability = mondayStarthr + ":" + mondayStartmin + "-" + mondayEndhr + ":" + mondayEndmin;
        //Tuesday
        var tuesdayStarthr = $("#ea-tues-start-hr").val().trim();
        var tuesdayStartmin = $("#ea-tues-start-min").val().trim();
        var tuesdayEndhr = $("#ea-tues-end-hr").val().trim();
        var tuesdayEndmin = $("#ea-tues-end-min").val().trim();
        var tuesdayAvailability = tuesdayStarthr + ":" + tuesdayStartmin + "-" + tuesdayEndhr + ":" + tuesdayEndmin;
        //Wednesday
        var wednesdayStarthr = $("#ea-wed-start-hr").val().trim();
        var wednesdayStartmin = $("#ea-wed-start-min").val().trim();
        var wednesdayEndhr = $("#ea-wed-end-hr").val().trim();
        var wednesdayEndmin = $("#ea-wed-end-min").val().trim();
        var wednesdayAvailability = wednesdayStarthr + ":" + wednesdayStartmin + "-" + wednesdayEndhr + ":" + wednesdayEndmin;
        //Thursday
        var thursdayStarthr = $("#ea-thur-start-hr").val().trim();
        var thursdayStartmin = $("#ea-thur-start-min").val().trim();
        var thursdayEndhr = $("#ea-thur-end-hr").val().trim();
        var thursdayEndmin = $("#ea-thur-end-min").val().trim();
        var thursdayAvailability = thursdayStarthr + ":" + thursdayStartmin + "-" + thursdayEndhr + ":" + thursdayEndmin;
        //Friday
        var fridayStarthr = $("#ea-fri-start-hr").val().trim();
        var fridayStartmin = $("#ea-fri-start-min").val().trim();
        var fridayEndhr = $("#ea-fri-end-hr").val().trim();
        var fridayEndmin = $("#ea-fri-end-min").val().trim();
        var fridayAvailability = fridayStarthr + ":" + fridayStartmin + "-" + fridayEndhr + ":" + fridayEndmin;
        //Saturday
        var saturdayStarthr = $("#ea-sat-start-hr").val().trim();
        var saturdayStartmin = $("#ea-sat-start-min").val().trim();
        var saturdayEndhr = $("#ea-sat-end-hr").val().trim();
        var saturdayEndmin = $("#ea-sat-end-min").val().trim();
        var saturdayAvailability = saturdayStarthr + ":" + saturdayStartmin + "-" + saturdayEndhr + ":" + saturdayEndmin;

        var employeeInfoURL = "/api/employee/find/" + locationNum + "/" + firstName + "/" + lastName;
        console.log(employeeInfoURL)
        $.get(employeeInfoURL, (result) => {
            console.log("employeeNum: " + result.id);
            var availabilityInfo = {
                EmployeeNum: result.id,
                Sunday: sundayAvailability,
                Monday: mondayAvailability,
                Tuesday: tuesdayAvailability,
                Wednesday: wednesdayAvailability,
                Thursday: thursdayAvailability,
                Friday: fridayAvailability,
                Saturday: saturdayAvailability
            };

            $.post("/api/newAvailability", availabilityInfo)
                .then(() => {
                    console.log("Availability was added to the db");
                });
        })
    }

});