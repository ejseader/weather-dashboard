var baseURL = 'https://api.openweathermap.org/data/2.5';
var apiKey = '7712c3c6c0b9e04b01c5813d32146e7f';
var url = baseURL + '/weather?units=imperial&appid=' + apiKey;
var fiveDayURL = baseURL + '/forecast?units=imperial&appid=' + apiKey;
var cityInput = $('.citySearch');
var searchBtn = $('#searchBtn');
var cityName = $('.cityName');
var currentTemp = $('.currentTemp');
var scrollTemp = $('.scrollTemp');
var scrollCond = $('.scrollCond');
var wind = $('.wind');
var humidity = $('.humidity');
var baseIconURL = 'https://openweathermap.org/img/wn/';
var currentIcon = $('#currentIcon');
var currentDescription = $('.currentDescription');
var date = dayjs().format('dddd MMMM DD YYYY');
var time = dayjs().format('h' + ':' + 'mm A');
var currentDate = $('.currentDate');
var currentTime = $('.currentTime');
var historyBox = $('#historyBox');


searchBtn.click(function () {
    getWeatherByCity();
    // addHistory()
});

function fillDate() {
    currentDate.text(date);
    currentTime.text(time);
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(function (locationData) {
        // Make a request to Open Weather Map API for the current local weather
        $.get(url + '&lat=' + locationData.coords.latitude + '&lon=' + locationData.coords.longitude).then(function (cityData) {
            var tempRounded = Math.round(cityData.main.temp);
            var iconCode = cityData.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            cityName.text(cityData.name);
            currentTemp.text(tempRounded);
            scrollTemp.text(tempRounded);
            wind.text(cityData.wind.speed);
            humidity.text(cityData.main.humidity);
            currentIcon.attr('src', iconurl);
            currentDescription.text(cityData.weather[0].description);
            scrollCond.text(cityData.weather[0].description);
        });
        $.get(fiveDayURL + '&lat=' + locationData.coords.latitude + '&lon=' + locationData.coords.longitude).then(function (fiveDayData) {

        var fiveDayOutput = $('#fiveDayOutput');

        for (var hourObj of fiveDayData.list) {
            var iconCode = hourObj.weather[0].icon + '.png';
            fiveDayOutput.append(`
                <div class="col fiveDayHourlyOutput">
                    <img id="currentIcon" src="${baseIconURL + iconCode}" />
                    <div class="weatherData">
                        <h5>Temp: ${hourObj.main.temp}&deg;</h5>
                        <h5>Wind: ${hourObj.wind.speed} mph</h5>
                        <h5>Humidity: ${hourObj.main.humidity} &#37;</h5>
                        <h6>Date and Time: ${hourObj.dt_txt}</h6>
                    </div>
                </div>
            `);
            }
        });
         
    })
}

// function getHistory(date, savedCity) {
//     var citySaved = JSON.parse(localStorage.getItem(date, savedCity));

//         historyBtn.click(showHistory());
//     }
// }

// function addHistory() {
//     localStorage.setItem(date, JSON.stringify(savedCity));

//     for (eventObj of localStorage.length) {
//         var historyBtn = eventObj.citySaved;
//         var historyBox = $('.historyBox');

//         historyBox.append(`
//         <button class="btn btn-secondary historyBtn">${historyBtn}</button>
//         `)

//         historyBtn.click(getHistory());
//     }

    
//     getHistory(date, savedCity);
// }

function getWeatherByCity() {
    $.get(url + '&q=' + cityInput.val()).then(function (cityData) {
        var tempRounded = Math.round(cityData.main.temp);
        cityName.text(cityData.name);
        currentTemp.text(tempRounded);
        scrollTemp.text(tempRounded);
        wind.text(cityData.wind.speed);
        humidity.text(cityData.main.humidity);
        currentDescription.text(cityData.weather[0].description);
        scrollCond.text(cityData.weather[0].description);

        console.log(cityData);
    })
}

function getFiveDay() {
    $.get(fiveDayURL + '&q=' + cityInput.value).then(function (fiveDayData) {
        
        var fiveDayOutput = $('#fiveDayOutput');

        for (var hourObj of fiveDayData.list) {
            var iconCode = hourObj.weather[0].icon + '.png';
            fiveDayOutput.append(`
                <div class="col fiveDayHourlyOutput">
                    <img id="currentIcon" src="${baseIconURL + iconCode}" />
                    <div class="weatherData">
                        <h4>Temp: ${hourObj.main.temp}&deg;</h4>
                        <h4>Wind: ${hourObj.wind.speed} mph</h4>
                        <h4>Humidity: ${hourObj.main.humidity} &#37;</h4>
                        <h6>Date and Time: ${hourObj.dt_txt}</h6>
                    </div>
                </div>
            `);
            }
        });
    }

getLocation();
fillDate();