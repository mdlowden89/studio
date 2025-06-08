
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
      'https://placehold.co/600x800.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/700x700.png',
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
      'https://placehold.co/600x800.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/600x900.png',
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
      'https://placehold.co/700x700.png',
      'https://placehold.co/800x500.png',
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
    bio: "Full-stack developer by day, aspiring chef by night! I love experimenting with new recipes, especially Italian and Thai. Weekends are for long bike rides, discovering hidden city gems, and maybe a bit of retro gaming. Seeking connections and new experiences. Love exploring local cafes and parks. My vibe tags are usually \"explorer\", \"optimist\", \"curious\", and \"friendly\". Let's see where our paths cross!",
    images: [
      'https://placehold.co/600x800.png', // Changed from 120x120 with text
      'https://placehold.co/600x800.png',
      'https://placehold.co/800x600.png',
    ],
    vibeTags: ['explorer', 'optimist', 'curious', 'friendly', 'coffee enthusiast', 'park lover'],
    locationPatterns: ['Local Coffee Shop', 'Bookstore', 'Community Garden', 'Farmers Market', 'Museums', 'Culinary Schools', 'Bike Paths', 'Retro Arcades'],
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
      'https://placehold.co/600x800.png',
      'https://placehold.co/700x500.png',
      'https://placehold.co/650x750.png',
    ],
    vibeTags: ['tech enthusiast', 'nature lover', 'board games', 'hiking', 'problem solver', 'craft beer', 'stargazing'],
    locationPatterns: ['National Parks', 'Board Game Cafes', 'Tech Meetups', 'Local Breweries', 'Scenic Overlooks', 'Mountain Summits', 'Campgrounds'],
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
      'https://placehold.co/600x800.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/500x700.png',
    ],
    vibeTags: ['artist', 'musician', 'farmers market regular', 'live music aficionado', 'sketchbook always', 'vintage lover', 'deep conversations'],
    locationPatterns: ['Art Supply Stores', 'Live Music Venues', 'Local Farmers Markets', 'Botanical Gardens', 'Indie Cinemas', 'Antique Shops', 'Poetry Slams'],
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
      'https://placehold.co/600x800.png',
      'https://placehold.co/750x550.png',
      'https://placehold.co/600x900.png',
    ],
    vibeTags: ['fitness junkie', 'travel bug', 'adventure seeker', 'gym regular', 'mountain climber', 'foodie (healthy)', 'optimistic'],
    locationPatterns: ['Gyms & Fitness Studios', 'Hiking Trails', 'Airports', 'Healthy Eateries', 'Rock Climbing Centers', 'Marathon Routes', 'International Hostels'],
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

// Base date for consistent "days ago" calculations
export const baseDate = new Date('2024-05-24T12:00:00.000Z'); // Example: Friday, May 24, 2024, 12:00 PM UTC

// Helper to create past dates relative to baseDate
const daysAgo = (days: number, hours = 0, minutes = 0) =>
  new Date(baseDate.getTime() - (days * 24 * 60 * 60 * 1000) - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000)).toISOString();

export const MOCK_MOMENTS: Moment[] = [
  // Moments for MOCK_USER_ID within the last week (relative to baseDate) - Updated to famous landmarks
  {
    id: 'moment-recap-1',
    userId: MOCK_USER_ID,
    placeName: 'Eiffel Tower',
    timestamp: daysAgo(1, 2, 30), // Thursday, May 23rd
    potentialMatchId: 'user-1',
    coordinates: { lat: 48.8584, lng: 2.2945 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-2',
    userId: MOCK_USER_ID,
    placeName: 'Statue of Liberty',
    timestamp: daysAgo(2, 5, 15), // Wednesday, May 22nd
    coordinates: { lat: 40.6892, lng: -74.0445 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-3',
    userId: MOCK_USER_ID,
    placeName: 'Golden Gate Bridge',
    timestamp: daysAgo(3, 1, 0), // Tuesday, May 21st
    potentialMatchId: 'user-2',
    coordinates: { lat: 37.8199, lng: -122.4783 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-4',
    userId: MOCK_USER_ID,
    placeName: 'Times Square',
    timestamp: daysAgo(4, 7, 0), // Monday, May 20th
    coordinates: { lat: 40.7580, lng: -73.9855 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-5',
    userId: MOCK_USER_ID,
    placeName: 'Louvre Museum',
    timestamp: daysAgo(5, -6, 0), // Sunday, May 19th (evening)
    potentialMatchId: 'user-3',
    coordinates: { lat: 48.8606, lng: 2.3376 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-6',
    userId: MOCK_USER_ID,
    placeName: 'The Colosseum',
    timestamp: daysAgo(0, 3, 0), // Friday, May 24th (today, relative to baseDate)
    coordinates: { lat: 41.8902, lng: 12.4922 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-7',
    userId: MOCK_USER_ID,
    placeName: 'Sydney Opera House', // Repeated visit
    timestamp: daysAgo(6, 4, 0), // Saturday, May 18th
    coordinates: { lat: -33.8568, lng: 151.2153 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  // Older moment, should NOT appear in recap
  {
    id: 'moment-old-1',
    userId: MOCK_USER_ID,
    placeName: 'Outdated Cafe',
    timestamp: daysAgo(10),
    coordinates: { lat: 40.8000, lng: -74.1900 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  // Original moments (some might be older than 7 days from baseDate now)
  {
    id: 'moment-1',
    userId: MOCK_USER_ID,
    placeName: 'Original Montclair Art Museum',
    timestamp: daysAgo(8, 3, 30), // Older than 7 days
    potentialMatchId: 'user-1',
    coordinates: { lat: 40.8137, lng: -74.2097 },
    placeImage: 'https://placehold.co/200x150.png'
  },
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
    // Fallback default user if MOCK_USER_ID not found (should not happen in normal flow)
    return {
        id: MOCK_USER_ID,
        name: "Current User",
        age: 30,
        bio: "Default bio for a user not found in mock data.",
        images: ['https://placehold.co/600x800.png'],
        vibeTags: ["default", "user"],
        prompts: [],
        email: 'user@example.com',
        work: 'Unknown Inc.',
        jobTitle: 'Default Position',
        education: 'University of Defaults',
        ethnicity: 'Prefer Not to Say',
        childrenStatus: 'Prefer Not to Say',
        familyPlans: 'Prefer Not to Say',
        height: 'Prefer Not to Say',
        drinking: 'Prefer Not to Say',
        smoking: 'Prefer Not to Say',
        zodiacSign: 'Prefer Not to Say',
        locationAddress: '123 Default Street, Default City',
        locationName: 'Default City',
        locationCoordinates: { lat: 0, lng: 0 },
    };
  }
  return user;
};

export const MOCK_CROSSED_PATHS_USERS: CrossedPathUser[] = MOCK_USERS.filter(u => u.id !== MOCK_USER_ID).map((user, index) => ({
  ...user,
  crossedAt: daysAgo(index + 0.1), // Slightly different times for each
  location: index % 3 === 0 ? 'Eiffel Tower' : (index % 3 === 1 ? 'Times Square' : 'Golden Gate Bridge'), // Example locations
}));

    