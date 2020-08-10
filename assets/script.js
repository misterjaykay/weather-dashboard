$(document).ready(function () {

    $(".user-submit").on("click", function (event) {
        event.preventDefault();
        var userInput = $(".user-input").val().trim();
        searchCityWeather(userInput);
    });

    $(".city-history").on("click", "li", function () {
        searchCityWeather($(this).text());

    });



    ///// using moment.js to get the dates for future days.
    var localTime = moment.utc().toDate();
    var currentTime = moment(localTime).format("MM/DD/YY");
    var oneDayAfter = moment(localTime).add(1, 'days').format("MM/DD/YY");
    var twoDayAfter = moment(localTime).add(2, 'days').format("MM/DD/YY");
    var threeDayAfter = moment(localTime).add(3, 'days').format("MM/DD/YY");
    var fourDayAfter = moment(localTime).add(4, 'days').format("MM/DD/YY");
    var fiveDayAfter = moment(localTime).add(5, 'days').format("MM/DD/YY");


    ///// FUNCTION TO BRING OUT USER INPUT CITY'S WEATHER
    function searchCityWeather(input) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=1a4d9161e2e475ad0fc5e0df86649984";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (pulldata) {
            if (search.indexOf(input) === -1) {
                console.log(search);
                console.log(input);

                // search.push(input); 

                var userSearch = pulldata.name; /// user-input
                search.push(userSearch);
                makeListItems(userSearch);
                localStorage.setItem("search", JSON.stringify(search)); /// user-input stored in localstorage


            }

            var mainCityName = $("<h2>").html(pulldata.name + " " + currentTime +
                "<img width='50' src='http://openweathermap.org/img/wn/" + pulldata.weather[0].icon + "@2x.png'</img>");
            var tempF = (pulldata.main.temp - 273.15) * 1.80 + 32;
            var mainCityTemp = $("<h4>").text("Current Temperature: " + tempF.toFixed(2) + " " + String.fromCharCode(176) + "F");
            var mainCityWind = $("<h4>").text("Current Wind Speed: " + pulldata.wind.speed + "MpH");
            var mainCityHumid = $("<h4>").text("Current Humidity: " + pulldata.main.humidity + "%");

            $(".main-city").empty();
            $(".main-city").append(mainCityName, "<hr>", mainCityTemp, mainCityHumid, mainCityWind);

            ///// SENDING OUT LAN,LOT TO ANOTHER FUNCTION
            var mainCityLon = pulldata.coord.lon;
            var mainCityLat = pulldata.coord.lat;
            getUVIndex(mainCityLat, mainCityLon);
            getForecast(input);
        });

        ///////////// SAVING THE DATA TO LOCALSTORAGE
        // if (userHistory !== "") {
        //     var search = JSON.parse(localStorage.getItem("search")) || [];
        //     var userHistory = $(".user-input").val().trim();
        //     search.push(userHistory);
        //     localStorage.setItem("search", JSON.stringify(search));
        // }

    }

    ///// FUNCTION TO MAKE A LIST FOR USER'S PREVIOUS SEARCHS
    function makeListItems(text) {
        var liEl = $("<li>").addClass("list-group-item").text(text);
        // var aEl = $("<a>").attr("href", "").html(text);
        // $(liEl).append(aEl);
        $(".city-history").append(liEl);

    }


    ///// FUNCTION TO GET UV INDEX FOR CURRENT CITY
    function getUVIndex(lat, lon) {
        var queryURLAnother = "http://api.openweathermap.org/data/2.5/uvi?appid=1a4d9161e2e475ad0fc5e0df86649984&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURLAnother,
            method: "GET"
        }).then(function (response) {
            /// UV index under 3
            if (response.value < 3) {
                var mainCityUltra = $("<h4>").html("Current UV Index: " + response.value + "  " + "<img src='assets/images/green.png' width='12'</img>");
                $(".main-city").append(mainCityUltra);
            }
            
            /// UV index between 3 ~ 5
            else if (response.value < 6 && response.value > 2) {
                var mainCityUltra = $("<h4>").html("Current UV Index: " + response.value + "  " + "<img src='assets/images/yellow.png' width='12'</img>");
                $(".main-city").append(mainCityUltra);
            }

            /// UV index between 6 ~ 7
            else if (response.value < 8 && response.value > 5) {
                var mainCityUltra = $("<h4>").html("Current UV Index: " + response.value + "  " + "<img src='assets/images/orange.png' width='12'</img>");
                $(".main-city").append(mainCityUltra);
            }

            /// UV over 8
            else {
                var mainCityUltra = $("<h4>").html("Current UV Index: " + response.value + "  " + "<img src='assets/images/red.png' width='12'</img>");
                $(".main-city").append(mainCityUltra);
            }
            

        });

    }

    ///// FUNCTION TO GET 5 DAY FORECAST DATA TO CURRENT CITY
    function getForecast(input) {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=1a4d9161e2e475ad0fc5e0df86649984";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (pulldata1) {

            /// 1 day
            // console.log(pulldata1.list[6]);
            var oneDayDate = $("<h4 class='pt-3'>").html(oneDayAfter);
            var oneDayIcon = $("<h5>").html("<img width='50' src='http://openweathermap.org/img/wn/" + pulldata1.list[6].weather[0].icon + "@2x.png'</img>");
            var tempFOne = (pulldata1.list[6].main.temp - 273.15) * 1.80 + 32;
            var oneDayTemp = $("<h5>").text("Temperature: " + tempFOne.toFixed(2) + " " + String.fromCharCode(176) + "F");
            var oneDayHumid = $("<h5>").text("Humidity: " + pulldata1.list[6].main.humidity + "%");
            $(".first-day").empty();
            $(".first-day").append(oneDayDate, oneDayIcon, oneDayTemp, oneDayHumid);

            /// 2 day
            // console.log(pulldata1.list[14]);
            var twoDayDate = $("<h4 class='pt-3'>").html(twoDayAfter);
            var twoDayIcon = $("<h5>").html("<img width='50' src='http://openweathermap.org/img/wn/" + pulldata1.list[14].weather[0].icon + "@2x.png'</img>");
            var tempFTwo = (pulldata1.list[14].main.temp - 273.15) * 1.80 + 32;
            var twoDayTemp = $("<h5>").text("Temperature: " + tempFTwo.toFixed(2) + " " + String.fromCharCode(176) + "F");
            var twoDayHumid = $("<h5>").text("Humidity: " + pulldata1.list[14].main.humidity + "%");
            $(".second-day").empty();
            $(".second-day").append(twoDayDate, twoDayIcon, twoDayTemp, twoDayHumid);

            /// 3 day
            // console.log(pulldata1.list[22]);
            var threeDayDate = $("<h4 class='pt-3'>").html(threeDayAfter);
            var threeDayIcon = $("<h5>").html("<img width='50' src='http://openweathermap.org/img/wn/" + pulldata1.list[22].weather[0].icon + "@2x.png'</img>");
            var tempFThree = (pulldata1.list[22].main.temp - 273.15) * 1.80 + 32;
            var threeDayTemp = $("<h5>").text("Temperature: " + tempFThree.toFixed(2) + " " + String.fromCharCode(176) + "F");
            var threeDayHumid = $("<h5>").text("Humidity: " + pulldata1.list[22].main.humidity + "%");
            $(".third-day").empty();
            $(".third-day").append(threeDayDate, threeDayIcon, threeDayTemp, threeDayHumid);

            /// 4 day
            // console.log(pulldata1.list[30]);
            var fourDayDate = $("<h4 class='pt-3'>").html(fourDayAfter);
            var fourDayIcon = $("<h5>").html("<img width='50' src='http://openweathermap.org/img/wn/" + pulldata1.list[30].weather[0].icon + "@2x.png'</img>");
            var tempFFour = (pulldata1.list[30].main.temp - 273.15) * 1.80 + 32;
            var fourDayTemp = $("<h5>").text("Temperature: " + tempFFour.toFixed(2) + " " + String.fromCharCode(176) + "F");
            var fourDayHumid = $("<h5>").text("Humidity: " + pulldata1.list[30].main.humidity + "%");
            $(".fourth-day").empty();
            $(".fourth-day").append(fourDayDate, fourDayIcon, fourDayTemp, fourDayHumid);

            /// 5 day
            // console.log(pulldata1.list[38]);
            var fiveDayDate = $("<h4 class='pt-3'>").html(fiveDayAfter);
            var fiveDayIcon = $("<h5>").html("<img width='50' src='http://openweathermap.org/img/wn/" + pulldata1.list[38].weather[0].icon + "@2x.png'</img>");
            var tempFFive = (pulldata1.list[38].main.temp - 273.15) * 1.80 + 32;
            var fiveDayTemp = $("<h5>").text("Temperature: " + tempFFive.toFixed(2) + " " + String.fromCharCode(176) + "F");
            var fiveDayHumid = $("<h5>").text("Humidity: " + pulldata1.list[38].main.humidity + "%");
            $(".fifth-day").empty();
            $(".fifth-day").append(fiveDayDate, fiveDayIcon, fiveDayTemp, fiveDayHumid);

        });
    }

    // ///// LOCALSTORAGE
    var search = JSON.parse(localStorage.getItem("search")) || [];

    // /// TO BRING OUT THE LAST SEARCHED CITY DATA WHEN PAGE REFRESHED
    if (search.length > 0) {
        searchCityWeather(search[search.length - 1]);
    }

    ///// FOR LOOOPING TO GET THE PREVIOUS SEARCH HISTORY AND PUT IT ON THE LIST
    function renderHistory() {
        for (var i = 0; i < search.length; i++) {
            makeListItems(search[i]);
        }
    }
    renderHistory();

});
