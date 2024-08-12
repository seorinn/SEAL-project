import { fourTypes } from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import CircularItem from "./CircularItem";
import TypeItem from "./TypeItem";
import "./index.css";

function Overview() {
  return (
    <div className="Overview resultpage">
      <div className="container">
        <Header title="Overview of the REAL Model" />
        <div className="content">
          <div className="text">
            <b>REAL 업무성향 진단</b>은 개인의 성격과 행동 패턴을 체계적으로
            평가하여, 그 결과를 네 가지 주요 유형으로 분류하는 도구입니다. 각
            업무 성향 유형은 개인의 주된 사고 방식과 행동 양식을 반영하여,
            다음과 같은 특징을 가집니다.
          </div>
          <div className="content-four-types">
            {fourTypes.map((item) => (
              <CircularItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="header">
          <span>4가지 유형 소개</span>
        </div>
        <div className="content">
          <div className="content-four-types">
            {fourTypes.map((item) => (
              <TypeItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
      <Bottom pageIndex={0} />
    </div>
  );
}

export default Overview;
