import { getIconImage, twelveChar } from "../../../util";
import "./index.css";

function CharTable({ isAll }) {
  const current = "중재자";
  const lines = Array.from({ length: 12 }, (_, index) => index * 30);
  const circles = Array.from({ length: 12 }, (_, index) => index * 30 - 75);
  const items = Array.from({ length: 12 }, (_, index) => ({
    name: twelveChar[index].name,
    nameEng: twelveChar[index].nameEng,
    icon: getIconImage(twelveChar[index].name),
    angle: index * 30 - 75,
  }));
  const area = [
    { name: "People-Focused", angle: 270 },
    { name: "Emotional Data Driven", angle: 0 },
    { name: "Task-Focused", angle: 90 },
    { name: "Logical Data Driven", angle: 180 },
  ];

  const currentIndex =
    items
      .map((item, index) => {
        if (item.name === current) return index;
      })
      .filter((i) => i !== undefined)[0] + 1;

  const setColor = (index, name) => {
    if (name && name !== current && !isAll) return "#efefef";
    if (index < 3) return "#030E33";
    else if (index < 6) return "#2F3958";
    else if (index < 9) return "#5C647D";
    else return "#8991A1";
  };

  return (
    <div className="CharTable">
      <div className="circle-outer">
        <div className="quarter top-left" />
        <div className="quarter top-right" />
        <div className="quarter bottom-left" />
        <div className="quarter bottom-right" />
        {!isAll && (
          <div
            className="half-container"
            style={{ transform: `rotate(${currentIndex * 30}deg) ` }}
          >
            <div className="half" />
            <div className="half" />
          </div>
        )}
      </div>
      <div className="circle-inner" />
      {lines.map((angle, index) => (
        <div
          key={index}
          className="line"
          style={{ transform: `rotate(${angle}deg)` }}
        ></div>
      ))}
      {items.map((item, index) => (
        <div
          key={index}
          className="item"
          style={{
            transform: `rotate(${item.angle}deg) `,
            color: `${isAll || item.name === current ? "white" : "black"}`,
          }}
        >
          <div
            className="item-circle"
            style={{
              backgroundColor: `${setColor(index, item.name)}`,
              border: `${
                isAll || item.name === current
                  ? `10px solid ${setColor(index, item.name)}`
                  : ""
              }`,
            }}
          />
          <div
            className="item-name"
            style={{
              transform: `${index > 5 ? "rotate(180deg)" : ""}`,
            }}
          >
            {item.name}
          </div>
          <div
            className="item-nameEng"
            style={{
              transform: `${index > 5 ? "rotate(180deg)" : ""}`,
            }}
          >
            {item.nameEng}
          </div>
          <div className="icon-container">
            <img
              alt={item.name}
              src={getIconImage(item.name, isAll || current === item.name)}
              style={{
                transform: `${index > 5 ? "rotate(180deg)" : ""}`,
              }}
            />
          </div>
        </div>
      ))}
      {circles.map((angle, index) => (
        <div
          key={index}
          className="circle-wrapper"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div
            className="circle-back"
            style={{
              backgroundColor: `${
                isAll ? "var(--navy300)" : "var(--table-none)"
              }`,
            }}
          />
        </div>
      ))}
      {area.map((item, index) => (
        <div
          key={index}
          className="area"
          style={{ transform: `rotate(${item.angle}deg) ` }}
        >
          <div
            className="area-item"
            style={{
              transform: `${index === 3 ? "rotate(180deg)" : ""}`,
            }}
          >
            {item.name}
          </div>
          <div className="area-line" />
        </div>
      ))}
    </div>
  );
}

export default CharTable;
