
export interface MbtiQuestion {
  axis: 'E/I' | 'S/N' | 'T/F' | 'J/P';
  question: string;
  answers: [
    { text: string; value: 'E' | 'S' | 'T' | 'J' },
    { text: string; value: 'I' | 'N' | 'F' | 'P' }
  ];
}

export const mbtiQuizQuestions: MbtiQuestion[] = [
    // E vs I
    { axis: 'E/I', question: "At a party, you’re more likely to:", answers: [{ text: "Mingle with lots of people, even strangers", value: 'E' }, { text: "Stick with familiar faces and one-on-one convos", value: 'I' }] },
    { axis: 'E/I', question: "After a long week, you recharge best by:", answers: [{ text: "Going out or doing something social", value: 'E' }, { text: "Enjoying quiet alone time", value: 'I' }] },
    { axis: 'E/I', question: "You prefer conversations that are:", answers: [{ text: "Spontaneous and energetic", value: 'E' }, { text: "Thoughtful and deep", value: 'I' }] },
    { axis: 'E/I', question: "Your ideal weekend includes:", answers: [{ text: "Group activities, events, or hangouts", value: 'E' }, { text: "Solo hobbies or time with one close friend", value: 'I' }] },
    { axis: 'E/I', question: "When brainstorming, you:", answers: [{ text: "Think out loud", value: 'E' }, { text: "Reflect silently and share later", value: 'I' }] },
    { axis: 'E/I', question: "You're more often described as:", answers: [{ text: "Outgoing and lively", value: 'E' }, { text: "Reserved and introspective", value: 'I' }] },
    { axis: 'E/I', question: "You find it easier to:", answers: [{ text: "Start conversations", value: 'E' }, { text: "Listen and reflect before speaking", value: 'I' }] },
    { axis: 'E/I', question: "During travel or events, you:", answers: [{ text: "Love chatting with new people", value: 'E' }, { text: "Prefer observing or being with trusted companions", value: 'I' }] },
    { axis: 'E/I', question: "You’re energized by:", answers: [{ text: "External stimulation and activity", value: 'E' }, { text: "Internal reflection and stillness", value: 'I' }] },
    // S vs N
    { axis: 'S/N', question: "You trust information that is:", answers: [{ text: "Concrete and based on facts", value: 'S' }, { text: "Abstract and based on patterns", value: 'N' }] },
    { axis: 'S/N', question: "When solving problems, you:", answers: [{ text: "Look at what’s worked before", value: 'S' }, { text: "Imagine new approaches", value: 'N' }] },
    { axis: 'S/N', question: "You prefer conversations about:", answers: [{ text: "Real events and tangible topics", value: 'S' }, { text: "Ideas, dreams, and concepts", value: 'N' }] },
    { axis: 'S/N', question: "Your memory is better for:", answers: [{ text: "Details and specific facts", value: 'S' }, { text: "General impressions and big ideas", value: 'N' }] },
    { axis: 'S/N', question: "You’re more interested in:", answers: [{ text: "What is", value: 'S' }, { text: "What could be", value: 'N' }] },
    { axis: 'S/N', question: "When describing something, you:", answers: [{ text: "Give specific examples and data", value: 'S' }, { text: "Use metaphors and theories", value: 'N' }] },
    { axis: 'S/N', question: "You’re more drawn to:", answers: [{ text: "The present and the proven", value: 'S' }, { text: "The future and the unknown", value: 'N' }] },
    { axis: 'S/N', question: "When cooking, you:", answers: [{ text: "Follow the recipe exactly", value: 'S' }, { text: "Improvise and tweak creatively", value: 'N' }] },
    { axis: 'S/N', question: "In your daily life, you:", answers: [{ text: "Notice fine details", value: 'S' }, { text: "See the big picture", value: 'N' }] },
    // T vs F
    { axis: 'T/F', question: "When making choices, you focus on:", answers: [{ text: "What’s logical and efficient", value: 'T' }, { text: "What feels right emotionally", value: 'F' }] },
    { axis: 'T/F', question: "You prefer to be seen as:", answers: [{ text: "Smart and competent", value: 'T' }, { text: "Caring and understanding", value: 'F' }] },
    { axis: 'T/F', question: "During conflict, you:", answers: [{ text: "Stick to facts and reason", value: 'T' }, { text: "Consider feelings and relationships", value: 'F' }] },
    { axis: 'T/F', question: "Your decisions are usually:", answers: [{ text: "Impartial and based on rules", value: 'T' }, { text: "Personal and situational", value: 'F' }] },
    { axis: 'T/F', question: "When giving feedback, you’re:", answers: [{ text: "Honest and direct", value: 'T' }, { text: "Gentle and encouraging", value: 'F' }] },
    { axis: 'T/F', question: "You believe fairness means:", answers: [{ text: "Everyone is treated the same", value: 'T' }, { text: "Everyone’s unique needs are considered", value: 'F' }] },
    { axis: 'T/F', question: "You handle criticism by:", answers: [{ text: "Analyzing and improving logically", value: 'T' }, { text: "Taking it personally and reflecting deeply", value: 'F' }] },
    { axis: 'T/F', question: "You admire people who are:", answers: [{ text: "Principled and rational", value: 'T' }, { text: "Compassionate and authentic", value: 'F' }] },
    { axis: 'T/F', question: "You tend to trust:", answers: [{ text: "What makes sense", value: 'T' }, { text: "What aligns with values and empathy", value: 'F' }] },
    // J vs P
    { axis: 'J/P', question: "Your calendar is:", answers: [{ text: "Organized and planned ahead", value: 'J' }, { text: "Flexible and spontaneous", value: 'P' }] },
    { axis: 'J/P', question: "You feel more comfortable when:", answers: [{ text: "Things are decided and settled", value: 'J' }, { text: "Options are open and fluid", value: 'P' }] },
    { axis: 'J/P', question: "Deadlines are:", answers: [{ text: "Essential — you start early", value: 'J' }, { text: "Motivating — you perform well under pressure", value: 'P' }] },
    { axis: 'J/P', question: "You prefer:", answers: [{ text: "Structured environments", value: 'J' }, { text: "Laid-back environments", value: 'P' }] },
    { axis: 'J/P', question: "When packing for a trip, you:", answers: [{ text: "Have a checklist and finish early", value: 'J' }, { text: "Throw things in last-minute", value: 'P' }] },
    { axis: 'J/P', question: "You’re more likely to:", answers: [{ text: "Stick to routines", value: 'J' }, { text: "Mix things up often", value: 'P' }] },
    { axis: 'J/P', question: "In group projects, you:", answers: [{ text: "Take the lead on organizing", value: 'J' }, { text: "Jump in as ideas come", value: 'P' }] },
    { axis: 'J/P', question: "You value:", answers: [{ text: "Structure and closure", value: 'J' }, { text: "Freedom and exploration", value: 'P' }] },
    { axis: 'J/P', question: "You’d rather...", answers: [{ text: "Finish a decision and move on", value: 'J' }, { text: "Explore possibilities before committing", value: 'P' }] }
];

export const mbtiTypeDescriptions: Record<string, { title: string, emoji: string }> = {
    'INTJ': { title: 'The Mastermind / Architect', emoji: '🧠' },
    'INTP': { title: 'The Thinker / Logician', emoji: '🧠' },
    'ENTJ': { title: 'The Commander / Executive', emoji: '⚡️' },
    'ENTP': { title: 'The Debater / Visionary', emoji: '⚡️' },
    'INFJ': { title: 'The Advocate / Counsellor', emoji: '🌙' },
    'INFP': { title: 'The Mediator / Idealist', emoji: '🌸' },
    'ENFJ': { title: 'The Protagonist / Teacher', emoji: '🌟' },
    'ENFP': { title: 'The Campaigner / Inspirer', emoji: '🔥' },
    'ISTJ': { title: 'The Inspector / Logistician', emoji: '🧱' },
    'ISFJ': { title: 'The Defender / Nurturer', emoji: '🕊️' },
    'ESTJ': { title: 'The Supervisor / Executive', emoji: '🧭' },
    'ESFJ': { title: 'The Consul / Provider', emoji: '💐' },
    'ISTP': { title: 'The Virtuoso / Craftsman', emoji: '🛠️' },
    'ISFP': { title: 'The Adventurer / Composer', emoji: '🎨' },
    'ESTP': { title: 'The Dynamo / Entrepreneur', emoji: '⚡️' },
    'ESFP': { title: 'The Performer / Entertainer', emoji: '🎭' },
};

export interface MbtiTypeDetails {
  title: string;
  category: string;
  categoryEmoji: string;
  keyTraits: string[];
  strengths: string[];
  weaknesses: string[];
  idealRoles: string[];
}

export const mbtiTypeDetails: Record<string, MbtiTypeDetails> = {
  // Analysts (NT)
  'INTJ': {
    title: 'The Mastermind / Architect',
    category: 'Analysts',
    categoryEmoji: '🔥',
    keyTraits: ['Strategic', 'independent', 'visionary'],
    strengths: ['Long-term planning', 'self-motivated', 'logical problem solving'],
    weaknesses: ['Can be dismissive of emotions', 'perfectionistic', 'aloof'],
    idealRoles: ['Architect', 'scientist', 'entrepreneur', 'strategist'],
  },
  'INTP': {
    title: 'The Thinker / Logician',
    category: 'Analysts',
    categoryEmoji: '🔥',
    keyTraits: ['Analytical', 'curious', 'abstract thinker'],
    strengths: ['Idea generation', 'innovation', 'objectivity'],
    weaknesses: ['Poor with follow-through', 'can be socially distant'],
    idealRoles: ['Researcher', 'developer', 'philosopher', 'systems analyst'],
  },
  'ENTJ': {
    title: 'The Commander / Executive',
    category: 'Analysts',
    categoryEmoji: '🔥',
    keyTraits: ['Bold', 'decisive', 'efficient leader'],
    strengths: ['Leadership', 'strategy', 'drive for achievement'],
    weaknesses: ['May steamroll others', 'impatient', 'can neglect emotional nuance'],
    idealRoles: ['CEO', 'executive', 'project leader', 'military officer'],
  },
  'ENTP': {
    title: 'The Debater / Visionary',
    category: 'Analysts',
    categoryEmoji: '🔥',
    keyTraits: ['Energetic', 'witty', 'idea-driven'],
    strengths: ['Debate', 'improvisation', 'spotting opportunities'],
    weaknesses: ['Easily bored', 'argumentative', 'distractible'],
    idealRoles: ['Entrepreneur', 'marketer', 'inventor', 'media personality'],
  },
  // Diplomats (NF)
  'INFJ': {
    title: 'The Advocate / Counselor',
    category: 'Diplomats',
    categoryEmoji: '🌱',
    keyTraits: ['Quietly visionary', 'idealistic', 'emotionally intelligent'],
    strengths: ['Deep insight', 'loyalty', 'purposeful planning'],
    weaknesses: ['Overthinker', 'burnout-prone', 'can be too idealistic'],
    idealRoles: ['Therapist', 'writer', 'coach', 'spiritual leader'],
  },
  'INFP': {
    title: 'The Mediator / Idealist',
    category: 'Diplomats',
    categoryEmoji: '🌱',
    keyTraits: ['Gentle', 'introspective', 'values-driven'],
    strengths: ['Creativity', 'authenticity', 'empathy'],
    weaknesses: ['Conflict avoidant', 'disorganized', 'sensitive'],
    idealRoles: ['Poet', 'counselor', 'storyteller', 'humanitarian'],
  },
  'ENFJ': {
    title: 'The Protagonist / Teacher',
    category: 'Diplomats',
    categoryEmoji: '🌱',
    keyTraits: ['Charismatic', 'supportive', 'organized'],
    strengths: ['Motivation', 'leadership', 'emotional attunement'],
    weaknesses: ['May neglect self-needs', 'overly idealistic'],
    idealRoles: ['Teacher', 'public speaker', 'mentor', 'campaigner'],
  },
  'ENFP': {
    title: 'The Campaigner / Inspirer',
    category: 'Diplomats',
    categoryEmoji: '🌱',
    keyTraits: ['Enthusiastic', 'creative', 'people-centered'],
    strengths: ['Energy', 'spontaneity', 'emotional insight'],
    weaknesses: ['Scattered', 'overcommitted', 'easily distracted'],
    idealRoles: ['Actor', 'coach', 'creative director', 'startup founder'],
  },
  // Sentinels (SJ)
  'ISTJ': {
    title: 'The Inspector / Logistician',
    category: 'Sentinels',
    categoryEmoji: '🛠️',
    keyTraits: ['Responsible', 'loyal', 'detail-focused'],
    strengths: ['Consistency', 'duty', 'factual memory'],
    weaknesses: ['Rigid', 'uncomfortable with change'],
    idealRoles: ['Accountant', 'analyst', 'military officer', 'engineer'],
  },
  'ISFJ': {
    title: 'The Defender / Nurturer',
    category: 'Sentinels',
    categoryEmoji: '🛠️',
    keyTraits: ['Kind', 'service-oriented', 'dependable'],
    strengths: ['Supportive', 'patient', 'practical'],
    weaknesses: ['Avoids conflict', 'underestimates self'],
    idealRoles: ['Nurse', 'caregiver', 'librarian', 'administrator'],
  },
  'ESTJ': {
    title: 'The Supervisor / Executive',
    category: 'Sentinels',
    categoryEmoji: '🛠️',
    keyTraits: ['Organized', 'commanding', 'straightforward'],
    strengths: ['Leadership', 'process optimization', 'consistency'],
    weaknesses: ['Inflexible', 'harsh under stress'],
    idealRoles: ['Manager', 'judge', 'logistics lead', 'operations head'],
  },
  'ESFJ': {
    title: 'The Consul / Provider',
    category: 'Sentinels',
    categoryEmoji: '🛠️',
    keyTraits: ['Warm', 'social', 'attentive to others’ needs'],
    strengths: ['Harmony', 'community building', 'reliability'],
    weaknesses: ['Approval-seeking', 'may avoid confrontation'],
    idealRoles: ['HR', 'host', 'teacher', 'customer support lead'],
  },
  // Explorers (SP)
  'ISTP': {
    title: 'The Virtuoso / Craftsman',
    category: 'Explorers',
    categoryEmoji: '🌊',
    keyTraits: ['Independent', 'resourceful', 'hands-on'],
    strengths: ['Technical skill', 'calm in crisis', 'logical problem solving'],
    weaknesses: ['Private', 'unpredictable', 'emotionally detached'],
    idealRoles: ['Engineer', 'mechanic', 'survivalist', 'stunt coordinator'],
  },
  'ISFP': {
    title: 'The Adventurer / Composer',
    category: 'Explorers',
    categoryEmoji: '🌊',
    keyTraits: ['Artistic', 'free-spirited', 'sensitive'],
    strengths: ['Creativity', 'gentle authenticity', 'aesthetic appreciation'],
    weaknesses: ['Easily hurt', 'dislikes structure', 'avoids confrontation'],
    idealRoles: ['Designer', 'artist', 'musician', 'animal caretaker'],
  },
  'ESTP': {
    title: 'The Dynamo / Entrepreneur',
    category: 'Explorers',
    categoryEmoji: '🌊',
    keyTraits: ['Bold', 'energetic', 'action-first'],
    strengths: ['Adaptability', 'persuasion', 'crisis decision-making'],
    weaknesses: ['Impulsive', 'risk-prone', 'can be tactless'],
    idealRoles: ['Salesperson', 'negotiator', 'EMT', 'sports coach'],
  },
  'ESFP': {
    title: 'The Performer / Entertainer',
    category: 'Explorers',
    categoryEmoji: '🌊',
    keyTraits: ['Fun-loving', 'spontaneous', 'charming'],
    strengths: ['Social magnetism', 'present-moment focus', 'practical help'],
    weaknesses: ['Dislike of routine', 'may ignore deeper issues'],
    idealRoles: ['Actor', 'event planner', 'performer', 'hospitality expert'],
  },
};
