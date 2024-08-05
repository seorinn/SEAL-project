import Header from "../Header";
import Bottom from "../Bottom";
import "./index.css";
import BoxTitle from "../BoxTitle";

function MainInform() {
  return (
    <div className="MainInform resultpage">
      <Header />
      <div className="content-box">
        <div className="title">유형 --- | --- 의 상세 리포트</div>
        <div className="content">
          <p>당신은 매우 강한 특성을 가진 --- 유형입니다.</p>
          <div className="box-container">
            <div className="top-section">
              <div className="top-left-section">
                <div className="icon-container">
                  <div>
                    <img alt="icon_main" src="" />
                    <p>[상위유형]</p>
                  </div>
                  <div>
                    <img alt="icon_char" src="" />
                    <p>[캐릭터]</p>
                  </div>
                </div>
                <div className="text-box"></div>
              </div>
              <div className="top-right-section">
                <div className="mainboxtitle">
                  <BoxTitle title="상위 유형 설명" />
                </div>
                <div className="main-text-box"></div>
              </div>
            </div>
            <div className="bottom-section">
              <div className="sub-text-box">
                <BoxTitle title="하위 유형 설명" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom />
    </div>
  );
}

export default MainInform;
