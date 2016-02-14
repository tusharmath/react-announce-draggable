/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

import test from 'ava'
import create from '../src/create'
import { TestScheduler, ReactiveTest } from 'rx'
const {onNext} = ReactiveTest

test(t => {
  const out = []
  const sh = new TestScheduler()
  const ob = sh.createHotObservable(
    onNext(210, {event: 'DRAG_START', component: 'A'}),
    onNext(220, {event: 'DRAG_OVER', component: 'B'}),
    onNext(230, {event: 'DRAG_OVER', component: 'B'}),
    onNext(240, {event: 'DROP', component: 'B'})
  )
  create(ob).subscribe(x => out.push(x))

  sh.start()

  t.same(out, [
    {picked: {component: 'A'}, type: 'PICKED'},
    {over: {component: 'B'}, picked: {component: 'A'}, type: 'DRAG'},
    {over: {component: 'B'}, picked: {component: 'A'}, type: 'DRAG'},
    {over: {component: 'B'}, picked: {component: 'A'}, type: 'DROP'}
  ])
})
