import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../util";
import img_testheader from "../../assets/images/test-header.png";
import ProgressBar from "./ProgressBar";
import MultipleChoices from "./MultipleChoices";
import Question from "./Question";
import "./index.css";

function TestPage({ userInfo }) {
  const navigator = useNavigate();
  const [state, setState] = useState([]);
  const [questionsOnPage, setQuestionsOnPage] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [sumCheckedOnPage, setSumCheckedOnPage] = useState(0);
  const [sumChecked, setSumChecked] = useState(0);
  const [total, setTotal] = useState(0);

  if (!userInfo.name) navigator("/");

  useEffect(() => {
    fetchData("newquestion-data.xlsx").then((res) => {
      let count = 0;
      let answers = [];
      let currentKey = null;
      let transformedData = res.map((item) =>
        item.map((i) => {
          if (i.id.startsWith("ABS")) {
            count++;
            return i;
          }
          if (i.id.startsWith("REL")) {
            count++;
            currentKey = i.id;
            answers.push({ [currentKey]: [] });
            return {
              ...i,
              answers: answers[answers.length - 1][currentKey],
            };
          } else {
            answers[answers.length - 1][currentKey].push(i);
          }
        })
      );
      setTotal(count);
      const foramttedData = transformedData.map((item) =>
        item.slice().filter((i) => i !== undefined)
      );
      setState(foramttedData);
      setQuestionsOnPage(foramttedData[pageIndex]);
    });
  }, []);

  const onClickNext = () => {
    if (sumCheckedOnPage < questionsOnPage.length) {
      alert("모든 항목에 체크해주세요.");
      return;
    }

    if (pageIndex < state.length - 1) {
      setSumCheckedOnPage(0);
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
    let scoreMain = [];
    let scoreSub = [];

    const scores = {};
    state.forEach((page) => {
      page.forEach((item) => {
        scores[item.type] = (scores[item.type] || 0) + item.value;
      });
    });

    Object.entries(scores).map(([key, value]) => {
      if (
        key === "관계형" ||
        key === "도전형" ||
        key === "안정형" ||
        key === "분석형"
      )
        scoreMain.push({ [key]: value });
      else scoreSub.push({ [key]: value });
    });

    console.log(scoreMain, scoreSub);
    navigator("/result", {
      state: { state: state, scoreMain: scoreMain, scoreSub: scoreSub },
    });
  };

  if (!questionsOnPage) return;
  return (
    <div className="TestPage">
      <div className="test-header">
        <div className="logo-text">
          {/* <b>REAL</b> Personality */}
          <img alt="REAL Personality" src={img_testheader} />
        </div>
        <div className="progressbar-container">
          <ProgressBar
            pageIndex={pageIndex}
            sumChecked={sumChecked}
            total={60}
          />
        </div>
      </div>
      <div className="question-box">
        {questionsOnPage.map((item) =>
          item.id.startsWith("ABS") ? (
            <Question
              key={item.id}
              {...item}
              checked={sumCheckedOnPage}
              setChecked={setSumCheckedOnPage}
              sumChecked={sumChecked}
              setSumChecked={setSumChecked}
              state={state}
              setState={setState}
            />
          ) : (
            <MultipleChoices
              key={item.id}
              {...item}
              checked={sumCheckedOnPage}
              setChecked={setSumCheckedOnPage}
              sumChecked={sumChecked}
              setSumChecked={setSumChecked}
              state={state}
              setState={setState}
            />
          )
        )}
      </div>
      <button className="btn_submit" onClick={onClickNext}>
        {pageIndex === state.length - 1 ? "제출하기" : "다음"}
      </button>
    </div>
  );
}

export default TestPage;
