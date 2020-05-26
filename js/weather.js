var weatherIcon = document.getElementById("weatherIcon");
var weatherLocation = document.getElementById("weatherLocation");
var weatherDescription = document.getElementById("weatherDescription");

var sunriseHour = document.getElementById("sunriseHour");
var sunsetHour = document.getElementById("sunsetHour");
var updateHour = document.getElementById("updateHour")

// Get credentials
var appID = configData.weather.appID;
var cityID = configData.weather.cityID;
var units = configData.weather.units;

function format_unix_time(unix) {
	var date = new Date(unix*1000);
	var hour = date.getHours();
	var minutes = "0" + date.getMinutes();
	var formattedTime = hour + ':' + minutes.substr(-2);
	return formattedTime;
}

function get_icon(code) {
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
		'11n': 'nhunderstorm.svg',
		'13d': 'snow.svg',
		'13n': 'snow.svg',
		'50d': 'dmist.svg',
		'50n': 'nmist.svg'
	};

	return icon_tbl[code];
}

function setValue(loc, desc, icon, sunr, suns, updt) {

	var temp_symbol = (units === "metric") ? "°C" : "°F";

	weatherLocation.innerHTML = loc;
	weatherDescription.innerHTML = desc + temp_symbol;

	weatherIcon.style.background = "url('assets/weather-icons/" + icon + "')";
	weatherIcon.style.backgroundSize = "cover";

	sunriseHour.innerHTML = sunr;
	sunsetHour.innerHTML = suns;
	updateHour.innerHTML = updt;
}

function setErrValue() {
	var wLoc = "Earth, Milky Way";
	var wDesc = "dust & clouds, -1000";
	var wIcon = "url('assets/weather-icons/weather-error.svg')";

	var time = "00:00";

	setValue(wLoc, wDesc, wIcon, time, time, time);
}

function getWeatherData() {

	openWMLink = "http://api.openweathermap.org/data/2.5/weather?APPID=" + appID + "&id=" + cityID + "&units=" + units;

	var XHR = new XMLHttpRequest();

	XHR.onreadystatechange = function() {
    	// If complete
    	if (XHR.readyState === 4){   

    		// Check if "OK" (200)
        	if(XHR.status === 200){  
				XHR.onload = function(){
					var owData = JSON.parse(this.response);
					if (XHR.status >= 200 && XHR.status < 400) {

						var cityName = owData.name;
						var countryName = owData.sys.country;
						var weatherDescription = owData.weather[0].description;
						var weatherIcon = owData.weather[0].icon;
						var weatherTemp = Math.floor(owData.main.temp);
						var sunRise = owData.sys.sunrise;
						var sunSet = owData.sys.sunset;
						var update = owData.dt;

						var wLoc = cityName + ", " + countryName;
						var wDesc = weatherDescription + ", " + weatherTemp;

						// Capitalize first word
						wDesc = wDesc && wDesc[0].toUpperCase() + wDesc.slice(1)
						
						var wIcon = get_icon(weatherIcon);
						var rise = format_unix_time(sunRise);
						var set = format_unix_time(sunSet);
						var upd = format_unix_time(update);

						setValue(wLoc, wDesc, wIcon, rise, set, upd);		
					}
				}
        	} else {
				setErrValue();
        	}
    	}
	}

	XHR.open('GET', openWMLink, true);
	XHR.send();
};

getWeatherData();