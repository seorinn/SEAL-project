import img_quarter from "../../../../assets/images/quarter_mask.png";
import Bottom from "../../Bottom";
import Header from "../../Header";
import Watermark from "../../Watermark";
import "./index.css";

function Introduction({}) {
  return (
    <div className="Introduction resultpage">
      <div className="container">
        <Header reportname="Personal Behavior Report" title="REAL 진단 소개" />
        <div className="content">
          <div className="text">
            다양한 진단 도구를 경험한 시간은 진단도구와 시스템에 대한 다양성을
            인식할 수 있는 중요한 계기가되었습니다. 국민 진단도구 MBTI, 많이
            알려진 DISC, 그리고 성격/행동 유형 분야에서 구조적으로 강력한 BIG 5
            검사 등, 인간을 유형화하는 다양한 접근법이 존재합니다. <br />
            <br />
            인간을 단순히 4가지 범주로 진단시, 매우 복잡한 인간 성격과 행동의
            다양성을 모두 포괄하기에는 한계가 있습니다. 세계 인구 81억명이 각자
            독특한 지문을 가지고 있듯이, 각 개인 성격도 고유합니다. 이러한 인식
            하에, 저희는 계속해서 더 나은 접근 방법을 모색하고 있습니다.
            <br />
            <br />
            <br />
            <b>루트컨설팅이 개발한 REAL Personality 진단은,</b>
            <div className="detail">
              <div className="number">①</div> 유형연구의 시초인 Carl G. Jung의
              심리유형 연구 결과를 기본 토대로 합니다. <br />
              (사람을 사고/감정, 감각/직관 축으로 구분, DISC, MBTI, Big5 등
              대다수의 진단은 융의 연구를 기초로 함)
            </div>
            <div className="detail">
              <div className="number">②</div> Big Five, MBTI, DISC 그리고
              심리측정학적 원칙을 통합하여 개발되었습니다. 각 이론의 강점과
              약점을 반영하여 성격 특성과 행동 패턴을 발전시켰습니다. 4개 유형과
              12개 캐릭터를 추가 제공해서 진단 결과 활용도를 높였습니다.
            </div>
            <div className="detail">
              <div className="number">③</div> 각 문항과 결과는 한국어를 모국어로
              하는 대학교수, 행동/인지심리 전문가와 수차례 반복 점검했으며
              문항간 통계 타당/신뢰도는 충분히 확보했으며 머신러닝을 통하여
              진단의 완성도를 높였으며, 현재도 실제 데이터의 수집 통하여 진단을
              계속 업데이트하고 있습니다.
            </div>
            <br />
            <br />
            <div className="text-bottom">
              유형별 맞춤형 전략을 제안, 개인의 성장 가능성을 최대화하고, 팀
              내에서의 역동성 향상에 기여합니다. 더 나아가, REAL Personality는
              각 개인이 자신만의 특성을 이해하고, 다른 사람들과의 관계에서도
              이해와 공감 능력을 높일 수 있도록 설계되었습니다.
            </div>
            <br />
            <div className="text-bottom">
              루트컨설팅은 이 도구를 통해, 모든 사용자가 자신의 잠재력을 깨닫고,
              사회적 상호작용에서 더욱 성공적이고 의미 있는 결과를 도출할 수
              있도록 지원하는 데 집중하고 있습니다. 우리는 이를 통해 개인의 자기
              개발은 물론, 조직의 건강한 문화 형성에도 기여하고자 합니다.
            </div>
          </div>
          <div className="quarter-container">
            <img alt="" src={img_quarter} />
          </div>
        </div>
      </div>
      <Bottom pageIndex={2} />
      <Watermark />
    </div>
  );
}

export default Introduction;
