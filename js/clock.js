/* Append 0 before time elements if less hour's than 10 */
function updateTime(k) {
	if (k < 10) {
		return "0" + k;
	}
	else {
		return k;
	}
}

function currentTime() {

	// Date object
	var date = new Date();

	// Set hour, minute
	var hour = date.getHours();
	var min = date.getMinutes();
	var midday = "AM";
	
	// Assigning
	midday = (hour >= 12) ? "PM" : "AM";
	hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);
	hour = updateTime(hour);
	min = updateTime(min);

	// Update clock id element
	document.getElementById("clock").innerText = hour + ":" + min + " " + midday;
	
	// Start timer
	var t = setTimeout(currentTime, 1000);
}

// Start
currentTime();

