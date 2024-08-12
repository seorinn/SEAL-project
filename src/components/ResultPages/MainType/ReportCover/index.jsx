import logo_real from "../../../../assets/images/logo_REAL.png";
import logo_root from "../../../../assets/images/logo_root.png";
import "./index.css";

function ReportCover() {
  return (
    <div className="ReportCover resultpage">
      <div className="top-section">
        <img className="logo_root" alt="logo_root" src={logo_root} />
      </div>
      <div className="bottom-section"></div>
      <div className="bottom-info">
        <div className="title">PRIVATE AND CONFIDENTIAL</div>
        <div className="content">
          Any purely behavioral tool should never be
        </div>
        <div className="line" />
        <div className="copyright">
          copyright 1995-2018 axiominternet group limited
          <br /> ® Discus is an internationally registered trademark
        </div>
      </div>
      <div className="cover">
        <div className="logo-container">
          <div className="report">PERSONALITY REPORT</div>
          <img className="logo_real" alt="logo_real" src={logo_real} />
        </div>
        <div className="title-container">
          <div className="title">나의 업무 스타일 결과 보고서</div>
          <div className="subtitle">
            <span>1.</span> 나의<span>REAL</span>대표 유형 <br />
            <span>2.</span> 나의<span>REAL</span>대표 캐릭터
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportCover;
