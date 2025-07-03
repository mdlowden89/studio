
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
      { strength: 'Long-Term Visionaries', example: 'Create scalable, efficient systems and solutions far ahead of their time.' },
      { strength: 'Strategic Thinkers', example: 'Break complex problems down and solve them with precision.' },
      { strength: 'Self-Motivated', example: 'Work independently with laser-like focus.' },
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
      { strength: 'Innovative & Original', example: 'Natural inventors who thrive in new, undefined territory.' },
      { strength: 'Objective & Rational', example: 'Unbiased and logical — driven by truth, not emotion.' },
      { strength: 'Independent Thinkers', example: 'Prefer to solve problems their own way; self-motivated learners.' },
    ],
    weaknesses: [
      { weakness: 'Poor with Execution', description: 'May get stuck in analysis or abandon projects when the excitement fades.' },
      { weakness: 'Socially Distant', description: 'Can seem cold or aloof, even to people they like.' },
      { weakness: 'Overthinkers', description: 'Often paralyzed by too many possibilities or fear of imperfection.' },
    ],
    idealCareers: [
      { field: 'Researcher / Scientist', why: 'Intellectual freedom to test and discover.' },
      { field: 'Software Developer / Engineer', why: 'Logical puzzles, systems design, and innovation.' },
      { field: 'Philosopher / Academic', why: 'Deep theoretical exploration is their bread and butter.' },
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
        title: "In Crossd Terms: How INTPs Fall in Love",
        text: "They won’t sweep you off your feet with roses and poetry. But if they’re sending you weird science memes, late-night thoughts about black holes, or building a system to help you stay organized — they’re all in."
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
      { strength: 'Natural Leaders', example: 'Commanding, confident, and decisive in group settings. People often follow their lead instinctively.' },
      { strength: 'Vision + Execution', example: 'Combines big-picture thinking (Ni) with rapid action (Te).' },
      { strength: 'Resilient and Driven', example: 'Failure is a lesson, not a wall. ENTJs push through setbacks like tanks.' },
      { strength: 'Clear Communicators', example: 'Straightforward, persuasive, and structured in expression.' },
      { strength: 'Highly Strategic', example: 'Systems, power structures, and hierarchies make sense to them intuitively. They know how to move up and optimize.' },
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
        howTheyLove: "ENTJs approach relationships strategically, with long-term goals. Deeply loyal once committed, but don’t expect flowery romance. They struggle when emotions interrupt logic and may try to 'fix' problems rather than listen.",
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
        text: "Meet the Commander ⚡ — bold, brilliant, and driven by purpose. They don’t just swipe — they strategize. If you’re ready to match ambition with fire, they’re your perfect counterpart."
      }
    },
    relationships: [], // Fallback
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
        { strength: 'Inventive', example: 'Thrive in unstructured environments where new ideas are welcome.' },
        { strength: 'Dynamic Communicators', example: 'Can adapt on the fly, improvise, persuade, and entertain with ease.' },
        { strength: 'Fearless Explorers', example: 'Not afraid to challenge the status quo or take intellectual risks.' },
        { strength: 'Fast Learners', example: 'Pick up new skills quickly, especially when excited or challenged.' },
        { strength: 'Flexible Thinkers', example: 'Can see multiple sides of any issue, often playing devil’s advocate to reveal truth.' },
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
        text: "Meet the Visionary ⚡ — unpredictable, captivating, and endlessly curious. They’ll challenge your ideas, charm your friends, and vanish into a startup pitch... but if they stay, you’ve sparked something rare."
      }
    },
    relationships: [],
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
      { strength: 'Profound Emotional Insight', example: 'INFJs understand people deeply — beyond surface behaviors.' },
      { strength: 'Loyal & Purpose-Driven', example: 'They’re committed to values, causes, and people who align with their vision.' },
      { strength: 'Strategic Visionaries', example: 'Quiet but powerful planners. Think long-term, guided by their internal compass.' },
      { strength: 'Empathetic Healers', example: 'Often act as emotional anchors in relationships and groups.' },
      { strength: 'Deep Thinkers', example: 'Philosophical, symbolic, spiritual — always asking “Why does this matter?”' },
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
    famousExamples: ['Carl Jung (founder of analytical psychology)', 'Mahatma Gandhi (values + peace + strategy)', 'Audrey Hepburn (poise + empathy + activism)', 'Taylor Swift (lyrical introspection + strong moral boundaries)', 'Jon Snow (Game of Thrones – brooding but purpose-driven)'],
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
        text: "Meet the Counselor 🌙 — mysterious, emotionally rich, and visionary to the core. If you’re craving connection that goes deeper than surface sparks, they’ll light your inner fire."
      }
    },
    relationships: [],
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
      { strength: 'Creativity & Imagination', example: 'Natural storytellers, artists, and creators of emotionally powerful work.' },
      { strength: 'Deep Empathy', example: 'Feel others\' pain and joy as if it were their own. Often drawn to healing professions.' },
      { strength: 'Authenticity', example: 'Driven to be true to themselves, no matter what others think.' },
      { strength: 'Moral Integrity', example: 'Will quietly defy the system if it violates their values.' },
      { strength: 'Quiet Loyalty', example: 'Fiercely devoted once trust is formed — loves with intensity and subtlety.' },
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
            text: 'Meet the Idealist 🌸 — soft-spoken, soul-deep, and guided by an inner fire. If you’re ready to be seen, not just swiped on, they’re your quiet spark.'
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
        { strength: 'Emotionally Attuned Leaders', example: 'Lead with heart, not ego. They know how to inspire and unify people.' },
        { strength: 'Motivators', example: 'See the best in others and know how to help them step into their potential.' },
        { strength: 'Great Communicators', example: 'Warm, expressive, and articulate — they connect with people across any divide.' },
        { strength: 'Organized & Visionary', example: 'Passionate, structured, and capable of making big dreams actionable.' },
        { strength: 'Loyal & Committed', example: 'They don’t take relationships lightly — if they love you, they’ll show up every time.' },
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
        text: "Meet the Teacher 🌟 — magnetic, nurturing, and full of purpose. They don’t play games — they build soul connections. If you’re looking for love that lifts you higher, this one’s your spark."
      }
    },
    growthPath: ['Prioritize self-care and set boundaries', 'Develop comfort with conflict and saying "no"', 'Ground idealism in reality', 'Recognize and manage energy levels'],
    archetypes: ['The Heart-Led Leader', 'The Social Mentor', 'The Uplifter'],
    relationships: [], // Fallback
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
      { strength: 'Magnetic Energy', example: 'Infectiously positive, charismatic, and full of momentum.' },
      { strength: 'Emotional Insight', example: 'Reads emotional undercurrents with ease.' },
      { strength: 'Creativity & Innovation', example: 'Constantly generating new ideas and reimagining how things could be better.' },
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
        text: "Meet the Inspirer 🔥 — radiant, emotionally intelligent, and always halfway into a dream. They’re looking for someone who can handle the chaos, keep up with the passion, and dive into meaning at full speed."
      }
    },
    growthPath: ['Develop focus and follow-through', 'Learn to value consistency', 'Find peace in solitude'],
    archetypes: ['The Wild Heart With Fire Eyes', 'The imaginative explorer', 'The unforgettable spark'],
    relationships: [],
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
        { strength: 'Consistency & Reliability', example: 'The most dependable personality type — they show up every time.' },
        { strength: 'Strong Memory & Attention to Detail', example: 'Notice what others miss. Great at systems, logistics, and recall.' },
        { strength: 'Loyal to Core Values', example: 'Though reserved, they stick to their internal code.' },
        { strength: 'Practical Problem-Solving', example: 'Not flashy — just solid, functional, and results-driven.' },
        { strength: 'Resilient & Duty-Oriented', example: 'Thrive in roles that demand structure, tradition, and honor.' },
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
            title: 'Friendship',
            coreNeeds: 'Loyalty, consistency, shared routines.',
            howTheyShowUp: 'ISTJs may seem emotionally distant at first, but once they consider you a friend, they’ll show up consistently, help when it counts, and protect you quietly. They prefer structured friendships — regular meetups, shared routines, loyalty over novelty. They dislike drama, unpredictability, or people who say things they don’t mean.'
        },
        romance: {
            title: 'Romance',
            coreNeeds: 'Commitment, responsibility, shared values.',
            howTheyLove: 'ISTJs are reserved but deeply loyal — they may not sweep you off your feet, but they’ll build a foundation you can stand on. They value commitment, responsibility, and shared values, often showing love through practical help (like fixing your sink) and providing stability. Their challenge is opening up emotionally and expressing feelings through words, not just actions.',
            idealPartner: 'Someone who values stability and consistency.'
        },
        communication: {
            title: 'Communication',
            primaryTraits: 'Straightforward, factual, and often brief.',
            howToCommunicate: 'They dislike emotional guesswork or vague statements. They may unintentionally come off as cold or blunt and express love more through actions than flowery words. Say what you mean.'
        },
        compatibility: {
            title: 'Compatibility & Ideal Matches',
            summary: 'ISTJs pair best with partners who respect structure and consistency, are emotionally grounded, and help soften their rigidity without overwhelming them.',
            commonMatches: [
                { type: 'ESFJ – The Provider', reason: 'Loyal, warm, and organized — creates a harmonious, supportive pairing.' },
                { type: 'ISFJ – The Defender', reason: 'Shares values and responsibility — mutual care and quiet love.' },
                { type: 'ESTP – The Dynamo', reason: 'Adds fun and spontaneity while grounding the ISTJ with respect.' },
                { type: 'INFP – The Idealist', reason: 'Unconventional but inspiring match — helps the ISTJ open emotionally (requires maturity).' }
            ]
        },
        summary: {
            title: 'ISTJ in Crossd Compatibility Storytelling',
            text: 'Meet the Inspector 🧱 — grounded, consistent, and fiercely loyal. They may not say much, but they’ll do more than most. A rock-solid presence in a world full of noise.'
        }
    },
    relationships: [], // Fallback
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
        { strength: 'Supportive to the Core', example: 'Show love through loyalty, thoughtful gestures, and acts of care.' },
        { strength: 'Patient & Present', example: 'Emotionally steady, not reactive or chaotic.' },
        { strength: 'Practical Empathy', example: 'Not just comforting — they do something about it.' },
        { strength: 'Incredible Memory for Details', example: 'Remember your birthday, your stress habits, your favorite snack — and use that info to support you.' },
        { strength: 'Quiet Resilience', example: 'Appear gentle, but will fiercely protect what (and who) they love.' },
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
            howTheyShowUp: "ISFJs are the friends who remember the little things and show up even when you didn’t ask. Often the emotional anchor of the group — nurturing, stabilizing, and consistent. They thrive in 1-on-1 friendships, especially with people who value kindness and loyalty. They are not attention-seeking; they prefer to be there, not be seen."
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
            text: "Meet the Nurturer 🕊️ — gentle, grounded, and full of heart. They don’t fall fast, but they fall deep. If you want a partner who truly sees you — and stands beside you — they might be your soft landing."
        }
    },
    relationships: [],
    growthPath: ['Learn to say "no" and set boundaries', 'Practice asserting personal needs', 'Embrace small, positive changes', 'Trust that you are valued for who you are, not just what you do'],
    archetypes: ['The Quiet Guardian', 'The dependable, nurturing, and fiercely devoted'],
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
        { functionName: 'Auxiliary – Introverted Feeling (Fi)', description: 'Guided by a deep, personal set of values and what feels right to them.' },
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

    
