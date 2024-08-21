import { useState, useEffect } from "react";
import { fourTypes, getIconImage } from "../../../../util";
import CaseBox from "../../CaseBox";
import Bottom from "../../Bottom";
import BoxTitle from "../../BoxTitle";
import Header from "../../Header";
import Watermark from "../../Watermark";
import "./index.css";

function Weak({ data }) {
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [texts, setTexts] = useState([]);
  const [cases, setCases] = useState([]);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    setName(data[0].type);
    setIntro(
      data.filter((item) => item.category === "weakness_intro")[0].content
    );
    setTexts(data.filter((item) => item.category === "weakness"));
    setCases(data.filter((item) => item.category === "weakness_example"));
    fourTypes.map((item) => {
      if (item.name === data[0].type)
        setInitial(item.nameEng.slice(0, 1).toLowerCase());
    });
  }, []);

  return (
    <div className="Weak resultpage">
      <div className="container">
        <Header reportname="Work Style Report" title="1. 나의 REAL 대표 유형" />
        <div className="content">
          <div className="maintype-container">
            <div className="text">{name}</div>
            <div
              className="img-container"
              style={{ backgroundColor: `var(--navy-${initial})` }}
            >
              <img alt={name} src={getIconImage(name, true)} />
            </div>
          </div>
          <div className="box">
            <BoxTitle title={`${name}의 약점과 개선 방안`} />
            <div className="box-content">
              <div className="intro">{intro}</div>
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
      </div>
      <Bottom pageIndex={9} />
      <Watermark />
    </div>
  );
}

export default Weak;
