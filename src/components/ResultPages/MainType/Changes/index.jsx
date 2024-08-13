import { useState, useEffect } from "react";
import Bottom from "../../Bottom";
import BoxTitle from "../../BoxTitle";
import Header from "../../Header";
import "./index.css";

function Changes({ data }) {
  const [name, setName] = useState("");
  const [changes, setChanges] = useState([]);
  const [conflict, setConflict] = useState([]);

  useEffect(() => {
    setName(data[0].type);
    setChanges(data.filter((item) => item.category === "change_res"));
    setConflict(data.filter((item) => item.category === "conflict"));
  }, []);

  return (
    <div className="Changes resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="1. 나의 REAL 대표 유형"
        />
        <div className="content">
          <div className="box">
            <BoxTitle title="변화에 대응하는 방법" />
            <div className="box-content">
              <div className="content-section">
                {changes.map((item) => (
                  <div key={item.content} className="change-item">
                    <div className="title-container">
                      <div
                        className="item-title"
                        dangerouslySetInnerHTML={{
                          __html: item.content.replace(/\\n/g, `<br/>`),
                        }}
                      ></div>
                    </div>
                    <div className="item-content">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="box">
            <BoxTitle title="갈등 스타일" />
            <div className="box-content">
              <div className="content-section">
                <div className="text-section">
                  {conflict.map((item) => (
                    <div key={item.content} className="conflict-item">
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

export default Changes;
