import { useEffect, useState } from "react";
import logo_kia from "../../../assets/images/logo_KIA.jpg";
import { fourTypes, twelveChar } from "../../../util";
import Bottom from "../Bottom";
import Header from "../Header";
import "./index.css";
import Quarter from "../../Quarter";
import BarChart from "../MainType/BarChart";
import CharTable from "../CharTable";
import Keywords from "../Keywords";

function Summary({ name, mainType, subType, scoreData, keywordData }) {
  const [initial, setInitial] = useState("");
  const [adjMain, setAdjMain] = useState("");
  const [adjSub, setAdjSub] = useState("");
  const [contentMain, setContentMain] = useState("");
  const [contentSub, setContentSub] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [secondType, setSecondType] = useState({ key: "", value: 0 });
  const [isLargeGap, setIsLargeGap] = useState(false);

  useEffect(() => {
    fourTypes.map((item) => {
      if (item.name === mainType) {
        setInitial(item.nameEng.slice(0, 1));
        setContentMain(item.content);
        setAdjMain(item.adj);
      }
    });
    twelveChar.map((item) => {
      if (item.name === subType) {
        setAdjSub(item.adj);
        setContentSub(item.nameEng);
      }
    });
    setKeywords(keywordData[0].content.split(", "));
    const entries = scoreData.map((obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      return { key, value };
    });
    entries.sort((a, b) => b.value - a.value);
    console.log(entries);
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
            <img alt="" src={logo_kia} />
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
                    <Quarter />
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
                <div className="text-container">{contentMain}</div>
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
                      {initial}({secondType.key})
                    </b>
                    도 적지 않아요!
                  </div>
                )}
                <div className="component-container">
                  <BarChart scoreData={scoreData} />
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
                  <CharTable current={subType} />
                </div>
                <div className="text-container">{contentMain}</div>
              </div>
              <div className="item-right">
                <div className="component-title">
                  대표하는 <b>키워드(강조)</b>입니다!
                </div>
                <div className="component-container">
                  <Keywords keywords={keywords} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom pageIndex={0} />
    </div>
  );
}

export default Summary;
