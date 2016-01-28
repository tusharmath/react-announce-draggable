/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

const _ = require('lodash')
const createDeclarative = require('react-announce').createDeclarative

const dispatch = _.curry((observer, component, type, event) => observer
  .onNext({event, component, type}))

exports.draggable = createDeclarative(function (stream, dispose, u) {
  dispose(
    stream
      .filter(x => x.event === 'DID_MOUNT')
      .map(() => u.ReactDOM.findDOMNode(this))
      .subscribe(el => el.addEventListener('dragstart', dispatch(u.observer, this, 'DRAG_START')))
  )
})

exports.droppable = createDeclarative(function (stream, dispose, u) {
  const _dispatch = dispatch(u.observer, this)
  dispose(
    stream.filter(x => x.event === 'DID_MOUNT')
      .map(() => u.ReactDOM.findDOMNode(this))
      .subscribe(el => {
        el.addEventListener('dragover', _dispatch('DRAG_OVER'))
        el.addEventListener('drop', _dispatch('DROP'))
      }))
})
