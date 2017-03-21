'use strict'

const logo = SVG('mua_logo')
const dotRight = logo.get('dot_right')
const dotleft = logo.get('dot_left')

const animationList = stack()


logo.on('dblclick', event => {
	const line = logo.polyline().draw()

	// has to be added before starting to draw or the "drawstart"
	// event is fired before the .on("drawstart", f) handler is attached
	animationList.add( line )

	line.draw(event)
})

const keyHandler = event => {
	if(event.keyCode === 13) {
		const line = animationList.pop()

		line.draw('done')
		line.off('drawstart')
	} else if(event.keyCode === 90) {
		const line = animationList.peek()

		//const lastVector = animationList.peek.call(line.array())
		console.dir(line.array())
	}
}

const keyListener = event => {
	document.addEventListener('keyup', keyHandler)
}

const keyUnlistener = event => {
	console.dir(event)

	document.removeEventListener('keyup', keyHandler)
}

animationList.on('drawstart', keyListener)
animationList.on('drawstop', keyUnlistener)

function stack() {
	const _list = []

	return {
		peek: peek.bind(_list),
		add: add.bind(_list),
		pop: remove.bind(_list),
		on
	}
}
// get the peek item on the stack
function peek() {
	return this[this.length - 1]
}
// add an item to the top of the stack
function add(item) {
	this.push(item)
}
// remove the item from the top of the stack
function remove() {
	return this.shift()
}
// delegate event handler to the last item added to the stack
// if no item has been added, then wait until an item is added
function on(eventName, f) {
	const item = this.peek()

	if(item) {
		item.on(eventName, f)
	}	else {
		let _add = this.add
		let c=0
		this.add = item => {
console.log(c++, eventName)
			item.on(eventName, f)
			_add(item)
			this.add = _add
			//_add = null
		}
	}
}
