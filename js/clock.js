const clock = document.getElementById("clock")

// Append 0 before time elements if less hour's than 10
const appendZero = (k) => {
	if (k < 10) {
		return "0" + k;
	} else {
		return k;
	}
}

// Update/Set clock
const currentTime = () => {
	// Date object
	const date = new Date();

	// Set hour, minute
	let hour = date.getHours();
	let min = date.getMinutes();
	let midDay = "AM";
	
	// Assigning
	midDay = (hour >= 12) ? "PM" : "AM";
	hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);
	hour = appendZero(hour);
	min = appendZero(min);

	// Update clock id element
	clock.innerText = hour + ":" + min + " " + midDay;
	
	// Recursion
	// Call itself if 1 second has passed.
	// TOKIWO TOMAREEEE!
	const t = setTimeout(currentTime, 1000);
}

// Start clock
window.onload = currentTime();

