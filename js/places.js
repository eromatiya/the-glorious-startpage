/* When the user clicks on the button, toggle between hiding and showing the dropdown content */

function myFunction() {
	document.getElementById("categoryContentDropdown").classList.toggle("dropDownShow");
}

document.getElementById("categoryButton").onclick = function() {
	myFunction();
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.categoryButton')) {
		var dropdowns = document.getElementsByClassName("categoryContent");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('dropDownShow')) {
				openDropdown.classList.remove('dropDownShow');
			}
		}
	}
}