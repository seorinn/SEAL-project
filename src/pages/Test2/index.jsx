import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../util";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import MultipleChoices from "./MultipleChoices";
import "./index.css";

function Test2Page({ userInfo }) {
  const navigator = useNavigate();
  const [state, setState] = useState([]);
  const [questionsOnPage, setQuestionsOnPage] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [sumCheckedOnPage, setSumCheckedOnPage] = useState(0);
  const [sumChecked, setSumChecked] = useState(0);
  const [total, setTotal] = useState(0);

  // if (!userInfo.isChecked) navigator("/");

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
      setState(
        transformedData.map((item) =>
          item.slice().filter((i) => i !== undefined)
        )
      );
      setQuestionsOnPage(
        transformedData.map((item) =>
          item.slice().filter((i) => i !== undefined)
        )[pageIndex]
      );
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
    let arr = [];
    let result = {};
    let scoreMain = [];
    let scoreSub = [];

    state.map((page) => {
      page.map((question) => {
        if (question.id.startsWith("ABS"))
          arr.push({ [question.type]: question.weight * question.value });
        else arr.push({ [question.answer]: question.weight });
      });
    });

    arr.forEach((item) => {
      let key = Object.keys(item)[0];
      let value = item[key];

      if (result[key]) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    });

    let finalResult = Object.keys(result).map((key) => ({
      [key]: result[key],
    }));

    finalResult.forEach((item) => {
      let key = Object.keys(item)[0];
      let value = item[key];

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
      state: { scoreMain: scoreMain, scoreSub: scoreSub },
    });
  };

  if (!questionsOnPage) return;
  return (
    <div className="TestPage">
      <div className="test-header">SEAL Proto 1차</div>
      <div className="progressbar-container">
        <ProgressBar
          pageIndex={pageIndex}
          sumChecked={sumChecked}
          total={total}
        />
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
      <div className="button-box">
        <button onClick={onClickNext}>
          {pageIndex === state.length - 1 ? "제출하기" : "다음"}
        </button>
      </div>
    </div>
  );
}

export default Test2Page;
