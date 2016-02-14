/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

const ReactDOM = require('react-dom')
const e = exports
const createDeclarative = require('react-announce').createDeclarative
const dispatch = function (event, customEvent, el) {
    el.addEventListener(event, x => this.dispatch(customEvent, x))
}

e.ReactDOM = ReactDOM
e._findDomNode = (ReactDOM, stream) => stream
    .filter(x => x.event === 'DID_MOUNT')
    .map(() => ReactDOM.findDOMNode(this))

e.draggable = createDeclarative(function (stream, dispose, u) {
  dispose(e
    ._findDomNode(u.ReactDOM, stream)
    .subscribe(dispatch.bind(this, 'dragstart', 'DRAG_START'))
  )
})

e.droppable = createDeclarative(function (stream, dispose, u) {
  dispose(e
    ._findDomNode(u.ReactDOM, stream)
    .subscribe(el => {
      dispatch.call(this, 'dragover', 'DRAG_OVER', el)
      dispatch.call(this, 'drop', 'DROP', el)
    }))
})
