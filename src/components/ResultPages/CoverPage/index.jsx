import { UserStateContext } from "../../../App";
import { formattedDate, getLogoImage } from "../../../util";
import logo_real from "../../../assets/images/logo_REAL.png";
import logo_root from "../../../assets/images/logo_root.png";
import "./index.css";
import { useContext, useEffect, useState } from "react";

function CoverPage() {
  const userData = useContext(UserStateContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    getLogoImage(userData.course).then((res) => setImage(res));
  }, [userData]);

  return (
    <div className="CoverPage resultpage">
      <div className="top-section">
        <img className="logo_root" alt="logo_root" src={logo_root} />
      </div>
      <div className="bottom-section">
        <div className="user-container">
          <div className="title">성장을 위한 행동유형 진단 결과</div>
          <div className="reportfor">Report for</div>
          <div className="user-info-container">
            <img alt="" src={image} />
            <div className="user-info">
              <div>{userData.company || "기아자동차"}</div>
              <div>{userData.name || "홍길동"}</div>
              <div>{formattedDate}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        <div className="title">PRIVATE AND CONFIDENTIAL</div>
        <div className="content">
          Any purely behavioral tool should never be
        </div>
        <div className="line" />
        <div className="copyright">
          All intellectual property rights and patents, are exclusively owned by
          Root consulting. Unauthorized reproduction, or distribution of any
          material contained here in is strictly prohibited. REAL PERSONALITY ™
          is a trademark registered globally and is protected under
          international trademark laws.
        </div>
      </div>
      <div className="logo-container">
        <div>REAL PERSONALITY ™</div>
        <img className="logo_real" alt="logo_real" src={logo_real} />
      </div>
    </div>
  );
}

export default CoverPage;
