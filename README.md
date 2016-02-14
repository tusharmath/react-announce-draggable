# Reactive Announce Draggable
[![Build Status][travis-ci-icon]][travis-ci]
[![npm][npm-icon]][npm]

## Installation

```
npm i react-announce-draggable --save
```

## Example Usage

Auto fires three types of custom events — `DRAG_START`, `DRAG_OVER` and `DROP`, on the component stream.

```javascript


import {draggable, droppable, consolidate}  from 'react-announce-draggable'
import {asStream} from 'react-announce'
import rx from 'rx'

const observer = new rx.Subject()

@draggable
@asStream(observer)
class Apple extends Component {
  render () {
    return (
      <div draggable="true">
        APPLE
      <div>
    )
  }
}

@droppable
@asStream(observer)
class Basket extends Component {
  render () {
    return (
      <div>
        Fruit Basket
      <div>
    )
  }
}

consolidate(observer).subscribe(x => console.log(x))

/** OUTPUT:
{picked: {component: Apple}, type: 'PICKED'},
{over: {component: Basket}, picked: {component: Apple}, type: 'DRAG'},
{over: {component: Basket}, picked: {component: Apple}, type: 'DRAG'},
{over: {component: Basket}, picked: {component: Apple}, type: 'DROP'}
**/


```

[travis-ci-icon]: https://travis-ci.org/tusharmath/react-announce-draggable.svg?branch=master
[travis-ci]: https://travis-ci.org/tusharmath/react-announce-draggable
[npm-icon]: https://img.shields.io/npm/v/react-announce-draggable.svg
[npm]: https://www.npmjs.com/package/react-announce-draggable
