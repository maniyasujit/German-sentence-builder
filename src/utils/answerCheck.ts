export function normalizeAnswer(answer: string): string {
  return answer
    .trim()
    .toLocaleLowerCase('de-DE')
    .replace(/[.!?]+$/g, '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:!?])(?=\S)/g, '$1 ')
    .replace(/\s+/g, ' ');
}

export function isAnswerCorrect(userAnswer: string, correctAnswer: string): boolean {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
}

export function joinTokens(tokens: string[]): string {
  return tokens.join(' ').replace(/\s+([,.;:!?])/g, '$1');
}
