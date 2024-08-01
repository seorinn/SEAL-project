import { getFourTypes } from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import TypeItem from "./TypeItem";
import "./index.css";

function Overview() {
  const fourTypes = getFourTypes();
  return (
    <div className="Overview resultpage">
      <Header />
      <div className="background">
        <div className="title">REAL 성격 유형 진단 도구의 이론적 배경</div>
        <div className="content">
          <p>
            <b>
              REAL 진단은 여러 심리학적 이론과 모델을 기반으로 각 유형의
              성격특성을 평가하고자 설계된 진단입니다.
            </b>
          </p>
          <p>
            SSEAL 성격 유형 진단은 Big Five 성격 이론, MBTI, DISC 이론, 그리고
            심리측정학적 원칙을 통합하여 개발되었습니다.
            <br />각 이론의 강점을 반영하여 성격 특성과 행동 패턴을 체계적으로
            평가하며,{" "}
            <b>
              각 유형에 대한 구체적인 피드백을 제공합니다.
              <br />
              이를 통해 개인의 자기 이해를 돕고 더 나은 의사소통과 팀워크를
              촉진하는 것을 목표로 합니다.
            </b>
          </p>
          <p>
            {" "}
            이 도구는 다양한 심리학적 이론과 모델을 기반으로 하여, 신뢰할 수
            있고 유용한 성격 평가를 제공할 수 있도록 설계되었습니다. 이를 통해
            사용자는 자신의 성격 유형을 이해하고, 이를 바탕으로 개인 발전과 대인
            관계 개선에 도움이 되는 구체적인 전략을 수립할 수 있습니다.
          </p>
        </div>
      </div>
      <div className="fourtypes-container">
        <div className="title">4가지 유형 소개</div>
        <div className="content">
          <p>
            <b>
              해당 진단은 60개의 문항을 5점 척도로 측정하여 네 가지 유형으로
              분류하였습니다.
            </b>
          </p>
          <div className="fourtypes">
            {fourTypes.map((item) => (
              <TypeItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
      <Bottom />
    </div>
  );
}

export default Overview;
