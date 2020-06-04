const swipeEvent = (elementID, callback) => {

	var el = document.getElementById(elementID);
	var dir;

	el.addEventListener(
		'touchstart',
		(event) => {
			// event.preventDefault();
			xDown = event.touches[0].clientX;
    		yDown = event.touches[0].clientY;
		},
		{ passive: true }
	);

	el.addEventListener(
		'touchmove',
		(event) => {
			// event.preventDefault();
		    if ( ! xDown || ! yDown ) {
		        return;
		    }

		    var xUp = event.touches[0].clientX;
		    var yUp = event.touches[0].clientY;
		    var xDiff = xDown - xUp;
		    var yDiff = yDown - yUp;

		    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
		        if ( xDiff > 0 ) {
		        	// Left Swipe
		        	dir = 'left'
		        } else {
		        	// Right Swipe
		        	dir = 'right';
		        }                       
		    } else {

		        if ( yDiff > 0 ) {
		        	// Up Swipe
		        	dir = 'up';
		        } else { 
		        	// Down Swipe
		        	dir = 'down';
		        }
		    }
		    
		    /* Reset values */
		    xDown = null;
		    yDown = null;

		    if (dir !== ""){
			    if (typeof callback == "function") {
			    	callback(el, dir);
			    }
		    }

		},
		{ passive: true }
	);
}