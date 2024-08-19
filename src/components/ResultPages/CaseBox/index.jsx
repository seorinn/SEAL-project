import icon_speach from "../../../assets/icons/icon_speachBubble.png";
import "./index.css";

function CaseBox({ content, detail }) {
  const formattedContent = content.replace(/\\n/g, `<br/>`);
  const formattedDetail = detail.replace(/\\n/g, `<br/>`);
  return (
    <div className="CaseBox">
      <div className="icon_search">
        <img alt="" src={icon_speach} />
      </div>
      <div
        className="item-content"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      ></div>
      <div
        className="item-detail"
        dangerouslySetInnerHTML={{ __html: formattedDetail }}
      ></div>
    </div>
  );
}

export default CaseBox;
