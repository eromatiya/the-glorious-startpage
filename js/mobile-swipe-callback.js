// Swipe Callbacks

// Backgound body swipe callback
const bodyBackgroundSwipeEvent = (el, d) => {

	// Swipe left will open dashboard
	if (d === 'left') {
		toggleDashboard();
	} else if (d === 'down') {
		// Swiping down will open search box
		toggleSearchBox();
	} else if (d == 'right') {
		// Swiping right will open web menu
		toggleWebMenu();
	} else if (d == 'up') {
		// Swiping up will open weather screen
		toggleWeatherScreen();
	}
}

// Dashboard swipe callback
const rightDashboardSwipeEvent = (el, d) => {

	// Swipe right will close dashboard
	if (d === "right") {
		toggleDashboard();
	}
}

// Blur overlay swipe event
const centeredBoxOverlaySwipeEvent = (el, d) => {

	// Swiping up will close search box
	if (d === 'up') {
		toggleSearchBox();
	}
}

// Web menu swipe event
const webMenuSwipeEvent = (el, d) => {

	// Swiping left will close web menu
	if (d == 'left') {
		toggleWebMenu();
	}
}

// Weather screen swipe event
const weatherScreenSwipeEvent = (el, d) => {

	// Swiping left will the weather screem
	if (d == 'left') {
		toggleWeatherScreen();
	}
}

swipeEvent('bodyBackground', bodyBackgroundSwipeEvent);

swipeEvent('rightDashboard', rightDashboardSwipeEvent);

swipeEvent('centeredBoxOverlay', centeredBoxOverlaySwipeEvent);

swipeEvent('webMenu', webMenuSwipeEvent);

swipeEvent('weatherScreen', weatherScreenSwipeEvent);