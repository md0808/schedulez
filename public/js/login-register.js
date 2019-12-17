var createBtn = $("#create-btn");

$("#create-btn").on("click", function () {
    var companyName = $("#company-name").val().trim();

    addCompanyAndLocationToDB(companyName);
});

function addCompanyAndLocationToDB(companyName) {
    $.get("/api/company/count/" + companyName, (result) => {
        console.log("result: " + result);

        if (result === 0) {
            console.log("no company exists... adding company...");
            addCompany(companyName);
        }
        else{
            console.log("found company... adding location");
            addLocationToDB(companyName)
        }
    })
}

function addCompany(companyName){
    var companyInfo = {
        Name: companyName
    };

    $.post("/api/newCompany", companyInfo)
        .then(() => {
            addLocationToDB(companyName)
        })
}

function addLocationToDB(companyName) {
    $.get("/api/company/find/" + companyName, (data) => {
        var num = data.CompanyNum;
        addInfo(num);
    });

    function addInfo(companyNum) {
        var streetAddress = $("#company-street").val().trim()
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
            })
    };
};

function checkCompanyInDB(companyName) {
    $.get("/api/company/count/" + companyName, (result) => {
        if (result === 0) {
            addCompany(companyName);
        }
        else{
            addLocationToDB(companyName)
        }
    })
};