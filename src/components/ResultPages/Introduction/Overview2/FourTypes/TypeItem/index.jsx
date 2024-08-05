import "./index.css";

function TypeItem({ name, content, subtypes }) {
  const initial = name.slice(-name.length, 1);
  return (
    <div className={`TypeItem ${initial}`}>
      <div className="text-container">
        <div className="logo">
          <img alt="logo_type" src="" />
        </div>
        <div className="name">{name}</div>
        <div className="content">{content}</div>
        <div className="subtypes">
          {subtypes.map((subtype, index) => (
            <div key={index} className="subtype">
              {subtype}
            </div>
          ))}
        </div>
      </div>
      <div className="quarter">
        <span>{initial}</span>
      </div>
    </div>
  );
}

export default TypeItem;
