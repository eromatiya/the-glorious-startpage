class BodyBackground {

	constructor() {
		this._bodyBackground = document.querySelector('#bodyBackground');
		this._hqBackground = document.createElement('img');
		this._bodyBackgroundStyle = this._bodyBackground.style;
		this._startLazyLoad();
	}

	_setBodyBackgrond = urlStr => {
		this._bodyBackgroundStyle.background = urlStr;
		this._bodyBackgroundStyle.backgroundSize = 'cover';
		this._bodyBackgroundStyle.backgroundRepeat =  'no-repeat';
		this._bodyBackgroundStyle.backgroundPosition = 'center';
		this._bodyBackgroundStyle.backgroundAttachment = 'fixed';
	}

	_lazyLoadBackground = fileName => {

		// Add a class to blur it
		this._bodyBackground.classList.add('blurFiltered');

		// Set a low quality background image 
		this._setBodyBackgrond(`url('assets/backgrounds/${fileName}-low.webp')`);
		
		this._hqBackground.onload = () => {

			// After downloading the HQ image, set it as bg
			this._setBodyBackgrond(`url('${this._hqBackground.src}')`);
			
			// Remove class to unblur
			this._bodyBackground.classList.remove('blurFiltered');
		}

		// Add a delay when to fetch background
		setTimeout(
			() => {
				this._hqBackground.src = `assets/backgrounds/${fileName}.webp`;
			},
			50
		);
	}
	
	_startLazyLoad = () => {
		const date = new Date();
		const hour = date.getHours();

		if (hour >= 6 && hour < 12) {
			this._lazyLoadBackground('morning');

		} else if (hour >= 12 && hour < 18 ) {
			this._lazyLoadBackground('noon');

		} else {
			this._lazyLoadBackground('evening');
		}
	}
}