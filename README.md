## a modern looking startpage
[![maintained](https://img.shields.io/maintenance/yes/2020?label=maintained&style=flat-square)](https://github.com/manilarome/the-glorious-startpage/commits/master) [![contributions](https://img.shields.io/badge/contribution-welcome-brightgreen&?style=flat-square)](https://github.com/manilarome/the-glorious-startpage/pulls) [![HitCount](http://hits.dwyl.com/manilarome/the-glorious-startpage.svg)](http://hits.dwyl.com/manilarome/the-glorious-startpage)

### A bloated and modern-looking startpage

## [Live Preview](https://manilarome.github.io/the-glorious-startpage/)

## Gallery

| Searchbar | Settings |
| --- | --- |
| ![screenshot](/scrots/searchbar.png) | ![screenshot](/scrots/settings.png) |

| Web Menu | Weather Forecast |
| --- | --- |
| ![screenshot](/scrots/webmenu.png) | ![screenshot](/scrots/weather.png) |

#### It looks good on mobile too

| Searchbar | Settings |
| --- | --- |
| ![screenshot](/scrots/mobile-searchbar.jpg) | ![screenshot](/scrots/mobile-settings.jpg) |

| Web Menu | Weather Forecast |
| --- | --- |
| ![screenshot](/scrots/mobile-webmenu.jpg) | ![screenshot](/scrots/mobile-weather.jpg) |

## Features

+ Responsive UI
+ Web Search Suggestions
+ Mobile Support with Swipe Gestures
+ Theme Settings - Change colors on-the-fly
+ Weather Forecast - OpenWeatherMap Integration
+ Search Engine Selection
+ Dynamic Background
+ Web Menu with Fuzzy Search
+ Keyboard Navigation
+ Vanilla Javascript!
+ And many bugs!

## Keybindings

+ <kbd>alt + S</kbd> - toggles dashboard
+ <kbd>alt + E</kbd> - toggles web menu
+ <kbd>alt + X</kbd> - toggles weather screen
+ <kbd>Escape</kbd> - close panels/toggles web menu
+ <kbd>Backspace</kbd> - toggles search box

## Swipe gestures

+ <kbd>swipe right</kbd> - opens web menu
+ <kbd>swipe left</kbd> - opens dashboard
+ <kbd>swipe up</kbd> - opens weather screen
+ <kbd>swipe down</kbd> - opens search box

## Customization and Settings

#### Changing the colors and blur strength on-the-fly

+ Open the dashboard by clicking the settings button on the dock.
+ Change the color and blur strength by setting it on the `Theme Engine` section.
+ Supports #RGB, #RRGGBBAA, and #RRGGBB.

#### Adding more buttons on the web menu

Add more buttons or web shortcuts in web menu by editing the `webSites` array in `js/config.js`. Make sure to put an icon with `svg` format for the shortcut in `assets/webcons/` folder. 

```js
const webSites = [
	{
		site: 'Reddit',
		icon: 'reddit',
		url: 'https://reddit.com/',
		category: 'social'
	},
	...
]
```

#### Adding more buttons on the dock

To add more web shortcuts/buttons in the dock, you have to edit the `dockSites` array in `js/config.js`. Make sure to put an icon with `svg` format for the shortcut in `assets/webcons/` folder.

```js
const dockSites = [
	{
		site: 'Reddit',
		icon: 'reddit',
		url: 'https://reddit.com/'
	},
	...
]
```

#### Adding more search engine in selection

Add more search engine in selection by editing the `searchEngines` object in `js/config.js`. Make sure to follow the format below:

```js
const searchEngines = {
	'duckduckgo': {
		name: 'Duckduckgo',
		prefix: 'https://duckduckgo.com/?q='
	},
	...
}
```

#### Set your OpenWeatherMap API key

Setting your OpenWeatherMap credential is a breeze. 

+ If you don't have an API key, follow this guide:

	How to get a credentials for the weather forecast?

	- OpenWeatherMap is the weather provider, so go to OpenWeatherMap's [website](https://home.openweathermap.org/).
	- Register, log-in, and then go [here](https://home.openweathermap.org/api_keys) to generate your very own API keys.

+ After getting you API key, you have to get your City ID.
+ Put your API key and City ID in the `Weather Settings`.
+ Apply.

#### Changing the default search engine

Google is the default search engine of the search bar, if you want to change it DuckDuckGo or something:

+ Open the dashboard by clicking the settings button on the dock.
+ Find the `Search Engine` section and select your preferred search engine.
+ Set it as default.


#### Changing the profile picture

+ Replace the `user.png` image file in `/assets/`.

#### Changing the background image

The background image changes based on time.

+ Change the background images in `assets/backgrounds/`.
+ Make sure that it is in a `webp` format. 
+ A lower resolution of each images are also required.

#### Keybindings

+ You can add, replace, or remove a keybinding by editing `js/keybindings.js`.

### Important Note

+ If you're using firefox and blur effect is not enabled, open `about:config`, accept the risks, find `layout.css.backdrop-filter.enabled` set it to true to enable it. Refresh the startpage.

+ The code could be better, this is my first time writing a startpage from the ground up. I will improve this from time to time.

+ Found a bug, error or do you have a suggestion? Feel free to open an issue or pull request.

+ Tested only on Firefox and Google Chrome.

### TODO

- [x] GUI Settings  
- [x] Weather Forecast  
- [x] Dynamic Background   
- [x] Cleaner code<sup>WIP</sup>  
- [x] Keyboard navigation  
- [x] Swipe gestures for mobile  


### License

[Feel free to use or modify this however you like!](https://github.com/manilarome/the-glorious-startpage/blob/master/LICENSE)