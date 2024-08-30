import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, fetchData } from "../../util";
import MultipleChoices from "../../components/MultipleChoices";
import Question from "../../components/Question";
import ProgressBar from "./ProgressBar";
import "./index.css";

function TestPage() {
  const navigator = useNavigate();
  const isStatistic = getCookie("statistic") || false;
  const [scoredata, setScoredata] = useState([]);

  const [state, setState] = useState([]);
  const [questionsOnPage, setQuestionsOnPage] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [sumCheckedOnPage, setSumCheckedOnPage] = useState(0);
  const [sumChecked, setSumChecked] = useState(0);
  const [total, setTotal] = useState(0);

  if (!getCookie("userinfo") && !getCookie("statistic")) navigator("/");

  useEffect(() => {
    if (isStatistic) setScoredata(getCookie("scoredata"));
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

  const onClickBack = () => {
    if (pageIndex === 0) navigator(`/admin`);
    setPageIndex(pageIndex - 1);
    setQuestionsOnPage(state[pageIndex - 1]);
    window.scrollTo({
      top: 10,
      behavior: "instant",
    });
  };

  const onClickNext = () => {
    if (!isStatistic && sumCheckedOnPage < questionsOnPage.length) {
      alert("모든 항목에 체크해주세요.");
      return;
    }

    if (pageIndex < state.length - 1) {
      setSumCheckedOnPage(0);
      setQuestionsOnPage(state[pageIndex + 1]);
      setPageIndex(pageIndex + 1);
    } else if (!isStatistic) {
      handleGetResult();
    } else {
      navigator(`/admin`);
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
      if (key.includes("형")) scoreMain.push({ [key]: value });
      else scoreSub.push({ [key]: value });
    });

    console.log(scoreMain, scoreSub);
    navigator("/result", { state: { state, scoreMain, scoreSub } });
  };

  if (!questionsOnPage) return;
  return (
    <div className="TestPage">
      <div className="test-header">
        <div className="logo-text">
          <b>REAL</b> Personality
        </div>
        {!isStatistic && (
          <div className="progressbar-container">
            <ProgressBar sumChecked={sumChecked} total={total} />
          </div>
        )}
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
              scoredata={scoredata}
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
              scoredata={scoredata}
            />
          )
        )}
      </div>
      <div className="bottom-buttons">
        {isStatistic && (
          <button className="btn_back" onClick={() => onClickBack()}>
            이전
          </button>
        )}
        {/* {isStatistic && pageIndex !== state.length - 1 && (
          <button className="btn_submit" onClick={onClickNext}>
            다음
          </button>
        )} */}
        {/* {!isStatistic && ( */}
        <button className="btn_submit" onClick={onClickNext}>
          {pageIndex === state.length - 1
            ? isStatistic
              ? "관리자 페이지로"
              : "제출하기"
            : "다음"}
        </button>
        {/* )} */}
      </div>
    </div>
  );
}

export default TestPage;
