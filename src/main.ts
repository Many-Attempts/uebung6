import { fetchQuestions, getQuestions } from './modules/questions.js';
import { 
    createPlayer, 
    processAnswer, 
    getScorePercentage, 
    getMaxPossibleScore,
    getLeaderboard,
    savePlayers 
} from './modules/scoring.js';

(async () => {
    const questions = await fetchQuestions();
    const playerCount = 3; 
    const questionSets = getQuestions(questions, playerCount);
    
    const players = [
        createPlayer("Alice"),
        createPlayer("Bob"),
        createPlayer("Charlie")
    ];
    
    players.forEach((player, index) => {
        const playerQuestions = questionSets[index];
        
        playerQuestions.forEach(question => {
            const userAnswer = Math.random() > 0.3 ? question.answer : "wrong answer";
            processAnswer(player, question, userAnswer);
        });
        
        const maxScore = getMaxPossibleScore(playerQuestions);
        console.log(`${player.name}: ${player.score}/${maxScore} points`);
        console.log(`Correct answers: ${player.correctAnswers}/${player.totalQuestions}`);
        console.log(`Score percentage: ${getScorePercentage(player)}%`);
        console.log('-------------------');
    });
    
    console.log("LEADERBOARD:");
    getLeaderboard(players).forEach((player, index) => {
        console.log(`${index + 1}. ${player.name}: ${player.score} points`);
    });
    
    savePlayers(players);
})();