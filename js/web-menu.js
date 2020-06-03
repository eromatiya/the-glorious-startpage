var webMenu = document.getElementById("webMenu");
var webMenuList = document.getElementById("webMenuList");
var webMenuListContainer = document.getElementById("webMenuListContainer");
var webMenuSearchBox = document.getElementById("webMenuSearchBox");

let webMenuVisible = false;

let webItemFocus;
let webListIndex = 0;


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

String.prototype.fuzzy = function(term, ratio) {
    var string = this.toLowerCase();
    var compare = term.toLowerCase();
    var matches = 0;
    if (string.indexOf(compare) > -1) return true; // covers basic partial matches
    for (var i = 0; i < compare.length; i++) {
        string.indexOf(compare[i]) > -1 ? matches += 1 : matches -=1;
    }
    return (matches/this.length >= ratio || term == "")
};



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
		// if (txtValue.toUpperCase().indexOf(filter) !== -1) {
		if (txtValue.toUpperCase().fuzzy(filter, 1)) {
			
			// Unselect/Unhightlight old active
			var oldWebItemFocus = webItemFocus;
			var oldWebItemFocusChild = oldWebItemFocus.querySelector('.webItem');
			oldWebItemFocusChild.classList.remove('webItemFocus');

			// Update webItemFocus
			webItemFocus = li[i];

			// Update weblistindex
			webListIndex = i;

			// Get child
			var webItemFocusChild = webItemFocus.querySelector('.webItem');
			// Add webItemFocus class to child
			webItemFocusChild.classList.add('webItemFocus');

			// Scroll focus into active
			webItemFocus.scrollIntoView();

		}
	}
}

// Type event on web mmenu search box
webMenuSearchBox.onkeydown = function(event) {
	if (event.keyCode === 13 && webItemFocus) {
		webItemFocus.onmouseup();
		webMenuToggle();
	} else if (event.keyCode === 8 && webMenuSearchBox.value.length  < 1) {
		webMenuToggle();
	}
	filterWebList();
}

// Reset focus on web menu close
function focusReset() {
	var oldWebItemFocus = webItemFocus;
	var oldWebItemFocusChild = oldWebItemFocus.querySelector('.webItem');
	oldWebItemFocusChild.classList.remove('webItemFocus');
	webListIndex = 0;
}

// Get first item of ul
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
		
		focusReset();
		getFirstItem();
	} else {
		// Focus
		webMenuSearchBox.focus();
	}

	if(weatherVisible) {
		weatherToggle();
	}
}

// Remove class to focused item
function removeClass(el, className) {
	// Remove webItemFocus class
	var oldWebItemFocus = el.querySelector('.webItem');
	oldWebItemFocus.classList.remove('webItemFocus');
};

// Add class to focused item
function addClass(el, className) {
	var webItemFocusChild = el.querySelector('.webItem');

	// Add webItemFocus class to child
	webItemFocusChild.classList.add('webItemFocus');

	// Scroll focus into active
	webItemFocusChild.scrollIntoView();
};

// Keyboard navigation
webMenu.addEventListener(
	'keydown',
	function(event) {
		var len = webMenuList.getElementsByTagName('li').length - 1;
		// Right and Down 
		if((event.which === 39) || (event.which === 40)) {

			// Clear web menu searchbox
			webMenuSearchBox.value = '';
			webListIndex++;
			if (webItemFocus) {
				removeClass(webItemFocus, 'webItemFocus');
				next = webMenuList.getElementsByTagName('li')[webListIndex];
				if(typeof next !== undefined && webListIndex <= len) {			
					webItemFocus = next;
				} else {
					webListIndex = 0;
					webItemFocus = webMenuList.getElementsByTagName('li')[0];
				}
				addClass(webItemFocus, 'webItemFocus');
				// console.log(webListIndex);
			} else {
				webListIndex = 0;
				webItemFocus = webMenuList.getElementsByTagName('li')[0];
				addClass(webItemFocus, 'webItemFocus');
			}
		}
		// Up and left
		else if ((event.which === 37) || (event.which === 38)) {

			// Clear web menu searchbox
			webMenuSearchBox.value = '';
			if (webItemFocus) {
				removeClass(webItemFocus, 'webItemFocus');
				webListIndex--;
				// console.log(webListIndex);
				next = webMenuList.getElementsByTagName('li')[webListIndex];
				if(typeof next !== undefined && webListIndex >= 0) {
					webItemFocus = next;
				} else {
					webListIndex = len;
					webItemFocus = webMenuList.getElementsByTagName('li')[len];
				}
				addClass(webItemFocus, 'webItemFocus');
			} else {
				webListIndex = 0;
				webItemFocus = webMenuList.getElementsByTagName('li')[len];
				addClass(webItemFocus, 'webItemFocus');
			}
		}
	},
	false
);

// Startup
function initWebMenu() {
	populateWebMenu();
	getFirstItem();
}

// Populate web menu
window.onload = initWebMenu();