import "./index.css";

function KeywordItem({ name, isOn }) {
  return (
    <div className={`KeywordItem ${isOn}`}>
      <div className="item-name">{name}</div>
      <div className="hexagon" />
    </div>
  );
}

export default KeywordItem;
