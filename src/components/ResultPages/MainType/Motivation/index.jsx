import { useState, useEffect } from "react";
import { fourTypes, getIconImage } from "../../../../util";
import icon_circle from "../../../../assets/icons/icon_circle.png";
import icon_checkbox from "../../../../assets/icons/icon_checkbox.png";
import Bottom from "../../Bottom";
import BoxTitle from "../../BoxTitle";
import Header from "../../Header";
import "./index.css";

function Motivation({ step, data }) {
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [items, setItems] = useState([]);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    setName(data[0].type);
    setIntro(
      data.filter((item) => item.category === "motivation_intro")[0].content
    );
    setItems(data.filter((item) => item.category === "motivation"));
    fourTypes.map((item) => {
      if (item.name === data[0].type)
        setInitial(item.nameEng.slice(0, 1).toLowerCase());
    });
  }, []);

  return (
    <div className="Motivation resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="1. 나의 REAL 대표 유형"
        />
        <div className="content">
          <div className="maintype-container">
            <div className="text">{name}</div>
            <div
              className="img-container"
              style={{ backgroundColor: `var(--navy-${initial})` }}
            >
              <img alt={name} src={getIconImage(name, true)} />
            </div>
          </div>
          <div className="box">
            <BoxTitle title="동기부여 핵심 요소" />
            <div className="box-content">
              <div className="content-section">
                <div className="text-section">{intro}</div>
                {items.map((item, index) => (
                  <div key={index} className="item">
                    <div className="item-title">{item.content}</div>
                    <div className="item-content">{item.detail}</div>
                    <div className="bottom">
                      <div className="item-points">
                        <div className="point-title">
                          <img alt="" src={icon_circle} />
                          <div>주요 포인트</div>
                        </div>
                        <div className="point-item">
                          <img alt="checkbox" src={icon_checkbox} />
                          {item.point.split(", ")[0]}
                        </div>
                        <div className="point-item">
                          <img alt="checkbox" src={icon_checkbox} />
                          {item.point.split(", ")[1]}
                        </div>
                      </div>
                      <div
                        className="item-example"
                        dangerouslySetInnerHTML={{
                          __html: item.text.replace(/\\n/g, `<br/>`),
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom pageIndex={step - 1} />
    </div>
  );
}

export default Motivation;
