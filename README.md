## a modern looking startpage
[![maintained](https://img.shields.io/maintenance/yes/2020?label=maintained&style=flat-square)](https://github.com/manilarome/the-glorious-startpage/commits/master) [![contributions](https://img.shields.io/badge/contribution-welcome-brightgreen&?style=flat-square)](https://github.com/manilarome/the-glorious-startpage/pulls) [![HitCount](http://hits.dwyl.com/manilarome/the-glorious-startpage.svg)](http://hits.dwyl.com/manilarome/the-glorious-startpage)

### A feature-rich modern-looking startpage and pretty much work in progress

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
+ Mobile Support with Swipe Gestures
+ Theme Settings - Change colors on-the-fly
+ Weather Forecast - OpenWeatherMap
+ Search engine selection
+ Dynamic Background
+ Web menu with Fuzzy Search
+ Keyboard Navigation
+ Pure Javascript!
+ And many bugs!

## Keybindings

+ <kbd>alt + s</kbd> - toggles dashboard
+ <kbd>alt + e</kbd> - toggles web menu
+ <kbd>alt + x</kbd> - toggles weather screen
+ <kbd>Escape</kbd> - close panels/toggles web menu
+ <kbd>Backspace</kbd> - toggles search box

### TODO

- [x] GUI Settings
- [x] Weather Forecast  
- [x] Dynamic Background   
- [x] Cleaner code<sup>WIP</sup>    
- [x] Keyboard navigation
- [x] Swipe gestures for mobile


### Important Note

+ I'm using the `backdrop-filter` property to have the blur effect for the panels. If you're using Firefox, find `layout.css.backdrop-filter.enabled` then enable it.

+ You can now set your default search engine and OpenWeatherMap credentials using the GUI. It uses the `window.localStorage` so it's completely safe. I also provided a button that will allow you to delete/clear your credentials.

+ Openweather map API key is not included!

	How to get a credentials for the weather forecast?

	- OpenWeatherMap is the weather provider, so go to OpenWeatherMap's [website](https://home.openweathermap.org/).
	- Register, log-in, and then go [here](https://home.openweathermap.org/api_keys) to generate your very own API keys. 
	- Put your credentials in the settings in settings panel.

+ You can easily add a button on the dock and web menu by just adding `website name`, `icon name`, and `website url` in an array. Open `js/sites-list.js`. Make sure to put an icon with `.svg` extension for that website in `assets/webcons/`.

+ Add your own keyboard bindings in `js/keybindings.js`.

+ The code could be better, this is my first time writing a startpage from the ground up. I will improve this from time to time.

+ Found a bug, error or do you have a suggestion, feel free to open an issue or pull request.

+ Tested only on Firefox and Google Chrome.
