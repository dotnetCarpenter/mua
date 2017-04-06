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
	const template = document.querySelector('#legend__item')
	const item = template.content.querySelectorAll('.legend__ctrl, .legend__key, .legend__description')

	for(const command of commands.keyboardKeys.values()) {

		if(command.ctrlKey) item[0].textContent = 'ctrl'
		item[1].textContent = command.keyCode === 13 ? "enter" : String.fromCharCode(command.keyCode).toLowerCase()
		item[2].textContent = command.description
			
		const clone = document.importNode(template.content, true)
		
		if(!command.ctrlKey) clone.querySelector('.legend__ctrl').remove()
		
		list.appendChild(clone)
	}
}
