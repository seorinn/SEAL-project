import { useEffect, useState } from "react";
import { fourTypes, getTableImage, KIALogo, twelveChar } from "../../../util";
import img_quarter from "../../../assets/images/quarter.png";
import Bottom from "../Bottom";
import Header from "../Header";
import BarChart from "../BarChart";
import Keywords from "../Keywords";
import "./index.css";
import Watermark from "../Watermark";

function Summary({ name, mainType, subType, scoreData, keywordData }) {
  const [initial, setInitial] = useState("");
  const [nameEng, setNameEng] = useState("");
  const [secondInitial, setSecondInitial] = useState("");
  const [adjMain, setAdjMain] = useState("");
  const [adjSub, setAdjSub] = useState("");
  const [contentMain, setContentMain] = useState([]);
  const [contentSub, setContentSub] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [secondType, setSecondType] = useState({ key: "", value: 0 });
  const [isLargeGap, setIsLargeGap] = useState(false);

  useEffect(() => {
    fourTypes.map((item) => {
      if (item.name === mainType) {
        setInitial(item.nameEng.slice(0, 1));
        setContentMain(item.content.split("\n"));
        setAdjMain(item.adj);
      }
    });
    twelveChar.map((item) => {
      if (item.name === subType) {
        setNameEng(item.nameEng);
        setAdjSub(item.adj);
        setContentSub(item.content.split(", "));
      }
    });
    setKeywords(keywordData[0].content.split(", "));
    const entries = scoreData.map((obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      return { key, value };
    });
    entries.sort((a, b) => b.value - a.value);
    fourTypes.map((item) => {
      if (item.name === entries[1].key)
        setSecondInitial(item.nameEng.slice(0, 1));
    });
    setSecondType(entries[1]);
    setIsLargeGap(entries[0].value - entries[1].value > 10);
  }, []);

  return (
    <div className="Summary resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="진단결과 요약(Executive Summary)"
        />
        <div className="content">
          <div className="name-container">
            <img alt="" src={KIALogo} />
            {name} 님의 REAL Personality ™ 진단 주요 결과입니다.
          </div>
          <div className="box">
            <div className="title">
              {adjMain}
              <b>
                {initial}({mainType})
              </b>
              입니다!
            </div>
            <div className="content-items">
              <div className="item-left">
                <div className="quarter-container">
                  <div className="background">
                    {/* <Quarter /> */}
                    <img alt="real" src={img_quarter} />
                  </div>
                  <div className="selected">
                    <div
                      className="quarter-selected top left"
                      style={{
                        opacity: initial === "R" ? "0.5" : "0",
                      }}
                    />
                    <div
                      className="quarter-selected top right"
                      style={{
                        opacity: initial === "E" ? "0.5" : "0",
                      }}
                    />
                    <div
                      className="quarter-selected bottom left"
                      style={{
                        opacity: initial === "A" ? "0.5" : "0",
                      }}
                    />
                    <div
                      className="quarter-selected bottom right"
                      style={{
                        opacity: initial === "L" ? "0.5" : "0",
                      }}
                    />
                  </div>
                </div>
                <div className="text-container">
                  {contentMain.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>
              <div className="item-right">
                {isLargeGap ? (
                  <div className="component-title">
                    탁월한
                    <b>
                      {initial}({mainType})
                    </b>
                    유형의 스페셜리스트!
                  </div>
                ) : (
                  <div className="component-title">
                    그러나
                    <b>
                      {secondInitial}({secondType.key})
                    </b>
                    도 적지 않아요!
                  </div>
                )}
                <div className="component-container">
                  <div className="bar-container">
                    <BarChart scoreData={scoreData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="title">
              {adjSub}
              <b>{subType}</b>캐릭터입니다!
            </div>
            <div className="content-items">
              <div className="item-left">
                <div className="chartable-container">
                  {/* <CharTable current={subType} /> */}
                  <img alt={subType} src={getTableImage(nameEng)} />
                </div>
                <div className="text-container">
                  {contentSub.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>
              <div className="item-right">
                <div className="component-title">
                  대표하는 <b>키워드(강조)</b>입니다!
                </div>
                <div className="component-container">
                  <div className="keywords-container">
                    <Keywords keywords={keywords} isSummary={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom pageIndex={5} />
      <Watermark />
    </div>
  );
}

export default Summary;
