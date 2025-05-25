
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
      'https://placehold.co/600x800/E70F72/080808.png',
      'https://placehold.co/800x600/262626/FAFAFA.png',
      'https://placehold.co/700x700/A3A3A3/080808.png',
    ],
    vibeTags: ['adventurous', 'bookworm', 'coffee lover', 'calm', 'indie music enthusiast', 'mountain hiker', 'thoughtful conversations'],
    locationPatterns: ['Downtown Cafe', 'Mountain Trails', 'City Park', 'Indie Bookstores', 'Record Shops'],
    prompts: [
      { promptId: 'p1', answer: 'Pineapple belongs on pizza, fight me.' },
      { promptId: 'p2', answer: 'If animals could talk, which would be the rudest?' },
    ],
    work: 'Graphic Designer',
    jobTitle: 'Senior Designer',
    education: 'State University - BFA Design',
    ethnicity: 'White/Caucasian',
    childrenStatus: "Don't have children",
    familyPlans: "Not Sure",
    height: "5'11\"",
    locationAddress: "123 Main St, Anytown, USA",
    locationName: "Anytown",
    locationCoordinates: { lat: 40.7128, lng: -74.0060 },
    drinking: "Sometimes",
    smoking: "No",
    zodiacSign: "Aries",
  },
  {
    id: 'user-2',
    name: 'Jamie',
    age: 25,
    email: 'jamie@example.com',
    bio: 'Artist, foodie, and travel enthusiast. Exploring new cultures and cuisines is my passion.',
    images: [
      'https://placehold.co/600x800/080808/E70F72.png',
      'https://placehold.co/800x600/FAFAFA/262626.png',
      'https://placehold.co/600x900/E70F72/0D0D0D.png',
    ],
    vibeTags: ['creative', 'foodie', 'globetrotter', 'energetic', 'gallery hopper', 'street art admirer', 'spice fanatic'],
    locationPatterns: ['Art Gallery', 'International Food Market', 'Airport Lounge', 'Hidden Gem Eateries', 'Photography Walks'],
    prompts: [
      { promptId: 'p3', answer: 'Someone who appreciates art and isn\'t afraid to try new foods.' },
      { promptId: 'p5', answer: 'By making me laugh until my stomach hurts.' },
    ],
    work: 'Freelance Photographer',
    jobTitle: 'Photographer',
    education: 'Art Institute - Photography',
    ethnicity: 'Hispanic/Latino',
    childrenStatus: "Have Children",
    familyPlans: "Want children",
    height: "5'7\"",
    locationAddress: "456 Art Ave, Creative City, USA",
    locationName: "Creative City",
    locationCoordinates: { lat: 34.0522, lng: -118.2437 },
    drinking: "Yes",
    smoking: "Sometimes",
    zodiacSign: "Gemini",
  },
  {
    id: 'user-3',
    name: 'Casey',
    age: 30,
    email: 'casey@example.com',
    bio: 'Tech geek, gamer, and animal lover. Fluent in sarcasm and Python.',
    images: [
      'https://placehold.co/600x800.png',
      'https://placehold.co/700x700/101010/FAFAFA.png',
      'https://placehold.co/800x500/222222/FFFFFF.png',
    ],
    vibeTags: ['techy', 'gamer', 'animal lover', 'witty', 'board game strategist', 'puzzle solver', 'pet cafe visitor'],
    locationPatterns: ['Tech Hub', 'Dog Park', 'Retro Arcade', 'Escape Rooms', 'Hardware Stores'],
    prompts: [
      { promptId: 'p4', answer: 'I\'ve skydived. I own 5 cats. I hate chocolate. (Lie: I hate chocolate)' },
    ],
    work: 'Software Engineer',
    jobTitle: 'Lead Developer',
    education: 'Tech University - BS Computer Science',
    ethnicity: 'East Asian',
    childrenStatus: "Prefer Not to Say",
    familyPlans: "Don't want children",
    height: "6'1\"",
    locationAddress: "789 Tech Rd, Silicon Valley, USA",
    locationName: "Silicon Valley",
    locationCoordinates: { lat: 37.3875, lng: -122.0575 },
    drinking: "No",
    smoking: "Prefer Not to Say",
    zodiacSign: "Scorpio",
  },
  {
    id: MOCK_USER_ID, // Current user
    name: 'Dev User',
    age: 27,
    email: 'dev@example.com',
    bio: 'Seeking connections and new experiences. Love exploring local cafes and parks. My vibe tags are usually "explorer", "optimist", "curious", and "friendly". Let\'s see where our paths cross!',
    images: [
      'https://placehold.co/120x120/E70F72/FFFFFF.png?text=D', // Updated to 'D' for Dev User
      'https://placehold.co/600x800.png',
      'https://placehold.co/800x600.png',
    ],
    vibeTags: ['explorer', 'optimist', 'curious', 'friendly', 'coffee enthusiast', 'park lover'],
    locationPatterns: ['Local Coffee Shop', 'Bookstore', 'Community Garden', 'Farmers Market', 'Museums'],
    prompts: [
      { promptId: 'p1', answer: 'Early bird gets the worm, but the second mouse gets the cheese.' },
      { promptId: 'p3', answer: 'Someone genuine, kind, and open-minded.' },
    ],
    work: 'App Prototyper Inc.',
    jobTitle: 'AI Assistant',
    education: 'Firebase Studio University',
    ethnicity: 'Prefer Not to Say',
    childrenStatus: 'Prefer Not to Say',
    familyPlans: 'Prefer Not to Say',
    height: 'Prefer Not to Say',
    drinking: 'Prefer Not to Say',
    smoking: 'Prefer Not to Say',
    zodiacSign: 'Prefer Not to Say',
    locationAddress: '1 Developer Way, Firebase City, FS',
    locationName: 'Firebase City',
    locationCoordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 'user-4',
    name: 'Riley',
    age: 26,
    email: 'riley.dev@example.com',
    bio: 'Software developer by day, nature explorer by weekend. Love strategy board games and finding hidden trails. Looking for someone to share adventures with.',
    images: [
      'https://placehold.co/600x800/3B82F6/FFFFFF.png', 
      'https://placehold.co/700x500/10B981/FFFFFF.png', 
      'https://placehold.co/650x750/F59E0B/FFFFFF.png', 
    ],
    vibeTags: ['tech enthusiast', 'nature lover', 'board games', 'hiking', 'problem solver', 'craft beer', 'stargazing'],
    locationPatterns: ['National Parks', 'Board Game Cafes', 'Tech Meetups', 'Local Breweries', 'Scenic Overlooks'],
    prompts: [
      { promptId: 'p6', answer: 'That otters hold hands when they sleep so they don\'t float away from each other.' },
      { promptId: 'p9', answer: 'Learn a new programming language and visit a new national park.' },
    ],
    work: 'Code Crafters Ltd.',
    jobTitle: 'Full Stack Developer',
    education: 'MIT',
    ethnicity: 'Other',
    childrenStatus: "Don't have children",
    familyPlans: "Want children",
    height: "5'10\"",
    locationAddress: "101 Binary Blvd, Techtopia, USA",
    locationName: "Techtopia",
    locationCoordinates: { lat: 37.4220, lng: -122.0841 }, 
    drinking: "Sometimes",
    smoking: "No",
    zodiacSign: "Aquarius",
  },
  {
    id: 'user-5',
    name: 'Morgan',
    age: 29,
    email: 'morgan.art@example.com',
    bio: 'Painter and musician. I find beauty in everyday chaos. Often found at farmers markets or sketching in a park. My ideal date involves live music and good conversation.',
    images: [
      'https://placehold.co/600x800/EC4899/FFFFFF.png', 
      'https://placehold.co/800x600/8B5CF6/FFFFFF.png', 
      'https://placehold.co/500x700/D97706/FFFFFF.png', 
    ],
    vibeTags: ['artist', 'musician', 'farmers market regular', 'live music aficionado', 'sketchbook always', 'vintage lover', 'deep conversations'],
    locationPatterns: ['Art Supply Stores', 'Live Music Venues', 'Local Farmers Markets', 'Botanical Gardens', 'Indie Cinemas'],
    prompts: [
      { promptId: 'p2', answer: 'A long brunch, followed by a stroll through a flea market, and ending with some live jazz.' },
      { promptId: 'p7', answer: 'A collaborative art project that sometimes gets a little messy but is always beautiful.' },
    ],
    work: 'Self-Employed Artist',
    jobTitle: 'Painter & Illustrator',
    education: 'Rhode Island School of Design',
    ethnicity: 'Black/African Descent',
    childrenStatus: "Don't have children",
    familyPlans: "Not Sure",
    height: "5'6\"",
    locationAddress: "23 Palette Place, Artville, USA",
    locationName: "Artville",
    locationCoordinates: { lat: 41.8240, lng: -71.4128 }, 
    drinking: "Sometimes",
    smoking: "No",
    zodiacSign: "Pisces",
  },
  {
    id: 'user-6',
    name: 'Jordan',
    age: 31,
    email: 'jordan.fit@example.com',
    bio: 'Fitness enthusiast and world traveler. Always planning the next trip or the next workout. Looking for a partner in crime for adventures and gym sessions.',
    images: [
      'https://placehold.co/600x800/EF4444/FFFFFF.png', 
      'https://placehold.co/750x550/22C55E/FFFFFF.png', 
      'https://placehold.co/600x900/6366F1/FFFFFF.png', 
    ],
    vibeTags: ['fitness junkie', 'travel bug', 'adventure seeker', 'gym regular', 'mountain climber', 'foodie (healthy)', 'optimistic'],
    locationPatterns: ['Gyms & Fitness Studios', 'Hiking Trails', 'Airports', 'Healthy Eateries', 'Rock Climbing Centers'],
    prompts: [
      { promptId: 'p4', answer: 'My resilience and ability to make friends anywhere.' },
      { promptId: 'p12', answer: 'To visit every continent and run a marathon in at least three of them.' },
    ],
    work: 'Global Adventures Inc.',
    jobTitle: 'Travel Consultant & Fitness Coach',
    education: 'University of Colorado Boulder',
    ethnicity: 'White/Caucasian',
    childrenStatus: "Have Children",
    familyPlans: "Want children",
    height: "6'0\"",
    locationAddress: "7 Summit Street, Adventure Bay, USA",
    locationName: "Adventure Bay",
    locationCoordinates: { lat: 39.7392, lng: -104.9903 }, 
    drinking: "Yes",
    smoking: "No",
    zodiacSign: "Sagittarius",
  },
];

export const baseDate = new Date('2024-05-24T12:00:00.000Z'); 
const daysAgo = (days: number, hours = 0, minutes = 0) => new Date(baseDate.getTime() - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000).toISOString();

export const MOCK_CROSSED_PATHS_USERS: CrossedPathUser[] = MOCK_USERS.filter(u => u.id !== MOCK_USER_ID).map((user, index) => ({
  ...user,
  crossedAt: daysAgo(index + 0.1), 
  location: index % 2 === 0 ? 'Main Street Cafe' : 'City Park Fountain',
}));


export const MOCK_MOMENTS: Moment[] = [
  {
    id: 'moment-1',
    userId: MOCK_USER_ID,
    placeName: 'Montclair Art Museum',
    timestamp: daysAgo(2, 3, 30), // Wed, May 22nd, 8:30 AM
    potentialMatchId: 'user-1', 
    coordinates: { lat: 40.8137, lng: -74.2097 }, 
    placeImage: 'https://placehold.co/200x150/7F7F7F/FFFFFF.png?text=Art+Museum'
  },
  {
    id: 'moment-2',
    userId: MOCK_USER_ID,
    placeName: 'Van Vleck House & Gardens',
    timestamp: daysAgo(1, 1, 15), // Thu, May 23rd, 10:45 AM
    coordinates: { lat: 40.8155, lng: -74.2036 }, 
    placeImage: 'https://placehold.co/200x150/6A6A6A/FFFFFF.png?text=Gardens'
  },
  {
    id: 'moment-3',
    userId: MOCK_USER_ID,
    placeName: 'Watchung Booksellers',
    timestamp: daysAgo(5, 0, 0), // Sun, May 19th, 12:00 PM
    potentialMatchId: 'user-2', 
    coordinates: { lat: 40.8073, lng: -74.2036 }, 
    placeImage: 'https://placehold.co/200x150/5C5C5C/FFFFFF.png?text=Booksellers'
  },
   {
    id: 'moment-4',
    userId: MOCK_USER_ID,
    placeName: 'Edgemont Memorial Park',
    timestamp: daysAgo(3, 5, 0), // Tue, May 21st, 7:00 AM
    coordinates: { lat: 40.8197, lng: -74.2052 }, 
    placeImage: 'https://placehold.co/200x150/8D8D8D/FFFFFF.png?text=Park'
  },
  {
    id: 'moment-5',
    userId: MOCK_USER_ID,
    placeName: 'The Clairidge Cinema',
    timestamp: daysAgo(4, -8, 0), // Mon, May 20th, 8:00 PM
    coordinates: { lat: 40.8150, lng: -74.2125 }, 
    placeImage: 'https://placehold.co/200x150/9B9B9B/FFFFFF.png?text=Cinema'
  },
  {
    id: 'moment-added-1',
    userId: MOCK_USER_ID,
    placeName: 'Trend Coffee & Tea House',
    timestamp: daysAgo(2, -3, 0), // Wed, May 22nd, 3:00 PM
    potentialMatchId: 'user-3', 
    coordinates: { lat: 40.8125, lng: -74.2120 }, 
    placeImage: 'https://placehold.co/200x150/E70F72/FFFFFF.png?text=Trend+Coffee'
  },
  {
    id: 'moment-added-2',
    userId: MOCK_USER_ID,
    placeName: 'Montclair Art Museum', // Repeated visit
    timestamp: daysAgo(1, 6, 0), // Thu, May 23rd, 6:00 AM
    coordinates: { lat: 40.8137, lng: -74.2097 }, 
    placeImage: 'https://placehold.co/200x150/7F7F7F/FFFFFF.png?text=Art+Museum+Visit+2'
  },
  {
    id: 'moment-added-3',
    userId: MOCK_USER_ID,
    placeName: 'Whole Foods Market',
    timestamp: daysAgo(0, 2, 0), // Fri, May 24th, 10:00 AM (Current day)
    coordinates: { lat: 40.8180, lng: -74.2100 }, 
    placeImage: 'https://placehold.co/200x150/262626/FFFFFF.png?text=Whole+Foods'
  },
  {
    id: 'moment-6', // Older moment, should not appear in recap
    userId: MOCK_USER_ID,
    placeName: 'Outdated Cafe',
    timestamp: daysAgo(10), 
    coordinates: { lat: 40.8000, lng: -74.1900 }, 
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
      timestamp: daysAgo(0, 0, 5), 
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
      timestamp: daysAgo(0, 0, 10), 
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
      timestamp: daysAgo(0, 0, 5),
    },
    {
      id: 'msg-c1-2',
      chatId: 'chat-1',
      senderId: MOCK_USER_ID,
      receiverId: 'user-1',
      text: 'Hi Alex! Likewise. How\'s your day going?',
      timestamp: daysAgo(0, 0, 4),
    },
  ],
  'chat-2': [
    {
      id: 'msg-c2-1',
      chatId: 'chat-2',
      senderId: MOCK_USER_ID,
      receiverId: 'user-2',
      text: 'Loved your profile prompts! :)',
      timestamp: daysAgo(0, 0, 10),
    },
    {
      id: 'msg-c2-2',
      chatId: 'chat-2',
      senderId: 'user-2',
      receiverId: MOCK_USER_ID,
      text: 'Thanks! Yours too. That pineapple on pizza take is bold haha.',
      timestamp: daysAgo(0, 0, 9),
    },
     {
      id: 'msg-c2-3',
      chatId: 'chat-2',
      senderId: MOCK_USER_ID,
      receiverId: 'user-2',
      text: 'Haha, gotta stand by it! What kind of art do you do?',
      timestamp: daysAgo(0, 0, 8),
    },
  ],
};

export const getCurrentUser = (): UserProfile => {
  const user = MOCK_USERS.find(user => user.id === MOCK_USER_ID);
  if (!user) {
    return {
        id: MOCK_USER_ID,
        name: "Current User",
        age: 30,
        bio: "Default bio.",
        images: ['https://placehold.co/120x120/E70F72/FFFFFF.png?text=U'],
        vibeTags: [],
        prompts: [],
        email: 'user@example.com',
        work: 'Unknown',
        jobTitle: 'Unknown',
        education: 'Unknown',
        ethnicity: 'Prefer Not to Say',
        childrenStatus: 'Prefer Not to Say',
        familyPlans: 'Prefer Not to Say',
        height: 'Prefer Not to Say',
        drinking: 'Prefer Not to Say',
        smoking: 'Prefer Not to Say',
        zodiacSign: 'Prefer Not to Say',
        locationAddress: 'Unknown',
        locationName: 'Unknown',
    };
  }
  return user;
};
