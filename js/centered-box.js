var centeredBox = document.getElementById("centeredBox");

let centeredBoxVisibility = true;

const showCenteredBox = () => {
	centeredBox.classList.remove('hiddenBox');
    centeredBoxVisibility = !centeredBoxVisibility;
}

const hideCenteredBox = () => {
	centeredBox.classList.add('hiddenBox');
    centeredBoxVisibility = !centeredBoxVisibility;
}

const toggleCenteredBox = () => {

    if (centeredBoxVisibility) {
    	// Hide web menu
    	hideCenteredBox();  	

    } else {
    	// Show Web menu
    	showCenteredBox();
    }
   
	console.log('toggle web menu');
}