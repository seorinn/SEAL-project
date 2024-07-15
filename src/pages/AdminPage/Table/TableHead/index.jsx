import "./index.css";

function TableHead({ keys, widths }) {
  return (
    <div className="TableHead">
      {keys.map((item, index) => (
        <div
          key={index}
          className="head-item"
          style={{ width: widths[index] + "%" }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default TableHead;
