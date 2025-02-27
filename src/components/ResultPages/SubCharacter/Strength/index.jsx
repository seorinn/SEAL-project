import { useEffect, useState } from "react";
import { getIconImage, getTableImage, twelveChar } from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import SubHeader from "../../SubHeader";
import MoreInfoBox from "../../MoreInfoBox";
import Watermark from "../../Watermark";
import "./index.css";

function Strength({ data }) {
  const [content, setContent] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [cases, setCases] = useState([]);
  const [nameEng, setNameEng] = useState("");

  useEffect(() => {
    setContent(
      data.filter((item) => item.category === "content")[0].content.split(", ")
    );
    setStrengths(data.filter((item) => item.category === "strength"));
    setCases(data.filter((item) => item.category === "strength_case"));
    twelveChar.map((item) => {
      if (item.name === data[0].type) setNameEng(item.nameEng);
    });
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
            <img alt={data[0].type} src={getTableImage(nameEng)} />
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
      <Bottom pageIndex={16} />
      <Watermark />
    </div>
  );
}

export default Strength;
