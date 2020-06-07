const weatherScreen = document.getElementById("weatherScreen");

let weatherScreenVisibility = false;

const weatherIcon = document.getElementById("weatherTodayIcon");
const weatherLocation = document.getElementById("weatherTodayLocation");
const weatherDescription = document.getElementById("weatherTodayDescription");

const sunriseHour = document.getElementById("sunriseTodayHour");
const sunsetHour = document.getElementById("sunsetTodayHour");
const updateHour = document.getElementById("updateTodayHour")

const weatherDockImageButton = document.getElementById("buttonImageWeather");
const forecastContainer = document.getElementById("forecastContainer");

const formatUnixTime = unix => {
	const date = new Date(unix*1000);
	const hour = date.getHours();
	const minutes = "0" + date.getMinutes();
	const formattedTime = hour + ':' + minutes.substr(-2);
	return formattedTime;
}

const getWeatherIcon = code => {
	const icon_tbl = {
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

const updateWeatherDockButton = icon => {
	weatherDockImageButton.style.background = "url('assets/weather-icons/" + icon + "')";
	weatherDockImageButton.style.backgroundSize = "cover";
}

const setWeatherValue = (loc, desc, icon, sunr, suns, updt) => {

	const temp_symbol = (units === "metric") ? "°C" : "°F";

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
 	const forecastDay = document.createElement('div');
 	forecastDay.className = 'weatherForecastDay';

 	// Icon Container Div
 	const forecastIconContainer = document.createElement('div');
 	forecastIconContainer.className = 'weatherForecastDayIconContainer';

 	// Icon Div
 	const forecastIcon = document.createElement('div');
 	forecastIcon.className = 'weatherForecastDayIcon';
 	forecastIcon.style.background = "url('assets/weather-icons/" + fIcon + "')";
 	forecastIcon.style.backgroundSize = 'cover';

 	// Details Div
 	const forecastDetails = document.createElement('div');
 	forecastDetails.className = 'weatherForecastDayDetails';

 	const forecastTemperature = document.createElement('div');
 	forecastTemperature.className = 'weatherForecastDayDetailsTemperature';
 	forecastTemperature.innerHTML = forecastTemp;

 	const forecastDescription = document.createElement('div');
 	forecastDescription.className = 'weatherForecastDayDetailsDescription';
 	forecastDescription.innerHTML = foreDescription;

 	// Append details to div container
 	forecastDetails.appendChild(forecastTemperature);
 	forecastDetails.appendChild(forecastDescription);

 	// Date Div
 	const forecastDayDate = document.createElement('div');
 	forecastDayDate.className = 'weatherForecastDayDate';

 	const forecastHour = document.createElement('div');
 	forecastHour.className = 'weatherForecastDayDateHour';
 	forecastHour.innerHTML = fHour;

 	const forecastDate = document.createElement('div');
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
	const wLoc = "Earth, Milky Way";
	const wDesc = "dust & clouds, -1000";
	const wIcon = "weather-error.svg";

	const time = "00:00";

	setWeatherValue(wLoc, wDesc, wIcon, time, time, time);
}

// Process weather data
const processWeatherData = (data) => {

	const cityName = data.name;
	const countryName = data.sys.country;
	const weatherDescription = data.weather[0].description;
	const weatherIcon = data.weather[0].icon;
	const weatherTemp = Math.floor(data.main.temp);
	const sunRise = data.sys.sunrise;
	const sunSet = data.sys.sunset;
	const update = data.dt;

	const wLoc = cityName + ", " + countryName;
	let wDesc = weatherDescription + ", " + weatherTemp;

	// Capitalize first word
	wDesc = wDesc && wDesc[0].toUpperCase() + wDesc.slice(1)

	const wIcon = getWeatherIcon(weatherIcon);
	const rise = formatUnixTime(sunRise);
	const set = formatUnixTime(sunSet);
	const upd = formatUnixTime(update);

	setWeatherValue(wLoc, wDesc, wIcon, rise, set, upd);		
}

// This will be called in weather-settings
const getWeatherData = (appID, cityID, units) => {

	requestString = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appID + "&id=" + cityID + "&units=" + units;

	const request = new XMLHttpRequest();
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
const processForecastData = data => {
	
	// Empty forecast container to avoid duplication
	forecastContainer.innerHTML = '';

	const forecast = data.list;

	for (let i = 8; i < forecast.length; i+=8) {
		
		const temp_symbol = (units === "metric") ? "°C" : "°F";

		const foreIcon = forecast[i].weather[0].icon;
		const minimumTemp = forecast[i].main.temp_min;
		const maximumTemp = forecast[i].main.temp_max;
		const foreDescription = forecast[i].weather[0].description;
		const dateTime = forecast[i].dt_txt;

		const fIcon = getWeatherIcon(foreIcon);
		const minTemp = Math.floor(minimumTemp);
		const maxTemp = Math.floor(maximumTemp);
		const forecastTemp = minTemp + ' ~ ' + maxTemp + temp_symbol;
		const fHour = dateTime.substr(dateTime.indexOf(' ') + 1).slice(0, -3);;
		const fDate = dateTime.substr(0, dateTime.indexOf(' '));

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

    } else if (searchBoxContainer.classList.contains('showSearchBox')) {
    	console.log('searchbox is open, closing...');
    	hideSearchBox();
    	
    } else if (dashboard.classList.contains('showRightDashboard')) {
    	console.log('dashboard is open, closing...');
    	hideDashboard();
    	// return;
    }

    // Toggle center box
    toggleCenteredBox();
}