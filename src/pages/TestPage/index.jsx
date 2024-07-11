import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import "./index.css";

function TestPage({ userInfo, questionData }) {
  const navigator = useNavigate();
  const [state, setState] = useState([]);
  const [questionsOnPage, setQuestionsOnPage] = useState([]);
  const [pageIndex, setPageIndex] = useState(15);
  const [sumChecked, setSumChecked] = useState(0);

  // if (!userInfo.isChecked) navigator("/");

  useEffect(() => {
    if (questionData) {
      let data = [];
      let sub = [];
      questionData.map((question, index) => {
        if (index > 0 && question.persona !== questionData[index - 1].persona) {
          data.push(sub);
          sub = [];
          sub.push({ ...question, id: index + 1 });
        } else {
          sub.push({ ...question, id: index + 1 });
          if (index === questionData.length - 1) data.push(sub);
        }
      });
      setState(data);
      setQuestionsOnPage(data[pageIndex]);
    }
  }, [questionData]);

  const onClickNext = () => {
    if (sumChecked < questionsOnPage.length) {
      alert("모든 항목에 체크해주세요.");
      return;
    }

    if (pageIndex < state.length - 1) {
      setSumChecked(0);
      setQuestionsOnPage(state[pageIndex + 1]);
      setPageIndex(pageIndex + 1);
    } else {
      handleGetResult();
    }
    window.scrollTo({
      top: 10,
      behavior: "instant",
    });
  };

  const handleGetResult = () => {
    const getScores = (givenType) => {
      return state.reduce((acc, page) => {
        return page.reduce((innerAcc, question) => {
          const type = question.type;
          const point = question.point;
          const value = question.value || 0;
          if (givenType === type) {
            if (question.persona) {
              const persona = question.persona;
              innerAcc[persona] = (innerAcc[persona] || 0) + point * value;
            } else {
              const type = `none${question.type.slice(0, 1)}`;
              innerAcc[type] = (innerAcc[type] || 0) + point * value;
            }
          }
          return innerAcc;
        }, acc);
      }, {});
    };

    const scoreData = [
      { type: "Empathetic Communicator" },
      { type: "Action-Oriented Achiever" },
      { type: "Loyan Stabilizer" },
      { type: "Strategic Thinker" },
    ];
    const formattedScoreData = scoreData.map((item) => ({
      ...item,
      personas: getScores(item.type),
    }));

    console.log(formattedScoreData);
    navigator("/result", { state: formattedScoreData });
  };

  if (!questionsOnPage) return;
  return (
    <div className="TestPage">
      <div className="test-header">SEAL Proto 1차</div>
      <div className="progressbar-container">
        <ProgressBar data={questionsOnPage} total={60} />
      </div>
      <div className="question-box">
        {questionsOnPage.map((item) => (
          <Question
            key={item.keyId}
            {...item}
            checked={sumChecked}
            setChecked={setSumChecked}
            setState={setState}
            state={state}
          />
        ))}
      </div>
      <div className="button-box">
        <button onClick={onClickNext}>
          {pageIndex === state.length - 1 ? "제출하기" : "다음"}
        </button>
      </div>
    </div>
  );
}

export default TestPage;
