export async function fetchQuestions() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok)
            throw new Error('HTTP error! status: ' + response.status);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}
//shuffle questions
function shuffleQuestions(array) {
    return [...array].sort(() => Math.random() - 0.5);
}
//returns array of questions type Question for each player
export function getQuestions(questions, players) {
    const easy = shuffleQuestions(questions.filter(q => q.difficulty === 'easy'));
    const medium = shuffleQuestions(questions.filter(q => q.difficulty === 'medium'));
    const hard = shuffleQuestions(questions.filter(q => q.difficulty === 'hard'));
    const selectedQuestions = Array.from({ length: players }, () => []); //create array with length of players and empty content
    //5 questions per player (2 easy, 2 medium, 1 hard)
    for (let i = 0; i < players; i++) {
        selectedQuestions[i].push(...easy.splice(0, 2)); //question 0, 1 for easy -> + questions removed from easy-Array
        selectedQuestions[i].push(...medium.splice(0, 2)); //question 0, 1 for medium
        selectedQuestions[i].push(...hard.splice(0, 1)); ////question 0 for hard
    }
    return selectedQuestions;
}
