import { useState, useEffect } from "react";
import { fourTypes, getIconImage } from "../../../../util";
import Bottom from "../../Bottom";
import BoxTitle from "../../BoxTitle";
import CaseBox from "../../CaseBox";
import Header from "../../Header";
import "./index.css";
import Watermark from "../../Watermark";

function WorkingStyle({ data }) {
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [texts, setTexts] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    setName(data[0].type);
    fourTypes.map((item) => {
      if (item.name === data[0].type) {
        setIntro(item.intro);
        setContent(item.content);
      }
    });
    setTexts(data.filter((item) => item.category === "strength"));
    setCases(data.filter((item) => item.category === "strength_example"));
  }, []);

  const getColor = () => {
    if (name === "분석형") return "var(--navy-r)";
    else if (name === "관계형") return "var(--navy-e)";
    else if (name === "도전형") return "var(--navy-a)";
    else if (name === "안정형") return "var(--navy-l)";
  };

  return (
    <div className="WorkingStyle resultpage ">
      <div className="container">
        <Header reportname="Work Style Report" title="1. 나의 REAL 대표 유형" />
        <div className="content">
          <div className="title">나의 대표 유형의 상세 리포트</div>
          <div className="type-info">
            <div
              className="img-container"
              style={{ backgroundColor: getColor() }}
            >
              <img alt="" src={getIconImage(name, true)} />
            </div>
            <div className="text-container">
              <div className="nameIntro">
                <div className="name">{name}</div>
                <div className="intro">{intro}</div>
              </div>
              <div>{content}</div>
            </div>
          </div>
          <div className="box">
            <BoxTitle title={`${name}의 업무 스타일과 강점`} />
            <div className="content-section">
              <div className="text-section">
                {texts.map((item) => (
                  <div key={item.content} className="text-item">
                    {item.content}
                  </div>
                ))}
              </div>
              <div className="case-section">
                {cases.map((item) => (
                  <CaseBox key={item.content} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom pageIndex={8} />
      <Watermark />
    </div>
  );
}

export default WorkingStyle;
