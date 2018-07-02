'use strict';

class Tray {
	constructor(elementId) {
		this.element = document.getElementById(elementId);
	}

	open(trayContentId) {
		this.load(trayContentId);
	}

	load(trayContentId) {
		this.empty();

		let tpl = document.getElementById(trayContentId);
		let clone = document.importNode(tpl.content, true);
		this.element.appendChild(clone);

		// assumes a OL - LI structure. Find the computed width of the tray
		let trayWidth = 0;
		let container = this.element.children[0]; // the OL

		for (var i=0; i < container.children.length; i++) {
			trayWidth += container.children[i].clientWidth;
		}

		if (trayWidth < this.element.clientWidth) {
			// remove fixed width if applied
			container.style.width = "";
		} else {
			// set the OL to the width of its children
			container.style.width = trayWidth + "px";
		}

		
	}

	// removes all items in the tray
	empty() {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}
	}
}


let tray = new Tray('tray')