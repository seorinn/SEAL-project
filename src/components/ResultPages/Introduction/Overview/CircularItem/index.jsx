import "./index.css";

function CircularItem({ name, nameEng, intro }) {
  const initial = nameEng.slice(0, 1);
  return (
    <div className={`CircularItem ${initial}`}>
      <div className="text-container">
        <div className="name">{name}</div>
        <div className="nameEng">{nameEng}</div>
        <div className="intro">{intro}</div>
      </div>
      <div className="quarter">
        <div className="inner quarter">
          <span>{initial}</span>
        </div>
      </div>
    </div>
  );
}

export default CircularItem;
