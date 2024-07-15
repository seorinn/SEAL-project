import "./index.css";

function TableBody({ data, widths }) {
  const [values] = [Object.values(data)];

  const handleDelete = () => {
    window.confirm(`${data.name}님의 정보를 삭제하시겠습니까?`);
  };

  if (!data) return;
  return (
    <div className="TableBody">
      {values.map((item, index) => (
        <div
          key={index}
          className="body-item"
          style={{ width: widths[index] + "%" }}
        >
          {item}
        </div>
      ))}
      <div
        className="button-container"
        style={{ width: widths[widths.length - 1] + "%" }}
      >
        <button className="btn-mod">수정</button>
        <button className="btn-del" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default TableBody;
