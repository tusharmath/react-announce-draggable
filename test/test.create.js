/**
 * Created by tushar.mathur on 28/01/16.
 */

'use strict'

import test from 'ava'
import create from '../src/create'

//DRAG_OVER
//DRAG_START
//DROP
test(t => {
  const dd = create()
  const out = []
  dd.getStream().subscribe(x => out.push(x))
  dd.observer.onNext({type: 'DRAG_START', component: 'A'})
  dd.observer.onNext({type: 'DRAG_OVER', component: 'B'})
  dd.observer.onNext({type: 'DRAG_OVER', component: 'B'})
  dd.observer.onNext({type: 'DROP', component: 'B'})
  t.same(out, [
    {picked: {component: 'A'}, type: 'PICKED'},
    {over: {component: 'B'}, picked: {component: 'A'}, type: 'DRAG'},
    {over: {component: 'B'}, picked: {component: 'A'}, type: 'DRAG'},
    {over: {component: 'B'}, picked: {component: 'A'}, type: 'DROP'}
  ])
})
