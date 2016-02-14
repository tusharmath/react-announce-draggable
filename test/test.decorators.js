/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'
import test from 'ava'
import { draggable, droppable } from '../src/decorators'
import { asStream } from 'react-announce'
import Rx from 'rx'
const mock = () => class MOCK {

}
test('draggable', t => {
  const out = []
  const listeners = []
  const addEventListener = (ev, cb) => listeners.push({ev, cb})
  const findDOMNode = x => ({addEventListener})
  const observer = Rx.Observer.create(x => out.push(x))
  const utils = {ReactDOM: {findDOMNode}}
  const Mock = asStream(observer)(draggable(utils, mock()))
  const m = new Mock()
  m.componentWillMount()
  m.componentDidMount()
  listeners[0].cb('event-1')
  t.same(out, [
    {event: 'WILL_MOUNT', component: m, args: []},
    {event: 'DID_MOUNT', component: m, args: []},
    {event: 'DRAG_START', component: m, args: ['event-1']}
  ])
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
