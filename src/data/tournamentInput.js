// ============================================================
// ONLY EDIT THIS FILE
// ============================================================
// Fill winner/kills and schedule status controls here.
// This file is the single source for match result data input.

export const matchResultsInput = {
  groupA: [
    { id: 1, winner: null, kills: { Priyanshu: 0, Sunny: 0 } },
    { id: 2, winner: null, kills: { Rajdeepak: 0, Suman: 0 } },
    { id: 3, winner: null, kills: { Himanshu: 0, Priyanshu: 0 } },
    { id: 4, winner: null, kills: { Sunny: 0, Rajdeepak: 0 } },
    { id: 5, winner: null, kills: { Suman: 0, Himanshu: 0 } },
    { id: 6, winner: null, kills: { Priyanshu: 0, Rajdeepak: 0 } },
    { id: 7, winner: null, kills: { Sunny: 0, Suman: 0 } },
    { id: 8, winner: null, kills: { Himanshu: 0, Rajdeepak: 0 } },
    { id: 9, winner: null, kills: { Priyanshu: 0, Suman: 0 } },
    { id: 10, winner: null, kills: { Sunny: 0, Himanshu: 0 } },
  ],
  groupB: [
    { id: 1, winner: null, kills: { Devratan: 0, Shubham: 0 } },
    { id: 2, winner: null, kills: { Dev: 0, Rajnish: 0 } },
    { id: 3, winner: 'Chandan', kills: { Chandan: 7, Devratan: 8 } },
    { id: 4, winner: null, kills: { Shubham: 0, Dev: 0 } },
    { id: 5, winner: null, kills: { Rajnish: 0, Chandan: 0 } },
    { id: 6, winner: null, kills: { Devratan: 0, Dev: 0 } },
    { id: 7, winner: null, kills: { Shubham: 0, Rajnish: 0 } },
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
    { id: 1, allowStart: null },
    { id: 2, allowStart: null },
    { id: 3, allowStart: null },
    { id: 4, allowStart: null },
    { id: 5, allowStart: null },
    { id: 6, allowStart: null },
    { id: 7, allowStart: null },
    { id: 8, allowStart: null },
    { id: 9, allowStart: null },
    { id: 10, allowStart: null },
  ],
  groupB: [
    { id: 1, allowStart: null },
    { id: 2, allowStart: null },
    { id: 3, allowStart: true },
    { id: 4, allowStart: null },
    { id: 5, allowStart: null },
    { id: 6, allowStart: null },
    { id: 7, allowStart: null },
    { id: 8, allowStart: null },
    { id: 9, allowStart: null },
    { id: 10, allowStart: null },
  ],
};
