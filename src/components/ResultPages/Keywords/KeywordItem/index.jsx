import "./index.css";

function KeywordItem({ name, isOn }) {
  const formattedContent = name.replace(/\ /g, `<br/>`);
  return (
    <div className={`KeywordItem ${isOn}`}>
      <div
        className="item-name"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      ></div>
      <div className="hexagon" />
    </div>
  );
}

export default KeywordItem;
