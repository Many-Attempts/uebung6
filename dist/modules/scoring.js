export function getPointsForDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy': return 1;
        case 'medium': return 2;
        case 'hard': return 3;
        default: return 0;
    }
}
export function isAnswerCorrect(question, userAnswer) {
    return question.answer === userAnswer;
}
export function processAnswer(player, question, userAnswer) {
    const correct = isAnswerCorrect(question, userAnswer);
    player.totalQuestions++;
    if (correct) {
        player.score += getPointsForDifficulty(question.difficulty);
        player.correctAnswers++;
    }
}
export function getScorePercentage(player) {
    if (player.totalQuestions === 0)
        return 0;
    return Math.round((player.correctAnswers / player.totalQuestions) * 100);
}
export function createPlayer(name) {
    return {
        name,
        score: 0,
        correctAnswers: 0,
        totalQuestions: 0
    };
}
export function getMaxPossibleScore(questions) {
    return questions.reduce((total, q) => total + getPointsForDifficulty(q.difficulty), 0);
}
export function savePlayers(players) {
    localStorage.setItem('quizPlayers', JSON.stringify(players));
}
export function loadPlayers() {
    const data = localStorage.getItem('quizPlayers');
    return data ? JSON.parse(data) : [];
}
export function getLeaderboard(players) {
    return [...players].sort((a, b) => b.score - a.score);
}
