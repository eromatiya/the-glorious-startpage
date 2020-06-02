var webMenu = document.getElementById("webMenu");
var webMenuList = document.getElementById("webMenuList");
var webMenuListContainer = document.getElementById("webMenuListContainer");
var webMenuSearchBox = document.getElementById("webMenuSearchBox");

let webMenuVisible = false;
let webItemFocus;

// Create mouse event for passed div
function addMouseUpEvent(li, url) {
	li.onmouseup = function() {
		window.location.href = encodeURI(url);
	}
}

// Sort list alphabetically
function sortList() {
	Array.from(webMenuList.getElementsByTagName("li"))
	.sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(li => webMenuList.appendChild(li));
}

// Populate web menu
function populateWebMenu() {

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
		var webItemIconContainer = document.createElement('div');
		webItemIconContainer.className = 'webItemIconContainer';

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

		webItemIconContainer.appendChild(webItemIcon);
		webItemBody.appendChild(webItemIconContainer);
		webItemBody.appendChild(webItemName);

		li.appendChild(webItemDiv);
		webMenuList.appendChild(li);
	}

	// Call to sort list
	sortList();
}

// Search through the list
function filterWebList() {

	var input, filter, ul, li, a, i, txtValue;
	
	input = webMenuSearchBox;
	filter = input.value.toUpperCase();
	ul = webMenuList;
	li = ul.getElementsByTagName('li');
	
	// Loop through all list items, and focus if matches the search query
	for (i = 0; i < li.length; i++) {

		a = li[i].getElementsByClassName("webItem")[0];
		txtValue = a.innerHTML || a.textContent || a.innerText;

		// If an item match, hightlight it and focus
		if (txtValue.toUpperCase().indexOf(filter) === 158) {
			
			// Unselect/Unhightlight old active
			var oldWebItemFocus = webItemFocus;
			var oldWebItemFocusChild = oldWebItemFocus.querySelector('.webItem');
			oldWebItemFocusChild.classList.remove('webItemFocus');

			// Update webItemFocus
			webItemFocus = li[i];

			// Get child
			var webItemFocusChild = webItemFocus.querySelector('.webItem');
			// Add webItemFocus class to child
			webItemFocusChild.classList.add('webItemFocus');

			// Scroll focus into active
			webItemFocus.scrollIntoView();

		} else {
			// Remove this if keyboard control is implemented

			// Get color from CSS
			// var normalColor = window.getComputedStyle(document.documentElement)
				// .getPropertyValue('--base-container').replace(/ /g,'');
			
			// Unselected items
			// li[i].querySelector('.webItem').style.background = normalColor;
		}
	}
}

// Type event on web mmenu search box
webMenuSearchBox.onkeydown = function(event) {

	if ((event.keyCode === 13 && webItemFocus) && (webMenuSearchBox.value.length  > 0)) {
		webItemFocus.onmouseup();
		webMenuToggle();
	} else if (event.keyCode === 8 && webMenuSearchBox.value.length  < 1) {
		webMenuToggle();
	}
	filterWebList();
}

// Show/Hide web menu
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
		webMenuListContainer.scrollTop = 0;
	} else {
		// Focus
		webMenuSearchBox.focus();
	}

	if(weatherVisible) {
		weatherToggle();
	}
}

function getFirstItem() {
	var ul = webMenuList;
	var li = ul.getElementsByTagName('li');

	// Focus on first item
	webItemFocus = li[0];

	// Get child
	var webItemFocusChildren = webItemFocus.querySelector('.webItem');

	// Add webItemFocus class
	webItemFocusChildren.classList.add('webItemFocus');
}


function initWebMenu() {
	populateWebMenu();
	getFirstItem();
}

// Populate web menu
window.onload = initWebMenu();