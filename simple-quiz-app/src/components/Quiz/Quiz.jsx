import React, { useRef, useState } from "react";
import "./Quiz.scss";
import sample from "../../assets/sample.png";
import { getImageUrl } from "../../utils";
import { data } from "../../data/data";

export const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [result, setResult] = useState(false);
  let [score, setScore] = useState(0);
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let option_array = [Option1, Option2, Option3, Option4];

  const checkAnswer = (element, ans) => {
    if (lock === false) {
      if (question.answer === ans) {
        element.target.classList.add("correct");
        setScore(++score);
        setLock(true);
      } else {
        element.target.classList.add("wrong");
        setLock(true);
        option_array[question.answer - 1].current.classList.add("correct"); // add class correct to the answer example answer = 1 then its option 1 and it's index will be i-1
      }
    }
  };

  const nextQuestion = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct"); // remove previous selection
      });
    }
  };

  return (
    <div className="container">
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2 className="question">
            <span>Question {index + 1}:</span>
            &nbsp;{question.question}
          </h2>
          <img src={sample} alt="sample-img" />
          <ul className="answers">
            <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>
              <span>1. </span>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>
              <span>2. </span>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>
              <span>3. </span>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>
              <span>4. </span>
              {question.option4}
            </li>
          </ul>
          <button onClick={nextQuestion} className="next-btn">
            Next
          </button>
          <div className="index">1 of 1.000.000.000 Questions</div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You score {score} out of {data.length}
          </h2>
          <button>Play Again</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
