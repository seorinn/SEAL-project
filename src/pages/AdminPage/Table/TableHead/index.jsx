import "./index.css";

function TableHead({ keys }) {
  return (
    <div className="TableHead">
      {keys.map((item, index) => (
        <div key={index} className="head-item">
          {item}
        </div>
      ))}
    </div>
  );
}

export default TableHead;
