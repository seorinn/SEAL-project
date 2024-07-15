import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "./index.css";

function Table({ data }) {
  const keys = ["이름", "회사", "소속", "직급", "전화번호", ""];
  const widths = [22.5, 12.5, 12.5, 12.5, 25, 15];

  if (!data) return;
  return (
    <div className="Table">
      <TableHead keys={keys} widths={widths} />
      {data.map((item) => (
        <TableBody key={item.phonenumber} data={item} widths={widths} />
      ))}
    </div>
  );
}

export default Table;
