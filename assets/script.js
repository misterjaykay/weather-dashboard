

function searchCityWeather(input) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=1a4d9161e2e475ad0fc5e0df86649984";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(pulldata) {

    console.log(pulldata.name);
    console.log(pulldata.main.temp);
    console.log(pulldata.wind.speed);
    console.log(pulldata.main.humidity);
    
    var mainCityName = $("<h2>").text(pulldata.name);
    var tempF = (pulldata.main.temp - 273.15) * 1.80 + 32;
    var mainCityTemp = $("<h4>").text("Current Temperature: " + tempF.toFixed(2) + " " + String.fromCharCode(176) + "F");
    var mainCityWind = $("<h4>").text("Current Wind Speed: " + pulldata.wind.speed + "MpH");
    var mainCityHumid = $("<h4>").text("Current Humidity: " + pulldata.main.humidity + "%");

    $(".main-city").empty();
    $(".main-city").append(mainCityName,mainCityTemp,mainCityHumid,mainCityWind);

    console.log(pulldata.coord.lon);
    console.log(pulldata.coord.lat);

    });
 
    var queryURLAnother = "http://api.openweathermap.org/data/2.5/uvi?appid=1a4d9161e2e475ad0fc5e0df86649984&lat=51.51&lon=-0.13";
    console.log(queryURLAnother);
}



$(".user-submit").on("click",function(event) {
    event.preventDefault();
    var userInput = $(".user-input").val().trim();
    console.log(userInput);
    searchCityWeather(userInput);
});