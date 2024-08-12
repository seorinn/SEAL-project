import { useState, useEffect } from "react";
import icon_circle from "../../../../assets/icons/icon_circle.png";
import Bottom from "../../Bottom";
import Header from "../../Header";
import CoworkItem from "./CoworkItem";
import "./index.css";

function Cowork({ data }) {
  const [name, setName] = useState("");
  const [coworkData, setCoworkData] = useState([]);

  useEffect(() => {
    setName(data[0].type);
    setCoworkData(data);
  }, []);

  if (coworkData.length === 0) return;
  return (
    <div className="Cowork resultpage">
      <div className="container">
        <Header reportname="Work Style Report" title="1. 나의 REAL 대표 유형" />
        <div className="content-title">
          <img alt="" src={icon_circle} />
          <div>다른 유형과 함께 일하기</div>
        </div>
        <div className="content">
          <div className="content-four-types">
            {coworkData.map((item, index) => (
              <CoworkItem key={item.content} index={index} {...item} />
            ))}
          </div>
        </div>
      </div>
      <Bottom pageIndex={0} />
    </div>
  );
}

export default Cowork;
