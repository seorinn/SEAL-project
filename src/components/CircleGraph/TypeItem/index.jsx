import "./index.css";

function TypeItem({ name, subtypes }) {
  const initial = name.slice(-name.length, 1);
  return (
    <div className={`TypeItem ${initial}`}>
      <div className="text-container">
        {name}
        {/* <div className="content">{content}</div> */}
      </div>
      <div className="quarter">
        {/* <span>{initial}</span> */}
        <div className="subtypes">
          {subtypes.map((subtype, index) => (
            <div key={index} className="subtype">
              {subtype}
            </div>
          ))}
        </div>
      </div>
      <div className="inner-circle" />
    </div>
  );
}

export default TypeItem;
