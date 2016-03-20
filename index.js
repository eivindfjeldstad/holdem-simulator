"use strict";

const shuffle = require('array-shuffle');
const evaluator = require('poker-evaluator');
const cards = Object.keys(evaluator.CARDS);

const outcomes = {
  WIN: 0,
  LOSE: 1,
  SPLIT: 2
};

/**
 * Perform Monte Carlo simulation
 *
 * @param {Array} hand to evaluate
 * @param {Array} cards on the table
 * @param {Number} number of players
 * @param {Number} number of samples
 * @return {Array} est. probability distribution
 */

function monteCarlo (hand, table, players, samples) {
  const distribution = [0, 0, 0];

  players = players || 2;
  samples = samples || 10000;

  for (let i = 0; i < samples; i++) {
    let outcome = simulate(hand, table, players);
    distribution[outcome]++;
  }

  return distribution.map(n => n / samples);
}

/**
 * Simulate a random game and return outcome
 */

function simulate (hand, table, players) {
  const hands = [];
  let deck = shuffle(cards);

  hand = hand.slice();
  table = table.slice();

  // hand needs 2 cards
  while (hand.length < 2) {
    hand.push(deck.shift());
  }

  const full = table.concat(hand);
  deck = deck.filter(c => !~full.indexOf(c));

  // deal cards to players
  for (let i = 1; i < players; i++) {
    hands.push(deck.splice(0, 2));
  }

  // flop, turn, river
  while (table.length < 5) {
    const card = deck.shift();
    table.push(card);
    full.push(card);
  }

  // hand rank
  const my = evaluator.evalHand(full);

  for (let hand of hands) {
    const opponent = evaluator.evalHand(table.concat(hand));
    if (opponent.handType < my.handType) continue;
    if (opponent.handType > my.handType) return outcomes.LOSE;
    if (opponent.handRank > my.handRank) return outcomes.LOSE;
    if (opponent.handRank == my.handRank) return outcomes.SPLIT;
  }

  return outcomes.WIN;
}

module.exports = monteCarlo;
