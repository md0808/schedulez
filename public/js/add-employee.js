$(".addEmployee-btn").on("click", () => {
    console.log("addEmployee btn clicked...");

    var employeeName = $("#employee-name").val().trim();
    var employeeEmail = $("#employee-email").val().trim();
    var employeePassword = $("#employee-password").val().trim();
    var employeeRole =  $("#employee-role").val().trim();
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
        PositionTeam: employeePositionType
    }; 

    $.post("/api/newEmployee", employeeInfo)
    .then(() => {
        console.log("Added employee to ")
    })
});