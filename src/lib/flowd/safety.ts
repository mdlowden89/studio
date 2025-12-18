const bannedAdvicePatterns = [
  /you (have|seem to have) a strong case/i,
  /you should sue/i,
  /you can claim/i,
  /the law says/i,
];

export function adviceLeakGuard(output: string): { safeText: string; flagged: boolean } {
  const flagged = bannedAdvicePatterns.some((pattern) => pattern.test(output));
  if (!flagged) return { safeText: output, flagged: false };
  return {
    safeText:
      "I’m here to collect information for the firm. I can’t provide legal advice, but I will share your details for review.",
    flagged: true,
  };
}

export function enforceSingleQuestion(text: string): string {
  const segments = text.split("?");
  if (segments.length <= 2) return text;
  return `${segments[0]}?`;
}
