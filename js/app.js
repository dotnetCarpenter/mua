'use strict'

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
	/*console.log(event.keyCode)
	console.log(event.type)*/

	// i
	if(event.keyCode === 73) info(event)
	// z
	if(event.keyCode === 90) stop()
	// ctrl + c
	if(event.keyCode === 67 && event.ctrlKey) cancel()
}

function info(obj) {
	Object.is(obj, Object) ? console.dir(obj) : console.log(obj)
}

function stop() {
	peek(lines)
		.draw('done')
}

function peek(array) {
	return array[array.length - 1]
}

function cancel() {
	const l = peek(lines)

	if(!l) return

	// remove last point
	const points = l.array().valueOf().slice(0, -1)

	// update polyline with new points
	l.plot(points)

	// redraw circles with new points
	l.draw('drawCircles', points.slice(0, -1))

	if( points.length === 1 ) {
		l.draw('cancel')
		lines.pop()
	}
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

