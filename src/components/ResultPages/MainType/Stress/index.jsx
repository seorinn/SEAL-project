import { useState, useEffect } from "react";
import { fourTypes, getIconImage } from "../../../../util";
import Bottom from "../../Bottom";
import BoxTitle from "../../BoxTitle";
import Header from "../../Header";
import SubHeader from "../../SubHeader";
import Watermark from "../../Watermark";
import "./index.css";

function Stress({ data }) {
  const [name, setName] = useState("");
  const [tendency, setTendency] = useState("");
  const [tendencyExample, setTendencyExample] = useState("");
  const [strength, setStrength] = useState([]);
  const [weakness, setWeakness] = useState([]);
  const [control, setControl] = useState([]);
  const [recommand, setRecommand] = useState([]);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    setName(data[0].type);
    setTendency(data.filter((item) => item.category === "stress_tendency")[0]);
    setTendencyExample(
      data.filter((item) => item.category === "stress_tendency_example")[0]
    );
    setStrength(data.filter((item) => item.category === "stress_strength"));
    setWeakness(data.filter((item) => item.category === "stress_weakness"));
    setControl(data.filter((item) => item.category === "stress_control"));
    setRecommand(data.filter((item) => item.category === "stress_recommand"));
    fourTypes.map((item) => {
      if (item.name === data[0].type)
        setInitial(item.nameEng.slice(0, 1).toLowerCase());
    });
  }, []);

  return (
    <div className="Stress resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="1. 나의 REAL 대표 유형"
        />
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
          <BoxTitle title="스트레스 반응" />
          {tendency && strength && weakness && control && recommand && (
            <div className="box-content">
              <div className="content-section">
                <SubHeader title="경향" />
                <div className="item">{tendency.content}</div>
                <div className="example item">{tendencyExample.content}</div>
              </div>
              <div className="content-section">
                <SubHeader title="강점 및 약점" />
                <div className="strength">
                  {strength.map((item) => (
                    <div key={item.content} className="item">
                      <b>{item.content.split(":")[0]}:</b>
                      {item.content.split(":")[1]}
                    </div>
                  ))}
                </div>
                <div className="weakness">
                  {weakness.map((item) => (
                    <div key={item.content} className="item">
                      <b>{item.content.split(":")[0]}:</b>
                      {item.content.split(":")[1]}
                    </div>
                  ))}
                </div>
              </div>
              <div className="content-section">
                <SubHeader title="스트레스 대응/관리 방법" />
                {control.map((item) => (
                  <div key={item.content} className="item">
                    <b>{item.content.split(":")[0]}:</b>
                    {item.content.split(":")[1]}
                  </div>
                ))}
              </div>
              <div className="content-section">
                <SubHeader title="전문의 추천 방법" />
                {recommand.map((item) => (
                  <div key={item.content} className="item">
                    <b>{item.content.split(":")[0]}:</b>
                    {item.content.split(":")[1]}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Bottom pageIndex={13} />
      <Watermark />
    </div>
  );
}

export default Stress;
