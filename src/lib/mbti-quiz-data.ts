
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
  nicknames: string[];
  typeCode: string;
  population: string;
  coreCharacteristics: { trait: string; description: string }[];
  cognitiveStack: { functionName: string; description: string }[];
  strengths: { strength: string; example: string }[];
  weaknesses: { weakness: string; description: string }[];
  idealCareers: { field: string; why: string }[];
  famousExamples: string[];
  relationships: { area: string; behavior: string }[];
  growthPath: string[];
  archetypes: string[];
}

export const mbtiTypeDetails: Record<string, MbtiTypeDetails> = {
  'INTJ': {
    title: 'The Mastermind / Architect',
    nicknames: ['The Strategist', 'The Visionary', 'The Chessmaster'],
    typeCode: 'Introverted (I) – Intuitive (N) – Thinking (T) – Judging (J)',
    population: '~2% of population',
    coreCharacteristics: [
      { trait: 'Strategic', description: 'Thinks in systems and architects step-by-step plans to realize long-term goals.' },
      { trait: 'Independent', description: 'Craves autonomy and forges their own path based on logic, not trends.' },
      { trait: 'Visionary', description: 'Innovates and thinks years into the future, fueled by ideas and possibilities.' },
    ],
    cognitiveStack: [
      { functionName: 'Dominant – Introverted Intuition (Ni)', description: 'Seeks underlying patterns and synthesizes data into a singular, guiding insight for the future.' },
      { functionName: 'Auxiliary – Extraverted Thinking (Te)', description: 'Executes plans logically and efficiently, organizing the external world to match their inner vision.' },
      { functionName: 'Tertiary – Introverted Feeling (Fi)', description: 'Guided by a private, strong moral compass that can cause tension when values clash with efficiency.' },
      { functionName: 'Inferior – Extraverted Sensing (Se)', description: 'Often disconnected from the present moment; may overlook physical details or indulge impulsively under stress.' },
    ],
    strengths: [
      { strength: 'Long-Term Visionaries', example: 'Create scalable, efficient systems and solutions far ahead of their time.' },
      { strength: 'Strategic Thinkers', example: 'Break complex problems down and solve them with precision.' },
      { strength: 'Self-Motivated', example: 'Work independently with laser-like focus to achieve goals.' },
    ],
    weaknesses: [
      { weakness: 'Emotionally Aloof', description: 'May seem cold, dismissive, or uninterested in emotional nuance.' },
      { weakness: 'Overly Perfectionistic', description: 'Can delay action until a plan is flawless, risking inaction.' },
      { weakness: 'Critical of Inefficiency', description: 'Can be harsh toward those who don\'t meet their standards.' },
    ],
    idealCareers: [
      { field: 'Architecture / Engineering', why: 'Strategic systems, complex problem-solving.' },
      { field: 'Scientific Research', why: 'Requires curiosity and intellectual independence.' },
      { field: 'Entrepreneurship', why: 'Allows them to build a vision and control the execution.' },
    ],
    famousExamples: ['Elon Musk', 'Friedrich Nietzsche', 'Jodie Foster', 'Walter White (Breaking Bad)'],
    relationships: [
      { area: 'Friendship', behavior: 'Prefers a few deep, intellectual connections over a wide social circle.' },
      { area: 'Romance', behavior: 'Deeply loyal once committed, but needs a partner who values growth, purpose, and independence.' },
      { area: 'Communication', behavior: 'Direct, clear, and efficient. Dislikes fluff and appreciates logical arguments.' },
    ],
    growthPath: ['Develop emotional intelligence', 'Balance vision with flexibility', 'Practice mindfulness and presence'],
    archetypes: ['The calculated mastermind', 'The mysterious mentor', 'The visionary founder'],
  },
  'INTP': {
    title: 'The Thinker / Logician',
    nicknames: ['The Professor', 'The Innovator', 'The Theorist'],
    typeCode: 'Introverted (I) – Intuitive (N) – Thinking (T) – Perceiving (P)',
    population: '~3% of population',
    coreCharacteristics: [
        { trait: 'Analytical', description: 'Driven to understand how things work, from machines to complex theories.' },
        { trait: 'Curious', description: 'Possesses a relentless thirst for knowledge and explores ideas for their own sake.' },
        { trait: 'Abstract Thinker', description: 'Lives in a world of possibilities, patterns, and theoretical models.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Thinking (Ti)', description: 'Builds internal logical frameworks to understand the world with precision and accuracy.' },
        { functionName: 'Auxiliary – Extraverted Intuition (Ne)', description: 'Explores connections, possibilities, and new ideas in the external world.' },
        { functionName: 'Tertiary – Introverted Sensing (Si)', description: 'Stores detailed data and past experiences, which surface to support their theories.' },
        { functionName: 'Inferior – Extraverted Feeling (Fe)', description: 'Struggles with expressing emotion and navigating social norms; can feel awkward in groups.' },
    ],
    strengths: [
        { strength: 'Idea Generation', example: 'Connect disparate concepts to create groundbreaking theories or inventions.' },
        { strength: 'Objective Analysis', example: 'Can detach from emotion to find the logical root of a problem.' },
        { strength: 'Intellectual Honesty', example: 'Values truth over comfort and is willing to be proven wrong.' },
    ],
    weaknesses: [
        { weakness: 'Prone to Procrastination', description: 'May get lost in theory and struggle to start practical execution.' },
        { weakness: 'Socially Distant', description: 'Can appear withdrawn or unaware of others\' emotional states.' },
        { weakness: 'Overly Critical', description: 'May deconstruct ideas to the point of seeming negative or unsupportive.' },
    ],
    idealCareers: [
        { field: 'Software Development', why: 'Logical systems, problem-solving, and constant learning.' },
        { field: 'Academic Research', why: 'Deep dives into theoretical subjects.' },
        { field: 'Philosophy / Economics', why: 'Exploring and refining complex abstract systems.' },
    ],
    famousExamples: ['Albert Einstein', 'Bill Gates', 'Marie Curie', 'Abed Nadir (Community)'],
    relationships: [
        { area: 'Friendship', behavior: 'Values friends who can engage in complex, theoretical discussions.' },
        { area: 'Romance', behavior: 'Appreciates a partner who is independent, intellectually curious, and respects their need for space.' },
        { area: 'Communication', behavior: 'Precise and logical, but can be rambling and hard to follow when explaining a complex idea.' },
    ],
    growthPath: ['Turn theory into action', 'Practice active listening and empathy', 'Develop organizational habits'],
    archetypes: ['The absent-minded professor', 'The curious inventor', 'The systems analyst'],
  },
  'ENTJ': {
    title: 'The Commander / Executive',
    nicknames: ['The Chief', 'The Field Marshal', 'The Trailblazer'],
    typeCode: 'Extraverted (E) – Intuitive (N) – Thinking (T) – Judging (J)',
    population: '~2% of population',
    coreCharacteristics: [
        { trait: 'Decisive Leader', description: 'Naturally takes charge, makes tough calls, and directs others toward a goal.' },
        { trait: 'Efficient', description: 'Obsessed with finding the best, fastest way to achieve results.' },
        { trait: 'Bold & Confident', description: 'Projects an aura of authority and is not afraid to challenge the status quo.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Thinking (Te)', description: 'Imposes logic, structure, and efficiency on the external world to achieve goals.' },
        { functionName: 'Auxiliary – Introverted Intuition (Ni)', description: 'Forms a long-term vision and strategy that guides their actions.' },
        { functionName: 'Tertiary – Extraverted Sensing (Se)', description: 'Connects with the present moment to gather data and enjoy rewarding experiences.' },
        { functionName: 'Inferior – Introverted Feeling (Fi)', description: 'Has a hidden, sensitive core of personal values that they struggle to express or prioritize.' },
    ],
    strengths: [
        { strength: 'Strategic Leadership', example: 'Can mobilize a team to execute a complex, long-term plan.' },
        { strength: 'Unwavering Confidence', example: 'Inspires others with their conviction and clear sense of direction.' },
        { strength: 'Problem-Solving Prowess', example: 'Quickly identifies inefficiencies and implements logical solutions.' },
    ],
    weaknesses: [
        { weakness: 'Impatient', description: 'Can be harsh or dismissive with those they see as slow or incompetent.' },
        { weakness: 'Can Seem Arrogant', description: 'Their confidence may be perceived as a belief that they are always right.' },
        { weakness: 'Neglects Emotions', description: 'Often prioritizes logic over the feelings of themselves or others.' },
    ],
    idealCareers: [
        { field: 'CEO / Executive', why: 'Natural fit for high-stakes leadership and strategic planning.' },
        { field: 'Management Consulting', why: 'Analyzing and optimizing systems for efficiency.' },
        { field: 'Law / Politics', why: 'Building arguments, leading campaigns, and implementing policy.' },
    ],
    famousExamples: ['Steve Jobs', 'Margaret Thatcher', 'Julius Caesar', 'Miranda Priestly (The Devil Wears Prada)'],
    relationships: [
        { area: 'Friendship', behavior: 'Gravitates toward ambitious, competent people who challenge them.' },
        { area: 'Romance', behavior: 'Seeks a "power couple" dynamic with a partner who shares their drive and vision.' },
        { area: 'Communication', behavior: 'Direct, assertive, and focused on outcomes. Can be blunt.' },
    ],
    growthPath: ['Practice patience', 'Learn to actively listen to different perspectives', 'Make time for emotional reflection'],
    archetypes: ['The driven CEO', 'The ambitious general', 'The empire-builder'],
  },
  'ENTP': {
    title: 'The Debater / Visionary',
    nicknames: ['The Innovator', 'The Originator', 'The Devil\'s Advocate'],
    typeCode: 'Extraverted (E) – Intuitive (N) – Thinking (T) – Perceiving (P)',
    population: '~3% of population',
    coreCharacteristics: [
        { trait: 'Quick-Witted', description: 'Sees possibilities and connections instantly, often with a humorous or clever twist.' },
        { trait: 'Idea-Driven', description: 'Loves exploring new concepts, brainstorming, and debating ideas for sport.' },
        { trait: 'Energetic', description: 'Thrives on mental sparring and novel experiences, often juggling multiple projects.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Intuition (Ne)', description: 'Constantly scans the external world for new patterns, ideas, and possibilities.' },
        { functionName: 'Auxiliary – Introverted Thinking (Ti)', description: 'Analyzes ideas with an internal logical framework to ensure they are consistent and sound.' },
        { functionName: 'Tertiary – Extraverted Feeling (Fe)', description: 'Enjoys charming others and can be surprisingly attuned to social dynamics.' },
        { functionName: 'Inferior – Introverted Sensing (Si)', description: 'Struggles with details, routine, and recalling specific facts, which can lead to disorganization.' },
    ],
    strengths: [
        { strength: 'Innovative Brainstorming', example: 'Can generate a dozen viable solutions to a problem in minutes.' },
        { strength: 'Charismatic Debater', example: 'Can argue any side of an issue to test its validity and persuade others.' },
        { strength: 'Adaptable & Resourceful', example: 'Thrives in chaotic environments and can pivot strategies on the fly.' },
    ],
    weaknesses: [
        { weakness: 'Argumentative', description: 'May debate points to death, even when it harms relationships.' },
        { weakness: 'Poor Follow-Through', description: 'Gets bored once an idea is proven and may abandon projects before completion.' },
        { weakness: 'Insensitive', description: 'Can overlook the emotional impact of their words in their quest for intellectual truth.' },
    ],
    idealCareers: [
        { field: 'Entrepreneur', why: 'Perfect for the high-energy, idea-driven startup world.' },
        { field: 'Marketing / Advertising', why: 'Thrives on coming up with clever campaigns and new angles.' },
        { field: 'Lawyer (especially trial)', why: 'Requires sharp debate skills and thinking on your feet.' },
    ],
    famousExamples: ['Socrates', 'Leonardo da Vinci', 'Robert Downey Jr.', 'Tyrion Lannister (Game of Thrones)'],
    relationships: [
        { area: 'Friendship', behavior: 'Seeks friends who are playmates for intellectual sparring and adventure.' },
        { area: 'Romance', behavior: 'Wants a partner who is intellectually stimulating, independent, and open to endless possibilities.' },
        { area: 'Communication', behavior: 'Fast-paced, witty, and loves to challenge ideas. Can switch topics rapidly.' },
    ],
    growthPath: ['Learn to commit and see projects through', 'Consider the emotional impact of words', 'Value stability and routine'],
    archetypes: ['The clever inventor', 'The charismatic trickster', 'The startup visionary'],
  },
  'INFJ': {
    title: 'The Advocate / Counsellor',
    nicknames: ['The Mystic', 'The Confidant', 'The Protector'],
    typeCode: 'Introverted (I) – Intuitive (N) – Feeling (F) – Judging (J)',
    population: '~1.5% of population (rarest type)',
    coreCharacteristics: [
        { trait: 'Insightful', description: 'Has a deep understanding of human nature and complex emotional patterns.' },
        { trait: 'Idealistic', description: 'Driven by a strong sense of purpose and a desire to make the world better.' },
        { trait: 'Quietly Determined', description: 'Works tirelessly behind the scenes to enact their vision for a better future.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Intuition (Ni)', description: 'Synthesizes complex information to form a singular, profound insight or vision.' },
        { functionName: 'Auxiliary – Extraverted Feeling (Fe)', description: 'Connects with and seeks to improve the emotional well-being of others and the group.' },
        { functionName: 'Tertiary – Introverted Thinking (Ti)', description: 'Uses logic to analyze and refine their insights, seeking truth and consistency.' },
        { functionName: 'Inferior – Extraverted Sensing (Se)', description: 'Can be out of touch with their physical surroundings, leading to burnout or sensory over-indulgence under stress.' },
    ],
    strengths: [
        { strength: 'Deep Empathy', example: 'Can understand and feel others\' emotions as if they were their own.' },
        { strength: 'Purposeful Vision', example: 'Inspires others with their unwavering commitment to a meaningful cause.' },
        { strength: 'Organizational Skills', example: 'Can organize people and resources to bring their idealistic visions to life.' },
    ],
    weaknesses: [
        { weakness: 'Perfectionistic & Burnout-Prone', description: 'Their high ideals can lead them to overwork and neglect their own needs.' },
        { weakness: 'Extremely Private', description: 'Reluctant to share their inner world, making them seem mysterious or closed-off.' },
        { weakness: 'Sensitive to Conflict', description: 'Takes criticism very personally and may withdraw from harsh environments.' },
    ],
    idealCareers: [
        { field: 'Counseling / Psychology', why: 'Utilizes their deep empathy and insight into human nature.' },
        { field: 'Writing / Art', why: 'Allows them to express their complex inner world and ideals.' },
        { field: 'Non-Profit / Activism', why: 'Fulfills their need for a purpose-driven life dedicated to a cause.' },
    ],
    famousExamples: ['Martin Luther King Jr.', 'Carl Jung', 'Lady Gaga', 'Atticus Finch (To Kill a Mockingbird)'],
    relationships: [
        { area: 'Friendship', behavior: 'Seeks a few profound, authentic connections with people who share their values.' },
        { area: 'Romance', behavior: 'Desires a deep, soulful connection with a partner they can share their inner world with.' },
        { area: 'Communication', behavior: 'Gentle, thoughtful, and metaphorical. Focuses on harmony and mutual understanding.' },
    ],
    growthPath: ['Set realistic boundaries to avoid burnout', 'Learn to trust others with their inner thoughts', 'Engage in grounding, sensory activities'],
    archetypes: ['The wise sage', 'The quiet revolutionary', 'The compassionate guide'],
  },
  'INFP': {
    title: 'The Mediator / Idealist',
    nicknames: ['The Dreamer', 'The Healer', 'The Romantic'],
    typeCode: 'Introverted (I) – Intuitive (N) – Feeling (F) – Perceiving (P)',
    population: '~4% of population',
    coreCharacteristics: [
        { trait: 'Values-Driven', description: 'Lives by a strict internal moral code and seeks harmony and authenticity.' },
        { trait: 'Imaginative', description: 'Possesses a rich inner world filled with fantasy, creativity, and wonder.' },
        { trait: 'Empathetic', description: 'Deeply attuned to the emotions of others and driven to help those in need.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Feeling (Fi)', description: 'Filters all experiences through a deeply personal and complex set of values and emotions.' },
        { functionName: 'Auxiliary – Extraverted Intuition (Ne)', description: 'Explores possibilities and what could be, seeing potential in people and ideas.' },
        { functionName: 'Tertiary – Introverted Sensing (Si)', description: 'Holds onto cherished memories and details that resonate with their values.' },
        { functionName: 'Inferior – Extraverted Thinking (Te)', description: 'Struggles with objective logic, efficiency, and organizing the external world, especially under stress.' },
    ],
    strengths: [
        { strength: 'Creative Expression', example: 'Excel in writing, art, and music as a way to explore their inner world.' },
        { strength: 'Unwavering Idealism', example: 'Champions causes and people they believe in with fierce loyalty.' },
        { strength: 'Authentic Empathy', example: 'Makes others feel truly seen and understood without judgment.' },
    ],
    weaknesses: [
        { weakness: 'Overly Sensitive', description: 'Can be easily hurt by criticism or conflict, taking things very personally.' },
        { weakness: 'Impractical', description: 'May get lost in their dreams and neglect day-to-day practicalities.' },
        { weakness: 'Conflict Avoidant', description: 'Dislikes confrontation and may struggle to assert their own needs.' },
    ],
    idealCareers: [
        { field: 'Writer / Author', why: 'Allows for deep creative expression and exploration of values.' },
        { field: 'Counselor / Social Worker', why: 'Utilizes their profound empathy to help others.' },
        { field: 'Graphic Design / Fine Arts', why: 'Provides a medium to bring their rich imagination to life.' },
    ],
    famousExamples: ['William Shakespeare', 'J.R.R. Tolkien', 'Audrey Hepburn', 'Luna Lovegood (Harry Potter)'],
    relationships: [
        { area: 'Friendship', behavior: 'Looks for deep, soul-to-soul connections and values authenticity above all.' },
        { area: 'Romance', behavior: 'A hopeless romantic who dreams of an ideal, harmonious partnership based on shared values.' },
        { area: 'Communication', behavior: 'Gentle and supportive, but can be hard to know as they protect their inner world fiercely.' },
    ],
    growthPath: ['Develop practical life skills', 'Learn to assert boundaries and handle conflict', 'Find outlets for creative expression'],
    archetypes: ['The dreamer', 'The quiet idealist', 'The gentle healer'],
  },
  'ENFJ': {
    title: 'The Protagonist / Teacher',
    nicknames: ['The Mentor', 'The Giver', 'The Inspirer'],
    typeCode: 'Extraverted (E) – Intuitive (N) – Feeling (F) – Judging (J)',
    population: '~2.5% of population',
    coreCharacteristics: [
        { trait: 'Charismatic', description: 'Naturally draws people in with their warmth, passion, and eloquence.' },
        { trait: 'Empathetic Leader', description: 'Focuses on inspiring growth and bringing out the best in others.' },
        { trait: 'Organized', description: 'Structures their environment and plans to help the group achieve its goals.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Feeling (Fe)', description: 'Highly attuned to the emotional atmosphere and social norms, striving for group harmony.' },
        { functionName: 'Auxiliary – Introverted Intuition (Ni)', description: 'Forms insights about people and the future, creating a vision for how to help them grow.' },
        { functionName: 'Tertiary – Extraverted Sensing (Se)', description: 'Enjoys engaging with the physical world and creating positive sensory experiences for others.' },
        { functionName: 'Inferior – Introverted Thinking (Ti)', description: 'Can struggle with impersonal logic and may make decisions based on emotion over fact.' },
    ],
    strengths: [
        { strength: 'Motivational', example: 'Inspires and mobilizes people toward a common goal or a better future.' },
        { strength: 'Natural Counselor', example: 'Intuitively understands others\' needs and provides warm, insightful guidance.' },
        { strength: 'Reliable & Organized', example: 'Follows through on commitments and creates clear paths for others to succeed.' },
    ],
    weaknesses: [
        { weakness: 'Overly Idealistic', description: 'Can be crushed when reality doesn\'t meet their optimistic expectations.' },
        { weakness: 'Too Self-Sacrificing', description: 'May neglect their own needs in their relentless drive to help others.' },
        { weakness: 'Sensitive to Criticism', description: 'Their self-worth is often tied to the approval and harmony of the group.' },
    ],
    idealCareers: [
        { field: 'Teaching / Coaching', why: 'Directly involves mentoring and fostering growth in others.' },
        { field: 'Public Relations / Politics', why: 'Utilizes their charisma to inspire people and manage public perception.' },
        { field: 'Human Resources', why: 'Focuses on improving employee well-being and organizational harmony.' },
    ],
    famousExamples: ['Barack Obama', 'Oprah Winfrey', 'Martin Luther King Jr.', 'Morpheus (The Matrix)'],
    relationships: [
        { area: 'Friendship', behavior: 'Acts as the supportive "mom friend," organizing events and checking in on everyone.' },
        { area: 'Romance', behavior: 'A deeply committed and nurturing partner who focuses on mutual growth and emotional support.' },
        { area: 'Communication', behavior: 'Warm, encouraging, and diplomatic, always aiming for a positive outcome.' },
    ],
    growthPath: ['Prioritize self-care', 'Accept that not everyone can be helped', 'Develop comfort with objective, impersonal feedback'],
    archetypes: ['The inspiring mentor', 'The charismatic leader', 'The tireless advocate'],
  },
  'ENFP': {
    title: 'The Campaigner / Inspirer',
    nicknames: ['The Champion', 'The Spark', 'The Enthusiast'],
    typeCode: 'Extraverted (E) – Intuitive (N) – Feeling (F) – Perceiving (P)',
    population: '~8% of population',
    coreCharacteristics: [
        { trait: 'Enthusiastic', description: 'Radiates positive energy and excitement about new people, ideas, and possibilities.' },
        { trait: 'People-Centered', description: 'Genuinely loves connecting with others and understanding what makes them tick.' },
        { trait: 'Imaginative', description: 'Sees life as a grand adventure full of opportunities for growth and expression.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Intuition (Ne)', description: 'Sees endless possibilities and connections in the world, jumping from idea to idea.' },
        { functionName: 'Auxiliary – Introverted Feeling (Fi)', description: 'Checks in with a deep, personal set of values to ensure their actions are authentic.' },
        { functionName: 'Tertiary – Extraverted Thinking (Te)', description: 'Can be surprisingly organized and efficient when a project they care about requires it.' },
        { functionName: 'Inferior – Introverted Sensing (Si)', description: 'Struggles with routine, details, and remembering past specifics, often losing track of things.' },
    ],
    strengths: [
        { strength: 'Infectious Charisma', example: 'Can light up a room and make anyone feel like the most interesting person there.' },
        { strength: 'Creative Problem-Solving', example: 'Connects unconventional ideas to find innovative, human-centric solutions.' },
        { strength: 'Emotional Intelligence', example: 'Quickly understands others\' motivations and emotional states.' },
    ],
    weaknesses: [
        { weakness: 'Easily Distracted', description: 'The allure of a new idea can cause them to abandon current commitments.' },
        { weakness: 'Overthinks & Seeks Approval', description: 'Can get caught in a loop of worrying about what others think.' },
        { weakness: 'Dislikes Practical Details', description: 'May ignore mundane but necessary tasks, leading to disorganization.' },
    ],
    idealCareers: [
        { field: 'Creative Director / Advertising', why: 'Thrives on brainstorming big, bold, and emotionally resonant ideas.' },
        { field: 'Life Coach / Counselor', why: 'Uses their empathy and energy to inspire and guide clients.' },
        { field: 'Journalism / Acting', why: 'Allows them to explore different human stories and express themselves creatively.' },
    ],
    famousExamples: ['Robin Williams', 'Will Smith', 'Sandra Bullock', 'Michael Scott (The Office)'],
    relationships: [
        { area: 'Friendship', behavior: 'The social butterfly with a wide circle, but values deep, authentic talks.' },
        { area: 'Romance', behavior: 'Seeks a passionate, adventurous partnership full of growth and mutual exploration.' },
        { area: 'Communication', behavior: 'Warm, expressive, and full of ideas. Jumps between topics with infectious energy.' },
    ],
    growthPath: ['Develop focus and follow-through', 'Learn to value consistency and routine', 'Find peace in solitude'],
    archetypes: ['The free spirit', 'The passionate champion', 'The creative catalyst'],
  },
  'ISTJ': {
    title: 'The Inspector / Logistician',
    nicknames: ['The Rock', 'The Traditionalist', 'The Duty-Fulfiller'],
    typeCode: 'Introverted (I) – Sensing (S) – Thinking (T) – Judging (J)',
    population: '~12% of population',
    coreCharacteristics: [
        { trait: 'Responsible', description: 'Takes their duties seriously and can be counted on to see things through.' },
        { trait: 'Detail-Oriented', description: 'Notices and remembers specifics that others overlook, ensuring accuracy.' },
        { trait: 'Loyal', description: 'Steadfastly devoted to their family, organizations, and traditions.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Sensing (Si)', description: 'Compares present reality to a vast, detailed internal library of past experiences and facts.' },
        { functionName: 'Auxiliary – Extraverted Thinking (Te)', description: 'Organizes the external world logically and efficiently to meet goals.' },
        { functionName: 'Tertiary – Introverted Feeling (Fi)', description: 'Possesses a quiet, deeply-held set of personal values that guide their sense of duty.' },
        { functionName: 'Inferior – Extraverted Intuition (Ne)', description: 'Dislikes and distrusts abstract possibilities, preferring the tried-and-true. Can catastrophize under stress.' },
    ],
    strengths: [
        { strength: 'Unmatched Reliability', example: 'If they say they will do something, it gets done, correctly and on time.' },
        { strength: 'Practical Knowledge', example: 'A walking encyclopedia of facts and "how-to" information based on experience.' },
        { strength: 'Calm and Steady', example: 'Provides a stable, dependable presence in chaotic situations.' },
    ],
    weaknesses: [
        { weakness: 'Resistant to Change', description: 'Prefers established procedures and can be stubborn about adopting new methods.' },
        { weakness: 'Can Seem Insensitive', description: 'May prioritize logic and facts over emotional considerations in decisions.' },
        { weakness: 'Judgmental', description: 'Can be critical of those who don\'t follow the rules or meet their standards.' },
    ],
    idealCareers: [
        { field: 'Accounting / Finance', why: 'Requires precision, attention to detail, and adherence to rules.' },
        { field: 'Military / Law Enforcement', why: 'Values structure, duty, and clear chains of command.' },
        { field: 'Data Analysis / Engineering', why: 'Focuses on facts, accuracy, and proven systems.' },
    ],
    famousExamples: ['George Washington', 'Angela Merkel', 'Jeff Bezos', 'Hermione Granger (as a youth)'],
    relationships: [
        { area: 'Friendship', behavior: 'A loyal, dependable friend who shows they care through actions rather than words.' },
        { area: 'Romance', behavior: 'A traditional and committed partner who values stability, security, and shared routines.' },
        { area: 'Communication', behavior: 'Clear, direct, and fact-based. Not one for speculation or abstract debate.' },
    ],
    growthPath: ['Learn to be open to new possibilities', 'Practice expressing appreciation and positive feelings', 'Trust that not all change is bad'],
    archetypes: ['The reliable pillar of the community', 'The by-the-book investigator', 'The keeper of traditions'],
  },
  'ISFJ': {
    title: 'The Defender / Nurturer',
    nicknames: ['The Guardian', 'The Protector', 'The Helper'],
    typeCode: 'Introverted (I) – Sensing (S) – Feeling (F) – Judging (J)',
    population: '~13% of population (most common type)',
    coreCharacteristics: [
        { trait: 'Supportive', description: 'Finds great satisfaction in caring for others and ensuring their well-being.' },
        { trait: 'Dependable', description: 'Works tirelessly behind the scenes to maintain harmony and order.' },
        { trait: 'Detail-Oriented', description: 'Remembers important personal details about others (birthdays, preferences).' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Sensing (Si)', description: 'Holds a rich internal database of past experiences and details related to loved ones.' },
        { functionName: 'Auxiliary – Extraverted Feeling (Fe)', description: 'Uses their knowledge to anticipate others\' needs and maintain social harmony.' },
        { functionName: 'Tertiary – Introverted Thinking (Ti)', description: 'Develops a practical, logical understanding of things that matter to them.' },
        { functionName: 'Inferior – Extraverted Intuition (Ne)', description: 'Worries about negative possibilities and is often stressed by uncertainty.' },
    ],
    strengths: [
        { strength: 'Incredible Memory for Detail', example: 'Remembers your favorite meal and how you take your coffee after meeting once.' },
        { strength: 'Practical Service', example: 'Shows love by doing things for people, like cooking a meal or fixing a problem.' },
        { strength: 'Unwavering Loyalty', example: 'A fierce defender of their friends, family, and community.' },
    ],
    weaknesses: [
        { weakness: 'Neglects Own Needs', description: 'Can be so focused on others that they forget to take care of themselves.' },
        { weakness: 'Avoids Conflict', description: 'Dislikes confrontation and may repress their feelings to keep the peace.' },
        { weakness: 'Resists Change', description: 'Finds comfort in tradition and can be wary of new, untested ideas.' },
    ],
    idealCareers: [
        { field: 'Healthcare (Nursing, etc.)', why: 'Directly involves caring for the physical and emotional needs of others.' },
        { field: 'Teaching (especially early ed)', why: 'Allows them to nurture and guide others in a structured way.' },
        { field: 'Administration / Office Mgmt', why: 'Creates an orderly and supportive environment for others to succeed.' },
    ],
    famousExamples: ['Beyoncé', 'Queen Elizabeth II', 'Dr. Watson (Sherlock Holmes)', 'Samwise Gamgee (Lord of the Rings)'],
    relationships: [
        { area: 'Friendship', behavior: 'The reliable "rock" of the friend group, always ready with a helping hand.' },
        { area: 'Romance', behavior: 'A nurturing and traditional partner who values security and a harmonious home life.' },
        { area: 'Communication', behavior: 'Warm and considerate, but may not directly state their own needs or grievances.' },
    ],
    growthPath: ['Learn to say "no" and set boundaries', 'Practice asserting personal needs', 'Embrace small, positive changes'],
    archetypes: ['The loyal guardian', 'The quiet caregiver', 'The pillar of the community'],
  },
  'ESTJ': {
    title: 'The Supervisor / Executive',
    nicknames: ['The Administrator', 'The Enforcer', 'The Manager'],
    typeCode: 'Extraverted (E) – Sensing (S) – Thinking (T) – Judging (J)',
    population: '~9% of population',
    coreCharacteristics: [
        { trait: 'Organized', description: 'Excels at creating order, structure, and clear processes.' },
        { trait: 'Direct & Outspoken', description: 'States their opinions and expectations clearly and honestly.' },
        { trait: 'Duty-Bound', description: 'Believes in upholding traditions and ensuring everyone does their part.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Thinking (Te)', description: 'Organizes the external world with logic, schedules, and clear, measurable goals.' },
        { functionName: 'Auxiliary – Introverted Sensing (Si)', description: 'Relies on a detailed memory of past experiences and proven methods to make decisions.' },
        { functionName: 'Tertiary – Extraverted Intuition (Ne)', description: 'Can brainstorm practical solutions and enjoys engaging in social, energetic activities.' },
        { functionName: 'Inferior – Introverted Feeling (Fi)', description: 'Is often uncomfortable with their own and others\' emotions, preferring to focus on tasks.' },
    ],
    strengths: [
        { strength: 'Superb Project Management', example: 'Can take a chaotic project and whip it into shape with a clear plan and roles.' },
        { strength: 'Honest & Direct Feedback', example: 'You always know where you stand with them.' },
        { strength: 'Community Leadership', example: 'Often found organizing local events, clubs, or civic groups.' },
    ],
    weaknesses: [
        { weakness: 'Inflexible & Stubborn', description: 'Can be resistant to new ideas that challenge established "by-the-book" methods.' },
        { weakness: 'Can Seem Insensitive', description: 'May prioritize getting the job done over considering people\'s feelings.' },
        { weakness: 'Judgmental of Difference', description: 'May struggle to understand or value lifestyles that differ from their own.' },
    ],
    idealCareers: [
        { field: 'Management / Administration', why: 'Perfectly suited for organizing people and processes.' },
        { field: 'Law Enforcement / Judge', why: 'Upholds rules, order, and traditions within a clear system.' },
        { field: 'Financial Planning', why: 'Applies proven, logical methods to create secure outcomes.' },
    ],
    famousExamples: ['Judge Judy', 'John D. Rockefeller', 'Lyndon B. Johnson', 'Dwight Schrute (The Office)'],
    relationships: [
        { area: 'Friendship', behavior: 'Organizes group activities and values friends who are reliable and straightforward.' },
        { area: 'Romance', behavior: 'A stable, traditional partner who provides security and expects clear commitments.' },
        { area: 'Communication', behavior: 'Direct, clear, and action-oriented. Gets straight to the point.' },
    ],
    growthPath: ['Practice considering the emotional side of decisions', 'Be open to unconventional ideas', 'Learn to relax and go with the flow'],
    archetypes: ['The tough but fair boss', 'The respected community leader', 'The upholder of rules'],
  },
  'ESFJ': {
    title: 'The Consul / Provider',
    nicknames: ['The Host', 'The Caregiver', 'The Social Connector'],
    typeCode: 'Extraverted (E) – Sensing (S) – Feeling (F) – Judging (J)',
    population: '~12% of population',
    coreCharacteristics: [
        { trait: 'Socially Attuned', description: 'The ultimate "people person," naturally sensing the mood and needs of a group.' },
        { trait: 'Warm & Nurturing', description: 'Gains energy from making others feel comfortable, included, and happy.' },
        { trait: 'Practical', description: 'Focuses on tangible, real-world ways to help and support their community.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Feeling (Fe)', description: 'Drives them to connect with others, maintain social harmony, and uphold community values.' },
        { functionName: 'Auxiliary – Introverted Sensing (Si)', description: 'Remembers important details about people and traditions, using this to care for them.' },
        { functionName: 'Tertiary – Extraverted Intuition (Ne)', description: 'Enjoys exploring new social activities and ways to bring people together.' },
        { functionName: 'Inferior – Introverted Thinking (Ti)', description: 'Dislikes impersonal criticism and can struggle with detached, logical analysis.' },
    ],
    strengths: [
        { strength: 'Community Building', example: 'Effortlessly organizes parties, events, and groups that make everyone feel welcome.' },
        { strength: 'Practical Caregiving', example: 'Shows love through actions: remembering birthdays, cooking meals, offering help.' },
        { strength: 'Social Graces', example: 'Navigates social situations with ease, smoothing over conflict and fostering connection.' },
    ],
    weaknesses: [
        { weakness: 'Sensitive to Criticism', description: 'Can be deeply hurt by disapproval or conflict within their social circle.' },
        { weakness: 'Approval-Seeking', description: 'Their self-worth can be too dependent on the happiness and approval of others.' },
        { weakness: 'May Be Intrusive', description: 'Their desire to help can sometimes cross boundaries into being controlling.' },
    ],
    idealCareers: [
        { field: 'Event Planning / Hospitality', why: 'Focuses on creating positive experiences and caring for guests.' },
        { field: 'Nursing / Primary Care', why: 'Allows them to provide practical, hands-on care for others.' },
        { field: 'Human Resources / Recruiting', why: 'Connects people and fosters a positive, harmonious work environment.' },
    ],
    famousExamples: ['Taylor Swift', 'Jennifer Lopez', 'Bill Clinton', 'Monica Geller (Friends)'],
    relationships: [
        { area: 'Friendship', behavior: 'The heart of the social circle, the one who makes plans and keeps everyone connected.' },
        { area: 'Romance', behavior: 'A devoted, nurturing partner who loves creating a beautiful, harmonious home life.' },
        { area: 'Communication', behavior: 'Warm, engaging, and focused on shared feelings and experiences.' },
    ],
    growthPath: ['Develop a stronger sense of self independent of others\' approval', 'Learn to handle conflict directly', 'Accept that you can\'t please everyone'],
    archetypes: ['The gracious host', 'The tireless community volunteer', 'The popular cheerleader'],
  },
  'ISTP': {
    title: 'The Virtuoso / Craftsman',
    nicknames: ['The Mechanic', 'The Problem-Solver', 'The Operator'],
    typeCode: 'Introverted (I) – Sensing (S) – Thinking (T) – Perceiving (P)',
    population: '~5% of population',
    coreCharacteristics: [
        { trait: 'Hands-On', description: 'Learns by doing and excels at mastering physical tools and systems.' },
        { trait: 'Resourceful', description: 'A natural troubleshooter who can solve complex practical problems with ease.' },
        { trait: 'Independent', description: 'Values freedom and autonomy, preferring to work alone and on their own terms.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Thinking (Ti)', description: 'Analyzes how things work, creating a deep, internal understanding of logical systems.' },
        { functionName: 'Auxiliary – Extraverted Sensing (Se)', description: 'Engages with the physical world in the present moment, gathering data through action.' },
        { functionName: 'Tertiary – Introverted Intuition (Ni)', description: 'Can have sudden flashes of insight about how a system will play out in the future.' },
        { functionName: 'Inferior – Extraverted Feeling (Fe)', description: 'Often unaware of and uncomfortable with social expectations and emotional expression.' },
    ],
    strengths: [
        { strength: 'Calm in a Crisis', example: 'Stays level-headed and acts decisively in high-stakes, emergency situations.' },
        { strength: 'Mastery of Tools', example: 'Can take apart, understand, and reassemble almost any mechanical object.' },
        { strength: 'Efficient Problem-Solving', example: 'Finds the most direct, practical solution without unnecessary steps.' },
    ],
    weaknesses: [
        { weakness: 'Emotionally Reserved', description: 'Can seem detached or unfeeling, struggling to express their inner state.' },
        { weakness: 'Easily Bored by Routine', description: 'Dislikes long-term commitments and rigid structures.' },
        { weakness: 'Risk-Prone', description: 'May engage in thrill-seeking behaviors without fully considering long-term consequences.' },
    ],
    idealCareers: [
        { field: 'Mechanical Engineering', why: 'Combines logical analysis with hands-on building and problem-solving.' },
        { field: 'Emergency Services (Fire, EMT)', why: 'Thrives in high-action environments that require calm, decisive action.' },
        { field: 'Pilot / Professional Driver', why: 'Involves mastery of a complex physical system in a dynamic environment.' },
    ],
    famousExamples: ['Clint Eastwood', 'Tom Cruise', 'Michael Jordan', 'James Bond'],
    relationships: [
        { area: 'Friendship', behavior: 'Prefers friends who share an activity or hobby, connecting through doing rather than talking.' },
        { area: 'Romance', behavior: 'An independent partner who needs freedom and shows love through practical acts of service.' },
        { area: 'Communication', behavior: 'Direct and concise, focused on the "what" and "how," not the "why" or "how it feels."' },
    ],
    growthPath: ['Learn to consider long-term consequences', 'Practice recognizing and articulating feelings', 'Commit to at least one long-term project'],
    archetypes: ['The lone wolf mechanic', 'The cool-headed action hero', 'The technical expert'],
  },
  'ISFP': {
    title: 'The Adventurer / Composer',
    nicknames: ['The Artist', 'The Free Spirit', 'The Aesthete'],
    typeCode: 'Introverted (I) – Sensing (S) – Feeling (F) – Perceiving (P)',
    population: '~9% of population',
    coreCharacteristics: [
        { trait: 'Artistic', description: 'Expresses themselves through aesthetics, whether in art, fashion, or their environment.' },
        { trait: 'Gentle & Kind', description: 'A warm, sensitive soul who dislikes conflict and values harmony.' },
        { trait: 'Spontaneous', description: 'Lives in the present moment and embraces new experiences as they come.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Feeling (Fi)', description: 'Guided by a deep, personal set of values and a quest for inner harmony and authenticity.' },
        { functionName: 'Auxiliary – Extraverted Sensing (Se)', description: 'Engages with the beauty and sensations of the immediate physical world.' },
        { functionName: 'Tertiary – Introverted Intuition (Ni)', description: 'Can have moments of abstract insight or symbolism that fuel their creativity.' },
        { functionName: 'Inferior – Extraverted Thinking (Te)', description: 'Dislikes and struggles with long-term planning, impersonal logic, and rigid structures.' },
    ],
    strengths: [
        { strength: 'Aesthetic Sensibility', example: 'Has a natural eye for color, texture, and composition, creating beautiful things.' },
        { strength: 'Live-in-the-Moment Charm', example: 'Finds joy in simple sensory pleasures and helps others do the same.' },
        { strength: 'Loyal and Supportive', example: 'A deeply caring friend and partner who values authentic connection.' },
    ],
    weaknesses: [
        { weakness: 'Fiercely Independent', description: 'Can be hard to get to know and may shut down when feeling controlled.' },
        { weakness: 'Unpredictable', description: 'Their go-with-the-flow nature can make them seem unreliable or non-committal.' },
        { weakness: 'Dislikes Criticism', description: 'Takes feedback very personally and may withdraw from perceived negativity.' },
    ],
    idealCareers: [
        { field: 'Graphic / Fashion Design', why: 'Directly applies their strong aesthetic sense and creativity.' },
        { field: 'Musician / Fine Artist', why: 'Allows for personal expression and a focus on sensory craft.' },
        { field: 'Veterinarian / Animal Care', why: 'Connects with their gentle, nurturing side in a hands-on way.' },
    ],
    famousExamples: ['Michael Jackson', 'Britney Spears', 'Frida Kahlo', 'Harry Potter'],
    relationships: [
        { area: 'Friendship', behavior: 'Prefers a small group of close, trusted friends to share experiences with.' },
        { area: 'Romance', behavior: 'A caring and attentive partner who needs freedom and values sensory and emotional connection.' },
        { area: 'Communication', behavior: 'Gentle and supportive, but often expresses themselves better through actions than words.' },
    ],
    growthPath: ['Develop long-term planning skills', 'Learn to accept and process constructive criticism', 'Practice asserting their own needs'],
    archetypes: ['The quiet artist', 'The gentle free spirit', 'The compassionate wanderer'],
  },
  'ESTP': {
    title: 'The Dynamo / Entrepreneur',
    nicknames: ['The Persuader', 'The Promoter', 'The Daredevil'],
    typeCode: 'Extraverted (E) – Sensing (S) – Thinking (T) – Perceiving (P)',
    population: '~4% of population',
    coreCharacteristics: [
        { trait: 'Action-Oriented', description: 'Jumps into the middle of the action, learning and adapting on the fly.' },
        { trait: 'Bold & Energetic', description: 'Loves taking risks and thrives in high-energy, competitive environments.' },
        { trait: 'Perceptive', description: 'Quickly reads people and situations, spotting opportunities others miss.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Sensing (Se)', description: 'Constantly scans the immediate environment for opportunities to act and engage.' },
        { functionName: 'Auxiliary – Introverted Thinking (Ti)', description: 'Uses a pragmatic, internal logic to solve problems in the most efficient way.' },
        { functionName: 'Tertiary – Extraverted Feeling (Fe)', description: 'Can be surprisingly charming and persuasive, using social skills to achieve goals.' },
        { functionName: 'Inferior – Introverted Intuition (Ni)', description: 'Dislikes long-term planning and abstract theory, can miss the bigger picture.' },
    ],
    strengths: [
        { strength: 'Adaptability', example: 'Can change tactics instantly to respond to a new challenge or opportunity.' },
        { strength: 'Master Negotiator', example: 'Reads the room and uses logic and charm to get the best deal.' },
        { strength: 'Inspiring Action', example: 'Their energy and confidence motivate others to get things done.' },
    ],
    weaknesses: [
        { weakness: 'Impulsive', description: 'May leap before they look, ignoring long-term consequences.' },
        { weakness: 'Can Be Insensitive', description: 'May see people as tools to achieve a goal, overlooking their feelings.' },
        { weakness: 'Gets Bored Easily', description: 'Loses interest once a challenge is conquered and struggles with maintenance.' },
    ],
    idealCareers: [
        { field: 'Sales / Business Development', why: 'High-energy, goal-oriented, and requires strong persuasive skills.' },
        { field: 'Entrepreneurship', why: 'Perfect for the risk-taking, fast-paced world of startups.' },
        { field: 'Emergency Services / Military', why: 'Thrives on action, risk, and thinking on their feet.' },
    ],
    famousExamples: ['Donald Trump', 'Madonna', 'Jack Nicholson', 'Han Solo (Star Wars)'],
    relationships: [
        { area: 'Friendship', behavior: 'The fun, adventurous friend who is always up for a good time.' },
        { area: 'Romance', behavior: 'Seeks a fun-loving "partner in crime" who enjoys spontaneity and excitement.' },
        { area: 'Communication', behavior: 'Direct, witty, and action-oriented. Prefers to do things rather than talk about them.' },
    ],
    growthPath: ['Think about the long-term impact of actions', 'Develop empathy and consider others\' feelings', 'Practice patience and commitment'],
    archetypes: ['The charismatic daredevil', 'The street-smart entrepreneur', 'The smooth-talking negotiator'],
  },
  'ESFP': {
    title: 'The Performer / Entertainer',
    nicknames: ['The Life of the Party', 'The Showman', 'The Mover'],
    typeCode: 'Extraverted (E) – Sensing (S) – Feeling (F) – Perceiving (P)',
    population: '~9% of population',
    coreCharacteristics: [
        { trait: 'Fun-Loving', description: 'Sees life as a party and wants everyone to have a good time.' },
        { trait: 'Spontaneous', description: 'Lives in the moment and loves turning the everyday into an adventure.' },
        { trait: 'Charming', description: 'Effortlessly draws people in with their warmth, energy, and generosity.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Sensing (Se)', description: 'Fully engaged with the sights, sounds, and sensations of the present moment.' },
        { functionName: 'Auxiliary – Introverted Feeling (Fi)', description: 'Guided by a deep, personal sense of values and what feels right to them.' },
        { functionName: 'Tertiary – Extraverted Thinking (Te)', description: 'Can be surprisingly practical and organized when it comes to planning fun events.' },
        { functionName: 'Inferior – Introverted Intuition (Ni)', description: 'Avoids thinking about long-term consequences and can be stressed by abstract, negative possibilities.' },
    ],
    strengths: [
        { strength: 'Social Magnetism', example: 'The natural center of attention, making everyone feel included and energized.' },
        { strength: 'Generosity', example: 'Loves showering friends and loved ones with gifts, compliments, and fun experiences.' },
        { strength: 'Practical Optimism', example: 'Finds joy in the here and now and encourages others to do the same.' },
    ],
    weaknesses: [
        { weakness: 'Conflict Avoidant', description: 'Dislikes negativity and may ignore problems in the hope they go away.' },
        { weakness: 'Easily Bored', description: 'Struggles with routine and long-term planning, always seeking the next thrill.' },
        { weakness: 'Sensitive to Criticism', description: 'Their desire to be liked makes them vulnerable to disapproval.' },
    ],
    idealCareers: [
        { field: 'Performing Arts / Acting', why: 'A natural stage for their energy, charm, and emotional expression.' },
        { field: 'Event Planning / Tourism', why: 'Focuses on creating fun, memorable experiences for others.' },
        { field: 'Primary Education / Childcare', why: 'Their playful energy makes them excellent with children.' },
    ],
    famousExamples: ['Marilyn Monroe', 'Adele', 'Jamie Oliver', 'Peter Pan'],
    relationships: [
        { area: 'Friendship', behavior: 'The friend who gets the party started and makes sure everyone is having fun.' },
        { area: 'Romance', behavior: 'A spontaneous and affectionate partner who loves grand gestures and shared adventures.' },
        { area: 'Communication', behavior: 'Warm, enthusiastic, and focused on shared experiences and having a good time.' },
    ],
    growthPath: ['Develop a long-term financial plan', 'Learn to face and resolve conflict directly', 'Find value in quiet, reflective time'],
    archetypes: ['The charismatic entertainer', 'The life of the party', 'The generous friend'],
  },
};
