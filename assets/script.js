$(document).ready(function() {

    $(".user-submit").on("click",function(event) {
        event.preventDefault();
        var userInput = $(".user-input").val().trim();
        searchCityWeather(userInput);
        $(".city-history").on("click", "li", function() {
            searchCityWeather($(this).text());
        });

    });


var localTime  = moment.utc().toDate();
var currentTime = moment(localTime).format("MM/DD/YY");
// var tomorrow = moment(localTime).add(1,'days')

function searchCityWeather(input) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=1a4d9161e2e475ad0fc5e0df86649984";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(pulldata) {
    if (search.indexOf(input) === -1) {
        search.push(input);
        localStorage.setItem("search",JSON.stringify(search));
        makeListItems(input);
    } 
    
    // var todayDateMonth = pulldata.list[0].dt_txt.charAt(5) + pulldata.list[0].dt_txt.charAt(6);
    // var todayDateDay = pulldata.list[0].dt_txt.charAt(8) + pulldata.list[0].dt_txt.charAt(9);
    
    var mainCityName = $("<h2>").html(pulldata.name + " " + currentTime +
        "<img width='50' src='http://openweathermap.org/img/wn/" + pulldata.weather[0].icon + "@2x.png'</img>");
    var tempF = (pulldata.main.temp - 273.15) * 1.80 + 32;
    var mainCityTemp = $("<h4>").text("Current Temperature: " + tempF.toFixed(2) + " " + String.fromCharCode(176) + "F");
    var mainCityWind = $("<h4>").text("Current Wind Speed: " + pulldata.wind.speed + "MpH");
    var mainCityHumid = $("<h4>").text("Current Humidity: " + pulldata.main.humidity + "%");

    $(".main-city").empty();
    $(".main-city").append(mainCityName,mainCityTemp,mainCityHumid,mainCityWind);

    var mainCityLon = pulldata.coord.lon;
    var mainCityLat = pulldata.coord.lat; 
    getUVIndex(mainCityLat,mainCityLon);
    // var futureDateMonth = pulldata.list[8].dt_txt.charAt(5) + pulldata.list[8].dt_txt.charAt(6);
    // var futureDateDay = pulldata.list[8].dt_txt.charAt(8) + pulldata.list[8].dt_txt.charAt(9);
    
    // var futureCityDate = $("<h4 class='pt-3'>").html(futureDateMonth + "/" + futureDateDay + "/20");
    // var futureCityIcon = $("<h5>").html("<img width='50' src='http://openweathermap.org/img/wn/" + pulldata.list[0].weather[0].icon + "@2x.png'</img>");
    // var tempFF = (pulldata.list[8].main.temp - 273.15) * 1.80 + 32;
    // var futureCityTemp = $("<h5>").text("Temperature: " + tempFF.toFixed(2) + " " + String.fromCharCode(176) + "F"); 
    // var futureCityHumid = $("<h5>").text("Humidity: " + pulldata.list[8].main.humidity + "%");
    // $(".first-day").empty();
    // $(".first-day").append(futureCityDate,futureCityIcon,futureCityTemp,futureCityHumid);

    });

    ///////////// SAVING THE DATA TO LOCALSTORAGE
    // if (userHistory !== "") {
    //     var search = JSON.parse(localStorage.getItem("search")) || [];
    //     var userHistory = $(".user-input").val().trim();

    //     search.push(userHistory);
    //     localStorage.setItem("search", JSON.stringify(search));


    //     console.log(search);
    //     console.log(userHistory);
    // }

    // var li = $("<li>");
    // $(li).text(search[i]);
    // $(".city-history").append(li);

    // $(".city-history").empty();

    // //////////// FOR LOOPING TO GET LOCALSTORAGE
    // for (var i = 0; i < search.length; i++) {
    //     var index = search[i];
    //     console.log(index);


    // }   
}

function makeListItems(text) {
    var li = $("<li>").addClass("list-group-item").text(text);
    $(".city-history").append(li);

}

function getUVIndex(lat,lon) {
    var queryURLAnother = "http://api.openweathermap.org/data/2.5/uvi?appid=1a4d9161e2e475ad0fc5e0df86649984&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURLAnother,
            method: "GET"
        }).then(function(response) { 
            var mainCityUltra = $("<h4>").text("Current UV Index: " + response.value);
            $(".main-city").append(mainCityUltra);
            
        });

}

function getForecast(input) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=1a4d9161e2e475ad0fc5e0df86649984";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(pulldata) {
            var futureDateMonth = pulldata.list[8].dt_txt.charAt(5) + pulldata.list[8].dt_txt.charAt(6);
    var futureDateDay = pulldata.list[8].dt_txt.charAt(8) + pulldata.list[8].dt_txt.charAt(9);
    
    var futureCityDate = $("<h4 class='pt-3'>").html(futureDateMonth + "/" + futureDateDay + "/20");
    var futureCityIcon = $("<h5>").html("<img width='50' src='http://openweathermap.org/img/wn/" + pulldata.list[0].weather[0].icon + "@2x.png'</img>");
    var tempFF = (pulldata.list[8].main.temp - 273.15) * 1.80 + 32;
    var futureCityTemp = $("<h5>").text("Temperature: " + tempFF.toFixed(2) + " " + String.fromCharCode(176) + "F"); 
    var futureCityHumid = $("<h5>").text("Humidity: " + pulldata.list[8].main.humidity + "%");
    $(".first-day").empty();
    $(".first-day").append(futureCityDate,futureCityIcon,futureCityTemp,futureCityHumid);
    });
}

var search = JSON.parse(localStorage.getItem("search")) || [];

    if (search.length > 0) {
        searchCityWeather(search[search.length - 1]);
    }

    for (var i = 0; i < search.length; i++) {
        makeListItems(search[i]);
    }
    // $(".user-submit").on("click",function(event) {
    //     event.preventDefault();
    //     var userInput = $(".user-input").val().trim();
    //     searchCityWeather(userInput);
    //     $(".city-history").on("click", "li", function() {
    //         searchCityWeather($(this).text());
    //     });

    // });
});