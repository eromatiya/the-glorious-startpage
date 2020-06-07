const KEYWORD = "nature";
const DW_KEY_ENABLE = "dailyWallpaperEnable";
const DW_KEY_KEYWORD = "dailyWallpaperKeyWord";
const DW_KEY_TIME = "dailyWallpaperTime";
const DW_KEY_BG = "dailyWallpaperBG";
const DW_URL = "https://source.unsplash.com/";

var resetTheme = document.getElementById("themeEngineReset");
var backgroundBody = document.getElementById("bodyBackground");
// High quality background, we'll lazy load this
var hqBackground = document.createElement("img");
var dailyWallpaperCheckbox = document.getElementById("dailyWallpaperCheckbox");
var unsplashKeyword = document.getElementById("unsplashKeyword");
var dailySettingGroups = document.getElementById("dailySettingGroups");
// Style body background

const lazyLoadUnSplashBackground = (bgUrl) => {
  const styleBodyBackground = (bgBodyStyle) => {
    bgBodyStyle.backgroundSize = "cover";
    bgBodyStyle.backgroundRepeat = "no-repeat";
    bgBodyStyle.backgroundPosition = "center";
    bgBodyStyle.backgroundAttachment = "fixed";
  };

  // Shorten backgroundBody.style or alias it
  var bgBodyStyle = backgroundBody.style;

  // Set a low quality background image
  bgBodyStyle.background = bgUrl;
  styleBodyBackground(bgBodyStyle);

  // Add a class to blur it
  backgroundBody.classList.add("blurFiltered");

  hqBackground.onload = () => {
    // After downloading the HQ image, set it as bg
    backgroundBody.style.background = "url(" + bgUrl + ";)";
    styleBodyBackground(bgBodyStyle);

    // Remove class to unblur
    backgroundBody.classList.remove("blurFiltered");
  };

  // Add a delay when to fetch background
  setTimeout(() => {
    hqBackground.src = bgUrl;
  }, 50);
};

const unsplashBGLoad = () => {
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
      const size = `${window.screen.width}x${window.screen.height}`;
      const url = `${DW_URL}${size}/?${keyword}`;
      fetch(url).then((data) => {
        if (data && data.url) {
          urlBg = data.url;
          localStorage.setItem(DW_KEY_BG, urlBg);
          localStorage.setItem(DW_KEY_TIME, date.toISOString());
          lazyLoadUnSplashBackground(urlBg);
        }
      });
    }
    if (urlBg) {
      lazyLoadUnSplashBackground(urlBg);
    }
  } else {
    initLazyLoad();
  }
  dailyWallPaperUI(true);
};
const dailyWallPaperUI = (isChangeUI) => {
  const isEnable = localStorage.getItem(DW_KEY_ENABLE) === "true";
  dailySettingGroups.style.display = isEnable ? "block" : "none";
  if (isChangeUI) {
    dailyWallpaperCheckbox.checked = isEnable;
    const keyword = localStorage.getItem(DW_KEY_KEYWORD) || KEYWORD;
    unsplashKeyword.value = keyword;
  }
};
resetTheme.addEventListener("mouseup", () => {
  localStorage.removeItem(DW_KEY_ENABLE);
  localStorage.removeItem(DW_KEY_KEYWORD);
  localStorage.removeItem(DW_KEY_BG);
  localStorage.removeItem(DW_KEY_TIME);
  dailyWallPaperUI(true);
});

dailyWallpaperCheckbox.onchange = (event) => {
  localStorage.setItem(DW_KEY_ENABLE, event.target.checked.toString());
  dailyWallPaperUI();
  unsplashBGLoad();
};

unsplashKeyword.onchange = (event) => {
  localStorage.setItem(DW_KEY_KEYWORD, event.target.value);
  localStorage.removeItem(DW_KEY_TIME);
  unsplashBGLoad();
};
// Initialize
window.onload = unsplashBGLoad();
