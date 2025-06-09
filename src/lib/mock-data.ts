
import type { UserProfile, Moment, ChatConversation, ChatMessage, ProfilePrompt, CrossedPathUser, Achievement } from './types';
import { Flame, Zap, Compass, Sparkles, CalendarCheck2, MessageCircleReply, Globe, HeartHandshake, UserCheck } from 'lucide-react'; // Added UserCheck icon

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

// Base date for consistent "days ago" calculations
export const baseDate = new Date('2024-05-24T12:00:00.000Z'); // Example: Friday, May 24, 2024, 12:00 PM UTC

// Helper to create past dates relative to baseDate
const daysAgo = (days: number, hours = 0, minutes = 0) =>
  new Date(baseDate.getTime() - (days * 24 * 60 * 60 * 1000) - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000)).toISOString();

const MOCK_ACHIEVEMENTS_FOR_CURRENT_USER: Achievement[] = [
  {
    id: 'achieve-1',
    name: 'Daily Logger',
    type: 'Streak',
    description: 'Logged a Moment 3 days in a row.',
    icon: Flame,
    achievedDate: daysAgo(1),
    rewards: ['Glow Badge: Profile gets glowing border for 24 hrs.'],
    glowEffect: true,
  },
  {
    id: 'achieve-2',
    name: 'Quick Responder',
    type: 'Prompt Sprint',
    description: 'Replied to 3 Moment Matches in 24 hours.',
    icon: Zap,
    achievedDate: daysAgo(5),
    rewards: ['Priority Visibility: Shown first in Explore.'],
  },
  {
    id: 'achieve-3',
    name: 'Urban Explorer',
    type: 'Explorer',
    description: 'Visited 3 different neighborhoods in a week.',
    icon: Compass,
    achievedDate: daysAgo(2),
    rewards: ['Free Likes: Get 3 extra free likes.'],
  },
  {
    id: 'achieve-4',
    name: 'Fast Connection',
    type: 'Double Spark',
    description: 'Matched + started a conversation in under 2 hours.',
    icon: Sparkles,
    achievedDate: daysAgo(10),
    rewards: ['Full Preview: Unlock a full preview of a hidden Like.'],
  },
  {
    id: 'achieve-5',
    name: 'Profile Polisher',
    type: 'Profile Completion',
    description: 'Filled out all profile sections (bio, prompts, photos).',
    icon: UserCheck,
    achievedDate: daysAgo(15),
    rewards: ['Slight boost in profile visibility.'],
    glowEffect: false,
  },
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Alex',
    age: 28,
    email: 'alex@example.com',
    bio: 'Loves hiking, coffee, and indie music. Always up for an adventure or a quiet night in with a good book.',
    images: [
      'https://placehold.co/400x550.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/500x500.png',
      'https://placehold.co/450x600.png',
      'https://placehold.co/700x450.png',
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
    achievements: [],
  },
  {
    id: 'user-2',
    name: 'Jamie',
    age: 25,
    email: 'jamie@example.com',
    bio: 'Artist, foodie, and travel enthusiast. Exploring new cultures and cuisines is my passion.',
    images: [
      'https://placehold.co/420x580.png',
      'https://placehold.co/750x500.png',
      'https://placehold.co/600x600.png',
      'https://placehold.co/500x700.png',
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
    achievements: [],
  },
  {
    id: 'user-3',
    name: 'Casey',
    age: 30,
    email: 'casey@example.com',
    bio: 'Tech geek, gamer, and animal lover. Fluent in sarcasm and Python.',
    images: [
      'https://placehold.co/450x600.png',
      'https://placehold.co/650x650.png',
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
    achievements: [],
  },
  {
    id: MOCK_USER_ID, // Current user
    name: 'Dev User',
    age: 27,
    email: 'dev@example.com',
    bio: "Full-stack developer by day, aspiring chef by night! I love experimenting with new recipes, especially Italian and Thai. Weekends are for long bike rides, discovering hidden city gems, and maybe a bit of retro gaming. Seeking connections and new experiences. Love exploring local cafes and parks. My vibe tags are usually \"explorer\", \"optimist\", \"curious\", and \"friendly\". Let's see where our paths cross!",
    images: [
      'https://placehold.co/400x550.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/500x500.png',
      'https://placehold.co/450x600.png',
      'https://placehold.co/700x450.png',
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
    achievements: MOCK_ACHIEVEMENTS_FOR_CURRENT_USER, // Added mock achievements
  },
  {
    id: 'user-4',
    name: 'Riley',
    age: 26,
    email: 'riley.dev@example.com',
    bio: 'Software developer by day, nature explorer by weekend. Love strategy board games and finding hidden trails. Looking for someone to share adventures with.',
    images: [
      'https://placehold.co/430x570.png',
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
    achievements: [],
  },
  {
    id: 'user-5',
    name: 'Morgan',
    age: 29,
    email: 'morgan.art@example.com',
    bio: 'Painter and musician. I find beauty in everyday chaos. Often found at farmers markets or sketching in a park. My ideal date involves live music and good conversation.',
    images: [
      'https://placehold.co/390x510.png',
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
    achievements: [],
  },
  {
    id: 'user-6',
    name: 'Jordan',
    age: 31,
    email: 'jordan.fit@example.com',
    bio: 'Fitness enthusiast and world traveler. Always planning the next trip or the next workout. Looking for a partner in crime for adventures and gym sessions.',
    images: [
      'https://placehold.co/410x560.png',
      'https://placehold.co/750x550.png',
      'https://placehold.co/480x680.png',
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
    achievements: [],
  },
];


export const MOCK_MOMENTS: Moment[] = [
  // Moments for MOCK_USER_ID within the last week (relative to baseDate) - Updated to London landmarks
  {
    id: 'moment-recap-1',
    userId: MOCK_USER_ID,
    placeName: 'The Shard',
    timestamp: daysAgo(1, 2, 30), // Thursday, May 23rd
    potentialMatchId: 'user-1',
    coordinates: { lat: 51.5045, lng: -0.0865 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-2',
    userId: MOCK_USER_ID,
    placeName: 'Tower of London',
    timestamp: daysAgo(2, 5, 15), // Wednesday, May 22nd
    coordinates: { lat: 51.5081, lng: -0.0759 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-3',
    userId: MOCK_USER_ID,
    placeName: 'British Museum',
    timestamp: daysAgo(3, 1, 0), // Tuesday, May 21st
    potentialMatchId: 'user-2',
    coordinates: { lat: 51.5194, lng: -0.1270 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-4',
    userId: MOCK_USER_ID,
    placeName: 'Tate Modern',
    timestamp: daysAgo(4, 7, 0), // Monday, May 20th
    coordinates: { lat: 51.5076, lng: -0.0994 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-5',
    userId: MOCK_USER_ID,
    placeName: 'Borough Market',
    timestamp: daysAgo(5, -6, 0), // Sunday, May 19th (evening)
    potentialMatchId: 'user-3',
    coordinates: { lat: 51.5055, lng: -0.0910 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-6',
    userId: MOCK_USER_ID,
    placeName: 'Covent Garden',
    timestamp: daysAgo(0, 3, 0), // Friday, May 24th (today, relative to baseDate)
    coordinates: { lat: 51.5118, lng: -0.1245 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  {
    id: 'moment-recap-7',
    userId: MOCK_USER_ID,
    placeName: 'Buckingham Palace',
    timestamp: daysAgo(6, 4, 0), // Saturday, May 18th
    coordinates: { lat: 51.5014, lng: -0.1419 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  // Older moment, should NOT appear in recap
  {
    id: 'moment-old-1',
    userId: MOCK_USER_ID,
    placeName: 'Old Cafe Not in London',
    timestamp: daysAgo(10),
    coordinates: { lat: 40.8000, lng: -74.1900 },
    placeImage: 'https://placehold.co/200x150.png'
  },
  // Original non-MOCK_USER_ID moment (can be left as is or changed if needed)
  {
    id: 'moment-1', // This was originally for MOCK_USER_ID, changing to another user to avoid conflict
    userId: 'user-4', // Assigning to another user to keep it in the system but not for Dev User
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
        images: ['https://placehold.co/400x500.png'],
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
        achievements: [],
    };
  }
  return user;
};

export const MOCK_CROSSED_PATHS_USERS: CrossedPathUser[] = MOCK_USERS.filter(u => u.id !== MOCK_USER_ID).map((user, index) => ({
  ...user,
  crossedAt: daysAgo(index + 0.1), // Slightly different times for each
  location: index % 3 === 0 ? 'The Shard' : (index % 3 === 1 ? 'Tate Modern' : 'British Museum'), // Example London locations
}));

    
