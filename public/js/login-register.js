
//============ login 
$("#login-btn").on("click", function (event){
    event.preventDefault()
    let email = $("#login-email").val().trim();
    let password = $("#login-password").val().trim();
    console.log("email:" + email + "password:" + password )
    checkEmailAndPassword(email, password)
})



function checkEmailAndPassword(email, password) {
    const url = `/api/employee/find/${email}/${password}`;
    console.log(url);
    $.get(url, (result) => {

    }).then((result)=> {
        console.log(result);
        if (result) {
            console.log(result);
            const locationNum = result.LocationNum;
            console.log(locationNum);
            
            window.location.replace(`/${locationNum}/manager-view`);
        } else {
            const incorrectMessage = $("<div> Your password or email address was incorrect.</div>");
            $("#login-btn-id").append(incorrectMessage);
        }
    })

    
}
//============================================================


$("#create-btn").on("click", function (event) {
    event.preventDefault();
    var companyName = $("#company-name").val().trim();
    var storeCity = $("#company-city").val().trim();

    addCompanyAndLocationToDB(companyName, (err) => {
        if (err) throw err;

        addEmployeeToDB(companyName, storeCity);
    });
});

function addCompanyAndLocationToDB(companyName, cb) {
    console.log("this will add Company And Location");

    $.get("/api/company/count/" + companyName, (result) => {
        console.log("result: " + result);

        if (result === 0) {
            console.log("no company exists... adding company...");
            addCompany(companyName);
        }
        else {
            addLocationToDB(companyName);
        }
    });

    function addCompany(companyName) {
        var companyInfo = {
            Name: companyName
        };

        $.post("/api/newCompany", companyInfo)
            .then(() => {
                addLocationToDB(companyName);
            })
    }

    function addLocationToDB(companyName) {
        $.get("/api/company/find/" + companyName, (data) => {
          var num = data.id;
          addInfo(num);
        });

        function addInfo(companyNum) {
            var streetAddress = $("#company-street").val().trim();
            var city = $("#company-city").val().trim();
            var state = $("#company-state").val().trim();
            var zipcode = $("#company-zipcode").val().trim();
            var country = $("#company-country").val().trim();

            var locationInfo = {
                CompanyNum: companyNum,
                Address: streetAddress,
                City: city,
                State: state,
                Zipcode: zipcode,
                Country: country
            };

            $.post("/api/newLocation", locationInfo)
                .then(() => {
                    console.log(locationInfo.City + " was added as a location");

                    cb();
                    $.get(`/api/location/find/${locationInfo.City}`, (result)=> {
                    }).then((result)=>{
                        console.log(result);
                        console.log(result.id);
                        window.location.replace(`/${result.id}/manager-view`);

                    }

                    )

                });

        };
    };
}

function addEmployeeToDB(companyName, storeCity) {
    var email = $("#employee-email").val().trim();
    var name = $("#employee-fullname").val().trim();
    var password = $("#employee-password").val().trim();
    var confirmPassword = $("#password-confirm").val().trim();

    var employeeInfo = {};

    if(password !== confirmPassword){
        console.log("passwords don't match...");
    }
    else{
        employeeInfo.Email = email;
        employeeInfo.FullName = name;
        employeeInfo.Password = password;
        employeeInfo.Status = "manager";
        employeeInfo.PositionType = "ft";

        $.get("/api/location/find/" + storeCity, (data) => {
            console.log("locationResult: " + data.id);
    
            employeeInfo.LocationNum = data.id;
        }).then(() => {
            addEmployee();
        });
    }

    function addEmployee(){
        $.post("/api/newEmployee", employeeInfo)
            .then(() => {
                console.log(employeeInfo + " was added as a new employee!")
            });
    }
}