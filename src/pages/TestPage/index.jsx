import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionList } from "../../util";
import ProgressBar from "./ProgreeBar";
import Question from "./Question";
import "./index.css";

function TestPage() {
  const navigator = useNavigate();
  const [state, setState] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [sumChecked, setSumChecked] = useState(0);
  const [scores, setScores] = useState(Array(100).fill(0));
  const [scoreData, setScoreData] = useState({
    // empatheticCommunicator
    noneE: 0,
    Facilitator: 0,
    Advisor: 0,
    Coordinator: 0,
    // actionOrientedAchiever
    noneA: 0,
    Transformer: 0,
    Innovator: 0,
    Adventurer: 0,
    // loyanStabilizer
    noneL: 0,
    Supporter: 0,
    Guardian: 0,
    Mediator: 0,
    // strategicThinker
    noneS: 0,
    Critic: 0,
    Strategist: 0,
    Analyst: 0,
  });

  useEffect(() => {
    const data = QuestionList();
    setState(data);
    setQuestionData(data[pageIndex]);
  }, [QuestionList]);

  useEffect(() => {
    if (state.length > 0) {
      setState(
        state.map((item) =>
          item.map((i) => ({
            ...i,
            value: scores[i.id - 1],
          }))
        )
      );
    }
  }, [scores]);

  const onClickNext = () => {
    if (sumChecked < questionData.length) {
      alert("모든 항목에 체크해주세요.");
      return;
    }
    setPageIndex(pageIndex + 1);
    setSumChecked(0);
    window.scrollTo({
      top: 10,
      behavior: "instant",
    });
  };

  useEffect(() => {
    if (state.length > 0) {
      if (pageIndex < state.length) {
        setQuestionData(state[pageIndex]);
      } else {
        setScoreFunction();
        console.log(scoreData);
        navigator("/result", { state: scoreData });
      }
    }
  }, [pageIndex]);

  const setScoreFunction = () => {
    state.map((item) =>
      item.map((i) => {
        const persona = i.persona;
        if (persona !== "")
          setScoreData({
            ...scoreData,
            [persona]: (scoreData[persona] += i.value / 2),
          });
        else if (i.type === "Empathetic Communicator") {
          setScoreData({
            ...scoreData,
            noneE: (scoreData.noneE += i.value),
          });
        } else if (i.type === "Action-Oriented Achiever") {
          setScoreData({
            ...scoreData,
            noneA: (scoreData.noneA += i.value),
          });
        } else if (i.type === "Loyal Stabilizer") {
          setScoreData({
            ...scoreData,
            noneL: (scoreData.noneL += i.value),
          });
        } else if (i.type === "Strategic Thinker") {
          setScoreData({
            ...scoreData,
            noneS: (scoreData.noneS += i.value),
          });
        }
      })
    );
  };
  if (!questionData) return;
  return (
    <div className="TestPage">
      <div className="test-header">SEAL Proto 1차</div>
      <div className="progressbar-container">
        <ProgressBar data={questionData} total={100} />
      </div>
      <div className="question-box">
        {questionData.map((item) => (
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
