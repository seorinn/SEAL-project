import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../../App";
import { fetchData } from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import ScoreRadar from "../../ScoreRadar";
import Watermark from "../../Watermark";
import "./index.css";

function ScoreGraph() {
  const userData = useContext(UserStateContext);
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
              (item) =>
                item.type === userData.subType && item.category === "content"
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
    userData.scoreSub.forEach((item) => {
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
          title={`당신은 매우 강한 특성을 가진 ${userData.subType} 유형입니다.`}
        />
        <div className="content">
          <div className="score-radar">
            <ScoreRadar />
          </div>
          <div className="bottom-section">
            <div className="left box">
              <div className="title">▶ 강한 캐릭터: {userData.subType}</div>
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
      <Bottom pageIndex={19} />
      <Watermark />
    </div>
  );
}

export default ScoreGraph;
