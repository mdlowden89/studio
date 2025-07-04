
export interface MbtiTypeDetails {
  title: string;
  nicknames: string[];
  typeCode: string;
  population: string;
  coreCharacteristics: { trait: string; description: string }[];
  cognitiveStack: { functionName: string; description: string }[];
  strengths: { strength: string; description: string }[];
  weaknesses: { weakness: string; description: string }[];
  idealCareers: { field: string; why: string }[];
  famousExamples: string[];
  relationships: { area: string; behavior: string }[];
  growthPath: string[];
  archetypes: string[];
  relationshipDeepDive?: any; // Using 'any' for flexibility as structure might vary
}

export const mbtiTypeDetails: Record<string, any> = {
  'INTJ': {
    title: 'The Mastermind / Architect',
    nicknames: ['The Strategist', 'The Visionary', 'The Chessmaster'],
    typeCode: 'Introverted (I) – Intuitive (N) – Thinking (T) – Judging (J)',
    population: '~2% overall (0.8% women, 3.3% men)',
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
      { strength: 'Long-Term Visionaries', description: 'Create scalable, efficient systems and solutions far ahead of their time.' },
      { strength: 'Strategic Thinkers', description: 'Break complex problems down and solve them with precision.' },
      { strength: 'Self-Motivated', description: 'Work independently with laser-like focus.' },
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
    nicknames: ['The Analyst', 'The Inventor', 'The Architect of Ideas'],
    typeCode: 'Introverted (I) – Intuitive (N) – Thinking (T) – Perceiving (P)',
    population: '~3% overall (more common among men)',
    coreCharacteristics: [
      { trait: 'Analytical', description: 'Constantly questioning, dissecting, and analyzing ideas and systems. Nothing is accepted at face value.' },
      { trait: 'Curious', description: 'Fascinated by "why" — they chase knowledge for its own sake and often have deep knowledge across obscure topics.' },
      { trait: 'Abstract Thinker', description: 'Think in models, frameworks, and hypotheticals. Prefer exploring possibilities over hard conclusions.' },
    ],
    cognitiveStack: [
      { functionName: 'Dominant – Introverted Thinking (Ti)', description: 'Seeks internal logical consistency. Dissects systems and theories in extreme detail. Often lost in thought, optimizing mental models.' },
      { functionName: 'Auxiliary – Extraverted Intuition (Ne)', description: 'Explores endless possibilities, patterns, and connections. Loves brainstorming, playing with ideas, what-ifs. Can jump from topic to topic rapidly.' },
      { functionName: 'Tertiary – Introverted Sensing (Si)', description: 'Stores and references past facts and data. May cling to personal routines or nostalgia under stress. Not dominant, but grounds their logic in memory.' },
      { functionName: 'Inferior – Extraverted Feeling (Fe)', description: 'Struggles with emotional expression. Can come off as detached, despite caring deeply. May “overcorrect” by people-pleasing when insecure.' },
    ],
    strengths: [
      { strength: 'Innovative & Original', description: 'Natural inventors who thrive in new, undefined territory.' },
      { strength: 'Objective & Rational', description: 'Unbiased and logical — driven by truth, not emotion.' },
      { strength: 'Independent Thinkers', description: 'Prefer to solve problems their own way; self-motivated learners.' },
      { strength: 'Theoretical Mastery', description: 'Can spend hours building mental blueprints of how the world works.' },
      { strength: 'Flexible Minds', description: 'Open to new data and quick to adapt ideas when proven wrong.' },
    ],
    weaknesses: [
      { weakness: 'Poor with Execution', description: 'May get stuck in analysis or abandon projects when the excitement fades.' },
      { weakness: 'Socially Distant', description: 'Can seem cold or aloof, even to people they like.' },
      { weakness: 'Overthinkers', description: 'Often paralyzed by too many possibilities or fear of imperfection.' },
      { weakness: 'Sensitive to Criticism (ironically)', description: 'Though logical, personal feedback can sting deeply.' },
      { weakness: 'Can Appear Disengaged', description: 'Easily lost in thought, may not respond well to emotional bids.' },
    ],
    idealCareers: [
      { field: 'Researcher / Scientist', why: 'Intellectual freedom to test and discover.' },
      { field: 'Software Developer / Engineer', why: 'Logical puzzles, systems design, and innovation.' },
      { field: 'Philosopher / Academic', why: 'Deep theoretical exploration is their bread and butter.' },
      { field: 'Data Analyst / Mathematician', why: 'Precision and conceptual clarity.' },
      { field: 'Inventor / Startup Ideator', why: 'Perfect for building new ideas from the ground up (though best partnered with a closer).' },
    ],
    famousExamples: ['Albert Einstein', 'Marie Curie', 'Bill Gates', 'Neo (The Matrix)', 'Lisa Simpson'],
    growthPath: ['Improve Follow-Through – Learn to set deadlines, simplify, and take imperfect action.', 'Tune into Emotions – Practice emotional awareness and expression, even if it\'s awkward at first.', 'Collaborate More – Don’t isolate — partners and teammates can help realize your brilliant ideas.', 'Prioritize the Present – Don’t let endless theorizing rob you of action or joy in the now.'],
    archetypes: ['The Philosopher Hacker – mysterious, brilliant, elusive'],
    relationshipDeepDive: {
      friendship: {
        title: "Friendship",
        coreNeeds: "Mental stimulation, independence, honesty.",
        howTheyShowUp: "INTPs form very few close friendships, but those they do form are deep and enduring. They prefer intellectual connection over shared activity — a deep, meandering chat on a park bench can mean more than a party invite. They tend to bond with people who challenge their ideas but respect their boundaries. They are emotionally slow to open up, but when they do, they’re fiercely loyal, showing it in subtle ways (like sending you obscure articles at 3 a.m.). They dislike clinginess, emotional drama, or demands for constant availability.",
      },
      romance: {
        title: "Romance",
        coreNeeds: "Autonomy, shared curiosity, mental chemistry.",
        howTheyLove: "INTPs approach love like a mystery to be explored: slowly, methodically, and with deep fascination. They crave a partner who engages their intellect but doesn’t demand emotional intensity. They express affection through actions like sending interesting books, analyzing your problems, and quiet acts of loyalty. They may struggle with romantic rituals or expressing emotions clearly and can overanalyze feelings.",
        idealPartner: "Someone emotionally intelligent but non-invasive, curious, independent, and who understands that love can be shown in subtle, thoughtful ways."
      },
      communication: {
        title: "Communication Style",
        primaryTraits: "Witty, analytical, unfiltered, curious.",
        howToCommunicate: "Be clear and direct. Stimulate their mind with 'why' questions and thought experiments. Don’t interpret their silence as disinterest — they are likely processing internally. They prefer written communication or long-form thought and enjoy debating for fun, not as conflict."
      },
      compatibility: {
        title: "Compatibility & Ideal Matches",
        summary: "INTPs often do best with partners who balance their internal world with external warmth and structure.",
        commonMatches: [
          { type: "ENFP – The Inspirer", reason: "Brings energy, spontaneity, and emotional warmth that draws the INTP out of their shell. Brainstorm soulmates." },
          { type: "INFP – The Idealist", reason: "Both introverted, idealistic, and curious. Deep conversations, shared values, and emotional safety." },
          { type: "INFJ – The Counselor", reason: "Offers grounding, deep intuition, and emotional understanding. INTP feels safe to explore." },
          { type: "ENFJ – The Teacher", reason: "Emotionally expressive, outwardly focused, and great at helping the INTP articulate feelings and build connection." }
        ]
      },
      summary: {
        title: "INTP in Crossd Compatibility Storytelling",
        text: "“They won’t sweep you off your feet with roses and poetry. But if they’re sending you weird science memes, late-night thoughts about black holes, or building a system to help you stay organized — they’re all in.”"
      }
    },
    relationships: [], // Fallback for original structure
  },
  'ENTJ': {
    title: 'The Commander / Executive',
    nicknames: ['The Strategist', 'The CEO', 'The General'],
    typeCode: 'Extraverted (E) – Intuitive (N) – Thinking (T) – Judging (J)',
    population: '~2% overall (more common among men)',
    coreCharacteristics: [
        { trait: 'Bold', description: 'ENTJs aren’t afraid to make decisions, take charge, or push boundaries. They naturally lead — whether invited or not.' },
        { trait: 'Decisive', description: 'Known for making fast, clear decisions based on logic and efficiency, not emotional hesitation.' },
        { trait: 'Efficient Leader', description: 'They thrive on improving systems, leading teams, and pushing people (and themselves) to reach the top.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Thinking (Te)', description: 'Seeks efficiency, logic, and results in the external world. Commands attention through clarity, organization, and drive. Natural leader in both crisis and structure.' },
        { functionName: 'Auxiliary – Introverted Intuition (Ni)', description: 'Supports long-term vision, patterns, and future outcomes. Allows ENTJs to see where things are heading and plan accordingly. Big-picture thinkers with 5-year plans.' },
        { functionName: 'Tertiary – Extraverted Sensing (Se)', description: 'Engages with the external world in a tangible, present-focused way. Confident with sensory data, performance, presence. Can indulge in luxury or competition under stress.' },
        { functionName: 'Inferior – Introverted Feeling (Fi)', description: 'Struggles with emotional depth and vulnerability. May suppress or misunderstand their own values and feelings. Growth area: connecting emotionally with others and self.' },
    ],
    strengths: [
      { strength: 'Natural Leaders', description: 'Commanding, confident, and decisive in group settings. People often follow their lead instinctively.' },
      { strength: 'Vision + Execution', description: 'Combines big-picture thinking (Ni) with rapid action (Te).' },
      { strength: 'Resilient and Driven', description: 'Failure is a lesson, not a wall. ENTJs push through setbacks like tanks.' },
      { strength: 'Clear Communicators', description: 'Straightforward, persuasive, and structured in expression.' },
      { strength: 'Highly Strategic', description: 'Systems, power structures, and hierarchies make sense to them intuitively. They know how to move up and optimize.' },
    ],
    weaknesses: [
      { weakness: 'Overbearing or Controlling', description: 'Can bulldoze over others’ opinions or feelings.' },
      { weakness: 'Emotionally Blunt', description: 'May dismiss emotional nuance as illogical or inefficient.' },
      { weakness: 'Workaholic Tendencies', description: 'Obsession with achievement can sacrifice relationships or health.' },
      { weakness: 'Intolerant of Incompetence', description: 'Has little patience for inefficiency or those who can’t keep up.' },
      { weakness: 'Neglecting Inner Values', description: 'Their weaker Fi may lead to poor emotional boundaries or ignoring personal meaning in pursuit of success.' },
    ],
    idealCareers: [
      { field: 'CEO / Executive', why: 'High-level control, strategy, impact, and results.' },
      { field: 'Entrepreneur / Founder', why: 'Loves building scalable systems and commanding growth.' },
      { field: 'Military / Law Enforcement Leader', why: 'Structure, discipline, and high-stakes leadership.' },
      { field: 'Corporate Strategist / Consultant', why: 'Solves complex business challenges with clarity.' },
      { field: 'Politics / Leadership Roles', why: 'Strong debater, persuasive speaker, values-driven when mature.' },
    ],
    famousExamples: ['Steve Jobs', 'Gordon Ramsay', 'Margaret Thatcher', 'Jay-Z', 'Miranda Priestly (The Devil Wears Prada)'],
    relationshipDeepDive: {
      friendship: {
        title: "Friendship",
        coreNeeds: "Ambition, competence, loyalty.",
        howTheyShowUp: "Selective but loyal once respect is earned. Prefers ambitious, competent friends. Dislikes passive-aggressiveness, laziness, or indecision. Often “mentors” friends, helping them reach their potential."
      },
      romance: {
        title: "Romance",
        coreNeeds: "Strength, intelligence, independence.",
        howTheyLove: "ENTJs approach relationships strategically, with long-term goals. Deeply loyal once committed, but don’t expect flowery romance. They show love through acts of service and by helping their partner grow. They struggle when emotions interrupt logic and may try to 'fix' problems rather than listen.",
        idealPartner: "Someone who challenges them, not just compliments them."
      },
      communication: {
        title: "Communication Style",
        primaryTraits: "Clear, concise, assertive.",
        howToCommunicate: "Be direct and logical. They say what they mean and mean what they say. Hates emotional manipulation or 'guessing games'. For them, vulnerability is not weakness, but it is difficult."
      },
      compatibility: {
        title: "Compatibility & Ideal Matches",
        summary: "ENTJs pair best with types who can balance their intensity with emotional intelligence, creativity, or flexibility — without being fragile.",
        commonMatches: [
          { type: "INFP – The Idealist", reason: "Brings depth, values, and emotional nuance ENTJs often lack. The quiet strength behind the power." },
          { type: "ENFP – The Campaigner", reason: "Energizes the ENTJ, keeps things light and fun while sharing big visions." },
          { type: "INFJ – The Counselor", reason: "Visionary and principled — adds emotional grounding to ENTJ’s strategic force." },
          { type: "INTP – The Thinker", reason: "Intellectual equals who challenge each other and enjoy deep debate." }
        ]
      },
       summary: {
          title: "ENTJ in Crossd Compatibility Storytelling",
          text: "Archetype: The Mastermind Leader — commanding presence, unstoppable vision\n\nDating Bio Prompt: “Ambitious AF. Don’t confuse confidence with arrogance — I just know what I want. Let’s build an empire, or at least crush trivia night.”\n\nIn-App Persona Card: “Meet the Commander ⚡ — bold, brilliant, and driven by purpose. They don’t just swipe — they strategize. If you’re ready to match ambition with fire, they’re your perfect counterpart.”"
       }
    },
    relationships: [
      { area: 'Friendship', behavior: 'Prefers ambitious, competent friends and often acts as a mentor.' },
      { area: 'Romance', behavior: 'Approaches relationships strategically with long-term goals, valuing strength and intelligence.' },
      { area: 'Communication', behavior: 'Clear, concise, and assertive, disliking emotional manipulation.' },
    ],
    growthPath: ['Practice active listening and value others\' input.', 'Develop emotional awareness and empathy.', 'Prioritize work-life balance and relationships.', 'Cultivate patience and mentor others.'],
    archetypes: ['The Mastermind Leader', 'The Commanding CEO', 'The Unstoppable Visionary'],
  },
  'ENTP': {
    title: 'The Debater / Visionary',
    nicknames: ['The Spark', 'The Inventor', 'The Maverick'],
    typeCode: 'Extraverted (E) – Intuitive (N) – Thinking (T) – Perceiving (P)',
    population: '~3–5% (more common among men)',
    coreCharacteristics: [
        { trait: 'Energetic', description: 'ENTPs are buzzing with mental and physical energy. They’re wired to move, talk, and ideate.' },
        { trait: 'Witty', description: 'They use humor like a scalpel — quick, sharp, and captivating.' },
        { trait: 'Idea-Driven', description: 'Constantly innovating, reframing, and asking “What if?” or “Why not?” They thrive on novelty and disruption.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Intuition (Ne)', description: 'Scans the environment for possibilities, patterns, and connections. Constantly brainstorming and ideating. Drives their love of chaos, novelty, and reframing assumptions.' },
        { functionName: 'Auxiliary – Introverted Thinking (Ti)', description: 'Dissects logic internally for accuracy and elegance. Fuels their love of debate and analysis. Less about external structure, more about “Is this idea clean and sound?”' },
        { functionName: 'Tertiary – Extraverted Feeling (Fe)', description: 'Aware of group dynamics and social harmony. Can be charming and persuasive, even manipulative when immature. In growth, this helps them lead with emotional intelligence.' },
        { functionName: 'Inferior – Introverted Sensing (Si)', description: 'Weakness in routine, repetition, or memory for details. May resist tradition, schedules, or anything that feels “trapped”. Under stress, can become fixated on past failures or become chaotic.' },
    ],
    strengths: [
        { strength: 'Inventive', description: 'Thrive in unstructured environments where new ideas are welcome.' },
        { strength: 'Dynamic Communicators', description: 'Can adapt on the fly, improvise, persuade, and entertain with ease.' },
        { strength: 'Fearless Explorers', description: 'Not afraid to challenge the status quo or take intellectual risks.' },
        { strength: 'Fast Learners', description: 'Pick up new skills quickly, especially when excited or challenged.' },
        { strength: 'Flexible Thinkers', description: 'Can see multiple sides of any issue, often playing devil’s advocate to reveal truth.' },
    ],
    weaknesses: [
        { weakness: 'Easily Bored', description: 'Hate repetition and routine. May abandon projects once the excitement fades.' },
        { weakness: 'Overly Argumentative', description: 'May debate just to provoke or test logic — even if it hurts someone.' },
        { weakness: 'Disorganized or Scatterbrained', description: 'Great at starting things, but struggle to follow through.' },
        { weakness: 'Can Struggle With Focus', description: 'Jump from idea to idea without finishing or refining.' },
        { weakness: 'May Prioritize Intellect Over Emotion', description: 'Risk overlooking how their words impact others emotionally.' },
    ],
    idealCareers: [
        { field: 'Entrepreneur / Startup Founder', why: 'ENTPs are natural risk-takers and visionaries who thrive on building something new.' },
        { field: 'Marketer / Brand Strategist', why: 'Their creativity, people-sense, and verbal charm are a killer combo.' },
        { field: 'Inventor / Creative Technologist', why: 'Love solving problems in unconventional ways.' },
    ],
    famousExamples: ['Mark Twain', 'Robert Downey Jr.', 'Thomas Edison', 'Robin Williams', 'The Joker (fictional)'],
    relationshipDeepDive: {
      friendship: {
        title: "Friendship",
        coreNeeds: "Mental stimulation, spontaneity, freedom.",
        howTheyShowUp: "ENTPs are social catalysts who bring energy to every circle. They are loyal to those who challenge their mind and let them be spontaneous. They hate being boxed in or judged. They dislike emotional heaviness, rigid schedules, or people who 'just don’t get jokes'."
      },
      romance: {
        title: "Romance",
        coreNeeds: "Intellectual chemistry, fun, freedom.",
        howTheyLove: "They fall fast and hard when intrigued. Their version of flirting is often mock-debating, asking deep or oddball questions, and making you laugh. They show love by sharing new ideas and turning everything into an adventure, but struggle with monotony and emotional consistency.",
        idealPartner: "Someone who can ground their ideas, respect their freedom, and stimulate their minds."
      },
      communication: {
        title: "Communication Style",
        primaryTraits: "Lightning-fast, witty, sarcastic, persuasive.",
        howToCommunicate: "They play devil’s advocate to explore ideas, not to hurt. They communicate through a mix of sarcasm, curiosity, and storytelling. Great at starting a fire, but not always great at maintaining it."
      },
      compatibility: {
        title: "Compatibility & Ideal Matches",
        summary: "ENTPs match well with types that can ground their ideas, respect their freedom, and stimulate their minds.",
        commonMatches: [
          { type: "INFJ – The Counselor", reason: "Grounded, emotionally intelligent, and deeply focused — provides stability to ENTP’s whirlwind." },
          { type: "INFP – The Idealist", reason: "Dreamy, curious, and emotionally rich — they connect over depth and possibilities." },
          { type: "ISFJ – The Protector", reason: "Provides structure and emotional consistency. Can be a surprising match when both grow." },
          { type: "ENTP – Another Visionary", reason: "A wild, chaotic love full of ideas, late nights, and competition. (But needs maturity to avoid implosion.)" }
        ]
      },
      summary: {
        title: "ENTP in Crossd Compatibility Storytelling",
        text: "Archetype: The Wild Spark with a Million Ideas\n\nDating Bio Prompt: “Part-time troublemaker, full-time brainstorm addict. Swipe if you like curiosity, chaos, and deep convos that turn into 3am adventures.”\n\nIn-App Persona Card: “Meet the Visionary ⚡ — unpredictable, captivating, and endlessly curious. They’ll challenge your ideas, charm your friends, and vanish into a startup pitch... but if they stay, you’ve sparked something rare.”"
      }
    },
    relationships: [
      { area: 'Friendship', behavior: 'Social catalysts who bring energy and are loyal to those who challenge them intellectually.' },
      { area: 'Romance', behavior: 'Falls fast when intrigued, flirts through debate, and loves adventure but struggles with monotony.' },
      { area: 'Communication', behavior: 'Lightning-fast, witty, and persuasive, often playing devil\'s advocate to explore ideas.' },
    ],
    growthPath: ['Learn to commit and see projects through', 'Consider the emotional impact of words', 'Value stability and routine'],
    archetypes: ['The clever inventor', 'The charismatic trickster', 'The startup visionary'],
  },
  'INFJ': {
    title: 'The Advocate / Counselor',
    nicknames: ['The Mystic', 'The Quiet Visionary', 'The Soul Architect'],
    typeCode: 'Introverted (I) – Intuitive (N) – Feeling (F) – Judging (J)',
    population: '~1% (rarest type, especially rare among men)',
    coreCharacteristics: [
      { trait: 'Quietly Visionary', description: 'Thinks in big, long-term patterns. May seem reserved, but is always planning something meaningful beneath the surface.' },
      { trait: 'Idealistic', description: 'Driven by core values, a deep sense of purpose, and a desire to improve humanity.' },
      { trait: 'Emotionally Intelligent', description: 'Reads people well, often understanding what others feel before they do. Creates deep, soul-level bonds.' },
    ],
    cognitiveStack: [
      { functionName: 'Dominant – Introverted Intuition (Ni)', description: 'Sees abstract patterns, future outcomes, and symbolic meaning. Feels “guided” by inner vision and alignment. Often experiences gut-level insight that feels almost prophetic.' },
      { functionName: 'Auxiliary – Extraverted Feeling (Fe)', description: 'Tunes into the emotional temperature of others. Tries to maintain harmony, support others, and avoid conflict. When mature, uses this to heal and uplift.' },
      { functionName: 'Tertiary – Introverted Thinking (Ti)', description: 'Seeks internal logical consistency. Enjoys refining complex ideas, but often kept private. Balances emotional instincts with quiet analysis.' },
      { functionName: 'Inferior – Extraverted Sensing (Se)', description: 'Struggles with being grounded in the present moment. May miss physical cues or become overwhelmed by too much sensory input. Under stress, may obsess over details or seek physical overindulgence.' },
    ],
    strengths: [
      { strength: 'Profound Emotional Insight', description: 'INFJs understand people deeply — beyond surface behaviors.' },
      { strength: 'Loyal & Purpose-Driven', description: 'They’re committed to values, causes, and people who align with their vision.' },
      { strength: 'Strategic Visionaries', description: 'Quiet but powerful planners. Think long-term, guided by their internal compass.' },
      { strength: 'Empathetic Healers', description: 'Often act as emotional anchors in relationships and groups.' },
      { strength: 'Deep Thinkers', description: 'Philosophical, symbolic, spiritual — always asking “Why does this matter?”' },
    ],
    weaknesses: [
      { weakness: 'Overthinkers', description: 'Can spiral into rumination or self-doubt when things aren’t aligned.' },
      { weakness: 'Burnout-Prone', description: 'Give so much to others they forget their own needs.' },
      { weakness: 'Conflict Avoidant', description: 'May suppress their own boundaries to preserve peace.' },
      { weakness: 'Can Be Too Idealistic', description: 'Expectations (of self or others) may be impossible to meet.' },
      { weakness: 'Withdraw Under Stress', description: 'May vanish, ghost, or emotionally retreat without warning.' },
    ],
    idealCareers: [
      { field: 'Therapist / Counselor', why: 'Deep listening, healing energy, emotional intelligence.' },
      { field: 'Writer / Novelist', why: 'Express inner world, abstract ideas, and vision through story.' },
      { field: 'Spiritual Guide / Coach', why: 'INFJs often become mentors who guide others to purpose.' },
      { field: 'NGO / Activist / Advocate', why: 'They fight for causes they believe in with fierce quiet conviction.' },
      { field: 'Creative Director / Brand Strategist', why: 'Vision + values = potent creative force in leadership roles.' },
    ],
    famousExamples: ['Carl Jung', 'Mahatma Gandhi', 'Audrey Hepburn', 'Taylor Swift', 'Jon Snow (Game of Thrones)'],
    relationshipDeepDive: {
      friendship: {
        title: "Friendship",
        coreNeeds: "Deep, authentic connections, shared values, emotional safety.",
        howTheyShowUp: "INFJs prefer a small, close circle over large groups. Friendships are emotionally deep, often spiritual in feel. They listen deeply, support fiercely, and remember the little things. They often act as “the counselor” to others, but need someone to do the same for them. They dislike surface-level talk without emotional honesty, people who disregard values or emotional boundaries, and excessive chaos or people who “talk over” intuition.",
      },
      romance: {
        title: "Romance",
        coreNeeds: "Soulful connection, authenticity, emotional intimacy.",
        howTheyLove: "INFJs are hopeless idealists in love, but also cautiously private — they rarely fall quickly, but when they do, it’s soul-deep. They're drawn to authenticity, emotional intelligence, and depth — not games or ego. They crave a mental, emotional, and spiritual bond. When in love, they are gentle, thoughtful, poetic, extremely loyal and invested, and hyper-aware of their partner’s needs — sometimes to the point of self-neglect. Their challenge is speaking up about their own needs before emotional fatigue or resentment builds.",
        idealPartner: "Someone authentic, emotionally intelligent, and who values depth.",
      },
      communication: {
        title: "Communication Style",
        primaryTraits: "Purposeful, graceful, metaphorical, gentle.",
        howToCommunicate: "They speak with purpose and grace — not loud, but impactful. Use metaphor, symbolism, and emotion when expressing ideas. Great at writing — may prefer written expression for complex emotions. Avoid conflict, but will draw firm boundaries when pushed too far. Need space before heavy conversations — their internal world is rich and needs time to translate.",
      },
      compatibility: {
        title: "Compatibility & Ideal Matches",
        summary: "INFJs pair best with types that either balance their emotional depth with spontaneity and warmth, or mirror their idealism and drive for meaning.",
        commonMatches: [
          { type: "ENFP – The Inspirer", reason: "Brings playful energy, keeps INFJs grounded in joy while respecting their depth." },
          { type: "INTP – The Thinker", reason: "Quiet minds with rich inner worlds — deep convos, shared independence." },
          { type: "ENFJ – The Teacher", reason: "Shared values, vision, and emotional fluency — a natural soulmate combo." },
          { type: "INFP – The Idealist", reason: "Spiritual/emotional resonance, deep empathy, and parallel inner intensity." }
        ]
      },
      summary: {
        title: "INFJ in Crossd Compatibility Storytelling",
        text: "Archetype: The Soul Whisperer — deeply private, quietly powerful, drawn to meaning over noise\n\nDating Bio Prompt: “Not here for the small talk — looking for someone to read between the lines, build something sacred, and maybe talk about the stars at 2am.”\n\nIn-App Persona Card: “Meet the Counselor 🌙 — mysterious, emotionally rich, and visionary to the core. If you’re craving connection that goes deeper than surface sparks, they’ll light your inner fire.”"
      }
    },
    relationships: [
        { area: 'Friendship', behavior: 'Prefers a small circle of deep, authentic connections and often acts as "the counselor."' },
        { area: 'Romance', behavior: 'A cautious but deeply loyal idealist seeking a soulful, spiritual, and authentic bond.' },
        { area: 'Communication', behavior: 'Purposeful and graceful, often using metaphors and preferring written expression for complex emotions.' },
    ],
    growthPath: ['Set boundaries to avoid burnout', 'Learn to express needs directly', 'Embrace practicality and "good enough"', 'Find healthy outlets for stress and communicate needs'],
    archetypes: ['The Soul Whisperer', 'The quiet visionary', 'The compassionate guide'],
  },
  'INFP': {
    title: 'The Mediator / Idealist',
    nicknames: ['The Dreamer', 'The Inner Flame', 'The Gentle Rebel'],
    typeCode: 'Introverted (I) – Intuitive (N) – Feeling (F) – Perceiving (P)',
    population: '~4% overall',
    coreCharacteristics: [
      { trait: 'Gentle', description: 'INFPs have a naturally soft, calming presence — but don’t mistake it for weakness.' },
      { trait: 'Introspective', description: 'Live in a rich internal world of thought, feeling, memory, and meaning.' },
      { trait: 'Values-Driven', description: 'Every action and decision is guided by a personal code of ethics, not external rules.' },
    ],
    cognitiveStack: [
      { functionName: 'Dominant – Introverted Feeling (Fi)', description: 'Strong internal value system. Deep emotional experiences, though often private. Integrity and authenticity are non-negotiable.' },
      { functionName: 'Auxiliary – Extraverted Intuition (Ne)', description: 'Constantly scans for possibilities, connections, and “what could be”. Fuels their creativity and imagination. Drawn to patterns in life, art, people, and meaning.' },
      { functionName: 'Tertiary – Introverted Sensing (Si)', description: 'Reflects on past experiences, draws meaning from memory. Can create strong nostalgia or sentimentality. Helps balance their idealism with learned lessons.' },
      { functionName: 'Inferior – Extraverted Thinking (Te)', description: 'Struggles with structure, time management, or decision-making under pressure. May resist hard logic or “shoulds” imposed by others. Growth area: setting external boundaries to protect internal peace.' },
    ],
    strengths: [
      { strength: 'Creativity & Imagination', description: 'Natural storytellers, artists, and creators of emotionally powerful work.' },
      { strength: 'Deep Empathy', description: 'Feel others\' pain and joy as if it were their own. Often drawn to healing professions.' },
      { strength: 'Authenticity', description: 'Driven to be true to themselves, no matter what others think.' },
      { strength: 'Moral Integrity', description: 'Will quietly defy the system if it violates their values.' },
      { strength: 'Quiet Loyalty', description: 'Fiercely devoted once trust is formed — loves with intensity and subtlety.' },
    ],
    weaknesses: [
      { weakness: 'Conflict Avoidant', description: 'Hates confrontation, may suppress needs to avoid hurting others.' },
      { weakness: 'Overly Idealistic', description: 'May hold unrealistic expectations of love, people, or self.' },
      { weakness: 'Disorganized or Unfocused', description: 'Struggles with schedules, deadlines, and routine.' },
      { weakness: 'Emotionally Overwhelmed', description: 'Feels things intensely and may retreat into isolation when overstimulated.' },
      { weakness: 'Takes Things Personally', description: 'May internalize criticism or social friction deeply, even if unintended.' },
    ],
    idealCareers: [
      { field: 'Poet / Novelist / Artist', why: 'Expression of emotion and inner truth through symbolic forms.' },
      { field: 'Counselor / Therapist', why: 'Deep empathy and emotional resonance with others’ struggles.' },
      { field: 'Storyteller / Filmmaker', why: 'Driven by the desire to inspire and share meaning through narratives.' },
      { field: 'Humanitarian / NGO Worker', why: 'Wants to heal the world, not dominate it.' },
      { field: 'Librarian / Archivist / Curator', why: 'Quiet, meaningful work rooted in knowledge and memory.' },
    ],
    famousExamples: ['J.R.R. Tolkien', 'Princess Diana', 'Audrey Tautou (Amélie)', 'William Shakespeare', 'Frodo Baggins'],
    relationshipDeepDive: {
        friendship: {
            title: 'Friendship',
            coreNeeds: 'Soul-bond friendships, emotional safety, and shared meaning.',
            howTheyShowUp: 'INFPs are selective but devoted friends who crave deep, authentic connections. They are great listeners but may need help articulating their own needs. They can become withdrawn if emotionally hurt and dislike shallow behavior or disrespect for boundaries.'
        },
        romance: {
            title: 'Romance',
            coreNeeds: 'Soulmate connection, emotional validation, and shared dreams.',
            howTheyLove: 'INFPs are true romantics who often idealize partners. They express love through symbolic gestures, heartfelt messages, and holding emotional space. Their biggest challenge is speaking up when unhappy, often suffering in silence.',
            idealPartner: 'Someone who respects their values, appreciates their rich inner world, and encourages their growth without judgment.'
        },
        communication: {
            title: 'Communication Style',
            primaryTraits: 'Symbolic, metaphorical, and gentle, but forceful when values are crossed.',
            howToCommunicate: 'INFPs often prefer writing to speaking as it allows for deeper processing. They thrive on emotional depth and require a feeling of safety before they open up completely. Avoid shallow conversation.'
        },
        compatibility: {
            title: 'Compatibility & Ideal Matches',
            summary: 'INFPs are best matched with partners who respect their values and appreciate their inner world. Both ENFJ and INFJ offer deep emotional connections, ENFP brings creative energy, and INTJ provides grounding structure.',
            commonMatches: [
                { type: 'ENFJ – The Teacher', reason: 'Guides the INFP into confidence while sharing deep emotional language.' },
                { type: 'INFJ – The Counselor', reason: 'Shared emotional depth and inner purpose. A rare, sacred connection.' },
                { type: 'ENFP – The Campaigner', reason: 'Playful and free-spirited with emotional resonance. Sparks creativity.' },
                { type: 'INTJ – The Mastermind', reason: 'Offers structure and vision. INFP softens INTJ; INTJ grounds INFP.' }
            ]
        },
        summary: {
            title: 'INFP in Crossd Compatibility Storytelling',
            text: 'Archetype: The Dreamer With a Fire Inside — gentle, poetic, and deeply authentic.\n\nDating Bio Prompt: “Lover of stories, late-night talks, and everything that makes life feel like a movie. Here to find magic, not just a match.”\n\nIn-App Persona Card: “Meet the Idealist 🌸 — soft-spoken, soul-deep, and guided by an inner fire. If you’re ready to be seen, not just swiped on, they’re your quiet spark.”'
        }
    },
    relationships: [
        { area: "Friendship", behavior: "Selectively devoted, craving soul-bond friendships that are emotionally rich and meaningful." },
        { area: "Romance", behavior: "A true romantic who idealizes partners and needs to feel emotionally seen and respected above all." },
        { area: "Communication", behavior: "Prefers writing to speaking, uses symbolism and metaphors, and requires emotional safety to open up." }
    ],
    growthPath: ['Practice setting boundaries', 'Develop practical organization skills', 'Learn to voice needs directly'],
    archetypes: ['The dreamer with a fire inside', 'The gentle rebel', 'The quiet idealist'],
  },
  'ENFJ': {
    title: 'The Protagonist / Teacher',
    nicknames: ['The Guide', 'The Uplifter', 'The Social Mentor'],
    typeCode: 'Extraverted (E) – Intuitive (N) – Feeling (F) – Judging (J)',
    population: '~2–3% (more common among women)',
    coreCharacteristics: [
        { trait: 'Charismatic', description: 'ENFJs naturally attract people with warmth, confidence, and sincerity. They’re usually the heart of any group.' },
        { trait: 'Supportive', description: 'They live to help others grow — emotionally, spiritually, or professionally.' },
        { trait: 'Organized', description: 'Big vision, real plans. ENFJs dream big but follow through with structure and passion.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Feeling (Fe)', description: 'Tunes deeply into others’ emotions and needs. Wants everyone to feel included, supported, and inspired. Motivated by harmony, growth, and relational alignment.' },
        { functionName: 'Auxiliary – Introverted Intuition (Ni)', description: 'Sees deeper meaning and potential in people and situations. Plans with purpose and forethought — they don’t just feel, they see a bigger path. Guides their “teacher” energy — always looking toward transformation.' },
        { functionName: 'Tertiary – Extraverted Sensing (Se)', description: 'Can be highly present and engaging in the moment. Loves experiences, aesthetics, and dynamic interaction. Helps them connect socially with flair and energy.' },
        { functionName: 'Inferior – Introverted Thinking (Ti)', description: 'May struggle with objective logic or emotionally detached analysis. Under stress, can become over-analytical or overcritical of themselves. Growth path involves balancing heart with clear mental frameworks.' },
    ],
    strengths: [
        { strength: 'Emotionally Attuned Leaders', description: 'Lead with heart, not ego. They know how to inspire and unify people.' },
        { strength: 'Motivators', description: 'See the best in others and know how to help them step into their potential.' },
        { strength: 'Great Communicators', description: 'Warm, expressive, and articulate — they connect with people across any divide.' },
        { strength: 'Organized & Visionary', description: 'Passionate, structured, and capable of making big dreams actionable.' },
        { strength: 'Loyal & Committed', description: 'They don’t take relationships lightly — if they love you, they’ll show up every time.' },
    ],
    weaknesses: [
        { weakness: 'Self-Neglect', description: 'May sacrifice their own needs while taking care of everyone else.' },
        { weakness: 'Overidealistic', description: 'Can expect too much from people and become disappointed when reality hits.' },
        { weakness: 'Conflict Avoidant', description: 'Might suppress their own opinions to keep peace or avoid hurting others.' },
        { weakness: 'People-Pleasing Tendencies', description: 'Overcommitted, emotionally exhausted from being “everything to everyone.”' },
        { weakness: 'Burnout-Prone', description: 'Their boundless giving can drain them quickly without boundaries.' },
    ],
    idealCareers: [
        { field: 'Teacher / Educator', why: 'Love helping others learn and grow in meaningful ways.' },
        { field: 'Public Speaker / Activist', why: 'Charismatic, values-driven, and emotionally persuasive.' },
        { field: 'Life Coach / Mentor / Therapist', why: 'Thrive in 1-on-1 or group guidance roles.' },
        { field: 'Campaign Manager / Diplomat', why: 'Great at organizing teams, balancing emotions, and pushing for meaningful causes.' },
        { field: 'Creative Director / Team Lead', why: 'Combines vision, leadership, and emotional cohesion.' },
    ],
    famousExamples: ['Oprah Winfrey', 'Barack Obama', 'Maya Angelou', 'Morpheus (The Matrix)', 'Leslie Knope (Parks & Rec)'],
    relationshipDeepDive: {
      friendship: {
        title: "Friendship",
        coreNeeds: "Shared growth, emotional resonance, loyalty.",
        howTheyShowUp: "ENFJs are the emotional glue in most of their friendships. They show up with energy, loyalty, and genuine interest. They often act as 'the therapist' in the group — they listen deeply, remember your dreams, and cheer you on. They dislike emotional coldness, friends who take but don’t give back, or feeling unappreciated."
      },
      romance: {
        title: "Romance",
        coreNeeds: "Shared mission, deep connection, appreciation.",
        howTheyLove: "ENFJs love with intensity and devotion — often seeking “the one” rather than flings. They fall in love with character and potential. In relationships, they’re thoughtful planners, extremely affectionate, and proactive about your needs — sometimes more than their own. Their challenge is making space for their own emotions and boundaries without guilt.",
        idealPartner: "Someone who can match their emotional presence, respect their vision, and help them slow down and turn inward when needed."
      },
      communication: {
        title: "Communication Style",
        primaryTraits: "Emotionally fluent, warm, and articulate.",
        howToCommunicate: "They read between the lines and speak from the heart, often acting as mediators or motivators. They need reassurance when they’ve “given too much” or fear being a burden."
      },
      compatibility: {
        title: "Compatibility & Ideal Matches",
        summary: "ENFJs thrive with partners who can match their emotional presence, respect their vision, and help them slow down and turn inward when needed.",
        commonMatches: [
          { type: 'INFP – The Idealist', reason: 'Emotional depth + dreamy vision — ENFJ guides while INFP inspires.' },
          { type: 'INFJ – The Counselor', reason: 'Shared values and deep connection — both committed and growth-oriented.' },
          { type: 'ISFP – The Gentle Soul', reason: 'Brings quiet presence and authenticity, grounding the ENFJ.' },
          { type: 'INTP – The Thinker', reason: 'Stimulates ENFJ intellectually while offering emotional balance (once trust is built).' }
        ]
      },
      summary: {
        title: "ENFJ in Crossd Compatibility Storytelling",
        text: "Archetype: The Heart-Led Leader — emotionally intelligent, visionary, and overflowing with warmth.\n\nDating Bio Prompt: “Here to connect for real — not just match. If you’re emotionally fluent, dream big, and care deeply… we’ll get along just fine.”\n\nIn-App Persona Card: “Meet the Teacher 🌟 — magnetic, nurturing, and full of purpose. They don’t play games — they build soul connections. If you’re looking for love that lifts you higher, this one’s your spark.”"
      }
    },
    growthPath: ['Prioritize self-care and set boundaries', 'Develop comfort with conflict and saying "no"', 'Ground idealism in reality', 'Recognize and manage energy levels'],
    archetypes: ['The Heart-Led Leader', 'The Social Mentor', 'The Uplifter'],
    relationships: [
        { area: 'Friendship', behavior: 'The emotional glue of their friend group, they act as cheerleaders and listeners.' },
        { area: 'Romance', behavior: 'An intense and devoted partner who loves planning and showing affection, but can be self-neglecting.' },
        { area: 'Communication', behavior: 'Warm, articulate, and emotionally fluent, skilled at mediating and motivating.' },
    ],
  },
  'ENFP': {
    title: 'The Campaigner / Inspirer',
    nicknames: ['The Free Spirit', 'The Spark', 'The Explorer of Hearts'],
    typeCode: 'Extraverted (E) – Intuitive (N) – Feeling (F) – Perceiving (P)',
    population: '~7–8% (more common among women)',
    coreCharacteristics: [
      { trait: 'Enthusiastic', description: 'ENFPs bring boundless energy, passion, and curiosity to every room they enter.' },
      { trait: 'Creative', description: 'They don’t just think outside the box — they live outside of it.' },
      { trait: 'People-Centered', description: 'Deeply empathetic, ENFPs are energized by authentic human connection and shared experiences.' },
    ],
    cognitiveStack: [
      { functionName: 'Dominant – Extraverted Intuition (Ne)', description: 'Constantly explores ideas, connections, and possibilities, loving spontaneity and novelty.' },
      { functionName: 'Auxiliary – Introverted Feeling (Fi)', description: 'Holds strong internal values and identity, craving authentic, value-aligned relationships.' },
      { functionName: 'Tertiary – Extraverted Thinking (Te)', description: 'When mature, helps them organize action toward goals and can make them charmingly persuasive.' },
      { functionName: 'Inferior – Introverted Sensing (Si)', description: 'Weak spot for routine and consistency; may struggle with follow-through or become scattered under stress.' },
    ],
    strengths: [
      { strength: 'Magnetic Energy', description: 'Infectiously positive, charismatic, and full of momentum.' },
      { strength: 'Emotional Insight', description: 'Reads emotional undercurrents with ease.' },
      { strength: 'Creativity & Innovation', description: 'Constantly generating new ideas and reimagining how things could be better.' },
    ],
    weaknesses: [
      { weakness: 'Easily Distracted', description: 'Excited by new things, may abandon old ones without closure.' },
      { weakness: 'Overcommitted', description: 'Says “yes” to everything — and then burns out.' },
      { weakness: 'Conflict Avoidant', description: 'May suppress issues to keep the vibe light, until pressure builds.' },
    ],
    idealCareers: [
      { field: 'Actor / Performer', why: 'Expressive, emotive, and engaging — thrives when allowed to shine.' },
      { field: 'Coach / Therapist', why: 'Uplift others through empathy, enthusiasm, and transformation.' },
      { field: 'Creative Director / Designer', why: 'Passion for aesthetics, vision, and originality.' },
    ],
    famousExamples: ['Robin Williams', 'Bob Ross', 'Ellen DeGeneres', 'Willy Wonka (fictional)', 'Anne Shirley (Anne of Green Gables)'],
    relationshipDeepDive: {
      friendship: {
        title: "Friendship",
        coreNeeds: "Emotional honesty, shared dreams, spontaneous adventure.",
        howTheyShowUp: "ENFPs love people deeply — friends are chosen family. Their friendships are built on emotional honesty, shared dreams, and spontaneous adventure. They’re fiercely loyal and always up for new ideas or weird convos. They dislike emotional coldness, rigid attitudes, and disrespect for their independence."
      },
      romance: {
        title: "Romance",
        coreNeeds: "Deep emotional chemistry, mental stimulation, fun.",
        howTheyLove: "Romantic idealists who fall in love with your soul. They seek deep emotional chemistry, mental stimulation, and fun. They love adventures in vulnerability. Their Challenge: Staying grounded when the honeymoon fades; they may chase a feeling rather than build a stable connection.",
        idealPartner: "Someone who offers depth, grounding, and room to breathe — they want someone who’s both a safe haven and an adventure partner."
      },
      communication: {
        title: "Communication Style",
        primaryTraits: "Energetic, animated, and emotionally charged.",
        howToCommunicate: "Use storytelling, metaphor, jokes, and powerful language. They know how to affirm and inspire but can become scattered if not centered. They hate being misunderstood, but also struggle to explain themselves fully under pressure."
      },
      compatibility: {
        title: "Compatibility & Ideal Matches",
        summary: "ENFPs match well with partners who offer depth, grounding, and room to breathe.",
        commonMatches: [
          { type: 'INFJ – The Counselor', reason: 'Quiet strength meets wild flame. A magical, values-driven pairing.' },
          { type: 'INTJ – The Mastermind', reason: 'Grounding structure with long-term vision. Opposites attract with depth.' },
          { type: 'INFP – The Idealist', reason: 'Shared values and emotion. A soulful, artistic connection.' },
          { type: 'ENFJ – The Teacher', reason: 'Emotionally mature, inspiring, and values-driven — a deeply aligned duo.' }
        ]
      },
      summary: {
        title: "ENFP in Crossd Compatibility Storytelling",
        text: "Archetype: The Wild Heart With Fire Eyes — imaginative, expressive, and unforgettable.\n\nDating Bio Prompt: “Here for someone who gets excited by weird questions, intense eye contact, and running through the city at night with no plan.”\n\nIn-App Persona Card: “Meet the Inspirer 🔥 — radiant, emotionally intelligent, and always halfway into a dream. They’re looking for someone who can handle the chaos, keep up with the passion, and dive into meaning at full speed.”"
      }
    },
    growthPath: ['Develop focus and follow-through', 'Learn to value consistency', 'Find peace in solitude'],
    archetypes: ['The Wild Heart With Fire Eyes', 'The imaginative explorer', 'The unforgettable spark'],
    relationships: [
        { area: 'Friendship', behavior: 'Their friendships are built on emotional honesty, shared dreams, and spontaneous adventure.' },
        { area: 'Romance', behavior: 'Romantic idealists who seek deep emotional chemistry and fun, but may struggle with consistency.' },
        { area: 'Communication', behavior: 'Energetic and animated, using storytelling and powerful language to connect.' },
    ],
  },
  'ISTJ': {
    title: 'The Inspector / Logistician',
    nicknames: ['The Duty-Doer', 'The Quiet Guardian', 'The System Keeper'],
    typeCode: 'Introverted (I) – Sensing (S) – Thinking (T) – Judging (J)',
    population: '~11–13% (more common among men)',
    coreCharacteristics: [
        { trait: 'Responsible', description: 'ISTJs take commitments seriously. If they say they’ll do it, consider it done — on time and by the book.' },
        { trait: 'Loyal', description: 'Relationships are sacred to them. Once they trust you, they’re in for the long haul.' },
        { trait: 'Detail-Focused', description: 'Notice the fine print, remember facts, and value precision in work and life.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Sensing (Si)', description: 'Focuses on tradition, memory, and routine. Stores and compares past experiences for reliability and structure. Prefers tried-and-true over untested theory.' },
        { functionName: 'Auxiliary – Extraverted Thinking (Te)', description: 'Seeks logic, efficiency, and measurable outcomes. Organizes the external world with clear systems and plans. Values order and discipline.' },
        { functionName: 'Tertiary – Introverted Feeling (Fi)', description: 'Quiet internal values and ethics — may not express, but deeply held. Can surprise others with strong personal morals once triggered.' },
        { functionName: 'Inferior – Extraverted Intuition (Ne)', description: 'May struggle with ambiguity, spontaneity, or open-ended exploration. Can feel overwhelmed by “what if” thinking or fast-paced ideation. Under stress, may catastrophize or resist innovation.' },
    ],
    strengths: [
        { strength: 'Consistency & Reliability', description: 'The most dependable personality type — they show up every time.' },
        { strength: 'Strong Memory & Attention to Detail', description: 'Notice what others miss. Great at systems, logistics, and recall.' },
        { strength: 'Loyal to Core Values', description: 'Though reserved, they stick to their internal code.' },
        { strength: 'Practical Problem-Solving', description: 'Not flashy — just solid, functional, and results-driven.' },
        { strength: 'Resilient & Duty-Oriented', description: 'Thrive in roles that demand structure, tradition, and honor.' },
    ],
    weaknesses: [
        { weakness: 'Resistant to Change', description: 'Prefer stability and can resist new ideas or “unconventional” people.' },
        { weakness: 'Overly Critical or Strict', description: 'Can be judgmental of those who don’t meet their standards.' },
        { weakness: 'Struggles With Emotion', description: 'May seem emotionally distant or uninterested in feelings.' },
        { weakness: 'Perfectionistic', description: 'Can focus so much on “doing it right” that they struggle with flexibility.' },
        { weakness: 'Work > Play', description: 'May view fun as unproductive or frivolous — needs encouragement to relax.' },
    ],
    idealCareers: [
        { field: 'Accountant / Auditor / Analyst', why: 'Precision, data, repeatable systems — ISTJ heaven.' },
        { field: 'Military Officer / Police / Security', why: 'Structure, duty, and chain of command align with their natural rhythm.' },
        { field: 'Engineer / Technician', why: 'Requires focus, detail, and predictable problem-solving.' },
        { field: 'Operations Manager / Project Coordinator', why: 'Handles timelines, systems, and logistics with skill.' },
        { field: 'Judge / Government Role', why: 'Values law, fairness, structure, and responsibility.' },
    ],
    famousExamples: ['George Washington', 'Angela Merkel', 'Natalie Portman', 'Eddard Stark (Game of Thrones)', 'Hermione Granger'],
    relationshipDeepDive: {
        friendship: {
            title: "Friendship",
            coreNeeds: 'Loyalty, consistency, shared routines.',
            howTheyShowUp: 'ISTJs may seem emotionally distant at first, but once they consider you a friend, they’ll show up consistently, help when it counts, and protect you quietly. They prefer structured friendships — regular meetups, shared routines, loyalty over novelty. They dislike drama, unpredictability, or people who say things they don’t mean.'
        },
        romance: {
            title: "Romance",
            coreNeeds: 'Commitment, responsibility, shared values.',
            howTheyLove: 'ISTJs are reserved but deeply loyal — they may not sweep you off your feet, but they’ll build a foundation you can stand on. They value commitment, responsibility, and shared values, often showing love through practical help (like fixing your sink) and providing stability. Their challenge is opening up emotionally and expressing feelings through words, not just actions.',
            idealPartner: 'Someone who values stability and consistency.'
        },
        communication: {
            title: "Communication",
            primaryTraits: 'Straightforward, factual, and often brief.',
            howToCommunicate: 'They dislike emotional guesswork or vague statements. They may unintentionally come off as cold or blunt and express love more through actions than flowery words. Say what you mean.'
        },
        compatibility: {
            title: "Compatibility & Ideal Matches",
            summary: 'ISTJs pair best with partners who respect structure and consistency, are emotionally grounded, and help soften their rigidity without overwhelming them.',
            commonMatches: [
                { type: 'ESFJ – The Provider', reason: 'Loyal, warm, and organized — creates a harmonious, supportive pairing.' },
                { type: 'ISFJ – The Defender', reason: 'Shares values and responsibility — mutual care and quiet love.' },
                { type: 'ESTP – The Dynamo', reason: 'Adds fun and spontaneity while grounding the ISTJ with respect.' },
                { type: 'INFP – The Idealist', reason: 'Unconventional but inspiring match — helps the ISTJ open emotionally (requires maturity).' }
            ]
        },
        summary: {
            title: "ISTJ in Crossd Compatibility Storytelling",
            text: 'Archetype: The Silent Guardian — steady, loyal, and quietly principled\n\nDating Bio Prompt: “I’m not flashy, I’m consistent. Loyalty over games. If you’re into stability, real connection, and shared goals — let’s talk.”\n\nIn-App Persona Card: “Meet the Inspector 🧱 — grounded, consistent, and fiercely loyal. They may not say much, but they’ll do more than most. A rock-solid presence in a world full of noise.”'
        }
    },
    relationships: [
      { area: 'Friendship', behavior: 'Prefers structured friendships based on loyalty and dislikes drama or unpredictability.' },
      { area: 'Romance', behavior: 'A reserved but deeply loyal partner who shows love through practical help and providing stability.' },
      { area: 'Communication', behavior: 'Straightforward and factual, expressing love more through actions than words.' },
    ],
    growthPath: [
        'Learn to be open to new possibilities', 
        'Practice expressing appreciation and positive feelings', 
        'Trust that not all change is bad'
    ],
    archetypes: ['The Silent Guardian', 'The steady, loyal, and quietly principled'],
  },
  'ISFJ': {
    title: 'The Defender / Nurturer',
    nicknames: ['The Gentle Protector', 'The Quiet Supporter', 'The Steady Heart'],
    typeCode: 'Introverted (I) – Sensing (S) – Feeling (F) – Judging (J)',
    population: '~9–14% (more common among women)',
    coreCharacteristics: [
        { trait: 'Kind', description: 'Naturally caring, empathetic, and warm — often the first to notice when someone’s struggling.' },
        { trait: 'Service-Oriented', description: 'Drawn to helping roles and acts of care — not for attention, but out of purpose.' },
        { trait: 'Dependable', description: 'Show up with consistency, attention to detail, and a love for tradition or routine.' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Introverted Sensing (Si)', description: 'Recalls and relies on past experience, routine, and memory. Values familiarity, consistency, and tradition. Notices fine details others overlook.' },
        { functionName: 'Auxiliary – Extraverted Feeling (Fe)', description: 'Prioritizes harmony and emotional well-being in the group. Reads people well and wants to meet their emotional needs. Often puts others before themselves.' },
        { functionName: 'Tertiary – Introverted Thinking (Ti)', description: 'Develops quiet internal logic. Helps with organization and systems behind-the-scenes. Not always vocal about it, but can be analytically sharp.' },
        { functionName: 'Inferior – Extraverted Intuition (Ne)', description: 'Hesitant with change, ambiguity, or abstract possibilities. Under stress, may catastrophize or feel overwhelmed by uncertainty. Growth area: leaning into new ideas without needing guaranteed outcomes.' },
    ],
    strengths: [
        { strength: 'Supportive to the Core', description: 'Show love through loyalty, thoughtful gestures, and acts of care.' },
        { strength: 'Patient & Present', description: 'Emotionally steady, not reactive or chaotic.' },
        { strength: 'Practical Empathy', description: 'Not just comforting — they do something about it.' },
        { strength: 'Incredible Memory for Details', description: 'Remember your birthday, your stress habits, your favorite snack — and use that info to support you.' },
        { strength: 'Quiet Resilience', description: 'Appear gentle, but will fiercely protect what (and who) they love.' },
    ],
    weaknesses: [
        { weakness: 'Avoids Conflict', description: 'May suppress needs or feelings to keep the peace.' },
        { weakness: 'Self-Critical', description: 'Underestimates their own worth, over-focuses on helping others.' },
        { weakness: 'Resistant to Change', description: 'Prefer comfort zones and can feel unsafe with ambiguity or upheaval.' },
        { weakness: 'Emotionally Bottled', description: 'May not voice their own frustrations until they silently burn out.' },
        { weakness: 'May Feel Invisible', description: 'Give so much to others that they often go unnoticed themselves.' },
    ],
    idealCareers: [
        { field: 'Nurse / Caregiver', why: 'Empathy, dependability, and emotional strength.' },
        { field: 'Librarian / Archivist', why: 'Love of order, calm, and serving others quietly.' },
        { field: 'Social Worker / Therapist', why: 'Gentle resilience with emotional intelligence.' },
        { field: 'Administrator / Organizer', why: 'Excellent at behind-the-scenes support and logistics.' },
        { field: 'Human Resources / Customer Care', why: 'Blend of emotional understanding and practical help.' },
    ],
    famousExamples: ['Mother Teresa', 'Rosa Parks', 'Beyoncé', 'Samwise Gamgee (The Lord of the Rings)', 'Steve Rogers / Captain America'],
    relationshipDeepDive: {
        friendship: {
            title: "Friendship",
            coreNeeds: "Loyalty, appreciation, emotional safety.",
            howTheyShowUp: "ISFJs are the friends who remember the little things and show up even when you didn’t ask. Often the emotional anchor of the group — nurturing, stabilizing, and consistent. They thrive in 1-on-1 friendships, especially with people who value kindness and loyalty. They are not attention-seeking; they prefer to be there, not be seen. They dislike flakiness, emotional insensitivity, or being taken for granted."
        },
        romance: {
            title: "Romance",
            coreNeeds: "Emotional security, consistency, appreciation.",
            howTheyLove: "ISFJs are quietly romantic and often give more than they receive. They show affection through thoughtful gestures, steady emotional support, and creating a safe, peaceful space. They're looking for emotional security, not chaos or superficial thrills. They can be extremely sensual and affectionate—but only once trust is earned. Their challenge is speaking up when they feel unappreciated or overburdened.",
            idealPartner: "A partner who is emotionally respectful and present, loyal, consistent, and protective, and who can draw out their inner world without overwhelming it."
        },
        communication: {
            title: "Communication Style",
            primaryTraits: "Gentle, emotionally considerate, and often understated.",
            howToCommunicate: "Excellent listeners, especially in emotional or personal conversations. They may struggle to express their own needs directly and prefer harmony over confrontation—but have a strong backbone when pushed too far. They often express themselves better through actions than through confrontation."
        },
        compatibility: {
            title: "Compatibility & Ideal Matches",
            summary: "ISFJs pair best with partners who are emotionally respectful and present, loyal, consistent, and protective, and able to draw out their inner world without overwhelming it.",
            commonMatches: [
                { type: 'ESFP – The Entertainer', reason: 'Brings joy and spontaneity, while respecting ISFJ’s grounding warmth.' },
                { type: 'ESTP – The Dynamo', reason: 'Adds fun and boldness while honoring tradition. Opposites that complement.' },
                { type: 'ENFJ – The Teacher', reason: 'Emotionally fluent, encouraging, and value-aligned. Helps ISFJ grow.' },
                { type: 'ISTJ – The Inspector', reason: 'Steady, principled, and practical — mutual love through service and routine.' }
            ]
        },
        summary: {
            title: "ISFJ in Crossd Compatibility Storytelling",
            text: "Archetype: The Quiet Guardian — dependable, nurturing, and fiercely devoted.\n\nDating Bio Prompt: “Not into games. I’ll show you I care by remembering the little things — not shouting the big ones. Loyalty means everything.”\n\nIn-App Persona Card: “Meet the Nurturer 🕊️ — gentle, grounded, and full of heart. They don’t fall fast, but they fall deep. If you want a partner who truly sees you — and stands beside you — they might be your soft landing.”"
        }
    },
    relationships: [
        { area: 'Friendship', behavior: 'A nurturing, stabilizing friend who remembers the little things and values loyalty.' },
        { area: 'Romance', behavior: 'A quietly romantic partner who shows love through thoughtful gestures and creating a safe space.' },
        { area: 'Communication', behavior: 'A gentle and considerate communicator who listens well but may struggle to express their own needs.' },
    ],
    growthPath: ['Learn to say "no" and set boundaries', 'Practice asserting personal needs', 'Embrace small, positive changes', 'Trust that you are valued for who you are, not just what you do'],
    archetypes: ['The Quiet Guardian', 'The dependable, nurturing, and fiercely devoted'],
  },
  'ESTJ': {
    title: 'The Supervisor / Executive',
    nicknames: ['The Commander', 'The Enforcer', 'The Organizer'],
    typeCode: 'Extraverted (E) – Sensing (S) – Thinking (T) – Judging (J)',
    population: '~8–10% (more common among men)',
    coreCharacteristics: [
        { trait: 'Organized', description: 'Loves structure, systems, and predictable processes — thrives with order.' },
        { trait: 'Commanding', description: 'Takes charge without hesitation. Often seen as the leader in any group.' },
        { trait: 'Straightforward', description: 'Honest, blunt, and action-focused — no sugarcoating, just results.' }
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Thinking (Te)', description: 'Values efficiency, organization, and measurable outcomes. Prefers action over theory — wants to see things DONE. Leads others by building order and enforcing standards.' },
        { functionName: 'Auxiliary – Introverted Sensing (Si)', description: 'Relies on proven systems and past experience. Trusts tradition and routines that have worked before. Values familiarity, loyalty, and discipline.' },
        { functionName: 'Tertiary – Extraverted Intuition (Ne)', description: 'Can brainstorm new possibilities — but prefers tested ideas. May enjoy conceptual play when relaxed, but defaults to logic. Helps them adapt, but usually only once they’ve hit a wall.' },
        { functionName: 'Inferior – Introverted Feeling (Fi)', description: 'Feels emotions deeply but keeps them hidden. May not fully understand or express their own emotional values. Under stress, can become cold or reactive due to unprocessed emotion.' }
    ],
    strengths: [
        { strength: 'Born Leaders', description: 'Comfortable taking charge and making the tough calls.' },
        { strength: 'Reliable & Committed', description: 'Will do what they say — no excuses, no ambiguity.' },
        { strength: 'Highly Structured Thinkers', description: 'Bring order to messy systems and people.' },
        { strength: 'Hardworking & Driven', description: 'Will push through obstacles to hit goals.' },
        { strength: 'Loyal to Family, Team, and Tradition', description: 'Honor, duty, and integrity are cornerstones.' }
    ],
    weaknesses: [
        { weakness: 'Inflexible', description: 'Can be rigid, dismissive of new or creative approaches.' },
        { weakness: 'Blunt or Harsh', description: 'May hurt feelings unintentionally due to lack of tact.' },
        { weakness: 'Control-Oriented', description: 'Need to be “in charge” can alienate more relaxed types.' },
        { weakness: 'Emotionally Repressed', description: 'May not recognize their own deeper emotional needs until under stress.' },
        { weakness: 'Over-Focused on Productivity', description: 'Can devalue rest, fun, or emotional connection in favor of results.' }
    ],
    idealCareers: [
        { field: 'Manager / Operations Lead', why: 'Enjoys optimizing systems and getting things done.' },
        { field: 'Judge / Government Leader', why: 'Authority, justice, tradition — ideal combo.' },
        { field: 'Military Officer / Law Enforcement', why: 'High structure, clear hierarchy, action-driven.' },
        { field: 'Project Manager / Consultant', why: 'Can lead large teams to accomplish ambitious goals.' },
        { field: 'School Principal / Athletic Coach', why: 'Values discipline, team cohesion, and long-term results.' }
    ],
    famousExamples: ['Judge Judy', 'Michelle Obama', 'Dr. Phil', 'Dwight Schrute (The Office)', 'Captain Holt (Brooklyn 99)'],
    relationshipDeepDive: {
        friendship: {
            title: "Friendship",
            coreNeeds: "Reliability, directness, and purposeful action.",
            howTheyShowUp: "ESTJs value reliable, direct, and purposeful friendships. They prefer people who show up, follow through, and don’t play games. They like doing things together: fixing, building, planning, achieving. They often act as protectors, mentors, or team leads in their social circle. Red flags for them include flakiness, emotional manipulation, or a lack of direction."
        },
        romance: {
            title: "Romance",
            coreNeeds: "Loyalty, structure, and commitment.",
            howTheyLove: "ESTJs aren’t traditionally romantic, but show love through acts of service, structure, and fierce loyalty. They’re the type to plan your future, take care of logistics, and hold your life together. They are attracted to partners who are loyal, grounded, and emotionally balanced. They can take charge of relationship decisions but their challenge is learning that emotional needs are not inefficient or a distraction.",
            idealPartner: "Someone who is loyal, grounded, and emotionally balanced."
        },
        communication: {
            title: "Communication",
            primaryTraits: "Blunt, efficient, and opinionated.",
            howToCommunicate: "They say what they mean and struggle to soften feedback. They expect transparency and directness from others and dislike drama. Under stress, they can become curt, controlling, and unyielding."
        },
        compatibility: {
            title: "Compatibility & Ideal Matches",
            summary: "ESTJs do well with partners who respect structure and responsibility, have emotional intelligence to balance their bluntness, and can keep up intellectually and practically.",
            commonMatches: [
                { type: 'ISFJ – The Nurturer', reason: 'Steady, emotionally aware, and loyal — brings balance to ESTJ’s fire.' },
                { type: 'ISTJ – The Inspector', reason: 'Shared values, duty, and traditional strength — a true power duo.' },
                { type: 'ENFP – The Campaigner', reason: 'Brings spontaneity and emotional insight — softens and challenges ESTJ.' },
                { type: 'ESFJ – The Provider', reason: 'Harmonious blend — both love responsibility, loyalty, and care for others.' }
            ]
        },
        summary: {
            title: "ESTJ in Crossd Compatibility Storytelling",
            text: "Archetype: The Commander With a Plan — structured, reliable, and fiercely loyal.\n\nDating Bio Prompt: “If you like consistency, honesty, and a bit of tough love — I’m your person. Not here for games. I build. I lead. I commit.”\n\nIn-App Persona Card: “Meet the Executive 🧭 — sharp, loyal, and structured to the core. They’ll show up, step up, and build something real. If you’re ready for a relationship with backbone, they’re already 10 steps ahead.”"
        }
    },
    relationships: [
        { area: 'Friendship', behavior: 'A reliable and direct friend who prefers purposeful action and acts as a protector.' },
        { area: 'Romance', behavior: 'Shows love through acts of service and loyalty, attracted to grounded partners.' },
        { area: 'Communication', behavior: 'Blunt, efficient, and opinionated, expecting directness from others.' },
    ],
    growthPath: ['Learn to value rest and emotional connection', 'Practice tact and considering feelings', 'Be open to new and creative approaches'],
    archetypes: ['The Commander With a Plan', 'The reliable team lead', 'The fiercely loyal protector'],
  },
  'ESFJ': {
    title: 'The Consul / Provider',
    nicknames: ['The Heart of the Party', 'The Community Caretaker', 'The Reliable Host'],
    typeCode: 'Extraverted (E) – Sensing (S) – Feeling (F) – Judging (J)',
    population: '~9–13% (more common among women)',
    coreCharacteristics: [
        { trait: 'Warm & Loyal', description: 'Natural caregivers — tuned into people’s needs and emotions' },
        { trait: 'Community-Oriented', description: 'Feel most fulfilled when supporting others and keeping things harmonious' },
        { trait: 'Structured & Reliable', description: 'Prefer clear expectations, organized plans, and consistency in behavior' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Feeling (Fe)', description: 'Prioritizes group harmony and emotional atmosphere. Naturally in tune with others’ needs, moods, and social cues. Makes decisions based on interpersonal impact.' },
        { functionName: 'Auxiliary – Introverted Sensing (Si)', description: 'Draws from past experiences and trusted traditions. Loves rituals, family values, and what has “worked before”. Pays close attention to practical details.' },
        { functionName: 'Tertiary – Extraverted Intuition (Ne)', description: 'Open to possibilities, new connections, and perspectives. Enjoys bouncing ideas off others — especially when it helps a group thrive.' },
        { functionName: 'Inferior – Introverted Thinking (Ti)', description: 'Can struggle to logically detach from emotional considerations. May internalize criticism or avoid objectivity when emotionally invested. Under stress, may over-rationalize or retreat into people-pleasing.' },
    ],
    strengths: [
        { strength: 'Emotionally Supportive', description: 'Often the first to notice when someone needs a hug, a snack, or a pep talk.' },
        { strength: 'Excellent Organizers', description: 'Thrive with routines, calendars, and structured environments.' },
        { strength: 'Loyal to People & Principles', description: 'Devoted to their family, community, or chosen cause.' },
        { strength: 'Natural Hosts & Caregivers', description: 'Love creating spaces where others feel safe, seen, and valued.' },
        { strength: 'High Social Awareness', description: 'Know how to “read a room” and adapt with warmth and finesse.' },
    ],
    weaknesses: [
        { weakness: 'People-Pleasing', description: 'May lose themselves trying to gain others\' approval or avoid conflict.' },
        { weakness: 'Conflict Avoidant', description: 'Struggles with difficult conversations or standing up to strong personalities.' },
        { weakness: 'Judgmental Under Stress', description: 'When overwhelmed, may default to social comparison or harsh internal standards.' },
        { weakness: 'Can Be Overextended', description: 'Take on too much emotionally or practically, then burn out quietly.' },
        { weakness: 'Need for Structure Can Limit Flexibility', description: 'Prefer predictability and may resist change.' },
    ],
    idealCareers: [
        { field: 'HR / Event Planning', why: 'Excel at people-centered logistics, hospitality, and care.' },
        { field: 'Teacher / Counselor / Youth Leader', why: 'Shine in roles that nurture others with structure and empathy.' },
        { field: 'Customer Success / Client Relations', why: 'Social, dependable, and value-driven.' },
        { field: 'Healthcare Admin / Hospitality Manager', why: 'Organized caretaking with a warm touch.' },
        { field: 'Volunteer Coordinator / Fundraising Lead', why: 'Emotionally compelling and community-driven.' },
    ],
    famousExamples: ['Taylor Swift', 'Jennifer Garner', 'Monica Geller (Friends)', 'Ned Flanders (The Simpsons)', 'Sam Wilson / The Falcon (MCU)'],
    relationshipDeepDive: {
        friendship: {
            title: "Friendship",
            coreNeeds: "Emotional reciprocity, structure, loyalty.",
            howTheyShowUp: "ESFJs are the friend who remembers your birthday, your favorite dessert, and exactly how you like your coffee. They thrive in structured friendships with rituals — game night, dinner dates, etc. Highly dependable — they’ll show up early, stay late, and offer to help clean up. Need friends who reciprocate emotionally and respect their values. Dislike emotional coldness, inconsistency, or people who take and never give back."
        },
        romance: {
            title: "Romance",
            coreNeeds: "Emotional security, mutual care, appreciation.",
            howTheyLove: "ESFJs love love — and they give their full heart to those they choose. They’re often drawn to partners who are emotionally grounded, morally consistent, and appreciative of their nurturing. They show love through acts of service, thoughtful reminders, and maintaining your world. Their challenge is not over-giving to those who won’t pour back into them.",
            idealPartner: "A partner who offers emotional reciprocity, has strong inner values, and can bring calm and logic without being emotionally dismissive."
        },
        communication: {
            title: "Communication Style",
            primaryTraits: "Kind, expressive, and very tone-sensitive.",
            howToCommunicate: "They’ll pick up on emotional shifts quickly and dislike coldness, sarcasm, or overly critical tones. May struggle to speak up about needs, especially in new or uncertain relationships. Thrive when they feel respected, validated, and emotionally safe."
        },
        compatibility: {
            title: "Compatibility & Ideal Matches",
            summary: "ESFJs do well with partners who offer emotional reciprocity, have strong inner values, and can bring calm and logic without being emotionally dismissive.",
            commonMatches: [
                { type: 'ISFP – The Artist', reason: 'Gentle, authentic, and emotionally tuned in — balances ESFJ’s structure.' },
                { type: 'ISTJ – The Inspector', reason: 'Shares values of loyalty and consistency — brings grounded logic.' },
                { type: 'ESFP – The Performer', reason: 'Social, warm, and fun-loving — matches their energy with affection.' },
                { type: 'INFP – The Idealist', reason: 'Brings emotional insight and purpose — adds depth to their nurturing.' }
            ]
        },
        summary: {
            title: "ESFJ in Crossd Compatibility Storytelling",
            text: "Archetype: The Heart-First Host — warm, structured, and emotionally intuitive.\n\nDating Bio Prompt: “I’ll plan the date, remember your favorite drink, and check in when you’ve had a long day. If you’re looking for something real — and mutual — I’m here for it.”\n\nIn-App Persona Card: “Meet the Consul 💐 — nurturing, community-minded, and full of heart. They’re not here for the games — just real connection, mutual care, and a little old-school romance.”"
        }
    },
    relationships: [
        { area: 'Friendship', behavior: 'A highly dependable friend who thrives in structured social rituals and remembers all the details.' },
        { area: 'Romance', behavior: 'A deeply caring partner who shows love through acts of service and seeks emotional security.' },
        { area: 'Communication', behavior: 'Kind, expressive, and highly sensitive to tone, prioritizing harmony and validation.' },
    ],
    growthPath: ["Develop a strong sense of self independent of others' approval", "Learn to say 'no' and set boundaries", "Practice handling constructive conflict directly"],
    archetypes: ['The Heart-First Host', 'The Community Caretaker', 'The Reliable Host'],
  },
  'ISTP': {
    title: 'The Virtuoso / Craftsman',
    nicknames: ['The Lone Problem-Solver', 'The Quiet Rebel', 'The Tactician'],
    typeCode: 'Introverted (I) – Sensing (S) – Thinking (T) – Perceiving (P)',
    population: '~5–7% (more common among men)',
    coreCharacteristics: [
      { trait: 'Independent', description: 'Self-sufficient and unbothered by solitude or rules' },
      { trait: 'Resourceful', description: 'Thrive in environments where they can use their hands, tools, or logic' },
      { trait: 'Calm Under Pressure', description: 'Rarely overwhelmed by stress — they become more focused as stakes rise' }
    ],
    cognitiveStack: [
      { functionName: 'Dominant – Introverted Thinking (Ti)', description: 'Internal logic system that analyzes everything privately. Seeks truth through mechanics, logic, and pattern recognition. Values precision, clarity, and personal understanding.' },
      { functionName: 'Auxiliary – Extraverted Sensing (Se)', description: 'Lives in the moment and processes information through the five senses. Hyper-aware of surroundings, movement, and immediate needs. Excellent in crisis, high-adrenaline, or high-focus environments.' },
      { functionName: 'Tertiary – Introverted Intuition (Ni)', description: 'Occasionally connects patterns and forms sudden insights. Tends to trust gut instincts about systems or people. Less verbal about long-term strategy but sees patterns quickly.' },
      { functionName: 'Inferior – Extraverted Feeling (Fe)', description: 'Emotionally private, unsure how to express feelings. May struggle with social niceties or group harmony. Under stress, may lash out or retreat emotionally.' }
    ],
    strengths: [
      { strength: 'Technical Mastery', description: 'Excel at understanding how things work — from engines to systems to data flows' },
      { strength: 'Crisis Calm', description: 'Unshakable in emergencies — think clearly while others freeze' },
      { strength: 'Adaptable & Action-Oriented', description: 'Don’t overthink — observe, react, fix' },
      { strength: 'Emotionally Independent', description: 'No drama, no codependency, no neediness' },
      { strength: 'Private Yet Protective', description: 'Fiercely loyal once bonded — especially when others are in danger' }
    ],
    weaknesses: [
      { weakness: 'Emotionally Distant', description: 'Struggle to express or even recognize emotions — theirs or others’' },
      { weakness: 'Unpredictable Behavior', description: 'May suddenly disappear or change course with no warning' },
      { weakness: 'Impatient with Structure', description: 'Rules, routines, and micromanagement stifle them' },
      { weakness: 'Detached or Stoic', description: 'Can seem cold or uninterested, even if they care deeply underneath' },
      { weakness: 'Resistant to Long-Term Planning', description: 'Prefer to live in the now — commitment or future-talk may feel constraining' }
    ],
    idealCareers: [
      { field: 'Engineer / Mechanic', why: 'Love to take things apart, fix, and optimize hands-on systems' },
      { field: 'Survivalist / Outdoors Expert', why: 'Thrive in high-stakes environments and self-reliance' },
      { field: 'Athlete / Stunt Coordinator', why: 'Physical mastery, body-mind connection, and real-time responsiveness' },
      { field: 'Pilot / Firefighter / Paramedic', why: 'High-focus, high-speed, high-logic pressure zones' },
      { field: 'Technical Analyst / Systems Architect', why: 'Quiet, behind-the-scenes brilliance with tools and logic' }
    ],
    famousExamples: ['Bruce Lee', 'Arya Stark (Game of Thrones)', 'James Bond (Daniel Craig era)', 'Bear Grylls', 'Lisbeth Salander (The Girl with the Dragon Tattoo)'],
    relationshipDeepDive: {
      friendship: {
        title: "Friendship",
        coreNeeds: "Mutual respect, space, and no drama.",
        howTheyShowUp: "ISTPs are low-maintenance friends — no small talk required. They bond through shared experiences, not emotional oversharing. They thrive in friendships with mutual respect, space, and no drama. They will fix your computer, build your furniture, or protect you in a fight — but might not say 'I love you' out loud. Red Flags for Them: Emotional manipulation, over-planning, clinginess, or people who need constant verbal reassurance."
      },
      romance: {
        title: "Romance",
        coreNeeds: "Autonomy, action, and loyalty.",
        howTheyLove: "ISTPs don’t rush — but when they choose you, it’s intentional. They show care through actions (fixing, protecting, helping) and dislike 'heavy' emotional convos — but will act with loyalty. They need alone time and autonomy and prefer partners who are grounded, low-drama, and emotionally self-sufficient. Affection may be physical or protective, but not always verbal. Their Challenge: Learning to let someone in emotionally without feeling vulnerable or 'trapped'.",
        idealPartner: "Someone who is independent, respects their need for space, and appreciates non-verbal affection."
      },
      communication: {
        title: "Communication Style",
        primaryTraits: "Concise, direct, and fact-driven.",
        howToCommunicate: "They are not fans of small talk or long emotional discussions. They prefer to show rather than tell — 'I fixed your tire' means 'I care about you'. May become quiet or ghostlike under stress or emotional confusion. Respond well to calm, logical conversations — emotionally heated ones may push them away."
      },
      compatibility: {
        title: "Compatibility & Ideal Matches",
        summary: "ISTPs pair best with those who respect their independence, can emotionally self-regulate, and bring emotional fluency without pressure.",
        commonMatches: [
          { type: 'ESFJ – The Provider', reason: 'Grounds ISTP in warmth, routine, and emotional expression' },
          { type: 'ISFP – The Artist', reason: 'Emotionally sensitive but gentle — doesn’t overwhelm ISTP' },
          { type: 'ESTP – The Dynamo', reason: 'Similar energy: action-oriented, physical, reactive' },
          { type: 'INFJ – The Counselor', reason: 'Brings depth and emotional intelligence — challenges them inwardly, but gently' }
        ]
      },
      summary: {
        title: 'ISTP in Crossd Compatibility Storytelling',
        text: 'Archetype: The Silent Fixer — mysterious, capable, low-key romantic through action\n\nDating Bio Prompt: “Not big on talking feelings — but I’ll change your tire, build your bookshelf, and be calm when the power goes out. If you get that, we’ll get along.”\n\nIn-App Persona Card: “Meet the Craftsman 🛠️ — independent, adaptable, and always thinking a few moves ahead. Not flashy, but fiercely capable. If you’re looking for low-drama, high-loyalty, and deep calm — they’re your type.”'
      }
    },
    relationships: [
        { area: 'Friendship', behavior: 'A low-maintenance friend who bonds through shared experiences and dislikes drama.' },
        { area: 'Romance', behavior: 'Shows love through action and loyalty, needing an independent and low-drama partner.' },
        { area: 'Communication', behavior: 'Concise and direct, preferring to show care rather than talk about it.' },
    ],
    growthPath: ['Learn to consider long-term consequences', 'Practice recognizing and articulating feelings', 'Commit to at least one long-term project'],
    archetypes: ['The lone wolf mechanic', 'The cool-headed action hero', 'The technical expert'],
  },
  'ISFP': {
    title: 'The Adventurer / Composer',
    nicknames: ['The Gentle Creative', 'The Quiet Romantic', 'The Free-Spirited Artist'],
    typeCode: 'Introverted (I) – Sensing (S) – Feeling (F) – Perceiving (P)',
    population: '~4–9%',
    coreCharacteristics: [
      { trait: 'Aesthetic & Sensitive', description: 'Drawn to beauty, nature, animals, music, and quiet human moments' },
      { trait: 'Introverted Yet Expressive', description: 'Often shy at first, but full of passion and depth beneath the surface' },
      { trait: 'Live-in-the-Moment Explorers', description: 'Spontaneous and experience-driven — love little adventures and sensory pleasures' },
    ],
    cognitiveStack: [
      { functionName: 'Dominant – Introverted Feeling (Fi)', description: 'Strong inner value system — they feel deeply but keep it private. Makes decisions based on authenticity, personal ethics, and emotional resonance.' },
      { functionName: 'Auxiliary – Extraverted Sensing (Se)', description: 'Highly aware of surroundings, textures, visuals, and atmosphere. Responds to beauty and novelty — aesthetic environments fuel them. Can be adventurous, even thrill-seeking, when in the mood.' },
      { functionName: 'Tertiary – Introverted Intuition (Ni)', description: 'Quietly reflective — can have sudden insights and emotional revelations. Not outwardly strategic but often feel “guided” by inner instincts.' },
      { functionName: 'Inferior – Extraverted Thinking (Te)', description: 'Struggles with external structure, deadlines, and impersonal logic. May shut down when forced into rigid systems or corporate-style environments.' },
    ],
    strengths: [
      { strength: 'Artistic Sensibility', description: 'Masters of mood, color, music, and subtle emotional storytelling' },
      { strength: 'Gentle Authenticity', description: 'Loyal and kind without pretending or posturing' },
      { strength: 'Live in the Present', description: 'Engaged with the moment, deeply appreciative of simple pleasures' },
      { strength: 'Compassionate & Tolerant', description: 'Rarely judgmental, open-minded, and emotionally intuitive' },
      { strength: 'Emotionally Resilient (Internally)', description: 'Quietly strong — they may bend, but they rarely break' },
    ],
    weaknesses: [
      { weakness: 'Avoidant of Conflict', description: 'Will often disappear rather than confront issues head-on' },
      { weakness: 'Dislike Rigid Schedules', description: 'Prefer flowing, spontaneous days over structure and routine' },
      { weakness: 'Easily Hurt by Criticism', description: 'Feedback can feel like personal rejection unless delivered with care' },
      { weakness: 'Struggle with External Logic Systems', description: 'Data, metrics, and bureaucracy may frustrate them' },
      { weakness: 'May Withhold Feelings', description: 'Can internalize emotions too long — leading to burnout or withdrawal' },
    ],
    idealCareers: [
      { field: 'Artist / Designer / Illustrator', why: 'Visual, sensory, and expression-driven work suits them perfectly' },
      { field: 'Musician / Dancer / Performer', why: 'Enjoy emotionally expressive yet introverted forms of creation' },
      { field: 'Animal Caretaker / Vet Tech / Forest Ranger', why: 'Nature, solitude, and compassion align with their values' },
      { field: 'Photographer / Cinematographer', why: 'Frame the world through feeling and vision' },
      { field: 'Therapist (Creative or Holistic)', why: 'Gentle listeners who guide without overpowering' },
    ],
    famousExamples: ['Lana Del Rey', 'Bob Ross', 'Aurora', 'Frodo Baggins', 'Amélie Poulain'],
    relationshipDeepDive: {
        friendship: {
            title: 'Friendship',
            coreNeeds: "Emotional presence, shared experiences, loyalty.",
            howTheyShowUp: "ISFPs make loyal, emotionally present friends who prefer 1-on-1 connection or very small groups. They bond deeply over shared experiences, art, nature, or music and show up quietly, consistently, and with subtle care — not loud declarations. They dislike loud, domineering personalities, people who rush emotional intimacy, or insincerity.",
        },
        romance: {
            title: 'Romance',
            coreNeeds: "Emotional safety, authenticity, shared experiences.",
            howTheyLove: "ISFPs are gentle romantics who value emotional safety above all. They may seem shy but are very affectionate once trust is built, often showing love through spontaneous gifts or shared sunsets. Their challenge is learning to voice their needs instead of silently withdrawing.",
            idealPartner: "Someone who understands their inner depth, respects their quietude, and offers steady emotional safety.",
        },
        communication: {
            title: "Communication Style",
            primaryTraits: "Soft-spoken, sensitive, poetic.",
            howToCommunicate: "Words often come from the heart. They dislike confrontation or harsh logic and may need time to articulate feelings, but their expressions are sincere. They prefer kind, grounded, emotionally intelligent communication.",
        },
        compatibility: {
            title: "Compatibility & Ideal Matches",
            summary: "ISFPs do well with partners who respect their emotional sensitivity, can provide structure without control, and add adventure and warmth to their quiet soul.",
            commonMatches: [
                { type: 'ESFJ – The Provider', reason: 'Emotionally supportive and structured — gives ISFP a safe space to thrive' },
                { type: 'ISFJ – The Nurturer', reason: 'Shares values of compassion, warmth, and loyalty' },
                { type: 'ENFP – The Campaigner', reason: 'Brings creative energy and fun while respecting emotional depth' },
                { type: 'ISTP – The Virtuoso', reason: 'Quietly protective and practical — adds grounding without emotional overload' },
            ],
        },
        summary: {
            title: 'ISFP in Crossd Compatibility Storytelling',
            text: 'Archetype: The Soft-Spoken Soul — romantic, artistic, and deeply sincere\n\nDating Bio Prompt: “Introvert with a poet’s heart. I’ll make you a playlist instead of a speech, and probably love you through a thousand tiny moments you don’t even notice.”\n\nIn-App Persona Card: “Meet the Composer 🎨 — quiet, aesthetic, and full of feeling. They may not shout their love from the rooftops, but they’ll write it into every day. If you listen closely, their silence sings.”'
        }
    },
    relationships: [
        { area: 'Friendship', behavior: 'Prefers 1-on-1 connection and bonds deeply over shared experiences like art or nature.' },
        { area: 'Romance', behavior: 'A gentle and romantic partner who values emotional safety and expresses love through quiet, thoughtful gestures.' },
        { area: 'Communication', behavior: 'Soft-spoken and sensitive, disliking confrontation and preferring to communicate from the heart.' },
    ],
    growthPath: ['Learn to face and resolve conflict directly', 'Develop comfort with schedules and structure', 'Practice accepting constructive criticism'],
    archetypes: ['The Soft-Spoken Soul', 'The romantic, artistic, and deeply sincere'],
  },
  'ESTP': {
    title: 'The Dynamo / Entrepreneur',
    nicknames: ['The Instigator', 'The Smooth Operator', 'The Crisis Commander'],
    typeCode: 'Extraverted (E) – Sensing (S) – Thinking (T) – Perceiving (P)',
    population: '~4–6% (more common among men)',
    coreCharacteristics: [
        { trait: 'Bold & Energetic', description: 'Thrive on fast-paced environments, risk, and social stimulation' },
        { trait: 'Action-Oriented', description: 'Make decisions quickly and act on impulse — learning by doing' },
        { trait: 'Persuasive & Charming', description: 'Often have magnetic charisma and a knack for negotiation' },
    ],
    cognitiveStack: [
        { functionName: 'Dominant – Extraverted Sensing (Se)', description: 'Fully immersed in the moment — sharp, alert, and reactive. High physical awareness and love for tactile experience. Thrives on real-time challenges and stimulation.' },
        { functionName: 'Auxiliary – Introverted Thinking (Ti)', description: 'Internally analyzes data and optimizes systems. Can be surprisingly precise behind the spontaneity. Likes clean logic, even if they don’t always explain it.' },
        { functionName: 'Tertiary – Extraverted Feeling (Fe)', description: 'Can tune into group moods and charm socially. Will use humor or confidence to maintain harmony or win attention. May be emotionally savvy but not always personally vulnerable.' },
        { functionName: 'Inferior – Introverted Intuition (Ni)', description: 'Struggles with long-term planning or delayed gratification. Can feel lost when forced to reflect too deeply or consider abstract consequences.' },
    ],
    strengths: [
        { strength: 'Adaptable in Crisis', description: 'Act quickly under pressure — make fast, confident decisions' },
        { strength: 'Socially Magnetic', description: 'Great with persuasion, improvisation, and public confidence' },
        { strength: 'Quick Learners (Hands-On)', description: 'Excel at learning by doing, especially in physical environments' },
        { strength: 'Risk-Tolerant', description: 'Thrive where others freeze — love challenges, dares, and uncertainty' },
        { strength: 'Entertainers by Nature', description: 'Often the life of the party — witty, exciting, unforgettable' },
    ],
    weaknesses: [
        { weakness: 'Impulsive & Easily Bored', description: 'Need constant stimulation — can struggle with routine or stillness' },
        { weakness: 'Tactless or Blunt', description: 'May speak too directly or insensitively in emotional situations' },
        { weakness: 'Struggles with Delayed Consequences', description: 'May overlook the long-term fallout of short-term choices' },
        { weakness: 'Emotionally Guarded', description: 'Can read the room but avoid talking about their own feelings' },
        { weakness: 'Commitment-Phobic Under Pressure', description: 'May run if they feel emotionally cornered or tied down too soon' },
    ],
    idealCareers: [
        { field: 'Sales / Negotiation / PR', why: 'Love to persuade, connect, and close deals' },
        { field: 'EMT / First Responder', why: 'Calm in chaos, instinct-driven, fast-moving' },
        { field: 'Athlete / Coach / Trainer', why: 'Physical energy, team spirit, competitive drive' },
        { field: 'Stock Trader / Entrepreneur', why: 'Risk-tolerant and fast-thinking in dynamic environments' },
        { field: 'Event Host / Showrunner', why: 'Center of attention with logistical flair' },
    ],
    famousExamples: ['Tony Stark / Iron Man', 'James Kirk (Star Trek)', 'Madonna', 'Ernest Hemingway'],
    relationshipDeepDive: {
        friendship: {
            title: "Friendship",
            coreNeeds: "Spontaneity, loyalty in action, shared excitement.",
            howTheyShowUp: "ESTPs are fun-loving, spontaneous friends who bring energy and excitement to their groups. They prefer shared physical experiences over deep conversations and show loyalty by being present when it matters. They dislike clinginess, overplanning, and emotional intensity.",
        },
        romance: {
            title: "Romance",
            coreNeeds: "Adventure, passion, mutual energy.",
            howTheyLove: "As natural flirts, ESTPs are bold and spontaneous in dating. They show love through grand gestures and physical affection. They are attracted to partners who can match their energy but may shy away from deep emotional conversations or long-term commitment if they feel pressured.",
            idealPartner: "Someone who is confident, independent, and can balance their high energy with emotional depth without being controlling.",
        },
        communication: {
            title: "Communication Style",
            primaryTraits: "Witty, fast-paced, direct, and often humorous.",
            howToCommunicate: "ESTPs prefer action over words. Their communication is straightforward and they can be blunt. They may deflect or use humor when conversations become too emotionally vulnerable. Engage them with banter and directness.",
        },
        compatibility: {
            title: "Compatibility & Ideal Matches",
            summary: "ESTPs pair well with partners who keep things fresh and flexible, are emotionally aware without being overbearing, and can balance fun with meaningful depth.",
            commonMatches: [
                { type: 'ISFJ – The Nurturer', reason: 'Provides emotional grounding and structure — softens ESTP’s edges' },
                { type: 'ESFJ – The Provider', reason: 'Socially attuned and responsible — shares energy and keeps things on track' },
                { type: 'INFP – The Idealist', reason: 'Quiet idealism draws ESTP in and balances their impulsive energy' },
                { type: 'ENTP – The Visionary', reason: 'A fun-loving mental match — bold, talkative, spontaneous, and wild' },
            ],
        },
        summary: {
            title: 'ESTP in Crossd Compatibility Storytelling',
            text: "Archetype: The Risk-Taker with a Spark — charming, thrill-seeking, and confident in chaos\n\nDating Bio Prompt: “I won’t write you poems, but I’ll pull you onto the dance floor, book a last-minute getaway, and show up when things get real. Let’s live a little.”\n\nIn-App Persona Card: “Meet the Dynamo ⚡ — fearless, magnetic, and full of energy. Their love language is action, not promises. If you’re looking for sparks that light up the room — this is the one.”"
        },
    },
    relationships: [
        { area: 'Friendship', behavior: 'A fun-loving, spontaneous friend who brings energy and excitement to their groups.' },
        { area: 'Romance', behavior: 'A bold and flirty partner who loves adventures and grand gestures but can be commitment-shy.' },
        { area: 'Communication', behavior: 'Witty, fast-paced, and direct, preferring action over deep emotional conversations.' },
    ],
    growthPath: ['Practice considering long-term consequences', 'Develop empathy by listening to others\' feelings', 'Find value in commitment and seeing things through'],
    archetypes: ['The Risk-Taker with a Spark', 'The charming thrill-seeker', 'The confident problem-solver'],
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
        { functionName: 'Auxiliary – Introverted Feeling (Fi)', description: 'Guided by a deep, personal set of values and what feels right to them.' },
        { functionName: 'Tertiary – Extraverted Thinking (Te)', description: 'Can be surprisingly practical and organized when it comes to planning fun events.' },
        { functionName: 'Inferior – Introverted Intuition (Ni)', description: 'Avoids thinking about long-term consequences and can be stressed by abstract, negative possibilities.' },
    ],
    strengths: [
        { strength: 'Social Magnetism', description: 'The natural center of attention, making everyone feel included and energized.' },
        { strength: 'Generosity', description: 'Loves showering friends and loved ones with gifts, compliments, and fun experiences.' },
        { strength: 'Practical Optimism', description: 'Finds joy in the here and now and encourages others to do the same.' },
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

    

    

