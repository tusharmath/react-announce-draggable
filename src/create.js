/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

const Rx = require('rx')
const filterEvent = (stream, ev) => stream.filter(x => x.event === ev)
const omit = (ob, keys) => {
  const out = {}
  Object
    .keys(ob)
    .filter(x => keys.indexOf(x) === -1)
    .forEach(x => out[x] = ob[x])
  return out
}
module.exports = source => {
  const dragOver = filterEvent(source, 'DRAG_OVER').map(x => omit(x, ['event']))
  const dragStart = filterEvent(source, 'DRAG_START').map(x => omit(x, ['event']))
  const drop = filterEvent(source, 'DROP').map(x => omit(x, ['event']))

  return Rx.Observable.merge(
    dragStart.map(picked => ({picked, type: 'PICKED'})),
    drop.withLatestFrom(dragStart, (over, picked) => ({over, picked, type: 'DROP'})),
    dragOver.withLatestFrom(dragStart, (over, picked) => ({over, picked, type: 'DRAG'}))
  )
}
