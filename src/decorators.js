/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

const createDeclarative = require('react-announce').createDeclarative

const dispatch = (observer, component, type, event) => observer
  .onNext({event, component, type})

exports.draggable = createDeclarative(function (stream, dispose, u) {
  dispose(
    stream
      .filter(x => x.event === 'DID_MOUNT')
      .map(() => u.ReactDOM.findDOMNode(this))
      .subscribe(el => el.addEventListener('dragstart', x => dispatch(u.observer, this, 'DRAG_START', x)))
  )
})

exports.droppable = createDeclarative(function (stream, dispose, u) {
  dispose(
    stream.filter(x => x.event === 'DID_MOUNT')
      .map(() => u.ReactDOM.findDOMNode(this))
      .subscribe(el => {
        el.addEventListener('dragover', x => dispatch(u.observer, this, 'DRAG_OVER', x))
        el.addEventListener('drop', x => dispatch(u.observer, this, 'DROP', x))
      }))
})
