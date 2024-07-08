import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { ResultList } from "../../util";
import ResultItem from "./ResultItem";
import "./index.css";

function ResultPage({ userInfo }) {
  const { toPDF, targetRef } = usePDF({
    filename: `SEAL 진단 테스트 결과_${userInfo.name}.pdf`,
  });
  const location = useLocation();
  const {
    noneE,
    Facilitator,
    Advisor,
    Coordinator,
    noneA,
    Transformer,
    Innovator,
    Adventurer,
    noneL,
    Supporter,
    Guardian,
    Mediator,
    noneS,
    Critic,
    Strategist,
    Analyst,
  } = location.state;

  const [scoreData, setScoreData] = useState([
    {
      type: "Empathetic Communicator",
      personas: {
        none: noneE,
        Facilitator: Facilitator,
        Advisor: Advisor,
        Coordinator: Coordinator,
      },
      value: 0,
    },
    {
      type: "Action-Oriented Achiever",
      personas: {
        none: noneA,
        Transformer: Transformer,
        Innovator: Innovator,
        Adventurer: Adventurer,
      },
      value: 0,
    },
    {
      type: "Loyal Stabilizer",
      personas: {
        none: noneL,
        Supporter: Supporter,
        Guardian: Guardian,
        Mediator: Mediator,
      },
      value: 0,
    },
    {
      type: "Strategic Thinker",
      personas: {
        none: noneS,
        Critic: Critic,
        Strategist: Strategist,
        Analyst: Analyst,
      },
      value: 0,
    },
  ]);
  const [highstType, setHighstType] = useState();
  const [highstPersona, setHighstPersona] = useState();
  const [results, setResults] = useState([]);
  const [subtypes, setSubtypes] = useState([]);

  const formattedDate = `${new Date().getFullYear()}.${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`;

  const findHighest = (data) => {
    let max = { type: "", value: 0 };
    for (var i = 0; i < data.length; i++) {
      if (max.value < data[i].value) max = data[i];
    }
    return max.type;
  };

  useEffect(() => {
    setScoreData(
      scoreData.map((item) => {
        const sum = Object.values(item.personas).reduce(
          (acc, curr) => acc + curr,
          0
        );
        return {
          ...item,
          value: sum,
        };
      })
    );
  }, []);

  useEffect(() => {
    setHighstType(findHighest(scoreData));
  }, [scoreData]);

  useEffect(() => {
    let data = [];
    scoreData.map((item) => {
      if (item.type === highstType) {
        const [type, value] = [
          Object.keys(item.personas),
          Object.values(item.personas),
        ];
        for (var i = 1; i < type.length; i++) {
          data.push({ type: type[i], value: value[i] });
        }
      }
    });
    setHighstPersona(findHighest(data));
    setSubtypes(data);
  }, [highstType]);

  useEffect(() => {
    setResults(ResultList(highstPersona));
  }, [highstPersona]);

  return (
    <div className="ResultPage">
      <div ref={targetRef} className="result-container">
        <div className="result-header">
          <h1>SEAL Diagnostic Result Example</h1>
          <h2>Participant Information</h2>
          <p>이름: {userInfo.name}</p>
          <p>소속: {userInfo.affiliation}</p>
          <p>직급: {userInfo.position}</p>
          <p>날짜: {formattedDate}</p>
        </div>
        <div className="result-body">
          <h1>Diagnostic Summary </h1>
          <h2>
            Main Type: <b>{highstType}</b>
          </h2>
          <h3>
            Sub Type: <b>{highstPersona}</b>
          </h3>
          <div>
            {results.map((result, index) => (
              <ResultItem key={index} index={index} result={result} />
            ))}
          </div>
        </div>
        <div className="result-table">
          <div className="score-box">
            <b>주요 유형 점수</b>
            {scoreData.map((item) => (
              <div key={item.type}>{`${item.type}: ${item.value}점`}</div>
            ))}
          </div>
          <div className="score-box">
            <b>하위 유형 점수 ({highstType} 내)</b>
            {subtypes.map((item, index) => (
              <div key={index}>{`${item.type}: ${item.value}점`}</div>
            ))}
          </div>
        </div>
      </div>
      <button className="btnPDF" onClick={() => toPDF()}>
        PDF 저장하기
      </button>
    </div>
  );
}
export default ResultPage;
