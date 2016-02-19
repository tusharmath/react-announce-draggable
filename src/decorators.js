/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

const createDeclarative = require('react-announce').createDeclarative

const dispatch = function (event, customEvent, el) {
  el.addEventListener(event, x => this.dispatch(customEvent, x))
}

const findDomNode = (ReactDOM, stream) => stream
    .filter(x => x.event === 'DID_MOUNT')
    .map(() => ReactDOM.findDOMNode(this))

const draggble = function (ReactDOM, stream, dispose) {
  dispose(
    findDomNode(ReactDOM, stream)
      .subscribe(dispatch.bind(this, 'dragstart', 'DRAG_START'))
  )
}

const droppable = function (ReactDOM, stream, dispose) {
  dispose(
    findDomNode(ReactDOM, stream)
      .subscribe(el => {
        dispatch.call(this, 'dragover', 'DRAG_OVER', el)
        dispatch.call(this, 'drop', 'DROP', el)
      }))
}

module.exports = ReactDOM => ({
    draggable: createDeclarative(function (stream, dispose) {
      draggble.call(this, ReactDOM, stream, dispose)
    })(),
    droppable: createDeclarative(function (stream, dispose) {
      droppable.call(this, ReactDOM, stream, dispose)
    })()
})
