var searchBox = document.getElementById('searchBox');
var suggestionsUL = document.getElementById('suggestions');

const autocompleteCallback = phrase => {


	var suggestion = phrase.map(i => i.phrase)
					.filter(s => !(s.toLowerCase() === String(searchBox.value).toLowerCase()))
					.slice(0, 4);


	// Empty ul on every callback
	suggestionsUL.innerHTML = '';
	// console.log(suggestion);


	for (i=0; i<(suggestion.length); i++) {

		// console.log(suggestion[i]);

		var li = document.createElement('li');
		li.id = 'phrase';

		var button = document.createElement('button');
		button.type = 'button';
		button.className = 'phraseButton';


		button.innerHTML = suggestion[i];


		li.appendChild(button);
		suggestionsUL.appendChild(li);


	}



}


searchBox.onkeydown = () => {

	if (searchBox.value < 1) {
		return;
	}

	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "https://duckduckgo.com/ac/?callback=autocompleteCallback&q="+String(searchBox.value);
	document.querySelector('head').appendChild(script);

}