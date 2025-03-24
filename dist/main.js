import { fetchQuestions, getQuestions } from './modules/questions.js';
(async () => {
    const questions = await fetchQuestions();
    const players = 3; //z.B.: 3 Spieler
    const distributed = getQuestions(questions, players); //5 questions for each player as Question[][]-Array
    console.log(distributed);
})();
