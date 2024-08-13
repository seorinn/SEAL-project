import logo_real from "../../../../assets/images/logo_REAL.png";
import logo_root from "../../../../assets/images/logo_root_header.png";
import "./index.css";

function ReportCover() {
  return (
    <div className="ReportCover resultpage">
      <div className="top-section"></div>
      <div className="cover">
        <div className="logo-container">
          <div className="report">REAL PERSONALITY ™</div>
          <img className="logo_real" alt="logo_real" src={logo_real} />
        </div>
        <div className="title-container">
          <div className="title">업무 스타일 결과 보고서</div>
          <div className="subtitle">
            <span>1.</span> 나의<span>REAL</span>대표 유형 <br />
            <span>2.</span> 나의<span>REAL</span>대표 캐릭터
          </div>
        </div>
      </div>
      <div className="root-logo">
        <div className="text">REAL PERSONALITY ™</div>
        <img className="logo_root" alt="logo_root" src={logo_root} />
      </div>
    </div>
  );
}

export default ReportCover;
