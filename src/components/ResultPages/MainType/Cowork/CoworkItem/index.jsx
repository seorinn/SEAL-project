import "./index.css";
import { getIconImage } from "../../../../../util";

function CoworkItem({
  index,
  content,
  detail,
  intro,
  title1,
  content1,
  title2,
  content2,
}) {
  const initial = detail.slice(0, 1);

  return (
    <div className={`CoworkItem ${initial}`}>
      {index < 2 && (
        <div className="type-info">
          <div className="name">
            <img alt="" src={getIconImage(content)} />
            {content}({detail})
          </div>
          <div className="intro">{intro}</div>
        </div>
      )}
      <div className="content-box">
        <div className="item">
          <div className="item-title">{title1}</div>
          <div className="item-content">{content1}</div>
        </div>
        <div className="item">
          <div className="item-title">{title2}</div>
          <div className="item-content">{content2}</div>
        </div>
      </div>
      {index > 1 && (
        <div className="type-info">
          <div className="name">
            <img alt="" src={getIconImage(content)} />
            {content}({detail})
          </div>
          <div className="intro">{intro}</div>
        </div>
      )}
      <div className="quarter">
        <div className="inner quarter">
          <span>{initial}</span>
        </div>
      </div>
    </div>
  );
}

export default CoworkItem;
