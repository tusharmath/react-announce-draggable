/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'
const ReactDOM = require('react-dom')
const create = require('./src/create')
const decorators = require('./src/decorators')

exports.consolidate = create
exports.draggable = decorators(ReactDOM)
exports.droppable = decorators(ReactDOM)
