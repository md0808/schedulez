const submitBtn = $("#login-btn");

$(submitBtn).on("click", function(){
    var companyName = "Walmart";
    var companyExists = lookForCompanyInDB(companyName);

    console.log("Company: " + companyExists);

    var companyInfo = {
        Name: companyName
    };

    if(!companyExists){
        $.post("/api/newCompany", companyInfo)
            .then(() => {
                console.log(companyName + " was added to the db!");
            })
    };
});

function lookForCompanyInDB(companyName){
    var foundCompany = false;

    $.get("/api/company/" + companyName, (result) => {
        if(result === 0){
            foundCompany = true;
        };
    })

    return foundCompany;
}