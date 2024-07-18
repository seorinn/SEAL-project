import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "./index.css";

function Table({ data, getUserListFunc, handleDownloadExcel }) {
  const keys = [
    "회사",
    "소속",
    "직급",
    "이름",
    "전화번호",
    "Main type",
    "Sub type",
    "",
  ];
  const widths = [11.5, 11.5, 10, 7, 16.5, 12.5, 12, 19];

  if (!data) return;
  return (
    <div className="Table">
      <div className="download-container">
        <button className="btn_excel" onClick={handleDownloadExcel}>
          Excel 다운로드
        </button>
      </div>
      <TableHead keys={keys} widths={widths} />
      {data.map((item) => (
        <TableBody
          key={item.phonenumber}
          data={item}
          getUserListFunc={getUserListFunc}
          widths={widths}
        />
      ))}
    </div>
  );
}

export default Table;
