/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

const _ = require('lodash')
const createDeclarative = require('react-announce').createDeclarative

const dispatch = _.curry((observers, component, type, event) => observers
  .forEach(x => x.onNext({event, component, type})))

exports.draggable = createDeclarative(function (stream, dispose, u, observers) {
  dispose(
    stream
      .filter(x => x.event === 'DID_MOUNT')
      .map(() => u.ReactDOM.findDOMNode(this))
      .subscribe(el => el.addEventListener('dragstart', dispatch(observers, this, 'DRAG_START')))
  )
})

exports.droppable = createDeclarative(function (stream, dispose, ReactDOM, observers) {
  const _dispatch = dispatch(observers, this)
  dispose(
    stream.filter(x => x.event === 'DID_MOUNT')
      .map(() => u.ReactDOM.findDOMNode(this))
      .subscribe(el => {
        el.addEventListener('dragover', _dispatch('DRAG_OVER'))
        el.addEventListener('drop', _dispatch('DROP'))
      }))
})
