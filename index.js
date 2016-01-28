/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'
const ReactDOM = require('react-dom')
const create = require('./src/create')
const decorators = require('./src/decorators')

module.exports = () => {
  const actionBus = create()
  const observer = actionBus.observer
  return {
    draggable: decorators.draggable({ReactDOM, observer}),
    droppable: decorators.droppable({ReactDOM, observer}),
    stream: actionBus.getStream()
  }
}
module.exports.create = create
module.exports.decorators = decorators
