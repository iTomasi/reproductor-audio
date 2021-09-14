import questions from "config/questions";

const randomQuestion = () => {
    const randomNumber = Math.floor(Math.random() * questions.length);

    return questions[randomNumber];
};

export default randomQuestion;
