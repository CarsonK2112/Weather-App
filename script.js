$(document).ready(function() {
    console.log('page loaded')
    // global variables
    var APIkey = "88c5a7118447f1ce4f758d4276f5339d";
    var recentCitySearches = [];
    var singleDaysForecast = [];

    // html elements

    // assigning key to variable
    
    init();

    function findWeather(area) {
        // function to get weather and city data
        // var queryURL = "api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + APIkey
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=88c5a7118447f1ce4f758d4276f5339d"
    }
    
    //ON PAGE LOAD
    function init() {
        // Use local storage to save city searches
        var storedCitySearches = JSON.parse(localStorage.getItem("weather-city"))
        // Check to see if the app has accessed local storage
        if (storedCitySearches !== null) {
            // if no local storage -> create it
            // if yes local storage -> access it
            recentCitySearches = storedCitySearches;
        }
        console.log('localstorage initd: ', recentCitySearches)
        // render the contents of local storage to the past search bar.
        renderPastSearches()
    }

    // this handles rendering the past searches sidebar
    function renderPastSearches () {
        console.log('render past searches function initiated')

        // clear our canvas
        // loop through recentCitySearches
           // mock html for each individual city
           // <p class="past-searches" value="Chicago">Chicago</p>
           // add ^element to the canvas
        
    }

    function currentWeatherAPI(city) {
        $.ajax({
            // documentation: 
            // endpoint: "api.openweathermap.org/data/2.5/forecast"
            // apikey: 
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=88c5a7118447f1ce4f758d4276f5339d",
            method: "GET",
    
        }).then(function(onSuccess) {
            console.log('we did it. ajax success')
            console.log(onSuccess.list)
            var weathercardshtml = ""
            var i;
            for (i = 0; i < onSuccess.list.length; i++){
            if (onSuccess.list[i].dt_txt.includes("12:00:00")){
                console.log(onSuccess.list[i], "onsuccess")
                weathercardshtml += futureForecastCardGenerator(onSuccess.list[i])
                // manipulate the dom to include the 5 day forecast
            }
            $("#forecast-container").html(weathercardshtml)
        }
            // date
            // weather
            // humidity
            // console.log("humid: ", onSuccess.main.humidity)
            // name
            // console.log("name:" , onSuccess.name)

            // var currentWeather = {
            //     humidity: onSuccess.main.humidity,
            //     name: onSuccess.name,

            // }
            
            recentCitySearches.push (city)
            console.log(recentCitySearches)
            localStorage.setItem ("weather-city",JSON.stringify(recentCitySearches))
            // ON SUCCESS - > 
                // access localstorage
                    // add the newest search to the past searches array inside of local storage
                    // added to sidebar
                    
                }).catch(function(onFailure) {
                    console.log(onFailure)
                    // console.log('ooops the ajax failed')
                    // ON FAILURE -> undecided atm
                    
                })
            }
            
    function renderFutureForecast(forecastDataInArray) {
        // RENDER forecast data to screen
            // need to render current weather (today) and the next 5 days forecasts (forecast)
                // function for today at the top of screen (date, weather, temp, uv, hmidy, wind speed)
                // forecast
                    // function that takes in (date, weather, temp, humidity) and returns one single card
                    // utilize this function 5 times in a row.
var htmlToGoOnPage = "";
        for (var i = 0; i < forecastDataInArray.length; i++) {
            htmlToGoOnPage += futureForecastCardGenerator(forecastDataInArray[i])
        }
console.log(htmlToGoOnPage)
//go to the forecast container and put the htmlToGoOnPage
    }

    function futureForecastCardGenerator(singleDaysForecast){
        return `<div class="card">
            <p>${singleDaysForecast.dt_txt}</p>
            <span>${singleDaysForecast.weather[0].icon}</span>
            <p>Temperature: ${singleDaysForecast.main.temp}*</p>
            <p>Humidity: ${singleDaysForecast.main.humidity}%</p></div>`
    }

    
    // ON USER SUBMIT/CLICK
    $(document).on("click", "#button-thing", function(e) {
        e.preventDefault();
        console.log('the button things been clicked')
        // grab value from form and store as variable
        var inputCity = $("#input-city").val().trim()
        console.log("city searched: ", inputCity)
        // I need to do an API call to Open Weather to collect data about a city that is based on user input
        currentWeatherAPI(inputCity);
        // Utilizing JQuery render this data onto the screen

    })

})