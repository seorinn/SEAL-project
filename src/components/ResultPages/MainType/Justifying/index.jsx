import { useState, useEffect } from "react";
import { getIconImage, fourTypes } from "../../../../util";
import Bottom from "../../Bottom";
import BoxTitle from "../../BoxTitle";
import Header from "../../Header";
import "./index.css";

function Justifying({ step, data }) {
  const [name, setName] = useState("");
  const [workStyle, setWorkStyle] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    setName(data[0].type);
    setWorkStyle(data.filter((item) => item.category === "work_style"));
    setLeadership(data.filter((item) => item.category === "leadership"));
    fourTypes.map((item) => {
      if (item.name === data[0].type)
        setInitial(item.nameEng.slice(0, 1).toLowerCase());
    });
  }, []);

  return (
    <div className="Justifying resultpage">
      <div className="container">
        <Header reportname="Work Style Report" title="1. 나의 REAL 대표 유형" />
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
            <BoxTitle title={`${name}의 업무 스타일`} />
            <div className="box-content">
              <div className="content-section">
                <div className="text-section">
                  {workStyle.map((item) => (
                    <div key={item.content} className="text-item">
                      {item.content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <BoxTitle title="리더십 스타일" />
            <div className="box-content">
              <div className="content-section">
                <div className="text-section">
                  {leadership.map((item) => (
                    <div key={item.content} className="text-item">
                      {item.content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom pageIndex={step - 1} />
    </div>
  );
}

export default Justifying;
