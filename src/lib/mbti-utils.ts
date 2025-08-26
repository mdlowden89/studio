
import type { UserProfile } from './types';

export const mbtiTemperaments: Record<string, { types: string[]; description: string; }> = {
  SJ: {
    types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
    description: 'Guardians - Order, Service, Community',
  },
  SP: {
    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
    description: 'Artisans - Aesthetics, Action, Skill',
  },
  NF: {
    types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
    description: 'Idealists - Empathy, Authenticity, Growth',
  },
  NT: {
    types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
    description: 'Rationals - Competence, Logic, Strategy',
  },
};

export const getMbtiTemperament = (type?: string): { name: string; description: string } | null => {
  if (!type) return null;
  for (const temperament in mbtiTemperaments) {
    if (mbtiTemperaments[temperament].types.includes(type)) {
      return { 
        name: temperament, 
        description: mbtiTemperaments[temperament].description
      };
    }
  }
  return null;
};

// Simplified compatibility model
const compatibilityMap: Record<string, string[]> = {
  // Idealists (NF) - Best with Rationals and other Idealists
  'INFJ': ['ENFP', 'ENTP', 'INFP', 'ENFJ'],
  'INFP': ['ENFJ', 'ENTJ', 'INFJ', 'ENFP'],
  'ENFJ': ['INFP', 'ISFP', 'ENFP', 'INFJ'],
  'ENFP': ['INFJ', 'INTJ', 'ENFJ', 'INFP'],
  // Rationals (NT) - Best with Idealists and other Rationals
  'INTJ': ['ENFP', 'ENTP', 'INTP', 'ENTJ'],
  'INTP': ['ENTJ', 'ESTJ', 'INTJ', 'ENTP'],
  'ENTJ': ['INFP', 'INTP', 'ENTP', 'INTJ'],
  'ENTP': ['INFJ', 'INTJ', 'ENTJ', 'INTP'],
  // Guardians (SJ) - Best with Artisans and other Guardians
  'ISTJ': ['ESFP', 'ESTP', 'ISFJ', 'ESTJ'],
  'ISFJ': ['ESFP', 'ESTP', 'ISTJ', 'ESFJ'],
  'ESTJ': ['INTP', 'ISTP', 'ESFJ', 'ISFJ'],
  'ESFJ': ['ISFP', 'ISTP', 'ESTJ', 'ISFJ'],
  // Artisans (SP) - Best with Guardians and other Artisans
  'ISTP': ['ESFJ', 'ESTJ', 'ISFP', 'ESTP'],
  'ISFP': ['ENFJ', 'ESFJ', 'ESTJ', 'ISTP'],
  'ESTP': ['ISFJ', 'ISTJ', 'ESFP', 'ISTP'],
  'ESFP': ['ISFJ', 'ISTJ', 'ESTP', 'ISFP'],
};

const getOppositeType = (type: string): string => {
    return type.split('').map(char => {
        if (char === 'E') return 'I';
        if (char === 'I') return 'E';
        if (char === 'S') return 'N';
        if (char === 'N') return 'S';
        if (char === 'T') return 'F';
        if (char === 'F') return 'T';
        if (char === 'J') return 'P';
        if (char === 'P') return 'J';
        return char;
    }).join('');
};

export type MbtiFilterType = 'best' | 'challenge' | 'values' | 'opposites' | 'all';

export const sortUsersByMbti = (
  users: UserProfile[],
  currentUser: UserProfile,
  filter: MbtiFilterType
): UserProfile[] => {
  const currentUserType = currentUser.mbtiType;
  if (!currentUserType || filter === 'all') {
    return users;
  }
  
  const getScore = (candidateType: string): number => {
    const bestMatches = compatibilityMap[currentUserType] || [];
    if (bestMatches.includes(candidateType)) return 4;
    return 1;
  };

  return [...users].sort((a, b) => {
    const typeA = a.mbtiType;
    const typeB = b.mbtiType;

    if (!typeA || !typeB) return 0;

    switch (filter) {
      case 'best':
        return getScore(typeB) - getScore(typeA);
      
      case 'challenge': {
        const currentUserFunctions = currentUserType.slice(1, 3);
        const aFunctions = typeA.slice(1, 3);
        const bFunctions = typeB.slice(1, 3);
        const scoreA = currentUserFunctions === aFunctions ? 0 : 1;
        const scoreB = currentUserFunctions === bFunctions ? 0 : 1;
        return scoreB - scoreA;
      }
      
      case 'values': {
        const currentUserTemperament = getMbtiTemperament(currentUserType)?.name;
        const aTemperament = getMbtiTemperament(typeA)?.name;
        const bTemperament = getMbtiTemperament(typeB)?.name;
        const scoreA = currentUserTemperament === aTemperament ? 1 : 0;
        const scoreB = currentUserTemperament === bTemperament ? 1 : 0;
        return scoreB - scoreA;
      }

      case 'opposites': {
        const oppositeType = getOppositeType(currentUserType);
        const scoreA = typeA === oppositeType ? 1 : 0;
        const scoreB = typeB === oppositeType ? 1 : 0;
        return scoreB - scoreA;
      }

      default:
        return 0;
    }
  });
};
