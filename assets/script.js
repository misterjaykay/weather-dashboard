$(document).ready(function() {
});



var localTime  = moment.utc().toDate();
var currentTime = moment(localTime).format("MMMM Do YYYY, h:mm");

console.log(localTime);
console.log(currentTime);

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
    console.log(pulldata.list[0].weather[0].icon);
    var todayDateMonth = pulldata.list[0].dt_txt.charAt(5) + pulldata.list[0].dt_txt.charAt(6);
    var todayDateDay = pulldata.list[0].dt_txt.charAt(8) + pulldata.list[0].dt_txt.charAt(9);
    
    var mainCityName = $("<h2>").html(pulldata.city.name + " " + todayDateMonth + "/" + todayDateDay + "/20" +
        "<img width='50' src='http://openweathermap.org/img/wn/" + pulldata.list[0].weather[0].icon + "@2x.png'</img>");
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

    /////////////// SAVING THE DATA TO LOCALSTORAGE
    // if (userHistory !== "") {
    //     var search = JSON.parse(localStorage.getItem("search")) || [];

    //     var userHistory = $(".user-input").val().trim();

    //     search.push(userHistory);
    //     localStorage.setItem("search", JSON.stringify(search));
    //     console.log(search);
    //     console.log(userHistory);
    // }

    ////////////// FOR LOOPING TO GET LOCALSTORAGE
    // for (var i = 0; i < search.length; i++) {
    //     var index = search[i];
    //     console.log(index);

    //     var li = $("<li>");
    //     $(li).text(search[i]);
    //     $(".city-history").append(li);

    // }
    
    
}



$(".user-submit").on("click",function(event) {
    event.preventDefault();
    var userInput = $(".user-input").val().trim();
    console.log(userInput);
    searchCityWeather(userInput);
});