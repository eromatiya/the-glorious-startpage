var webMenu = document.getElementById("webMenu");
var webMenuList = document.getElementById("webMenuList");
var webMenuSearchBox = document.getElementById("webMenuSearchBox");

let webMenuVisible = false;

// Create mouse event for passed div
function addMouseUpEvent(li, url) {
	li.onmouseup = function() {
		window.location.href = encodeURI(url);
	}
}

// Generate a list
for (i = 0; i < (webSites.length); i++) {

	var site = webSites[i].site;
	var icon = webSites[i].icon;
	var url = webSites[i].url;

	var li = document.createElement('li');

	// Add mouseup event
	addMouseUpEvent(li, url);

	// Create an outer div, child of li
	let webItemDiv = document.createElement('div')
	webItemDiv.className = 'webItem';
	// webItemDiv.tabitemIndex = '1';
	webItemDiv.id = "id" + site;
	
	// Create a second div, webItemContainer
	var webItemContainer = document.createElement('div');
	webItemContainer.className = 'webItemContainer';

	// Create the innermost div, contains icon and label
	var webItemBody = document.createElement('div');
	webItemBody.className = 'webItemBody';

	// Create div for webItemIcon
	var webItemIcon = document.createElement('div');
	webItemIcon.className = 'webItemIcon';
	webItemIcon.style.background = "url('assets/webcons/" + icon + ".svg')";
	webItemIcon.style.backgroundSize = 'cover';

	// Create webItemName
	var webItemName = document.createElement('div');
	webItemName.className = 'webItemName';
	webItemName.innerHTML = site;

	// Append divs with heirarchy
	webItemDiv.appendChild(webItemContainer);
	webItemContainer.appendChild(webItemBody);

	webItemBody.appendChild(webItemIcon);
	webItemBody.appendChild(webItemName);

	li.appendChild(webItemDiv);
	webMenuList.appendChild(li);
}

let firstEntry;

// Search through the list
function filterWebList() {
	var input, filter, ul, li, a, i, txtValue;
	
	input = webMenuSearchBox;
	filter = input.value.toUpperCase();
	ul = webMenuList;
	li = ul.getElementsByTagName('li');
	
	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("webItem")[0];
		txtValue = a.innerHTML || a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			// Filtered tile/s
			li[i].style.display = "";
			firstEntry = li[i];
		} else {
			// Hidden tile/s
			li[i].style.display = "none";
		}
	}
}

webMenuSearchBox.onkeydown = function(event) {

	if (event.keyCode === 13 && firstEntry) {
		firstEntry.onmouseup();
		webMenuToggle();
	}
	filterWebList();
}

function webMenuToggle() {

	hideMainContainer();
	rotateProfile();
	webMenu.classList.toggle("show");
	webMenuVisible = !webMenuVisible;

	// Clear and unfocus searchbox
	if (!webMenuVisible) {
		webMenuSearchBox.value = '';
		webMenuSearchBox.blur();
		filterWebList();
	} else {

		// Focus
		webMenuSearchBox.focus();
	}

}