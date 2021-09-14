import React, { useRef, useEffect, useState } from "react";

// Helpers
import formatDate from "helpers/formatDate";

// Libs
import randomQuestion from "helpers/randomQuestion";

// https://c.tenor.com/ir2nX96xSJUAAAAC/ghosts-my-profile.gif

const QuestionCard = () => {
    const questionTime = useRef(formatDate(Date.now()));
    const [question, setQuestion] = useState<string>("");

    useEffect(() => {
        const generateQuestion = randomQuestion();

        setQuestion(generateQuestion);
    }, []);

    return (
        <div className="iw_questionCard">
            <div className="iws_userInfo">
                <img
                    src="https://c.tenor.com/ir2nX96xSJUAAAAC/ghosts-my-profile.gif"
                    alt="User"
                />

                <h3>
                    Tomatito <span>@iTomasi</span>
                </h3>
            </div>

            <p>{question}</p>

            <h5>{questionTime.current}</h5>
        </div>
    );
};

export default QuestionCard;
