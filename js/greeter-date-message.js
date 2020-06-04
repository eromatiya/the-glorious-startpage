var greeterMessage = document.getElementById("greeterMessage");
var dateMessage = document.getElementById("dateMessage");

var date = new Date();
var hour = date.getHours();
var greeterSuffix;

const monthsArr = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const daysArr = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
]

const getDayOrdinal = (day) => {
	return day + (day > 0 ? ['th', 'st', 'nd', 'rd'][(day > 3 && day < 21) ||
		day % 10 > 3 ? 0 : day % 10] : '');
}

const updateGreeterDateMessage = () => {	
	if (hour >= 6 && hour < 12) {
		greeterSuffix = "Morning";
	} else if (hour >= 12 && hour < 18) {
		greeterSuffix = "Afternoon";
	} else {
		greeterSuffix = "Evening";
	}

	greeterMessage.innerHTML = "Good" + "<br>" + greeterSuffix + "!";

	dateMessage.innerHTML = "Today is the "  +	getDayOrdinal(date.getDate()) + 
							" of " + monthsArr[date.getMonth()] + ", and it's " + daysArr[date.getDay()] + ".";
}

window.onload = updateGreeterDateMessage();