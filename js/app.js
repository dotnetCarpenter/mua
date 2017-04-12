/* globals Mua,SVG */

'use strict'

// causes loads of failures
// SVG.Element.prototype.draw.defaults.snapToGrid = 0

const drawing = SVG('mua_logo')
const lines = []
const commands = Mua.Commands

drawing.on('dblclick', event => {
	/* not working - click events are not handled */
	//const line = drawing.polyline().draw(event)

	const line = drawing.polyline(null, {snapToGrid:0}).draw()
	line.draw('start', event)
	//line.on('drawdone', () => { line.toPath().addClass('animation-path') })
	lines.push(line)
})

document.addEventListener('keyup', commands.keyHandler(commands.keyboardKeys, lines))

createLegend()

function createLegend() {
	const legends = document.querySelectorAll('.legend__list')
	const template = document.querySelector('#legend__item')

	if(!template) return

	const keyBindingTemplate = template.content.querySelectorAll('.legend__ctrl, .legend__key, .legend__description')
	const commandInfos = commands.keyboardKeys

	commandInfos.forEach(command => {
		keyBindingTemplate[0].textContent = 'ctrl'
		keyBindingTemplate[1].textContent = command.keyCode === 13 ? "enter" : String.fromCharCode(command.keyCode).toLowerCase()
		keyBindingTemplate[2].textContent = command.description

		legends.forEach( legend => {
			const clone = document.importNode(template.content, true)	
			if(!command.ctrlKey) clone.querySelector('.legend__ctrl').remove()

			legend.appendChild(clone)
		})
	})
}
