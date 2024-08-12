import "./index.css";

function TypeItem({ nameEng, content }) {
  const initial = nameEng.slice(0, 1);
  return (
    <div className={`TypeItem ${initial}`}>
      <div>
        <div className="initial">
          <div>{initial}</div>
        </div>
        <div className="nameEng">{nameEng}</div>
      </div>
      <div className="content">{content}</div>
    </div>
  );
}

export default TypeItem;
