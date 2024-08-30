import { useEffect, useState } from "react";
import { getCookie } from "../../../../util";
import MultipleChoices from "../../../../components/MultipleChoices";
import Question from "../../../../components/Question";
import GroupHeader from "../GroupHeader";
import "./index.css";

function Statistic({ groupinfo, state, total }) {
  const [questiontype, setQuestiontype] = useState("");
  const [scoredata, setScoredata] = useState([]);
  const [stateLeft, setStateLeft] = useState([]);
  const [stateRight, setStateRight] = useState([]);

  useEffect(() => {
    if (state.length > 0)
      state[0].id.startsWith("ABS")
        ? setQuestiontype("question")
        : setQuestiontype("multiple");
    setScoredata(getCookie("scoredata"));
  }, [state]);

  useEffect(() => {
    if (questiontype === "question") {
      setStateLeft(state.slice(0, 6));
      setStateRight(state.slice(6, 12));
    } else {
      setStateLeft(state.slice(0, 4));
      setStateRight(state.slice(4, 8));
    }
  }, [questiontype]);

  return (
    <div className="Statistic page">
      <GroupHeader groupinfo={groupinfo} />
      <div className="container">
        <div className="intro">
          {groupinfo.companyname} {groupinfo.groupname} ({total}명 진단) 주요
          결과입니다.
        </div>
        <div className="content">
          <div className="left-section">
            {stateLeft.map((item) =>
              questiontype === "question" ? (
                <Question
                  key={item.id}
                  {...item}
                  state={state}
                  scoredata={scoredata}
                />
              ) : (
                <MultipleChoices
                  key={item.id}
                  {...item}
                  state={state}
                  scoredata={scoredata}
                />
                // <p>123</p>
              )
            )}
          </div>
          <div className="right-section">
            {stateRight.map((item) =>
              questiontype === "question" ? (
                <Question
                  key={item.id}
                  {...item}
                  state={state}
                  scoredata={scoredata}
                />
              ) : (
                <MultipleChoices
                  key={item.id}
                  {...item}
                  state={state}
                  scoredata={scoredata}
                />
                // <p>123</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistic;
