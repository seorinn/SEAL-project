import Bottom from "../../Bottom";
import Header from "../../Header";
import "./index.css";

function SheetPage() {
  return (
    <div className="SheetPage resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="자신과 변화를 약속해보세요!"
        />
        <div className="content">
          <div className="top">
            <div className="saying">
              "지식을 행동으로 옮기지 않으면 불충분한 지식이나 다름없다" <br />
              <b>
                Knowing is not enough; we must apply. Willing is not enough; we
                must do{" "}
              </b>
              <br />
              아리스토텔레스(Aristotle) BC 384~322
            </div>
            비즈니스 수업에서 배운 이론을 실제 사업에 적용하거나, 윤리학에서
            배운 원칙을 일상 결정에 반영하는 것과 같이 지식을 실천에 옮기는 것의
            중요성을 강조합니다. 이 사상은 약 2천년 전에 나왔음에도 불구하고,
            오늘날에도 여전히 중요한 교훈을 제공합니다. <br />
            <br />
            진단 결과에서 얻는 시사점을 아래와 같은 방법으로 실천해보세요.
          </div>
          <div className="bottom">
            <div className="item top-left">
              <p>제거(Eliminate)</p>
              <h1>E</h1>
            </div>
            <div className="item top-right">
              <p>감소(Reduce)</p>
              <h1>R</h1>
            </div>
            <div className="item bottom-left">
              <h1>R</h1>
              <p>증가(Raise)</p>
            </div>
            <div className="item bottom-right">
              <h1>C</h1>
              <p>창조(Create)</p>
            </div>
          </div>
        </div>
        <Bottom pageIndex={0} />
      </div>
    </div>
  );
}

export default SheetPage;
