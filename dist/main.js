import { fetchQuestions, getQuestions } from './modules/questions.js';
import { createPlayer, processAnswer, getScorePercentage, getMaxPossibleScore, getLeaderboard, savePlayers } from './modules/scoring.js';
(async () => {
    // Fetch questions
    const questions = await fetchQuestions();
    const playerCount = 3; // Example: 3 players
    const questionSets = getQuestions(questions, playerCount);
    // Create players
    const players = [
        createPlayer("Alice"),
        createPlayer("Bob"),
        createPlayer("Charlie")
    ];
    // Simulate quiz for demonstration
    players.forEach((player, index) => {
        const playerQuestions = questionSets[index];
        // Process each question (simulate some correct/incorrect answers)
        playerQuestions.forEach(question => {
            // Randomly decide if answer is correct (for demo purposes)
            const userAnswer = Math.random() > 0.3 ? question.answer : "wrong answer";
            processAnswer(player, question, userAnswer);
        });
        // Display player results
        const maxScore = getMaxPossibleScore(playerQuestions);
        console.log(`${player.name}: ${player.score}/${maxScore} points`);
        console.log(`Correct answers: ${player.correctAnswers}/${player.totalQuestions}`);
        console.log(`Score percentage: ${getScorePercentage(player)}%`);
        console.log('-------------------');
    });
    // Show leaderboard
    console.log("LEADERBOARD:");
    getLeaderboard(players).forEach((player, index) => {
        console.log(`${index + 1}. ${player.name}: ${player.score} points`);
    });
    // Save players data
    savePlayers(players);
})();
