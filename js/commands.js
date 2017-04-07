/* globals SVG */

'use strict'

var Mua = Mua || {}

/**
 * Key handling code AKA Commands
 * @return {Object} keyHandler function and keyboardKeys
 */
;(function(exports) {

	const keyboardKeys = new Map(
		createCommands({
				command: keyupInfoCommand,
				keyCode: 73,
				ctrlKey: false,
				description: 'print the keyboard event and current polylines to console.log'
			}, {
				command: finishPolylineCommand,
				keyCode: 13,
				ctrlKey: false,
				description: 'finish drawing'
			}, {
				command: closePolylineCommand,
				keyCode: 90,
				ctrlKey: false,
				description: 'close the line with to the first point'
			}, {
				command: undoDrawCommand,
				keyCode: 90,
				ctrlKey: true,
                description: 'cancel last point or drawing'
            }
        )
    )

    function createCommands(...commands) {
        return commands.map(c => {
            return [
                // predicate A.K.A. accept, used as Map key
                e => e.keyCode === c.keyCode && e.ctrlKey === c.ctrlKey,
                // command object, used as Map value
                {
                    execute: c.command,
                    keyCode: c.keyCode,
                    ctrlKey: c.ctrlKey,
                    description: c.description
                }
            ]
        })
    }

	// exports
	exports.keyboardKeys = keyboardKeys
	exports.keyHandler = keyHandler

    function keyHandler(keyboardKeys, lines) {
        return event => {
            /*info(event.keyCode)
            info(event.type)*/

            for(const [accept, command] of keyboardKeys) {
                if( accept(event) ) command.execute({ event, lines })
            }
        }
    }

    function keyupInfoCommand(parameters) {
        info(parameters.lines,parameters.event)
    }

    function finishPolylineCommand(parameters) {
        finish(parameters.lines)
    }

    function closePolylineCommand(parameters) {
        close(parameters.lines) && finish(parameters.lines)
    }

    function undoDrawCommand(parameters) {
        cancel(parameters.lines)
    }

    function info(...items) {
        console.log.apply(null, items)
    }

    function finish(lines) {
        peek(lines)
            .draw('done')
    }

    function peek(array) {
        return array[array.length - 1]
    }

    function close(lines) {
        const l = peek(lines)

        if(!l) return false

        const points = l.array().valueOf()
        const firstPoint = points[0]

        //l.draw('point', { clientX: firstPoint[0], clientY: firstPoint[1] })
        l.draw('stop', { clientX: firstPoint[0], clientY: firstPoint[1] })

        return true
    }

    function cancel(lines) {
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

}(Mua.Commands || (Mua.Commands = {})))
