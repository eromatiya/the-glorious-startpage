## a modern looking startpage
[![maintained](https://img.shields.io/maintenance/yes/2020?label=maintained&style=flat-square)](https://github.com/manilarome/modern-startpage/commits/master) [![contributions](https://img.shields.io/badge/contribution-welcome-brightgreen&?style=flat-square)](https://github.com/manilarome/modern-startpage/pulls) [![HitCount](http://hits.dwyl.com/manilarome/modern-startpage.svg)](http://hits.dwyl.com/manilarome/modern-startpage)


### A feature-rich modern-looking startpage

| demo |
| --- |
| ![gif](gif.gif) |

## [Live Preview](https://manilarome.github.io/modern-startpage/)

## Features

+ Responsive UI
+ Weather Forecast
+ Dynamic Background
+ iOS-looking Panel
+ And many bugs!

### TODO

- [x] Config file  
- [x] Weather Info  
- [x] Dynamic Background   
- [x] Cleaner code<sup>WIP</sup>  
- [x] More items on the dashboard<sup>WIP</sup>  
~~- [ ] Use JSON as configuration file~~<sup>CORS said no-no to this</sup>

### Important Note

+ Typing your search query will automatically open the search box. You can also open it by pressing on the leftmost button in panel or by clicking your profile picture.
+ I'm using the `backdrop-filter` property to have the blur effect for the panels. If you're using Firefox, find `layout.css.backdrop-filter.enabled` then enable it.
+ The configuration file can be found in `modern-startpage/js/config.js`. You can set your credentials in weather forecast and your default search engine here.
+ Openweather map API key is not included!

	How to get a credentials for the weather forecast?

	- OpenWeatherMap is the weather provider, so go to OpenWeatherMap's [website](https://home.openweathermap.org/).
	- Register, log-in, and then go [here](https://home.openweathermap.org/api_keys) to generate your very own API keys. 
	- Put your credentials in `modern-startpage/js/config.js`.

+ The code could be better, this is my first time writing a startpage from the ground up. I will improve this from time to time.
+ If you discovered a bug or error in the logs, please open an issue so I can fix it.
+ Tested only on Firefox and Google Chrome.
