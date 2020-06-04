var weatherScreen = document.getElementById("weatherScreen");

let weatherScreenVisibility = false;

var weatherIcon = document.getElementById("weatherTodayIcon");
var weatherLocation = document.getElementById("weatherTodayLocation");
var weatherDescription = document.getElementById("weatherTodayDescription");

var sunriseHour = document.getElementById("sunriseTodayHour");
var sunsetHour = document.getElementById("sunsetTodayHour");
var updateHour = document.getElementById("updateTodayHour")

var weatherDockImageButton = document.getElementById("buttonImageWeather");
var forecastContainer = document.getElementById("forecastContainer");

const formatUnixTime = (unix) => {
	var date = new Date(unix*1000);
	var hour = date.getHours();
	var minutes = "0" + date.getMinutes();
	var formattedTime = hour + ':' + minutes.substr(-2);
	return formattedTime;
}

const getWeatherIcon = (code) => {
	var icon_tbl = {
		'01d': 'sun_icon.svg',
		'01n': 'moon_icon.svg',
		'02d': 'dfew_clouds.svg',
		'02n': 'nfew_clouds.svg',
		'03d': 'dscattered_clouds.svg',
		'03n': 'nscattered_clouds.svg',
		'04d': 'dbroken_clouds.svg',
		'04n': 'nbroken_clouds.svg',
		'09d': 'dshower_rain.svg',
		'09n': 'nshower_rain.svg',
		'10d': 'd_rain.svg',
		'10n': 'n_rain.svg',
		'11d': 'dthunderstorm.svg',
		'11n': 'nthunderstorm.svg',
		'13d': 'snow.svg',
		'13n': 'snow.svg',
		'50d': 'dmist.svg',
		'50n': 'nmist.svg'
	};

	return icon_tbl[code];
}

const updateWeatherDockButton = (icon) => {
	weatherDockImageButton.style.background = "url('assets/weather-icons/" + icon + "')";
	weatherDockImageButton.style.backgroundSize = "cover";
}

const setWeatherValue = (loc, desc, icon, sunr, suns, updt) => {

	var temp_symbol = (units === "metric") ? "°C" : "°F";

	weatherLocation.innerHTML = loc;
	weatherDescription.innerHTML = desc + temp_symbol;

	weatherIcon.style.background = "url('assets/weather-icons/" + icon + "')";
	weatherIcon.style.backgroundSize = "cover";

	sunriseHour.innerHTML = sunr;
	sunsetHour.innerHTML = suns;
	updateHour.innerHTML = updt;

	// Update weather button on dock
	updateWeatherDockButton(icon);
}

const createForecastBody = (fIcon, forecastTemp, foreDescription, fHour, fDate) => {

	// Main Div
 	var forecastDay = document.createElement('div');
 	forecastDay.className = 'weatherForecastDay';

 	// Icon Container Div
 	var forecastIconContainer = document.createElement('div');
 	forecastIconContainer.className = 'weatherForecastDayIconContainer';

 	// Icon Div
 	var forecastIcon = document.createElement('div');
 	forecastIcon.className = 'weatherForecastDayIcon';
 	forecastIcon.style.background = "url('assets/weather-icons/" + fIcon + "')";
 	forecastIcon.style.backgroundSize = 'cover';

 	// Details Div
 	var forecastDetails = document.createElement('div');
 	forecastDetails.className = 'weatherForecastDayDetails';

 	var forecastTemperature = document.createElement('div');
 	forecastTemperature.className = 'weatherForecastDayDetailsTemperature';
 	forecastTemperature.innerHTML = forecastTemp;

 	var forecastDescription = document.createElement('div');
 	forecastDescription.className = 'weatherForecastDayDetailsDescription';
 	forecastDescription.innerHTML = foreDescription;

 	// Append details to div container
 	forecastDetails.appendChild(forecastTemperature);
 	forecastDetails.appendChild(forecastDescription);

 	// Date Div
 	var forecastDayDate = document.createElement('div');
 	forecastDayDate.className = 'weatherForecastDayDate';

 	var forecastHour = document.createElement('div');
 	forecastHour.className = 'weatherForecastDayDateHour';
 	forecastHour.innerHTML = fHour;

 	var forecastDate = document.createElement('div');
 	forecastDate.className = 'weatherForecastDayDateDate';
 	forecastDate.innerHTML = fDate;

 	// Append icon image to div container
 	forecastIconContainer.appendChild(forecastIcon);

 	// Append details to div container
 	forecastDayDate.appendChild(forecastHour);
 	forecastDayDate.appendChild(forecastDate);

	// Append to main div
	forecastDay.appendChild(forecastIconContainer);
	forecastDay.appendChild(forecastDetails);
	forecastDay.appendChild(forecastDayDate);

	// Append to the main container
 	forecastContainer.appendChild(forecastDay);
}

const setErrValue = () => {
	var wLoc = "Earth, Milky Way";
	var wDesc = "dust & clouds, -1000";
	var wIcon = "weather-error.svg";

	var time = "00:00";

	setWeatherValue(wLoc, wDesc, wIcon, time, time, time);
}

// Process weather data
const processWeatherData = (data) => {

	var cityName = data.name;
	var countryName = data.sys.country;
	var weatherDescription = data.weather[0].description;
	var weatherIcon = data.weather[0].icon;
	var weatherTemp = Math.floor(data.main.temp);
	var sunRise = data.sys.sunrise;
	var sunSet = data.sys.sunset;
	var update = data.dt;

	var wLoc = cityName + ", " + countryName;
	var wDesc = weatherDescription + ", " + weatherTemp;

	// Capitalize first word
	wDesc = wDesc && wDesc[0].toUpperCase() + wDesc.slice(1)

	var wIcon = getWeatherIcon(weatherIcon);
	var rise = formatUnixTime(sunRise);
	var set = formatUnixTime(sunSet);
	var upd = formatUnixTime(update);

	setWeatherValue(wLoc, wDesc, wIcon, rise, set, upd);		
}

// This will be called in weather-settings
const getWeatherData = (appID, cityID, units) => {

	requestString = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appID + "&id=" + cityID + "&units=" + units;

	var request = new XMLHttpRequest();
	request.open("GET", requestString, true);
	request.onload = e => {
		if (request.readyState === 4 && request.status === 200 && request.status < 400) {
			processWeatherData(JSON.parse(request.response));
		} else {
			setErrValue();
		};
	};
	request.send();
};

// Fetch forecast
const getForecastData = (appID, cityID, units) => {
	requestString = "https://api.openweathermap.org/data/2.5/forecast?APPID=" + appID + "&id=" + cityID + "&units=" + units;

	request = new XMLHttpRequest();
	request.open("GET", requestString, true);
	request.onload = e => {
		if (request.readyState === 4 && request.status === 200 && request.status < 400) {
			processForecastData(JSON.parse(request.response));
		} else {
			setErrValue();
		};
	};
	request.send();
}

// Process forecast data
const processForecastData = (data) => {
	
	// Empty forecast container to avoid duplication
	forecastContainer.innerHTML = '';

	var forecast = data.list;

	for (var i = 8; i < forecast.length; i+=8) {
		
		var temp_symbol = (units === "metric") ? "°C" : "°F";

		var foreIcon = forecast[i].weather[0].icon;
		var minimumTemp = forecast[i].main.temp_min;
		var maximumTemp = forecast[i].main.temp_max;
		var foreDescription = forecast[i].weather[0].description;
		var dateTime = forecast[i].dt_txt;

		var fIcon = getWeatherIcon(foreIcon);
		var minTemp = Math.floor(minimumTemp);
		var maxTemp = Math.floor(maximumTemp);
		var forecastTemp = minTemp + ' ~ ' + maxTemp + temp_symbol;
		var fHour = dateTime.substr(dateTime.indexOf(' ') + 1).slice(0, -3);;
		var fDate = dateTime.substr(0, dateTime.indexOf(' '));

		createForecastBody(fIcon, forecastTemp, foreDescription, fHour, fDate);
	}
}

const showWeatherScreen = () => {
	weatherScreen.classList.add('showWeatherScreen');
    weatherScreenVisibility = !weatherScreenVisibility;
}

const hideWeatherScreen = () => {
	weatherScreen.classList.remove('showWeatherScreen');
    weatherScreenVisibility = !weatherScreenVisibility;
}

const toggleWeatherScreen = () => {

	console.log('toggle weather screen');

    // If profile anim is still running,
    // Return to avoid spam
	if (profileAnimRunning) return;

	// Rotate profile
    rotateProfile();

    if (weatherScreenVisibility) {
    	// Hide search box
    	hideWeatherScreen();

    } else {
    	// Show search box
    	showWeatherScreen();  	
    }

    // Check if any of these are open, if yes, close it
    if (webMenu.classList.contains('showWebMenu')) {
    	console.log('web menu is open, closing...');
    	hideWebMenu();
    	return;
    } else if (dashboard.classList.contains('showRightDashboard')) {
    	console.log('dashboard is open, closing...');
    	hideDashboard();
    	// return;
    }

    // Toggle center box
    toggleCenteredBox();
}