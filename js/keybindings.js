let keysPressed = {};



document.addEventListener(
    'keydown', 
    (event) => {
    	event.preventDefault();
    	
        keysPressed[event.key] = true;

        // Open dashboard
        if (keysPressed['Alt'] && event.key === 's') {
            toggleDashboard();
            return;
        } else if (keysPressed['Alt'] && event.key === 'e') {
            toggleWebMenu();
            return;
        } else if (keysPressed['Alt'] && event.key === 'x') {
            toggleWeatherScreen();
            return;
        }
    }
);

document.addEventListener(
    'keyup',
    (event) => {
        delete keysPressed[event.key];
    }
);