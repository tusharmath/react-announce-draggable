/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

const ReactDOM = require('react-dom')
const e = exports
const createDeclarative = require('react-announce').createDeclarative
const dispatch = (observer, component, type, event) => observer
    .onNext({event, component, type})

e.ReactDOM = ReactDOM
e._findDomNode = (ReactDOM, stream) => stream
    .filter(x => x.event === 'DID_MOUNT')
    .map(() => ReactDOM.findDOMNode(this))

e.draggable = createDeclarative(function (stream, dispose, u) {
  dispose(e
    ._findDomNode(u.ReactDOM, stream)
    .subscribe(el => el.addEventListener('dragstart', x => this.dispatch('DRAG_START', x)))
  )
})

e.droppable = createDeclarative(function (stream, dispose, u) {
  dispose(e
    ._findDomNode(u.ReactDOM, stream)
    .subscribe(el => {
      el.addEventListener('dragover', x => dispatch(u.observer, this, 'DRAG_OVER', x))
      el.addEventListener('drop', x => dispatch(u.observer, this, 'DROP', x))
    }))
})
