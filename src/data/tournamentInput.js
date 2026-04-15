// ============================================================
// ONLY EDIT THIS FILE
// ============================================================
// Fill winner/kills and schedule status controls here.
// This file is the single source for tournament input data.

import { tr } from "framer-motion/client";

export const playersInput = [
  { id: 1, name: 'Priyanshu', level: 75, group: 'A', matches: 4, wins: 3, kills: 14 },
  { id: 2, name: 'Sunny', level: 70, group: 'A', matches: 4, wins: 2, kills: 12 },
  { id: 3, name: 'Rajdeepak', level: 66, group: 'A', matches: 4, wins: 2, kills: 10 },
  { id: 4, name: 'Suman', level: 62, group: 'A', matches: 4, wins: 1, kills: 8 },
  { id: 5, name: 'Himanshu', level: 57, group: 'A', matches: 4, wins: 4, kills: 30 },
  { id: 6, name: 'Devratan', level: 72, group: 'B', matches: 4, wins: 3, kills: 15 },
  { id: 7, name: 'Shubham', level: 69, group: 'B', matches: 4, wins: 3, kills: 13 },
  { id: 8, name: 'Dev', level: 64, group: 'B', matches: 4, wins: 2, kills: 11 },
  { id: 9, name: 'Rajnish', level: 61, group: 'B', matches: 4, wins: 1, kills: 9 },
  { id: 10, name: 'Chandan', level: 49, group: 'B', matches: 4, wins: 1, kills: 7 },
];

export const weaponsInput = [
  { id: 'w1', name: 'AWM-Y' },
  { id: 'w2', name: 'Kar98K' },
  { id: 'w3', name: 'Woodpecker' },
  { id: 'w4', name: 'AC80' },
  { id: 'w5', name: 'Groza (Normal)' },
  { id: 'w6', name: 'SVD' },
  { id: 'w7', name: 'XM8' },
  { id: 'w8', name: 'MP40' },
  { id: 'w9', name: 'Thompson (Normal)' },
  { id: 'w10', name: 'Bizon' },
  { id: 'w11', name: 'UMP' },
  { id: 'w12', name: 'MP5' },
  { id: 'w13', name: 'M1887' },
  { id: 'w14', name: 'Desert Eagle' },
];

export const bannedCharactersInput = {
  active: [
    { id: 'a1', name: 'Ray' },
    { id: 'a2', name: 'Nero' },
    { id: 'a3', name: 'Morse' },
    { id: 'a4', name: 'Oscar' },
    { id: 'a5', name: 'Kassie' },
    { id: 'a6', name: 'Ryden' },
    { id: 'a7', name: 'Ignis' },
    { id: 'a8', name: 'Iris' },
    { id: 'a9', name: 'Dimitri' },
    { id: 'a10', name: 'Skyler' },
    { id: 'a11', name: 'A124' },
  ],
  passive: [{ id: 'p1', name: 'Sonia' }],
};

export const settingsInput = {
  pointsPerWin: 2,
  nkrPrecision: 2,
  totalMatches: 20,
  groupSize: 5,
};

export const groupAMatchesInput = [
  { id: 1, round: 1, player1: 'Priyanshu', player2: 'Sunny', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 2, round: 1, player1: 'Rajdeepak', player2: 'Suman', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 3, round: 2, player1: 'Himanshu', player2: 'Priyanshu', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 4, round: 2, player1: 'Sunny', player2: 'Rajdeepak', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 5, round: 3, player1: 'Suman', player2: 'Himanshu', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 6, round: 3, player1: 'Priyanshu', player2: 'Rajdeepak', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 7, round: 4, player1: 'Sunny', player2: 'Suman', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 8, round: 4, player1: 'Himanshu', player2: 'Rajdeepak', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 9, round: 5, player1: 'Priyanshu', player2: 'Suman', winner: null, stage: 'group', group: 'A', kills: {} },
  { id: 10, round: 5, player1: 'Sunny', player2: 'Himanshu', winner: null, stage: 'group', group: 'A', kills: {} },
];

export const groupBMatchesInput = [
  { id: 11, round: 1, player1: 'Devratan', player2: 'Shubham', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 12, round: 1, player1: 'Dev', player2: 'Rajnish', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 13, round: 2, player1: 'Chandan', player2: 'Devratan', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 14, round: 2, player1: 'Shubham', player2: 'Dev', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 15, round: 3, player1: 'Rajnish', player2: 'Chandan', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 16, round: 3, player1: 'Devratan', player2: 'Dev', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 17, round: 4, player1: 'Shubham', player2: 'Rajnish', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 18, round: 4, player1: 'Chandan', player2: 'Dev', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 19, round: 5, player1: 'Devratan', player2: 'Rajnish', winner: null, stage: 'group', group: 'B', kills: {} },
  { id: 20, round: 5, player1: 'Shubham', player2: 'Chandan', winner: null, stage: 'group', group: 'B', kills: {} },
];

export const knockoutMatchesInput = {
  semiFinals: [
    { id: 'SF1', player1: null, player2: null, winner: null, stage: 'semi', kills: {} },
    { id: 'SF2', player1: null, player2: null, winner: null, stage: 'semi', kills: {} },
  ],
  final: {
    id: 'GF1',
    player1: null,
    player2: null,
    winner: null,
    stage: 'final',
    kills: {}
  },
};

export const matchResultsInput = {
  groupA: [
    { id: 1, winner: 'Sunny', kills: { Priyanshu: 2, Sunny: 8 } },
    { id: 2, winner: 'Rajdeepak', kills: { Rajdeepak: 8, Suman: 0 } },
    { id: 3, winner: null, kills: { Himanshu: 0, Priyanshu: 0 } },
    { id: 4, winner: null, kills: { Sunny: 0, Rajdeepak: 0 } },
    { id: 5, winner: 'Himanshu', kills: { Suman: 0, Himanshu: 8 } },
    { id: 6, winner: null, kills: { Priyanshu: 0, Rajdeepak: 0 } },
    { id: 7, winner: 'Sunny', kills: { Sunny: 8, Suman: 0 } },
    { id: 8, winner: null, kills: { Himanshu: 0, Rajdeepak: 0 } },
    { id: 9, winner: 'Priyanshu', kills: { Priyanshu: 8, Suman: 0 } },
    { id: 10, winner: null, kills: { Sunny: 0, Himanshu: 0 } },
  ],
  groupB: [
    { id: 1, winner: null, kills: { Devratan: 0, Shubham: 0 } },
    { id: 2, winner: null, kills: { Dev: 0, Rajnish: 0 } },
    { id: 3, winner: 'Chandan', kills: { Chandan: 7, Devratan: 8 } },
    { id: 4, winner: null, kills: { Shubham: 0, Dev: 0 } },
    { id: 5, winner: null, kills: { Rajnish: 0, Chandan: 0 } },
    { id: 6, winner: null, kills: { Devratan: 0, Dev: 0 } },
    { id: 7, winner: 'Rajnish', kills: { Shubham: 1, Rajnish: 8 } },
    { id: 8, winner: null, kills: { Chandan: 0, Dev: 0 } },
    { id: 9, winner: null, kills: { Devratan: 0, Rajnish: 0 } },
    { id: 10, winner: null, kills: { Shubham: 0, Chandan: 0 } },
  ],
};

// Schedule badge control in UI:
// true => Match Played
// false/null => Pending
export const scheduleStatusInput = {
  groupA: [
    { id: 1, allowStart: true },
    { id: 2, allowStart: true },
    { id: 3, allowStart: null },
    { id: 4, allowStart: null },
    { id: 5, allowStart: true },
    { id: 6, allowStart: null },
    { id: 7, allowStart: true},
    { id: 8, allowStart: null },
    { id: 9, allowStart: true },
    { id: 10, allowStart: null },
  ],
  groupB: [
    { id: 1, allowStart: null },
    { id: 2, allowStart: null },
    { id: 3, allowStart: true },
    { id: 4, allowStart: null },
    { id: 5, allowStart: null },
    { id: 6, allowStart: null },
    { id: 7, allowStart: true },
    { id: 8, allowStart: null },
    { id: 9, allowStart: null },
    { id: 10, allowStart: null },
  ],
};
