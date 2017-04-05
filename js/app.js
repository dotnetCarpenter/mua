'use strict'

// causes loads of failures
// SVG.Element.prototype.draw.defaults.snapToGrid = 0

const drawing = SVG('mua_logo')
const lines = []

drawing.on('dblclick', event => {
	/* not working - click events are not handled */
	//const line = drawing.polyline().draw(event)

	const line = drawing.polyline().draw()
	line.draw('start', event)
	lines.push(line)
})

document.addEventListener('keyup', keyHandler)

function keyHandler(event) {
	/*info(event.keyCode)
	info(event.type)*/

	// i
	if(event.keyCode === 73) info(event)
	// enter
	if(event.keyCode === 13) stop()
	// z
	if(event.keyCode === 90 && !event.ctrlKey) finish() && stop()
	// ctrl + z
	if(event.keyCode === 90 && event.ctrlKey) cancel()
}

function info(...items) {
	console.log.apply(null, items)
}

function stop() {
	peek(lines)
		.draw('done')
}

function peek(array) {
	return array[array.length - 1]
}

function finish() {
	const l = peek(lines)

	if(!l) return false

	const points = l.array().valueOf()
	const firstPoint = points[0]

	//l.draw('point', { clientX: firstPoint[0], clientY: firstPoint[1] })
	l.draw('stop', { clientX: firstPoint[0], clientY: firstPoint[1] })

	return true
}

function cancel() {
	const l = peek(lines)

	if(!l) return false

	// remove last point
	const points = l.array().valueOf().slice(0, -1)

	// update polyline with new points
	l.plot(points)

	// redraw circles with new points
	l.draw('drawCircles', points.slice(0, -1))

	// update the polyline to end at the mouse position
	l.draw('update')

	if( points.length === 1 ) {
		l.draw('cancel')
		lines.pop()
	}

	return true
}

/*
const toggler = (f1, f2) => {

	let b = true

	return event => {
		console.dir(event)
		console.log(event.type)

		b ? f1(event) : f2(event)
		b = !b
	}
}

const info = toggler(
	() => { drawing.on('drawpoint', console.log) },
	() => { drawing.off('drawpoint', console.log) }
)
*/

