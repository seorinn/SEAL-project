import { useState, useEffect } from "react";
import { fourTypes, getIconImage } from "../../../../util";
import Bottom from "../../Bottom";
import BoxTitle from "../../BoxTitle";
import Header from "../../Header";
import Watermark from "../../Watermark";
import "./index.css";

function Changes({ data }) {
  const [name, setName] = useState("");
  const [changes, setChanges] = useState([]);
  const [conflict, setConflict] = useState([]);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    setName(data[0].type);
    setChanges(data.filter((item) => item.category === "change_res"));
    setConflict(data.filter((item) => item.category === "conflict"));
    fourTypes.map((item) => {
      if (item.name === data[0].type)
        setInitial(item.nameEng.slice(0, 1).toLowerCase());
    });
  }, []);

  return (
    <div className="Changes resultpage">
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
      <Bottom pageIndex={12} />
      <Watermark />
    </div>
  );
}

export default Changes;
