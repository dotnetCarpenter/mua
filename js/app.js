'use strict'

const drawing = SVG('mua_logo')
const lines = []

drawing.on('dblclick', event => {
	const line = drawing.polyline().draw()
	lines.push(line)
	line.draw(event)

	/* not working */
	//const line = drawing.polyline().draw(event)
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
	const points = l.attr('points').replace(/(\s\d+,\d+){2}$/, '')

	info(l.attr('points'))
	info(l.array().value.reduce( (a1,a2) => a1.concat(a2) ).join(' '))

	info(points)
	l.attr('points', points)
	l.array(new SVG.PointArray(
		l.array().value.slice(0, l.array().value.length - 3)
	))

	info(l.attr('points'))
	info(l.array().value.reduce( (a1,a2) => a1.concat(a2) ).join(' '))

	/*peek(lines)
		.draw('cancel')*/
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

