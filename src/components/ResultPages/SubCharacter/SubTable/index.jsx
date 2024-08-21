import { useEffect, useState } from "react";
import {
  getCookie,
  getIconImage,
  getTableImage,
  twelveChar,
} from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import Watermark from "../../Watermark";
import "./index.css";

function SubTable() {
  const userInfo = getCookie("userinfo");
  const [nameEng, setNameEng] = useState("");

  useEffect(() => {
    twelveChar.map((item) => {
      if (item.name === userInfo.subType) setNameEng(item.nameEng);
    });
  }, []);

  return (
    <div className="SubTable resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="2. 나의 REAL 대표 캐릭터"
        />
        <div className="content">
          <div className="text">
            캐릭터는 당신의 유형 상위 1개 분면에 시각적(색깔)으로 표시됩니다.
            당신이 가장 많이 활용하고 표현하는 캐릭터입니다.
          </div>
          <div className="characters">
            <div className="table-container">
              <img alt={userInfo.subType} src={getTableImage(nameEng)} />
            </div>
            <div className="center">
              <div className="icon-container">
                <img
                  alt={userInfo.subType}
                  src={getIconImage(userInfo.subType)}
                />
              </div>
              <p>
                당신의 캐릭터는
                <br />
                <b>{userInfo.subType}</b> 입니다.
              </p>
            </div>
          </div>
          <div className="bottom-text">
            12개 캐릭터는 두 가지 주요 축을 중심으로 분류됩니다.
            <br />
            X축: 집중 영역: 사람 중심(SubCharacterPeople-Focused) vs 과제
            중심(Task-Focused)
            <br />
            Y축: 의사결정 스타일 - 감정, 직관 기반(Emotional Data Driven) vs
            논리, 분석 기반(Logical Data Driven)
          </div>
        </div>
      </div>
      <Bottom pageIndex={15} />
      <Watermark />
    </div>
  );
}

export default SubTable;
