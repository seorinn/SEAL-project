import logo_root_gray from "../../../assets/images/logo_root_gray.png";
import "./index.css";

function Bottom({ pageIndex }) {
  return (
    <div className="Bottom">
      <img alt="logo_root" src={logo_root_gray} />
      <div className="page-index">
        <div>{pageIndex}</div>
      </div>
    </div>
  );
}

export default Bottom;
