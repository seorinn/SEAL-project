import logo_real from "../../../../assets/images/logo_REAL.png";
import logo_root from "../../../../assets/images/logo_root.png";
import "./index.css";

function GroupHeader({ groupinfo }) {
  return (
    <div className="GroupHeader">
      <div className="header-title">
        <img className="logo_root" alt="" src={logo_root} />
        <span className="eng">TEAM DASHBOARD : </span>
        <span>
          {groupinfo.companyname} {groupinfo.groupname}
        </span>
        / {groupinfo.date}
      </div>
      <div className="img-container">
        <img alt="" src={logo_real} />
      </div>
    </div>
  );
}

export default GroupHeader;
