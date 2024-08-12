import icon_more from "../../../assets/icons/icon_more.svg";
import "./index.css";

function MoreInfoBox({ title, contents }) {
  return (
    <div className="MoreInfoBox">
      <div className="box-title">
        <img alt="" src={icon_more} />
        {title}
      </div>
      {contents.map((item, index) => (
        <div key={index} className="box-content">
          <b>{item.content}</b>
          <br />
          {item.detail}
        </div>
      ))}
    </div>
  );
}

export default MoreInfoBox;
