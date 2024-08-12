import { useEffect, useState } from "react";
import { fetchData } from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import ScoreRadar from "../../ScoreRadar";
import "./index.css";

function ScoreGraph({ subType, scoreSub }) {
  const [lowestType, setLowestType] = useState("");
  const [hightestContent, setHighestContent] = useState([]);
  const [lowestContent, setLowestContent] = useState([]);

  useEffect(() => setLowestType(findLowest), []);

  useEffect(() => {
    if (lowestType)
      fetchData("result-sub.xlsx").then((res) => {
        setHighestContent(
          res
            .filter(
              (item) => item.type === subType && item.category === "content"
            )[0]
            .content.split(", ")
        );
        setLowestContent(
          res
            .filter(
              (item) => item.type === lowestType && item.category === "content"
            )[0]
            .content.split(", ")
        );
      });
  }, [lowestType]);

  const findLowest = () => {
    let min = 16;
    let lowest;
    scoreSub.forEach((item) => {
      let key = Object.keys(item)[0];
      let value = item[key];
      if (value < min) {
        min = value;
        lowest = key;
      }
    });
    return lowest;
  };

  return (
    <div className="ScoreGraph resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title={`당신은 매우 강한 특성을 가진 ${subType} 유형입니다.`}
        />
        <div className="content">
          {/* <div className="top-section">유형설명</div> */}
          <div className="score-radar">
            <ScoreRadar scoreData={scoreSub} subType={subType} />
          </div>
          <div className="bottom-section">
            <div className="left box">
              <div className="title">▶ 강한 캐릭터: {subType}</div>
              <div className="box-content">
                {hightestContent.map((item) => (
                  <div key={item} className="box-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="right box">
              <div className="title">▶ 약한 캐릭터: {lowestType}</div>
              <div className="box-content">
                {lowestContent.map((item) => (
                  <div key={item} className="box-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom pageIndex={0} />
    </div>
  );
}

export default ScoreGraph;
