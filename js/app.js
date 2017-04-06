'use strict'

// causes loads of failures
// SVG.Element.prototype.draw.defaults.snapToGrid = 0

const drawing = SVG('mua_logo')
const lines = []
const commands = new Mua.Commands()

drawing.on('dblclick', event => {
	/* not working - click events are not handled */
	//const line = drawing.polyline().draw(event)

	const line = drawing.polyline().draw()
	line.draw('start', event)
	lines.push(line)
})

document.addEventListener('keyup', commands.keyHandler(commands.keyboardKeys, lines))

for (const list of document.querySelectorAll('.legend__list')) {
	const fragment = document.createDocumentFragment()

	for(const command of commands.keyboardKeys.values()) {
		const child = createElement('li')
		const keyName = command.keyCode === 13 ? "enter" : String.fromCharCode(command.keyCode).toLowerCase()
		child.textContent = (command.ctrlKey ? 'ctrl + ' : '') + keyName + ': ' + command.description
			
		fragment.appendChild(child)
	}

	list.appendChild(fragment)
}

function createElement(tagName) {
	return document.createElement(tagName)
}
