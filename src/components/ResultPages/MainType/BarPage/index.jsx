import { useEffect, useState } from "react";
import { fourTypes, getIconImage } from "../../../../util";
import Header from "../../Header";
import "./index.css";
import Bottom from "../../Bottom";
import BarChart from "../BarChart";

function BarPage({ step, mainType, scoreMain }) {
  const [nameEng, setNameEng] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fourTypes.map((item) => {
      if (item.name === mainType) {
        setNameEng(item.nameEng);
        setIntro(item.intro);
        setContent(item.content);
      }
    });
  }, []);

  return (
    <div className="BarPage resultpage">
      <div className="container">
        <Header reportname="Work Style Report" title="1. 나의 REAL 대표 유형" />
        <div className="content">
          <div className="main-title">
            나의 대표 유형은 <b>{mainType}</b> 입니다.
          </div>
          <div className="main-content">
            이 그래프는 네 가지 주요 업무 스타일 유형 중에서 본인의 특성이 가장
            높은 유형을 시각적으로 보여줍니다. <br /> 그래프의 막대는 각각의
            업무 스타일 유형(분석형, 관계형, 도전형, 안정형)에 대한 점수를
            나타내며, 점수가 높은 순서대로 나열되어 있습니다.
          </div>
          <div className="fourtypes">
            {fourTypes.map((item) => (
              <div key={item.name} className="typeitem">
                <div className="icon-container">
                  <img alt={item.name} src={getIconImage(item.name)} />
                </div>
                <div className="item-texts">
                  <div className="item-name">
                    {item.name} ({item.nameEng})
                  </div>
                  <div className="item-intro">{item.intro}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bar-container">
            <BarChart mainType={mainType} scoreData={scoreMain} />
          </div>
        </div>
      </div>
      <Bottom pageIndex={step - 1} />
    </div>
  );
}

export default BarPage;
