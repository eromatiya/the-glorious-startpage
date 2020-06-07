var searchBox = document.getElementById('searchBox');
var suggestionsUL = document.getElementById('suggestions');
var suggestionsContainer = document.getElementById('suggestionsContainer');


const hideSuggestions = () => {
	// Hide suggestions
	suggestionsContainer.classList.remove('suggestionsShow');
}

const showSuggestions = () => {
	// Show suggestions
	suggestionsContainer.classList.add('suggestionsShow');
}


// Create input events
const phraseEvents = button => {

	// Update searchbox on enter key and mouse click
	button.onkeyup = event => {

		if (event.key === 'Enter') {

			searchBox.value = button.innerText;
			searchBox.focus();

		} else if (event.key === 'Backspace') {

			searchBox.focus();

		} else if ((event.key == 'ArrowDown') || event.key == 'ArrowRight') {

			event.preventDefault();

			const phraseButtons = Array.prototype.slice.call(document.querySelectorAll('button'));
			const phraseIndex = (phraseButtons.indexOf(document.activeElement) + 1) % phraseButtons.length;
       		const phraseButton = phraseButtons[phraseIndex];
       		phraseButton.focus();

		} else if ((event.key == 'ArrowUp') || event.key == 'ArrowLeft') {

			event.preventDefault();

			const phraseButtons = Array.prototype.slice.call(document.querySelectorAll('button'));
			var phraseIndex = (phraseButtons.indexOf(document.activeElement) - 1) % phraseButtons.length;

			if (phraseIndex < 0) { 
				phraseIndex = phraseButtons.length - 1;
			};

			const phraseButton = phraseButtons[phraseIndex];
       		phraseButton.focus();

		}

	}

	// Onmouseup event
	button.onmouseup = event => {
		searchBox.value = button.innerText;
		searchBox.focus();
	}

}

// Generate and parse suggestions
const autocompleteCallback = phrase => {

	// Filter/parse the object
	var suggestion = phrase.map(i => i.phrase)
					.filter(s => !(s.toLowerCase() === String(searchBox.value).toLowerCase()))
					.slice(0, 4);

	// Empty ul on every callback to refresh list
	suggestionsUL.innerHTML = '';


	// Generate list elements
	for (let phrases of suggestion ) {

		// Create html elements
		var li = document.createElement('li');
		li.id = 'phrase';

		var button = document.createElement('button');
		button.type = 'button';
		button.className = 'phraseButton';
		button.innerHTML = phrases;


		// Create input events
		phraseEvents(button);


		// Appent to ul
		li.appendChild(button);
		suggestionsUL.appendChild(li);
	}

	// Show suggestions
	showSuggestions();
}

// Update every keyup
searchBox.onkeyup = event => {

	if (event.key === 'Tab') return;

	if (searchBox.value < 1) {

		// Hide suggestions
		hideSuggestions();
		return;
	}

	// Fetch from duckduckgo
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "https://duckduckgo.com/ac/?callback=autocompleteCallback&q="+String(searchBox.value);
	document.querySelector('head').appendChild(script);

}