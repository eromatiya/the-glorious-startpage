var places = document.getElementById("places");

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function toggleCategoryEvent(button, content) {	
	button.onclick = function() {
		content.classList.toggle("dropDownShow");
		// alert(str);
	}
}

// Create mouse event for passed div
function addMouseUpEvent(li, url) {
	li.onmouseup = function() {
		window.location.href = encodeURI(url);
	}
}

window.onclick = function(event) {
	if (!event.target.matches('.categoryButton')) {
		var dropdowns = document.getElementsByClassName("categoryContent");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('dropDownShow')) {
				openDropdown.classList.remove('dropDownShow');
			}
		}
	}
}

// Populate web menu
function populatePlaces() {

	// Generate a list
	for (i = 0; i < (webSites.length); i++) {

		var category = webSites[i].category;
		var site = webSites[i].site;
		var url = webSites[i].url;
		var categoryIdName = category + 'Category';

		if (document.getElementById(categoryIdName) !== null) {
			
			// Category already created, just add the item in category

			var categoryContent = document.getElementById(categoryIdName + 'ContentDropdown');

			var content = document.createElement('div');
			content.innerHTML = site;
			addMouseUpEvent(content, url);
			categoryContent.appendChild(content);

		} else {

			// Create new category div and add item to it
			var categoryMain = document.createElement('div');
			categoryMain.className = 'category';
			categoryMain.id = categoryIdName;

			// Create category button
			var categoryButton = document.createElement('div');
			categoryButton.className = 'categoryButton';
			categoryButton.id = categoryIdName + 'Button';
			categoryButton.innerHTML = category && category[0].toUpperCase() + category.slice(1);

			// Create dropdown content
			var categoryContent = document.createElement('div');
			categoryContent.className = 'categoryContent';
			categoryContent.id = categoryIdName + 'ContentDropdown';

			var content = document.createElement('div');
			content.innerHTML = site;
			addMouseUpEvent(content, url);
			categoryContent.appendChild(content);

			toggleCategoryEvent(categoryButton, categoryContent);
			
			// Appending
			categoryMain.appendChild(categoryButton);
			categoryMain.appendChild(categoryContent);
	
			places.appendChild(categoryMain);

		}
	}

}


populatePlaces();

// var dummy = document.createElement('div');
// dummy.innerHTML = '123';
// dummy.style.background = '#ff00ff';
// dummy.style.overflow = 'auto';
// places.style.background = '#ff00ff';
// places.appendChild(dummy);