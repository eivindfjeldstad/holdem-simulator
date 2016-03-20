"use strict";

const assert = require('assert');
const monteCarlo = require('../');

describe('monteCarlo()', () => {
  it('should return a probability distribution', () => {
    const dist = monteCarlo(['as', 'ac'], ['ad', 'qd', 'ks'], 2, 1);
    assert(Array.isArray(dist));
    assert(dist.length == 3);
  });

  it('should work without cards on the table', () => {
    const dist = monteCarlo(['as', 'ac'], [], 2, 1);
    assert(Array.isArray(dist));
  });

  it('should work without cards on hand', () => {
    const dist = monteCarlo([], [], 2, 1);
    assert(Array.isArray(dist));
  });
})
