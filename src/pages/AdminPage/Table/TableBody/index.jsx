import "./index.css";

function TableBody({ data }) {
  const [values] = [Object.values(data)];

  if (!data) return;
  return (
    <div className="TableBody">
      {values.map((item, index) => (
        <div key={index} className="body-item">
          {item}
        </div>
      ))}
    </div>
  );
}

export default TableBody;
