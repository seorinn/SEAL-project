import "./index.css";

function TypeItem({ img, name, intro }) {
  return (
    <div className="TypeItem">
      <img alt="img_type" src={img} />
      <div className="name">{name}</div>
      <div className="intro">{intro}</div>
    </div>
  );
}

export default TypeItem;
