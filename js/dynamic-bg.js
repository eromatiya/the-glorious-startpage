var date = new Date();
var hour = date.getHours();

var wallName;

if (hour >= 6 && hour < 12) {
	wallName = "morning";

} else if (hour >= 12 && hour < 18 ) {
	wallName = "noon";

} else {
	wallName = "evening";

}

document.body.style.background = "url('assets/backgrounds/" + wallName + ".webp')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat =  "no-repeat";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundAttachment = "fixed";