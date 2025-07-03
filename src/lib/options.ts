
export const ethnicityOptions = [
  "White/Caucasian",
  "Black/African Descent",
  "East Asian",
  "Hispanic/Latino",
  "Middle Eastern",
  "Native American",
  "Pacific Islander",
  "South Asian",
  "Southeast Asian",
  "Other",
];

export const genderOptions = [
  { value: 'man', label: 'Man' },
  { value: 'woman', label: 'Woman' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer Not to Say' },
];

export const interestedInOptions = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'everyone', label: 'Everyone' },
];


export const childrenStatusOptions = [
  "Don't have children",
  "Have Children",
  "Prefer Not to Say",
];

export const familyPlansOptions = [
  "Don't want children",
  "Want children",
  "Not Sure",
  "Prefer Not to Say",
];

export const drinkingOptions = [
  "Yes",
  "Sometimes",
  "No",
  "Prefer Not to Say",
];

export const smokingOptions = [
  "Yes",
  "Sometimes",
  "No",
  "Prefer Not to Say",
];

export const zodiacSignOptions = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
  "Prefer Not to Say"
];

export const mbtiOptions = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
  "Prefer Not to Say"
];


export const datingIntentionsOptions = [
    'Life Partner', 
    'Long-term relationship', 
    'Short-term relationship', 
    'Figuring it out', 
];

export const religionOptions = [
    'Agnostic', 
    'Atheist', 
    'Buddhist', 
    'Catholic', 
    'Christian', 
    'Hindu', 
    'Jain', 
    'Jewish', 
    'Mormon', 
    'Muslim', 
    'Sikh', 
    'Spiritual', 
    'Zoroastrian', 
    'Other'
];

export const relationshipTypeOptions = [
    'Monogamy', 
    'Polyamory', 
    'Open to exploring'
];


export const generateHeightOptions = () => {
  const options: {label: string, value: number}[] = [];
  for (let inches = 54; inches <= 84; inches++) { // 4'6" to 7'0"
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    options.push({ label: `${feet}'${remainingInches}"`, value: inches });
  }
  return options;
};
