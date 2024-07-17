import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "./index.css";

function Table({ data, getUserList }) {
  const keys = ["이름", "회사", "소속", "직급", "전화번호", ""];
  const widths = [20.5, 10.5, 10.5, 10.5, 20, 27.5];

  if (!data) return;
  return (
    <div className="Table">
      <TableHead keys={keys} widths={widths} />
      {data.map((item) => (
        <TableBody
          key={item.phonenumber}
          data={item}
          getUserList={getUserList}
          widths={widths}
        />
      ))}
    </div>
  );
}

export default Table;
