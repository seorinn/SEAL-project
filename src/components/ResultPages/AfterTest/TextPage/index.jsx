import img_chartable from "../../../../assets/images/chartable.png";
import img_quarter from "../../../../assets/images/quarter.png";
import Quarter from "../../../Quarter";
import Bottom from "../../Bottom";
import Header from "../../Header";
import "./index.css";

function TextPage({ step }) {
  return (
    <div className="TextPage resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="진단 결과를 활용해서 더 성장하는 방법은?"
        />
        <div className="content">
          <div className="top">
            진단 결과를 다시 한 번 꼼꼼히 검토해 보세요. 그리고 이 결과에서 볼
            수 있는 강점과 개발 필요점들이 당신의 일상생활 에서 어떻게 나타나고
            있는지 생각해 보세요. 이 진단은 ‘내가 직접한 작성한’ 설문
            결과입니다. 따라서 이 진단 결과 점수는 당신이 지금 이 순간 스스로를
            어떻게 바라보고 있는지를 보여줍니다. 가족이나 친구, 동료 등 당신을
            잘 알고 있는 사람들과 이 결과에 대해 이야기 나눠 보세요.
          </div>
          <div className="mid">
            다음 질문을 서로 주고 받아보세요!
            <div className="content-item">
              <div className="title">REAL 유형에서</div>
              <div className="box">
                {/* <div className="quarter-container"> */}
                {/* <Quarter /> */}
                <img className="quarter" alt="12캐릭터" src={img_quarter} />
                {/* </div> */}
                <div className="question">
                  <div className="question-item">
                    <div className="num">①</div> 이 자료가 당신의 전형적인
                    모습을 잘 나타내고 있나요?
                  </div>
                  <div className="question-item">
                    <div className="num">②</div> 어느 부분에 동의하고, 어느
                    부분에 동의하지 않나요?
                  </div>
                  <div className="question-item">
                    <div className="num">③</div> 불안할 때와 차분하고 집중력을
                    유지할 때의 모습은 많이 다른가요?
                  </div>
                </div>
              </div>
              <div className="title">12개 캐릭터 유형에서</div>
              <div className="box">
                <img className="chartable" alt="12캐릭터" src={img_chartable} />
                <div className="question">
                  <div className="question-item">
                    <div className="num">①</div>
                    강한 캐릭터와 약한 캐릭터 결과를 동의하시나요? (아니시라면
                    왜?)
                  </div>
                  <div className="question-item">
                    <div className="num">②</div>
                    이런 캐릭터 유형이 주위 사람들이나 나의 일에 어떤 영향을
                    미칠까요?
                  </div>
                  <div className="question-item">
                    <div className="num">③</div>
                    강점을 더 강하게 하시려면 무엇을 어떻게 하셔야 할까요?
                  </div>
                  <div className="question-item">
                    <div className="num">④</div>
                    약점으로 기회를 잃지 않으시려면 무엇을 어떻게 보완하셔야
                    할까요?
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            이 보고서가 당신의 REAL 진단 결과 이해에 도움이 되기를 바랍니다.
            REAL 전문가와의 토론을 통해 더 깊은 이해와 적용을 도모할 수
            있습니다. 조직 구성원들의 성장과 발전을 위한 모델과 솔루션에 대한
            자세한 정보를 원하신다면 루트컨설팅
            홈페이지(www.rootconsulting.co.kr)를 방문해 주세요. 다음 단계로
            나아갈 준비가 되셨다면, 개인적 및 직업적 성장을 촉진하는 맞춤형 발전
            방안을 요청하실 수 있습니다. 이 방안은 성격 특성과 행동 패턴을
            개발하고 활용하는 구체적인 전략을 제공하여, 당신의 삶을 더 풍요롭게
            만들 수 있습니다.
          </div>
        </div>
        <Bottom pageIndex={step - 1} />
      </div>
    </div>
  );
}

export default TextPage;
