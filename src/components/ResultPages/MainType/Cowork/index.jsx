import { useState, useEffect } from "react";
import { fourTypes, getIconImage } from "../../../../util";
import icon_circle from "../../../../assets/icons/icon_circle.png";
import Bottom from "../../Bottom";
import Header from "../../Header";
import CoworkItem from "./CoworkItem";
import Watermark from "../../Watermark";
import "./index.css";

function Cowork({ data }) {
  const [name, setName] = useState("");
  const [coworkData, setCoworkData] = useState([]);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    setName(data[0].type);
    setCoworkData(data);
    fourTypes.map((item) => {
      if (item.name === data[0].type)
        setInitial(item.nameEng.slice(0, 1).toLowerCase());
    });
  }, []);

  if (coworkData.length === 0) return;
  return (
    <div className="Cowork resultpage">
      <div className="container">
        <Header reportname="Work Style Report" title="1. 나의 REAL 대표 유형" />
        <div className="maintype-container">
          <div className="text">{name}</div>
          <div
            className="img-container"
            style={{ backgroundColor: `var(--navy-${initial})` }}
          >
            <img alt={name} src={getIconImage(name, true)} />
          </div>
        </div>
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
      <Bottom pageIndex={14} />
      <Watermark />
    </div>
  );
}

export default Cowork;
