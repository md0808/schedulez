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
        var sundayStarthr = $("#ea-sunday-hr").val().trim();
        var sundayStartmin = $("#ea-sunday-min").val().trim();
        var sundayAvailability = sundayStarthr + ":" + sundayStartmin;
        //Monday
        var mondayStarthr = $("#ea-monday-hr").val().trim();
        var mondayStartmin = $("#ea-monday-min").val().trim();
        var mondayAvailability = mondayStarthr + ":" + mondayStartmin;
        //Tuesday
        var tuesdayStarthr = $("#ea-tuesday-hr").val().trim();
        var tuesdayStartmin = $("#ea-tuesday-min").val().trim();
        var tuesdayAvailability = tuesdayStarthr + ":" + tuesdayStartmin;
        //Wednesday
        var wednesdayStarthr = $("#ea-wednesday-hr").val().trim();
        var wednesdayStartmin = $("#ea-wednesday-min").val().trim();
        var wednesdayAvailability = wednesdayStarthr + ":" + wednesdayStartmin;
        //Thursday
        var thursdayStarthr = $("#ea-thursday-hr").val().trim();
        var thursdayStartmin = $("#ea-thursday-min").val().trim();
        var thursdayAvailability = thursdayStarthr + ":" + thursdayStartmin;
        //Friday
        var fridayStarthr = $("#ea-friday-hr").val().trim();
        var fridayStartmin = $("#ea-friday-min").val().trim();
        var fridayAvailability = fridayStarthr + ":" + fridayStartmin;
        //Saturday
        var saturdayStarthr = $("#ea-saturday-hr").val().trim();
        var saturdayStartmin = $("#ea-saturday-min").val().trim();
        var saturdayAvailability = saturdayStarthr + ":" + saturdayStartmin;

        var employeeInfoURL = "/api/employee/find/" + locationNum + "/" + firstName + "/" + lastName;
        console.log(employeeInfoURL)
        $.get(employeeInfoURL, (result) => {
            console.log("employeeNum: " + result.id);
            var availabilityInfo = {
                EmployeeNum: result.id,
                sunday: sundayAvailability,
                monday: mondayAvailability,
                tuesday: tuesdayAvailability,
                wednesday: wednesdayAvailability,
                thursday: thursdayAvailability,
                friday: fridayAvailability,
                saturday: saturdayAvailability
            };

            $.post("/api/newAvailability", availabilityInfo)
                .then(() => {
                    console.log("Availability was added to the db");
                });
        })
    }

});