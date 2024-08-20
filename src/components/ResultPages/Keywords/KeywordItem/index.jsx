import "./index.css";

function KeywordItem({ name, isOn, isSummary }) {
  const formattedContent = name.replace(/\ /g, `<br/>`);
  return (
    <div className={`KeywordItem ${isOn} ${isSummary ? "summary" : ""}`}>
      <div
        className="item-name"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      ></div>
    </div>
  );
}

export default KeywordItem;
