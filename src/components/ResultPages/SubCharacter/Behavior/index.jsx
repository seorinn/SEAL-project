import { useEffect, useState } from "react";
import icon_face_do from "../../../../assets/icons/icon_face_do.png";
import icon_face_dont from "../../../../assets/icons/icon_face_dont.png";
import Bottom from "../../Bottom";
import Header from "../../Header";
import SubHeader from "../../SubHeader";
import BehaviorItem from "./BehaviorItem";
import "./index.css";

function Behavior({ data }) {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [oppositeChar, setOppositeChar] = useState("");
  const [charDo, setCharDo] = useState("");
  const [charDont, setCharDont] = useState("");

  useEffect(() => {
    setLikes(
      data.filter(
        (item) =>
          item.category.includes("like") && !item.category.includes("dislike")
      )
    );
    setDislikes(data.filter((item) => item.category.includes("dislike")));
    setOppositeChar(
      data.filter((item) => item.category === "opposite_character")[0].content
    );
    setCharDo(
      data.filter((item) => item.category === "opposite_do")[0].content
    );
    setCharDont(
      data.filter((item) => item.category === "opposite_dont")[0].content
    );
  }, []);

  return (
    <div className="Behavior resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="2. 나의 REAL 대표 캐릭터"
        />
        <div className="content">
          <SubHeader title="선호하는 말과 행동 / 선호하지 않는 말과 행동" />
          <div className="behavior-box-container">
            <BehaviorItem
              title="선호하는 말과 행동"
              //   contents={likes}
              contents={likes}
            />
            <BehaviorItem
              title="선호하지 않는 말과 행동"
              //   contents={dislikes}
              contents={dislikes}
            />
          </div>
        </div>
        <div className="content">
          <SubHeader title="반대 캐릭터 및 협업 방법" />
          <div className="text-section">
            <div className="char">▶ 반대 캐릭터: {oppositeChar}</div>
            <div className="do">
              <div className="char-title" style={{ color: "var(--text-pos)" }}>
                <img alt="do" src={icon_face_do} />
                Do:
              </div>
              {charDo}
            </div>
            <div className="dont">
              <div className="char-title" style={{ color: "var(--text-neg)" }}>
                <img alt="dont" src={icon_face_dont} />
                Don't:
              </div>
              {charDont}
            </div>
          </div>
        </div>
      </div>
      <Bottom pageIndex={0} />
    </div>
  );
}

export default Behavior;
