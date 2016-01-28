# Reactive Announce Draggable 
[![Build Status](https://travis-ci.org/tusharmath/react-announce-draggable.svg?branch=master)](https://travis-ci.org/tusharmath/react-announce-draggable)
[![npm](https://img.shields.io/npm/v/react-announce-draggable.svg)](https://www.npmjs.com/package/react-announce-draggable)

## Installation

```
npm i react-announce-draggable --save
```

## Example Usage

```javascript

const {draggable, droppable, stream} = require('react-announce-draggable')

@draggable
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
class Basket extends Component {
  render () {
    return (
      <div>
        Fruit Basket
      <div>
    )
  }
}


```
