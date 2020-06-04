var webMenu = document.getElementById("webMenu");
var webMenuList = document.getElementById("webMenuList");
var webMenuListContainer = document.getElementById("webMenuListContainer");
var webMenuSearchBox = document.getElementById("webMenuSearchBox");

let webMenuVisibility = false;

let webItemFocus;
let webListIndex = 0;

// Create mouse event for passed li
const createMouseUpEvent = (li, url) => {
	// Create a callback property for the passed li
	li.callback = () => {
		window.location.href = encodeURI(url);
	}

	// Create onmouseup event for the li
	li.onmouseup = () => {
		li.callback();
	}
}

// Sort list alphabetically
const sortList = () => {
	Array.from(webMenuList.getElementsByTagName("li"))
	.sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(li => webMenuList.appendChild(li));
}

// Populate web menu
const populateWebMenu = () => {

	// Generate a list
	for (i = 0; i < (webSites.length); i++) {

		var site = webSites[i].site;
		var icon = webSites[i].icon;
		var url = webSites[i].url;

		var li = document.createElement('li');

		// Add mouseup event
		createMouseUpEvent(li, url);

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

// Fuzzy search
String.prototype.fuzzy = function(term, ratio) {
    var string = this.toLowerCase();
    var compare = term.toLowerCase();
    var matches = 0;
    
    if (string.indexOf(compare) > -1) return true; // covers basic partial matches
    for (var i = 0; i < compare.length; i++) {
        string.indexOf(compare[i]) > -1 ? matches += 1 : matches -=1;
    }
    return (matches/this.length >= ratio || term == "");
};

// Search through the list
const filterWebList = () => {

	var input, filter, ul, li, a, i, txtValue;
	
	input = webMenuSearchBox;
	filter = input.value.toUpperCase();
	ul = webMenuList;
	li = ul.getElementsByTagName('li');
	
	// Loop through all list items, and focus if matches the search query
	for (i = 0; i < li.length; i++) {

		a = li[i].getElementsByClassName("webItemName")[0];
		txtValue = a.innerHTML || a.textContent || a.innerText;

		// If an item match, hightlight it and focus
		// if (txtValue.toUpperCase().indexOf(filter) !== -1) {
		if (txtValue.toUpperCase().fuzzy(filter, 1) === true) {
			
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

// Reset focus on web menu close
const focusReset = () => {
	var oldWebItemFocus = webItemFocus;
	var oldWebItemFocusChild = oldWebItemFocus.querySelector('.webItem');
	
	oldWebItemFocusChild.classList.remove('webItemFocus');
	webListIndex = 0;
}

// Get first item of ul
const getFirstItem = () => {
	var ul = webMenuList;
	var li = ul.getElementsByTagName('li');

	// Focus on first item
	webItemFocus = li[0];

	// Get child
	var webItemFocusChildren = webItemFocus.querySelector('.webItem');

	// Add webItemFocus class
	webItemFocusChildren.classList.add('webItemFocus');
}

const showWebMenu = () => {
	webMenu.classList.add('showWebMenu');
    webMenuVisibility = !webMenuVisibility;

    // Focus to input field
    webMenuSearchBox.focus();
}

const hideWebMenu = () => {
    // Clear input field
    webMenuSearchBox.value = '';

    // Unfocus input field
    webMenuSearchBox.blur();

    // Refilter web list
    filterWebList();
	
	// Scroll to top
	webMenuListContainer.scrollTop = 0;

	// Reset focus item
	focusReset();

	// Get first item
	getFirstItem();
	
	webMenu.classList.remove('showWebMenu');
    webMenuVisibility = !webMenuVisibility;
}

const toggleWebMenu = () => {

	console.log('toggle web menu');

    // If profile anim is still running,
    // Return to avoid spam
	if (profileAnimRunning) return;

	// Rotate profile
    rotateProfile();

    if (webMenuVisibility) {
    	// Hide web menu
    	hideWebMenu();  	

    } else {
    	// Show Web menu
    	showWebMenu();
    }

    // Check if any of these are open, if yes, close it
    if (weatherScreen.classList.contains('showWeatherScreen')) {
    	console.log('weather screen is open, closing...');
    	hideWeatherScreen();
    	return
    } else if (dashboard.classList.contains('showRightDashboard')) {
    	console.log('dashboard is open, closing...');
    	hideDashboard();
    }

    // Toggle center box
    toggleCenteredBox();   
}

// Remove class to focused item
const removeClass = (el, className) => {
	// Remove webItemFocus class
	var oldWebItemFocus = el.querySelector('.webItem');
	oldWebItemFocus.classList.remove('webItemFocus');
};

// Add class to focused item
const addClass = (el, className) => {
	var webItemFocusChild = el.querySelector('.webItem');

	// Add webItemFocus class to child
	webItemFocusChild.classList.add('webItemFocus');

	// Scroll focus into active
	webItemFocusChild.scrollIntoView();
};

// Keyboard navigation
webMenu.addEventListener(
	'keydown',
	(event) => {
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

// Type event on web mmenu search box
webMenuSearchBox.onkeydown = (event) => {

	// Don't hijack keyboard navigation buttons (up, down, left, right)
	if ((event.key === 'ArrowRight') || (event.key === 'ArrowDown') || 
		(event.key === 'ArrowLeft') || (event.key === 'ArrowUp')) return;

	if (event.key === 'Enter' && webItemFocus) {
		// Run the focused li's callback
		webItemFocus.callback();

		// Hide web menu
		toggleWebMenu();

	} else if (event.key === 'Backspace' && webMenuSearchBox.value.length  < 1) {
		// Hide web menu if backspace is pressed and searchbox value is 0
		toggleWebMenu();
		return;

	} else if ((event.key === 'Escape') || (event.key === 'Alt')) {
		// Ignore escape and alt key
		return;
	}

	// Filter
	filterWebList();
}

// Populate and get first child
const initWebMenu = () => {
	populateWebMenu();
	getFirstItem();
}

// Initialize web menu
window.onload = initWebMenu();