import { useEffect, useState } from "react";
import { getIconImage } from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import SubHeader from "../../SubHeader";
import MoreInfoBox from "../../MoreInfoBox";
import CharTable from "../../CharTable";
import "./index.css";

function Strength({ step, data }) {
  const [content, setContent] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    setContent(
      data.filter((item) => item.category === "content")[0].content.split(", ")
    );
    setStrengths(data.filter((item) => item.category === "strength"));
    setCases(data.filter((item) => item.category === "strength_case"));
  }, []);

  return (
    <div className="Strength resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="2. 나의 REAL 대표 캐릭터"
        />
        <div className="top-section">
          <div className="text-section">
            <div className="intro">
              <div className="img-container">
                <img alt={data[0].type} src={getIconImage(data[0].type)} />
              </div>
              당신의 캐릭터는 {data[0].type}입니다.
            </div>
            <div className="text-box">
              {content.map((item) => (
                <div key={item} className="text-box-item">
                  • {item}
                </div>
              ))}
            </div>
          </div>
          <div className="table-container">
            <CharTable current={data[0].type} />
          </div>
        </div>
        <div className="bottom-section">
          <SubHeader title="강점" />
          <div className="text-section">
            {strengths.map((item) => (
              <div key={item.content} className="strength-item">
                <div className="item-title">▶ {item.content}</div>
                <div className="item-content">{item.detail}</div>
              </div>
            ))}
          </div>
          <div className="case-example-box">
            <MoreInfoBox title="실제사례" contents={cases} />
          </div>
        </div>
      </div>
      <Bottom pageIndex={step - 1} />
    </div>
  );
}

export default Strength;
