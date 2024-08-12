import icon_search from "../../../assets/icons/icon_rational.png";
import "./index.css";

function CaseBox({ content, detail }) {
  const formattedContent = content.replace(/\\n/g, `<br/>`);
  const formattedDetail = detail.replace(/\\n/g, `<br/>`);
  return (
    <div className="CaseBox">
      <div
        className="item-content"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      ></div>
      <div
        className="item-detail"
        dangerouslySetInnerHTML={{ __html: formattedDetail }}
      ></div>
      <div className="icon_search">
        <img alt="" src={icon_search} />
      </div>
    </div>
  );
}

export default CaseBox;
