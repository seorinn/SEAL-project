import { useEffect, useState } from "react";
import Bottom from "../../Bottom";
import Header from "../../Header";
import SubHeader from "../../SubHeader";
import MoreInfoBox from "../../MoreInfoBox";
import "./index.css";
import Watermark from "../../Watermark";

function Weakness({ data }) {
  const [weaknesses, setWeaknesses] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    setWeaknesses(data.filter((item) => item.category === "weakness"));
    setCases(data.filter((item) => item.category === "weakness_case"));
  }, []);

  return (
    <div className="Weakness resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="2. 나의 REAL 대표 캐릭터"
        />
        <div className="top-section"></div>
        <div className="bottom-section">
          <SubHeader title="약점 (개발 필요점)" />
          <div className="text-section">
            {weaknesses.map((item) => (
              <div key={item.content} className="strength-item">
                <div className="item-content">▶ {item.content}</div>
                <div className="item-detail">{item.detail}</div>
              </div>
            ))}
          </div>
          <div className="case-example-box">
            <MoreInfoBox title="실제사례" contents={cases} />
          </div>
        </div>
      </div>
      <Bottom pageIndex={17} />
      <Watermark />
    </div>
  );
}

export default Weakness;
