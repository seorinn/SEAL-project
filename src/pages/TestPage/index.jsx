import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import ProgressBar from "./ProgreeBar";
import Question from "./Question";
import "./index.css";

function TestPage({ userInfo }) {
  const navigator = useNavigate();
  const [state, setState] = useState([]);
  const [questionsOnPage, setQuestionsOnPage] = useState([]);
  const [scores, setScores] = useState(Array(60).fill(0));
  const [pageIndex, setPageIndex] = useState(0);
  const [sumChecked, setSumChecked] = useState(0);
  const [scoreData, setScoreData] = useState();

  if (!userInfo.isChecked) navigator("/");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("question-data.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        dividePageFunc(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const dividePageFunc = (questions) => {
    let data = [];
    let sub = [];
    questions.map((question, index) => {
      if (index > 0 && question.persona !== questions[index - 1].persona) {
        data.push(sub);
        sub = [];
        sub.push({ ...question, id: index + 1 });
      } else {
        sub.push({ ...question, id: index + 1 });
        if (index === questions.length - 1) data.push(sub);
      }
    });
    setState(data);
    setQuestionsOnPage(data[pageIndex]);
  };

  useEffect(() => {
    if (state.length > 0) {
      setState(
        state.map((page) =>
          page.map((question) => ({
            ...question,
            value: scores[question.id - 1],
          }))
        )
      );
    }
  }, [scores]);

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
      setScoreFunction();
      console.log("d");
    }
    window.scrollTo({
      top: 10,
      behavior: "instant",
    });
  };

  useEffect(() => {
    if (scoreData) {
      navigator("/result", { state: scoreData });
      console.log(scoreData);
    }
  }, [scoreData]);

  const setScoreFunction = () => {
    const accumulatedScoreData = state.reduce((acc, page) => {
      return page.reduce((innerAcc, question) => {
        const point = question.point;
        const value = question.value;
        if (question.persona) {
          const persona = question.persona.split(" ")[0];
          innerAcc[persona] = (innerAcc[persona] || 0) + point * value;
        } else {
          const type = `none${question.type.slice(0, 1)}`;
          innerAcc[type] = (innerAcc[type] || 0) + point * value;
        }
        return innerAcc;
      }, acc);
    }, {});

    setScoreData((preScoreData) => ({
      ...preScoreData,
      ...accumulatedScoreData,
    }));
  };

  if (!questionsOnPage) return;
  return (
    <div className="TestPage">
      <div className="test-header">SEAL Proto 1차</div>
      <div className="progressbar-container">
        <ProgressBar data={questionsOnPage} total={100} />
      </div>
      <div className="question-box">
        {questionsOnPage.map((item) => (
          <Question
            key={item.keyId}
            {...item}
            checked={sumChecked}
            setChecked={setSumChecked}
            scores={scores}
            setScores={setScores}
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
