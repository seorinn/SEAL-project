import { useState, useEffect } from "react";
import Bottom from "../../Bottom";
import BoxTitle from "../../BoxTitle";
import Header from "../../Header";
import "./index.css";

function Justifying({ data }) {
  const [name, setName] = useState("");
  const [workStyle, setWorkStyle] = useState([]);
  const [leadership, setLeadership] = useState([]);

  useEffect(() => {
    setName(data[0].type);
    setWorkStyle(data.filter((item) => item.category === "work_style"));
    setLeadership(data.filter((item) => item.category === "leadership"));
  }, []);

  return (
    <div className="Justifying resultpage">
      <div className="container">
        <Header reportname="Work Style Report" title="1. 나의 REAL 대표 유형" />
        <div className="content">
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
      <Bottom pageIndex={0} />
    </div>
  );
}

export default Justifying;
