import { getTableImage } from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import Watermark from "../../Watermark";
import "./index.css";

function Character({}) {
  return (
    <div className="Character resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="12개 Character 소개"
        />
        <div className="content">
          <div className="text">
            REAL 업무 성향 진단 도구는 12개의 캐릭터를 통해 자신의 일하는 방식을
            인식하고, 각 캐릭터에 해당하는 역할을 이해할 수 있도록
            구성되었습니다. 이를 통해 사용자는 자신의 성향과 일하는 방식을 쉽게
            파악하고, 팀 내에서 어떤 역할을 맡을 때 가장 효과적인지를 알 수
            있습니다.
          </div>
          <div className="characters">
            {/* <div className="table-container"> */}
            <img alt="table" src={getTableImage("all")} />
            {/* // <CharTable isAll={true} /> */}
            {/* </div> */}
          </div>
          <div className="bottom-text">
            12개 캐릭터는 두 가지 주요 축을 중심으로 분류됩니다.
            <br />
            X축: 집중 영역: 사람 중심(People-Focused) vs 과제 중심(Task-Focused)
            <br />
            Y축: 의사결정 스타일 - 감정, 직관 기반(Emotional Data Driven) vs
            논리, 분석 기반(Logical Data Driven)
          </div>
        </div>
      </div>
      <Bottom pageIndex={4} />
      <Watermark />
    </div>
  );
}

export default Character;
