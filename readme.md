# holdem-simulator
Using Monte Carlo simulation to approximate the probability distribution for the outcome of a Texas hold'em game.

[![npm version](http://img.shields.io/npm/v/holdem-simulator.svg?style=flat)](https://npmjs.org/package/holdem-simulator)
[![Build Status](http://img.shields.io/travis/eivindfjeldstad/holdem-simulator.svg?style=flat)](https://travis-ci.org/eivindfjeldstad/holdem-simulator)

## Install
    $ npm install holdem-simulator

## Usage
The function accepts two arrays - the cards on hand and the cards on the table (if any). You can also specify the number of players (2 by default) and the sample size (10000 by default).

```js
const hand = ['as', 'ac'];
const table = ['ad', '2d', '7s'];
const players = 2;

simulate(hand, table, players);
//=> [0.9544, 0.0456, 0]
```

The returned array represents the estimated probability distribution. The elements are the probabilities of winning the pot, losing the pot and splitting the pot, respectively.

## License
MIT
