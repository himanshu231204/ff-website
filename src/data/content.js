const content = {
  meta: {
    siteName: 'Free Fire Clash Squad Tournament',
    description: 'Premium esports tournament dashboard with real-time leaderboards',
    keywords: 'free fire, esports, tournament, clash squad, gaming',
    author: 'Tournament Admin',
    year: '2026',
  },

  navbar: {
    logo: 'FF Clash',
    links: [
      { name: 'Home', path: '/' },
      { name: 'Players', path: '/players' },
      { name: 'Schedule', path: '/schedule' },
      { name: 'Leaderboard', path: '/leaderboard' },
      { name: 'Knockout', path: '/knockout' },
      { name: 'Weapons', path: '/weapons' },
      { name: 'Banned', path: '/banned' },
      { name: 'Rules', path: '/rules' },
    ],
    mobileMenu: 'Menu',
  },

  home: {
    badge: {
      text: 'Live Tournament',
      icon: 'flame',
    },
    title: 'Free Fire',
    subtitle: 'Clash Squad',
    description: 'Premium esports tournament dashboard with real-time leaderboards',
    buttons: {
      viewPlayers: 'View Players',
      leaderboard: 'Leaderboard',
    },
    stats: {
      players: 'Total Players',
      groups: 'Groups',
      matches: 'Matches',
      rounds: 'Rounds',
    },
    sections: {
      groupA: 'Group A',
      groupB: 'Group B',
      topPlayers: 'Top Players',
      quickLinks: 'Quick Links',
    },
    playerInfo: {
      level: 'Lv.',
      score: 'Score',
    },
    quickLinks: {
      schedule: 'View Schedule',
      weapons: 'Allowed Weapons',
      banned: 'Banned Characters',
    },
  },

  players: {
    title: 'Players',
    description: 'All registered players in the tournament',
    filter: {
      label: 'Filter',
      all: 'All Groups',
      groupA: 'Group A',
      groupB: 'Group B',
    },
    player: {
      level: 'Level',
      group: 'Group',
      matches: 'M',
      wins: 'W',
      losses: 'L',
    },
    emptyMessage: 'No players found in this group',
  },

  schedule: {
    title: 'Match Schedule',
    description: 'Complete tournament schedule with group matches and knockout rounds',
    badge: 'Tournament Live',
    groups: {
      a: 'Group A',
      b: 'Group B',
    },
    format: {
      title: 'Tournament Format',
      groupStage: {
        title: 'Group Stage',
        description: 'Round Robin format',
      },
      semiFinals: {
        title: 'Semi Finals',
        description: 'Top 4 from each group',
      },
      grandFinal: {
        title: 'Grand Final',
        description: 'Group Winners',
      },
    },
    match: {
      completed: 'Completed',
      round: 'Round',
    },
  },

  leaderboard: {
    title: 'Leaderboard',
    subtitle: 'board',
    description: 'Real-time tournament standings and player rankings',
    filter: {
      label: 'Filter',
      all: 'All Groups',
      groupA: 'Group A',
      groupB: 'Group B',
    },
    scoring: {
      title: 'Scoring System',
      win: 'Win',
      winPoints: '+2 Points',
      nkr: 'NKR',
      nkrDescription: 'Score Difference / Matches',
      sort: 'Sort',
      sortDescription: 'Points DESC, then NKR DESC',
    },
    table: {
      rank: 'Rank',
      player: 'Player',
      matches: 'Matches',
      wins: 'Wins',
      losses: 'Losses',
      points: 'Points',
      nkr: 'NKR',
    },
    groups: {
      a: 'Group A',
      b: 'Group B',
    },
    podium: {
      first: '1st',
      second: '2nd',
      third: '3rd',
    },
  },

  knockout: {
    title: 'Knockout Stage',
    description: 'Semi Finals → Grand Final',
    groups: {
      a: {
        title: 'Top 4 - Group A',
        qualifiers: ['1st', '2nd', '3rd', '4th'],
      },
      b: {
        title: 'Top 4 - Group B',
        qualifiers: ['1st', '2nd', '3rd', '4th'],
      },
    },
    bracket: {
      title: 'Knockout Bracket',
      semiFinals: 'Semi Finals',
      grandFinal: 'Grand Final',
    },
    grandFinal: {
      title: 'Grand Final',
      subtitle: 'Group A Winner vs Group B Winner',
      winner: 'Tournament Champion',
      winnerFrom: 'SF Winner',
    },
    match: {
      completed: 'Completed',
      scheduled: 'Scheduled',
      tbd: 'TBD',
      winner: 'Winner',
    },
  },

  weapons: {
    title: 'Allowed Weapons',
    description: 'Weapons permitted in tournament matches',
    categories: {
      assaultRifle: 'Assault Rifle',
      smg: 'SMG',
      sniper: 'Sniper',
      shotgun: 'Shotgun',
      lmg: 'LMG',
      pistol: 'Pistol',
      melee: 'Melee',
      throwing: 'Throwing',
    },
    search: {
      placeholder: 'Search weapons...',
      label: 'Search',
    },
    filter: {
      label: 'Filter',
      all: 'All Categories',
    },
    emptyMessage: 'No weapons found',
  },

  banned: {
    title: 'Banned Characters',
    subtitle: 'Characters',
    description: 'Characters restricted from tournament play',
    section: {
      title: 'Restricted Characters',
      total: 'characters banned',
    },
    warning: 'Using banned characters will result in immediate disqualification.',
    types: {
      active: 'Active Banned',
      passive: 'Passive Banned',
    },
    labels: {
      active: 'Active',
      passive: 'Passive',
    },
  },

  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    back: 'Back',
    view: 'View',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    remove: 'Remove',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    clear: 'Clear',
    apply: 'Apply',
    reset: 'Reset',
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
  },

  footer: {
    text: 'Free Fire Clash Squad Tournament',
    year: '2026',
    rights: 'All rights reserved',
  },

  rules: {
    title: 'Rules & Regulations',
    description: 'Official tournament rules and guidelines',
    sections: {
      general: {
        title: 'General Rules',
        icon: 'clipboard',
        rules: [
          'All matches will be played in Clash Squad Custom Room',
          'Players must join the room on time',
          'Late entry may result in disqualification',
          'All players must respect other players and admins',
          'No abusive language or harassment allowed',
        ],
      },
      matchRules: {
        title: 'Match Rules',
        icon: 'gamepad',
        rules: [
          'Mode: Clash Squad (Custom Room)',
          'Number of rounds as per match schedule',
          'Players must follow the match timing strictly',
          'No rematch allowed unless technical issue occurs',
        ],
      },
      scoring: {
        title: 'Scoring System',
        icon: 'trophy',
        rules: [
          'Win = 2 Points',
          'Loss = 0 Points',
          'Per match score difference: winner gets +diff, loser gets -diff',
          'Example: 8-7 -> +1 / -1, 8-5 -> +3 / -3, 8-3 -> +5 / -5',
          'Net Kill Rate (NKR) uses score difference per match',
          'NKR = Total Score Difference / Matches Played',
          'Sorting: Points DESC, then NKR DESC',
        ],
        note: 'Ranking priority: Points first, then NKR. Higher margin wins improve NKR.',
      },
      qualification: {
        title: 'Qualification Rules',
        icon: 'medal',
        rules: [
          'Top players from each group qualify for knockout stage',
          'In Semi-Finals: Rank 1 plays vs Rank 4',
          'In Semi-Finals: Rank 2 plays vs Rank 3',
          'Winners from Semi-Finals advance to Grand Final',
        ],
      },
      weapons: {
        title: 'Allowed Weapons',
        icon: 'crosshair',
        rules: [
          "Only weapons listed in 'Allowed Weapons' section can be used",
          'Using any weapon not in the allowed list will result in penalty',
          'Repeated violations may lead to disqualification',
        ],
      },
      characters: {
        title: 'Banned Characters',
        icon: 'userX',
        rules: [
          "Players cannot use characters listed in 'Banned Characters' section",
          'Using a banned character results in automatic match loss',
          'Multiple violations may lead to tournament disqualification',
        ],
      },
      fairPlay: {
        title: 'Fair Play Rules',
        icon: 'shield',
        rules: [
          'No hacking or cheating allowed',
          'No teaming with opponents',
          'No exploiting game bugs',
          'All players must play fairly',
        ],
      },
      disqualification: {
        title: 'Disqualification Rules',
        icon: 'ban',
        rules: [
          'Breaking any tournament rules',
          'Not joining scheduled matches on time',
          'Using banned weapons or characters',
          'Any kind of misconduct or abuse',
        ],
      },
      adminDecision: {
        title: 'Admin Decision',
        icon: 'gavel',
        rules: [
          'Admin decision will be final',
          'No arguments will be entertained',
          'Report issues to admins only',
        ],
      },
    },
  },
};

export default content;