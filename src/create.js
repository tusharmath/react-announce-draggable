/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

const Rx = require('rx')
module.exports = () => {
  const observer = new Rx.Subject()
  const omitType = x => {
    const y = Object.assign({}, x)
    delete y.type
    return y
  }
  const dragOver = observer.filter(x => x.type === 'DRAG_OVER').map(omitType)
  const dragStart = observer.filter(x => x.type === 'DRAG_START').map(omitType)
  const drop = observer.filter(x => x.type === 'DROP').map(omitType)

  const stream = Rx.Observable.merge(
    dragStart.map(picked => ({picked, type: 'PICKED'})),
    drop.withLatestFrom(dragStart, (over, picked) => ({over, picked, type: 'DROP'})),
    dragOver.withLatestFrom(dragStart, (over, picked) => ({over, picked, type: 'DRAG'}))
  )

  return {observer, getStream: () => stream}
}
