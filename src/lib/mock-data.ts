
import type { UserProfile, Moment, ChatConversation, ChatMessage, ProfilePrompt, CrossedPathUser } from './types';

export const MOCK_USER_ID = 'user-123';

export const AVAILABLE_PROMPTS: ProfilePrompt[] = [
  { id: 'p1', question: 'About Me: Unusual Skills' },
  { id: 'p2', question: 'Typical Sunday' },
  { id: 'p3', question: 'A Random Fact I love is' },
  { id: 'p4', question: 'My Greatest Strength' },
  { id: 'p5', question: 'My Simple Pleasures' },
  { id: 'p6', question: 'I recently discovered that' },
  { id: 'p7', question: 'Dating me is like' },
  { id: 'p8', question: 'My most irrational fear' },
  { id: 'p9', question: 'This year, I really want to' },
  { id: 'p10', question: 'The Way to win me over is' },
  { id: 'p11', question: 'I go crazy for' },
  { id: 'p12', question: 'A life goal of mine' },
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Alex',
    age: 28,
    email: 'alex@example.com',
    bio: 'Loves hiking, coffee, and indie music. Always up for an adventure or a quiet night in with a good book.',
    images: [
      'https://placehold.co/600x800/E70F72/FFFFFF.png', // Primary Pink/White - portrait
      'https://placehold.co/800x600/262626/FAFAFA.png', // Secondary Dark/Light - landscape
      'https://placehold.co/700x700/A3A3A3/080808.png', // Muted/Background Dark - square
    ],
    vibeTags: ['adventurous', 'bookworm', 'coffee lover', 'calm'],
    locationPatterns: ['Downtown Cafe', 'Mountain Trails', 'City Park'],
    prompts: [
      { promptId: 'p1', answer: 'Pineapple belongs on pizza, fight me.' },
      { promptId: 'p2', answer: 'If animals could talk, which would be the rudest?' },
    ],
  },
  {
    id: 'user-2',
    name: 'Jamie',
    age: 25,
    email: 'jamie@example.com',
    bio: 'Artist, foodie, and travel enthusiast. Exploring new cultures and cuisines is my passion.',
    images: [
      'https://placehold.co/600x800/080808/E70F72.png', // Background Dark/Primary Pink - portrait
      'https://placehold.co/800x600/FAFAFA/262626.png', // Foreground Light/Secondary Dark - landscape
      'https://placehold.co/600x900/E70F72/0D0D0D.png', // Primary Pink/Popover Dark - tall portrait
    ],
    vibeTags: ['creative', 'foodie', 'globetrotter', 'energetic'],
    locationPatterns: ['Art Gallery', 'International Market', 'Airport Lounge'],
    prompts: [
      { promptId: 'p3', answer: 'Someone who appreciates art and isn\'t afraid to try new foods.' },
      { promptId: 'p5', answer: 'By making me laugh until my stomach hurts.' },
    ],
  },
  {
    id: 'user-3',
    name: 'Casey',
    age: 30,
    email: 'casey@example.com',
    bio: 'Tech geek, gamer, and animal lover. Fluent in sarcasm and Python.',
    images: [
      'https://placehold.co/600x800/E70F72/080808.png', // Primary Pink/Background Dark - portrait
      'https://placehold.co/700x700/101010/FAFAFA.png', // Card Dark/Light - square
      'https://placehold.co/800x500/222222/FFFFFF.png', // Border/White - wide landscape
    ],
    vibeTags: ['techy', 'gamer', 'animal lover', 'witty'],
    locationPatterns: ['Tech Hub', 'Local Park (dog walking)', 'Gaming Cafe'],
    prompts: [
      { promptId: 'p4', answer: 'I\'ve skydived. I own 5 cats. I hate chocolate. (Lie: I hate chocolate)' },
    ],
  },
  {
    id: MOCK_USER_ID, // Current user
    name: 'You',
    age: 27,
    email: 'you@example.com',
    bio: 'Seeking connections and new experiences. Let\'s see where our paths cross!',
    images: [
      'https://placehold.co/120x120/E70F72/FFFFFF.png?text=U', // Specific Avatar for "You"
      'https://placehold.co/600x800/101010/FAFAFA.png', // Card Dark/Light - portrait
      'https://placehold.co/800x600/080808/A3A3A3.png', // Background Dark/Muted - landscape
    ],
    vibeTags: ['explorer', 'optimist', 'curious', 'friendly'],
    locationPatterns: ['Local Coffee Shop', 'Bookstore', 'Community Garden'],
    prompts: [
      { promptId: 'p1', answer: 'Early bird gets the worm, but the second mouse gets the cheese.' },
      { promptId: 'p3', answer: 'Someone genuine, kind, and open-minded.' },
    ],
  },
];

export const MOCK_CROSSED_PATHS_USERS: CrossedPathUser[] = MOCK_USERS.filter(u => u.id !== MOCK_USER_ID).map((user, index) => ({
  ...user,
  crossedAt: new Date(Date.now() - (index + 1) * 3600000).toISOString(), // Crossed paths in the last few hours
  location: index % 2 === 0 ? 'Main Street Cafe' : 'City Park Fountain',
}));


export const MOCK_MOMENTS: Moment[] = [
  {
    id: 'moment-1',
    userId: MOCK_USER_ID,
    placeName: 'Montclair Art Museum',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    potentialMatchId: 'user-1',
    coordinates: { lat: 40.8137, lng: -74.2097 }, // Montclair, NJ
    placeImage: 'https://placehold.co/200x150/7F7F7F/FFFFFF.png?text=Art+Museum'
  },
  {
    id: 'moment-2',
    userId: MOCK_USER_ID,
    placeName: 'Van Vleck House & Gardens',
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    coordinates: { lat: 40.8155, lng: -74.2036 }, // Montclair, NJ
    placeImage: 'https://placehold.co/200x150/6A6A6A/FFFFFF.png?text=Gardens'
  },
  {
    id: 'moment-3',
    userId: MOCK_USER_ID,
    placeName: 'Watchung Booksellers',
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    potentialMatchId: 'user-2',
    coordinates: { lat: 40.8073, lng: -74.2036 }, // Watchung Plaza, Montclair, NJ
    placeImage: 'https://placehold.co/200x150/5C5C5C/FFFFFF.png?text=Booksellers'
  },
   {
    id: 'moment-4',
    userId: MOCK_USER_ID,
    placeName: 'Edgemont Memorial Park',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    coordinates: { lat: 40.8197, lng: -74.2052 }, // Montclair, NJ
    placeImage: 'https://placehold.co/200x150/8D8D8D/FFFFFF.png?text=Park'
  },
  {
    id: 'moment-5',
    userId: MOCK_USER_ID,
    placeName: 'The Clairidge Cinema',
    timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
    coordinates: { lat: 40.8150, lng: -74.2125 }, // Montclair, NJ
    placeImage: 'https://placehold.co/200x150/9B9B9B/FFFFFF.png?text=Cinema'
  },
  {
    id: 'moment-6', // Old moment, should not appear if filtered for last 7 days
    userId: MOCK_USER_ID,
    placeName: 'Outdated Cafe',
    timestamp: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    coordinates: { lat: 40.8000, lng: -74.1900 }, // Near Montclair
    placeImage: 'https://placehold.co/200x150/4A4A4A/FFFFFF.png?text=Old+Cafe'
  }
];

export const MOCK_CHAT_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'chat-1',
    participantIds: [MOCK_USER_ID, 'user-1'],
    participants: [
        MOCK_USERS.find(u => u.id === MOCK_USER_ID)!,
        MOCK_USERS.find(u => u.id === 'user-1')!
    ].map(p => ({id: p.id, name: p.name, images: p.images})),
    lastMessage: {
      text: 'Hey! Great to match with you.',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      senderId: 'user-1',
    },
  },
  {
    id: 'chat-2',
    participantIds: [MOCK_USER_ID, 'user-2'],
    participants: [
        MOCK_USERS.find(u => u.id === MOCK_USER_ID)!,
        MOCK_USERS.find(u => u.id === 'user-2')!
    ].map(p => ({id: p.id, name: p.name, images: p.images})),
    lastMessage: {
      text: 'Loved your profile prompts! :)',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      senderId: MOCK_USER_ID,
    },
  },
];

export const MOCK_CHAT_MESSAGES: { [chatId: string]: ChatMessage[] } = {
  'chat-1': [
    {
      id: 'msg-c1-1',
      chatId: 'chat-1',
      senderId: 'user-1',
      receiverId: MOCK_USER_ID,
      text: 'Hey! Great to match with you.',
      timestamp: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: 'msg-c1-2',
      chatId: 'chat-1',
      senderId: MOCK_USER_ID,
      receiverId: 'user-1',
      text: 'Hi Alex! Likewise. How\'s your day going?',
      timestamp: new Date(Date.now() - 240000).toISOString(),
    },
  ],
  'chat-2': [
    {
      id: 'msg-c2-1',
      chatId: 'chat-2',
      senderId: MOCK_USER_ID,
      receiverId: 'user-2',
      text: 'Loved your profile prompts! :)',
      timestamp: new Date(Date.now() - 600000).toISOString(),
    },
    {
      id: 'msg-c2-2',
      chatId: 'chat-2',
      senderId: 'user-2',
      receiverId: MOCK_USER_ID,
      text: 'Thanks! Yours too. That pineapple on pizza take is bold haha.',
      timestamp: new Date(Date.now() - 540000).toISOString(),
    },
     {
      id: 'msg-c2-3',
      chatId: 'chat-2',
      senderId: MOCK_USER_ID,
      receiverId: 'user-2',
      text: 'Haha, gotta stand by it! What kind of art do you do?',
      timestamp: new Date(Date.now() - 480000).toISOString(),
    },
  ],
};

export const getCurrentUser = (): UserProfile => {
  return MOCK_USERS.find(user => user.id === MOCK_USER_ID)!;
};

    