// Swipe Callbacks

// Dashboard swipe callback
function rightDashboardSwipeEvent(el, d) {

	// Swipe right will close dashboard
	if (d === "right") {
		slideDashboard();
	}
}

// Backgound body swipe callback
function backgroundBodySwipeEvent(el, d) {

	// Swipe left will open dashboard
	if (d === 'left') {
		slideDashboard();
	} else if (d === 'down') {
		// Swiping down will open search box
		toggleSearchBox();
	} else if (d == 'right') {
		// Swiping right will open web menu
		webMenuToggle();
	}
}

// Blur overlay swipe event
function blurOverlaySwipeEvent(el, d) {

	// Swiping up will close search box
	if (d === 'up') {
		toggleSearchBox();
	}
}

// Web menu swipe event
function webMenuSwipeEvent(el, d) {

	// Swiping left will close web menu
	if (d == 'left') {
		webMenuToggle();
	}
}

// Weather screen swipe event
function weatherScreenSwipeEvent(el, d) {

	// Swiping left will the weather screem
	if (d == 'left') {
		weatherToggle();
	}
}

swipeEvent('rightDashboard', rightDashboardSwipeEvent);

swipeEvent('backgroundBody', backgroundBodySwipeEvent);

swipeEvent('blurOverlay', blurOverlaySwipeEvent);

swipeEvent('webMenu', webMenuSwipeEvent);

swipeEvent('weatherScreen', weatherScreenSwipeEvent);