/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'
import test from 'ava'
import {draggable, droppable} from '../src/decorators'
import Rx from 'rx'
const mock = () => class MOCK {

}
test('draggable', t => {
  const out = []
  const listeners = []
  const addEventListener = (ev, cb) => listeners.push({ev, cb})
  const findDOMNode = x => ({addEventListener})
  const observer = Rx.Observer.create(x => out.push(x))
  const utils = {
    observer,
    ReactDOM: {findDOMNode}
  }
  const Mock = draggable(utils, mock())
  const m = new Mock()
  m.componentWillMount()
  m.componentDidMount()

  listeners[0].cb('event-1')
  t.same(out, [{event: 'event-1', component: m, type: 'DRAG_START'}])
})

test('droppable', t => {
  const out = []
  const listeners = []
  const addEventListener = (ev, cb) => listeners.push({ev, cb})
  const findDOMNode = x => ({addEventListener})
  const observer = Rx.Observer.create(x => out.push(x))
  const utils = {observer, ReactDOM: {findDOMNode}}
  const Mock = droppable(utils, mock())
  const m = new Mock()
  m.componentWillMount()
  m.componentDidMount()

  listeners[0].cb('event-1')
  listeners[1].cb('event-2')
  t.same(out, [
    {event: 'event-1', component: m, type: 'DRAG_OVER'},
    {event: 'event-2', component: m, type: 'DROP'}
  ])
})
