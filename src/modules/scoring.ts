import { Question } from './questions';

export interface Player {
    name: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
}

export function getPointsForDifficulty(difficulty: string): number {
    switch (difficulty) {
        case 'easy': return 1;
        case 'medium': return 2;
        case 'hard': return 3;
        default: return 0;
    }
}

export function isAnswerCorrect(question: Question, userAnswer: string | number): boolean {
    return question.answer === userAnswer;
}

export function processAnswer(
    player: Player, 
    question: Question, 
    userAnswer: string | number
): void {
    const correct = isAnswerCorrect(question, userAnswer);
    
    player.totalQuestions++;
    
    if (correct) {
        player.score += getPointsForDifficulty(question.difficulty);
        player.correctAnswers++;
    }
}

export function getScorePercentage(player: Player): number {
    if (player.totalQuestions === 0) return 0;
    return Math.round((player.correctAnswers / player.totalQuestions) * 100);
}

export function createPlayer(name: string): Player {
    return {
        name,
        score: 0,
        correctAnswers: 0,
        totalQuestions: 0
    };
}

export function getMaxPossibleScore(questions: Question[]): number {
    return questions.reduce((total, q) => total + getPointsForDifficulty(q.difficulty), 0);
}

export function savePlayers(players: Player[]): void {
    localStorage.setItem('quizPlayers', JSON.stringify(players));
}

export function loadPlayers(): Player[] {
    const data = localStorage.getItem('quizPlayers');
    return data ? JSON.parse(data) : [];
}

export function getLeaderboard(players: Player[]): Player[] {
    return [...players].sort((a, b) => b.score - a.score);
}