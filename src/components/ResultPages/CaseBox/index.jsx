import icon_search from "../../../assets/icons/icon_rational.png";
import "./index.css";

function CaseBox({ content, detail }) {
  return (
    <div className="CaseBox">
      <div className="item-content">{content}</div>
      <div className="item-detail">{detail}</div>
      <div className="icon_search">
        <img alt="" src={icon_search} />
      </div>
    </div>
  );
}

export default CaseBox;
