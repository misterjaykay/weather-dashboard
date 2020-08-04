

function searchCityWeather(input) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=1a4d9161e2e475ad0fc5e0df86649984";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(pulldata) {

    console.log(pulldata.city.name);
    console.log(pulldata.list[0].main.temp);
    console.log(pulldata.list[0].wind.speed);
    console.log(pulldata.list[0].main.humidity);
    
    var mainCityName = $("<h2>").text(pulldata.city.name);
    var tempF = (pulldata.list[0].main.temp - 273.15) * 1.80 + 32;
    var mainCityTemp = $("<h4>").text("Current Temperature: " + tempF.toFixed(2) + " " + String.fromCharCode(176) + "F");
    var mainCityWind = $("<h4>").text("Current Wind Speed: " + pulldata.list[0].wind.speed + "MpH");
    var mainCityHumid = $("<h4>").text("Current Humidity: " + pulldata.list[0].main.humidity + "%");

    $(".main-city").empty();
    $(".main-city").append(mainCityName,mainCityTemp,mainCityHumid,mainCityWind);

    console.log(pulldata.city.coord.lon);
    console.log(pulldata.city.coord.lat);
    var mainCityLon = pulldata.city.coord.lon;
    var mainCityLat = pulldata.city.coord.lat;
    var queryURLAnother = "http://api.openweathermap.org/data/2.5/uvi?appid=1a4d9161e2e475ad0fc5e0df86649984&lat=" + mainCityLat + "&lon=" + mainCityLon;
        $.ajax({
            url: queryURLAnother,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.value);
            var mainCityUltra = $("<h4>").text("Current UV Index: " + response.value);
            $(".main-city").append(mainCityUltra);
            
        });

    });
    if (userHistory !== "") {
        var search = JSON.parse(localStorage.getItem("search")) || [];

        var userHistory = $(".user-input").val().trim();

        search.push(userHistory);
        localStorage.setItem("search", JSON.stringify(search));
       
    }
    
    
}



$(".user-submit").on("click",function(event) {
    event.preventDefault();
    var userInput = $(".user-input").val().trim();
    console.log(userInput);
    searchCityWeather(userInput);
});