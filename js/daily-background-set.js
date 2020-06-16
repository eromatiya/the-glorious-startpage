const KEYWORD = "nature";
const DW_KEY_ENABLE = "dailyWallpaperEnable";
const DW_KEY_KEYWORD = "dailyWallpaperKeyWord";
const DW_KEY_TIME = "dailyWallpaperTime";
const DW_KEY_BG = "dailyWallpaperBG";
const DW_URL = "https://source.unsplash.com/";

class DailyWallpaper {
  constructor() {
    this._resetTheme = document.getElementById("themeEngineReset");
    this._dummyBodyBackground = document.getElementById("dummyBodyBackground");
    this._hqBackground = document.createElement("img");
    this._dailyWallpaperCheckbox = document.getElementById(
      "dailyWallpaperCheckbox"
    );
    this._unsplashKeyword = document.getElementById("unsplashKeyword");
    this._dailySettingGroups = document.getElementById("dailySettingGroups");
    this._dummyBodyBackgroundStyle = this._dummyBodyBackground.style;
    this._bodyStyle = document.body.style;

    this._resetTheme.addEventListener("mouseup", () => {
      localStorage.removeItem(DW_KEY_ENABLE);
      localStorage.removeItem(DW_KEY_KEYWORD);
      localStorage.removeItem(DW_KEY_BG);
      localStorage.removeItem(DW_KEY_TIME);
      this.dailyWallPaperUI(true);
    });

    this._dailyWallpaperCheckbox.onchange = (event) => {
      localStorage.setItem(DW_KEY_ENABLE, event.target.checked.toString());
      this.dailyWallPaperUI();
      this.unsplashBGLoad();
    };
    this._unsplashKeyword.onchange = (event) => {
      localStorage.setItem(DW_KEY_KEYWORD, event.target.value);
      localStorage.removeItem(DW_KEY_TIME);
      this.unsplashBGLoad();
    };
    this.unsplashBGLoad();
  }

  _styleBodyBackgrond = (elemStyle, urlStr) => {
    elemStyle.background = urlStr;
    elemStyle.backgroundSize = "cover";
    elemStyle.backgroundRepeat = "no-repeat";
    elemStyle.backgroundPosition = "center";
    elemStyle.backgroundAttachment = "fixed";
  };

  _lazyLoadBackground = (fileName) => {
    // Add a class to blur the dummy background
    this._dummyBodyBackground.classList.add("dummyBackgroundBlur");

    // Set a low quality background image for the dummy background
    this._styleBodyBackgrond(
      this._dummyBodyBackgroundStyle,
      `url('${fileName}')`
    );

    // After loading/fetching the _hqBackground's background image
    this._hqBackground.onload = () => {
      // After downloading the HQ image, set it as bg of body
      this._styleBodyBackgrond(
        this._bodyStyle,
        `url('${this._hqBackground.src}')`
      );

      // Add a delay before hiding the overlay dummy background to avoid the white flicker
      setTimeout(() => {
        // Hide the dummy background
        this._dummyBodyBackground.classList.add("dummyBackgroundHide");

        // Remove class to unblur
        this._dummyBodyBackground.classList.remove("dummyBackgroundBlur");
      }, 3000);
    };

    // Add a delay when to fetch the hq background
    setTimeout(() => {
      this._hqBackground.src = `${fileName}`;
    }, 500);
  };
  unsplashBGLoad() {
    const isEnable = localStorage.getItem(DW_KEY_ENABLE) === "true";
    if (isEnable) {
      const date = new Date();
      const lastTimeUpdate = localStorage.getItem(DW_KEY_TIME);
      let urlBg = localStorage.getItem(DW_KEY_BG);
      const keyword = localStorage.getItem(DW_KEY_KEYWORD) || KEYWORD;
      if (
        !lastTimeUpdate ||
        new Date(lastTimeUpdate).getDate() != date.getDate()
      ) {
        console.log("load new wallpaer");
        const size = `${window.screen.width}x${window.screen.height}`;
        const url = `${DW_URL}${size}/?${keyword}`;
        fetch(url).then((data) => {
          if (data && data.url) {
            urlBg = data.url;
            localStorage.setItem(DW_KEY_BG, urlBg);
            localStorage.setItem(DW_KEY_TIME, date.toISOString());
            this._lazyLoadBackground(urlBg);
          }
        });
      }
      if (urlBg) {
        this._lazyLoadBackground(urlBg);
      }
    } else {
      // load default bg
      // new DummyBodyBackground();
    }
    this.dailyWallPaperUI(true);
  }

  dailyWallPaperUI(isChangeUI) {
    const isEnable = localStorage.getItem(DW_KEY_ENABLE) === "true";
    this._dailySettingGroups.style.display = isEnable ? "block" : "none";
    if (isChangeUI) {
      dailyWallpaperCheckbox.checked = isEnable;
      const keyword = localStorage.getItem(DW_KEY_KEYWORD) || KEYWORD;
      this._unsplashKeyword.value = keyword;
    }
  }
}
window.onload = () => {
  new DailyWallpaper();
};

// Initialize
