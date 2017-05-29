# Reactive Announce Draggable

[![Greenkeeper badge](https://badges.greenkeeper.io/tusharmath/react-announce-draggable.svg)](https://greenkeeper.io/)
[![Build Status][travis-ci-icon]][travis-ci]
[![npm][npm-icon]][npm]

A simple [react-announce][react-announce] extension that helps in consolidating the drag and drop events.

## Installation

```
npm i react-announce-draggable --save
```

## Example Usage

Auto fires three types of custom events — `DRAG_START`, `DRAG_OVER` and `DROP`, on the [component stream][component-stream].

```javascript
import {draggable, droppable, consolidate}  from 'react-announce-draggable'
import {asStream} from 'react-announce'
import rx from 'rx'

const bus = new rx.Subject()

@draggable
@asStream(bus)
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
@asStream(bus)
class Basket extends Component {
  render () {
    return (
      <div>
        Fruit Basket
      <div>
    )
  }
}

consolidate(bus).subscribe(x => console.log(x))

/** OUTPUT:
{picked: {component: Apple}, type: 'PICKED'}
{over: {component: Basket}, picked: {component: Apple}, type: 'DRAG'}
{over: {component: Basket}, picked: {component: Apple}, type: 'DRAG'}
{over: {component: Basket}, picked: {component: Apple}, type: 'DROP'}
**/
```

## API
- **@draggable** —  Dispatches `DRAG_START` event on the component's stream.
- **@droppable** —  Dispatches `DRAG_OVER` and `DROP` event on the component's stream.
- **consolidate(observer)** — Takes input as the observer and returns a consolidated stream which contains information about what has been picked and where it has been dropped.


[travis-ci-icon]: https://travis-ci.org/tusharmath/react-announce-draggable.svg?branch=master
[travis-ci]: https://travis-ci.org/tusharmath/react-announce-draggable
[npm-icon]: https://img.shields.io/npm/v/react-announce-draggable.svg
[npm]: https://www.npmjs.com/package/react-announce-draggable
[react-announce]: https://github.com/tusharmath/react-announce
[component-stream]: https://github.com/tusharmath/react-announce#api
