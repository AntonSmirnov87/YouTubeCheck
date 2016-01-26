// When included in the header, this function places a video wherever the appropriately marked DIV is located in the HTML DOM.
// DIV must be in the format <div data-youtube="[YOUTUBE CODE]" data-video="[LOCAL LINK]"></div>
// YouTube is the preferred player if YouTube is accessible and a valid looking link is provided as the data-youtube attribute
// YouTube link can be in any format as long as it includes the 11-digit video id (e.g.: https://youtu.be/<11DIGITID>/ OR youtube.com/watch?v=<11DIGITID>?autoplay=0 )
// If YouTube is not accessible or the link does not look valid, the local video link provided for the data-video attribute will be embeded
// The data-video attribute is used as backup and must be included in DIV for a video to be embedded, even if YouTube is preferred
// Optional attributes for the DIV include: data-autoplay , data-controls, and data-loop
// By default, controls are ON , autoplay is OFF , and loop is OFF

// Add the following to your CSS library to make standard ratio videos responsive:
// div.FluidFrame{border-radius: 15px; height: 0px; padding-top: 25px; padding-bottom: 56.25%; position: relative;}
// div.FluidFrame iframe, div.FluidFrame video{border-radius: inherit; height: 100%; left: 0; position: absolute; top: 0; width: 100%;}

checkYouTube();

function checkYouTube() {
    var image = new Image();
    image.src = "http://youtube.com/favicon.ico";

    image.onload = function () { CreateVideos(true); }; // If YouTube accessible
    image.onerror = function () { CreateVideos(false); }; // If YouTube NOT accessible
}

function CreateVideos(YouTubeLoaded) {
    $(document).ready(function () { // When the DOM is loaded
        $("div[data-video]").each(function (index, value) { // For every DIV with a "data-video" attribute
            playerDiv = value;
            playerDiv.setAttribute("class", "FluidFrame");
            var ytLink = $(value).attr("data-youtube");
            if (ytLink.indexOf("v=") > -1) { // Gets ID from youtube.com style URL
                ytLink = ytLink.substring(ytLink.indexOf("v=") + 2, ytLink.indexOf("v=") + 13);
            } else if (ytLink.indexOf("youtu.be/") > -1) { //  Gets ID from youtu.be style URL
                ytLink = ytLink.substring(ytLink.indexOf("youtu.be/") + 9, ytLink.indexOf("youtu.be/") + 20);
            }
            var ssLink = $(value).attr("data-video");
            var controls = $(value).attr("data-controls");
            var autoplay = $(value).attr("data-autoplay");
            var loop = $(value).attr("data-loop");

            if (YouTubeLoaded && ytLink != undefined && ytLink.length >= 11) { // If there is a "data-youtube" attribute of at least 11 digits for that DIV
                embedYouTube(ytLink, controls, autoplay, loop);
            } else {
                embedLocalVideo(ssLink, controls, autoplay, loop);
            }
        });
    });
}

function embedLocalVideo(ssLink, controls, autoplay, loop) {
    var videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("preload", "metadata");
    if (controls != "false" && controls != "off" && controls != "none" && controls != "0") {
        videoPlayer.setAttribute("controls", "controls");
    }
    if (autoplay != undefined && autoplay != "false" && autoplay != "off" && autoplay != "none" && autoplay != "0") {
        videoPlayer.setAttribute("autoplay", "autoplay");
    }
    if (loop != undefined && loop != "false" && loop != "off" && loop != "none" && loop != "0") {
        videoPlayer.setAttribute("loop", "loop");
    }
    playerDiv.appendChild(videoPlayer);
    var videoPlayerSource = document.createElement("source");
    videoPlayerSource.setAttribute("type", "video/mp4");
    videoPlayerSource.setAttribute("src", ssLink);
    videoPlayer.appendChild(videoPlayerSource);
    var videoPlayerObject = document.createElement("object");
    videoPlayerObject.setAttribute("data", ssLink);
    videoPlayerObject.setAttribute("width", "100%");
    videoPlayer.appendChild(videoPlayerObject);
    var videoPlayerEmbed = document.createElement("embed");
    videoPlayerEmbed.setAttribute("src", "/gddflvplayer.swf");
    videoPlayerEmbed.setAttribute("width", "100%");
    videoPlayerObject.appendChild(videoPlayerEmbed);
    var videoWarning = document.createTextNode("Your browser does not support the video tag.");
    videoPlayer.appendChild(videoWarning);
}

function embedYouTube(ytLink, controls, autoplay, loop) {
    var ytCode = ytLink.substring(ytLink.length - 11, ytLink.length);
    var ytLink = "https://www.youtube.com/embed/" + ytCode + "?"
    var videoPlayer = document.createElement("iframe");
    if (autoplay != undefined && autoplay != "false" && autoplay != "off" && autoplay != "none" && autoplay != "0") {
        ytLink = ytLink + "autoplay=1&";
    }
    if (controls == "false" || controls == "off" || controls == "none" || controls == "0") {
        ytLink = ytLink + "showinfo=0&controls=0&";
    }
    if (loop != undefined && loop != "false" && loop != "off" && loop != "none" && loop != "0") {
        ytLink = ytLink + "version=3&loop=1&playlist=" + ytCode;
    }
    videoPlayer.setAttribute("src", ytLink);
    videoPlayer.setAttribute("frameborder", "0");
    videoPlayer.setAttribute("allowfullscreen", "allowfullscreen");
    playerDiv.appendChild(videoPlayer);
}