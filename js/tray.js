'use strict';

class Tray {
	constructor(elementId) {
		this.element = document.getElementById(elementId);
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

	// Selects a thumbnail in the tray
	select(index) {
		let container = this.element.children[0];
		let selectedListItem = this.element.children[0].children[index];
		selectedListItem.firstChild.classList.add("selected");

		// get the x offset of the seleced thumbnail when centered
		let itemOffset = selectedListItem.offsetLeft + (selectedListItem.clientWidth / 2);
		this.element.scrollLeft = itemOffset - (this.element.clientWidth / 2);
	}

	// returns a ratio of the current scroll positon
	calcScrollRatio() {
		return this.element.scrollLeft / (this.element.scrollWidth - window.innerWidth);
	}

	// scroll to view

	// removes all items in the tray
	empty() {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}
	}
}

// Bind controls
document.getElementById("selItems").onchange = function(event) {
	updateRange(0, event.target.value);
}

// bust cached select values on page refresh
var options = document.getElementById('selItems');
for (var i = 0, l = options.length; i < l; i++) {
    options[i].selected = options[i].defaultSelected;
}

document.getElementById("selItemsIndex").onchange = function(event) {
	document.getElementById("indexVal").innerHTML = event.target.value;
}

document.getElementById("btn").onclick = function(event) {
	let arrTrays = ['tray1', 'tray2', 'tray3'];
	let selTrays = document.getElementById("selItems").selectedIndex;
	let selIndex = document.getElementById("selItemsIndex");
	tray.load(arrTrays[selTrays]);
	tray.select(selIndex.value);
}

function updateRange(val, max) {
	let rangeControl = document.getElementById("selItemsIndex");
	rangeControl.value = val - 1;
	rangeControl.setAttribute('max', max - 1);
	document.getElementById("indexVal").innerHTML = val;
}


// let's go

updateRange(0, 4);
let tray = new Tray('tray');