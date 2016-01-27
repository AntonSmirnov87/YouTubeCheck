# YouTubeCheck
JS Code for checking if YouTube is permitted on the network and embedding the appropriate video

When included in the header, this function places a video wherever the appropriately marked DIV is located in the HTML DOM.
DIV must be in the format <div data-youtube="[YOUTUBE CODE]" data-video="[LOCAL LINK]"></div>
YouTube is the preferred player if YouTube is accessible and a valid looking link is provided as the data-youtube attribute
YouTube link can be in any format as long as it includes the 11-digit video id (e.g.: https://youtu.be/<11DIGITID>/ OR youtube.com/watch?v=<11DIGITID>?autoplay=0 )
If YouTube is not accessible or the link does not look valid, the local video link provided for the data-video attribute will be embeded
The data-video attribute is used as backup and must be included in DIV for a video to be embedded, even if YouTube is preferred
Optional attributes for the DIV include: data-autoplay , data-controls, and data-loop
By default, controls are ON , autoplay is OFF , and loop is OFF

Add the following to your CSS library to make standard ratio videos responsive:
> div.FluidFrame{border-radius: 15px; height: 0px; padding-top: 25px; padding-bottom: 56.25%; position: relative;}
> div.FluidFrame iframe, div.FluidFrame video{border-radius: inherit; height: 100%; left: 0; position: absolute; top: 0; width: 100%;}
