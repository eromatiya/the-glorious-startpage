var places = document.getElementById("places");

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function toggleCategoryDropdown() {
	document.getElementById("dummyCategoryContentDropdown").classList.toggle("dropDownShow");
}

document.getElementById("dummyCategoryButton").onclick = function() {
	toggleCategoryDropdown();
}

// Close the dropdown if the user clicks outside of it
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
		var categoryIdName = category + 'Category';

		if (document.getElementById(categoryIdName) !== null) {
			
			// Category already created, just add the item in category
		

			// var dummy = document.createElement('div');
			// dummy.innerHTML = '123';
			// dummy.style.background = '#ff00ff';
			// dummy.style.overflow = 'auto';
			// places.style.background = '#ff00ff';
			// places.appendChild(dummy);

			var contentDropdown = document.getElementById(categoryIdName + 'ContentDropdown');
			var dummy = document.createElement('div');
			dummy.innerHTML = category;
			dummy.style.background = '#ff00ff';
			dummy.className = 'categoryContent';
			places.appendChild(dummy);




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

			// Appending
			categoryMain.appendChild(categoryButton);
			categoryMain.appendChild(categoryContent);


			var dummyContent = document.createElement('div');
			dummyContent.innerHTML = 'GAGO';
			dummyContent.className = 'categoryContent';

			categoryMain.appendChild(dummyContent);

			places.appendChild(categoryMain);




			// categoryMain.innerHTML = category;
			// places.appendChild(categoryMain);

		}


		

		// var categoryName = webSites[i].category;

		// var categoryIdName = categoryName + 'Category';

		// if (document.getElementById(categoryIdName) !== null) {

		// 	// category already created, just add the item in category


		// 	var dummyDiv = document.createElement('option');
		// 	dummyDiv.innerHTML = categoryName;
		// 	dummyDiv.style.background = '#ff00ff';
		// 	document.getElementById(categoryIdName).appendChild(dummyDiv);

		// } else {

		// 	if (categoryName === 'social') {
		// 		alert(categoryName);
		// 	}

		// 	// create new category div and add item to it

		// 	var category = document.createElement('select');
		// 	category.id = categoryIdName;
		// 	category.innerHTML = categoryName;
		// 	category.style.background = '#0f0';
		// 	places.appendChild(category);

		// 	// Insert item in newly created category
		// 	category.appendChild(document.createElement('option'));
		// }


	}

}


populatePlaces();

// var dummy = document.createElement('div');
// dummy.innerHTML = '123';
// dummy.style.background = '#ff00ff';
// dummy.style.overflow = 'auto';
// places.style.background = '#ff00ff';
// places.appendChild(dummy);