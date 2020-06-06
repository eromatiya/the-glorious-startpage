var searchBox = document.getElementById('searchBox');
var suggestionsUL = document.getElementById('suggestions');
var suggestionsContainer = document.getElementById('suggestionsContainer');


// Update searchbox on enter key
const phraseButtonCallback = button => {

	button.onkeyup = event => {

		if (event.key === 'Enter') {

			searchBox.value = button.innerText;
			searchBox.focus();

		}

	}

}

// Generate and parse suggestions
const autocompleteCallback = phrase => {

	var suggestion = phrase.map(i => i.phrase)
					.filter(s => !(s.toLowerCase() === String(searchBox.value).toLowerCase()))
					.slice(0, 4);

	// Empty ul on every callback to refresh list
	suggestionsUL.innerHTML = '';


	// Generate list elements
	for (i = 0; i < (suggestion.length); i++) {

		var li = document.createElement('li');
		li.id = 'phrase';

		var button = document.createElement('button');
		button.type = 'button';
		button.className = 'phraseButton';
		button.innerHTML = suggestion[i];

		phraseButtonCallback(button);

		li.appendChild(button);
		suggestionsUL.appendChild(li);
	}

	// Show suggestions
	suggestionsContainer.classList.add('suggestionsShow');
}

// Update every keyup
searchBox.onkeyup = event => {

	if (event.key === 'Tab') return;

	if (searchBox.value < 1) {
		
		// Hide suggestions
		suggestionsContainer.classList.remove('suggestionsShow');

		return;
	}

	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "https://duckduckgo.com/ac/?callback=autocompleteCallback&q="+String(searchBox.value);
	document.querySelector('head').appendChild(script);

}