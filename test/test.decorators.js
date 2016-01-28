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
  const utils = {
    ReactDOM: {findDOMNode}
  }
  const observer = Rx.Observer.create(x => out.push(x))
  const Mock = draggable(utils, [observer])(mock())
  const m = new Mock()
  m.componentWillMount()
  m.componentDidMount()

  listeners[0].cb('event-1')
  t.same(out, [{event: 'event-1', component: m, type: 'DRAG_START'}])
})
