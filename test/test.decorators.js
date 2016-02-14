/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'
import test from 'ava'
import decorators from '../src/decorators'
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
  const ReactDOM = {findDOMNode}
  const {draggable} = decorators(ReactDOM)
  const Mock = asStream(observer)(draggable(mock()))
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
  const ReactDOM = {findDOMNode}
  const {droppable} = decorators(ReactDOM)
  const Mock = asStream(observer)(droppable(mock()))
  const m = new Mock()
  m.componentWillMount()
  m.componentDidMount()

  listeners[0].cb('event-1')
  listeners[1].cb('event-2')
  t.same(out, [
    { component: m, event: 'WILL_MOUNT', args: [] },
    { component: m, event: 'DID_MOUNT', args: [] },
    { component: m, event: 'DRAG_OVER', args: [ 'event-1' ] },
    { component: m, event: 'DROP', args: [ 'event-2' ] }
  ])
})
