import Bottom from "../../Bottom";
import Header from "../../Header";
import "./index.css";

function Introduction() {
  return (
    <div className="Introduction resultpage">
      <div className="container">
        <Header reportname="Personal Behavior Report" title="Introduction" />
        <div className="content-box">
          <div className="title">REAL 진단이란?</div>
          <div className="content">
            <div>
              <div className="text">
                REAL 진단은 다양한 심리학적 이론과 모델을 통합하여 개인의 성격과
                행동 패턴을 체계적으로 평가하는 성격 유형 평가 도구입니다. 주요
                특징과 목적은 다음과 같습니다.
              </div>
              <p>1. 통합적 접근</p>
              <div>
                Big Five 성격 이론, MBTI, DISC 이론, 심리측정학적 원칙을
                결합하여 성격 특성과 행동 패턴을 다각적으로 평가합니다.
              </div>
            </div>
            <div>
              <p>2. 구체적인 피드백</p>
              <div>
                각 유형에 대한 구체적이고 실질적인 피드백을 제공하여 개인의 자기
                이해를 돕고, 구체적인 발전 전략을 제시합니다.
              </div>
            </div>
            <div>
              <p>3. 자기 이해와 대인 관계 개선</p>
              <div>
                개인의 성격을 이해하고, 이를 바탕으로 더 나은 의사소통과
                팀워크를 촉진하는 것을 목표로 합니다.
              </div>
            </div>
            <div>
              <p>4. 신뢰성과 유용성</p>
              <div>
                다양한 심리학적 이론과 모델을 기반으로 하여 신뢰할 수 있고
                유용한 성격 평가를 제공하며, 이를 통해 사용자가 개인 발전과 대인
                관계 개선에 도움을 받을 수 있습니다.
              </div>
            </div>
          </div>
        </div>
        <div className="content-box">
          <div className="title">REAL 업무 성향 진단 도구의 이론적 배경</div>
          <div className="content">
            <div>
              <div className="text">
                REAL 업무 성향 진단 도구는 여러 심리학적 이론과 원칙을 바탕으로
                설계되었습니다.
              </div>
              <p>1. Big Five 성격 이론</p>
              <div>
                성격을 개방성, 성실성, 외향성, 우호성, 정서 안정성의 다섯 가지
                주요 차원으로 평가합니다. 개인의 성격을 다섯 가지 차원에서
                평가하여 종합적인 성격 프로파일을 제공합니다.
              </div>
            </div>
            <div>
              <p>2. MBTI (Myers-Briggs Type Indicator)</p>
              <div>
                사람들의 선호도에 따라 16가지 성격 유형으로 구분하여 분석합니다.
                개인의 선호도와 행동 양식을 분석하여, 의사결정 방식, 정보 처리
                방식, 대인 관계 스타일을 이해합니다.
              </div>
            </div>
            <div>
              <p>3. DISC 이론</p>
              <div>
                행동 스타일을 주도형, 사교형, 안정형, 신중형으로 나누어
                평가합니다. 개인의 행동 스타일을 분석하여, 각 스타일의 강점과
                약점을 평가하고 효과적인 의사소통 방법과 협업 전략을 도출합니다.{" "}
              </div>
            </div>
            <div>
              <p>4. 심리측정학적 원칙 (Psychometric Principles)</p>
              <div>
                심리학적 평가 도구의 신뢰성과 타당성을 보장하는 원칙입니다. REAL
                성격 유형 진단은 심리측정학적 원칙에 따라 설계되어, 일관성 있고
                정확한 결과를 제공합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom pageIndex={0} />
    </div>
  );
}

export default Introduction;
