'use strict';

class Tray {
	constructor(elementId) {
		this.element = document.getElementById(elementId);
	}

	open(trayContentId) {
		console.log("Open", trayContentId);
	}
}


let tray = new Tray('tray')