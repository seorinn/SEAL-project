import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "./index.css";

function Table({ data }) {
  const keys = [
    "이름",
    "회사",
    "소속",
    "직급",
    "전화번호",
    "진단결과(main)",
    "진단결과(sub)",
  ];

  //   useEffect(() => {
  //     if (data) {
  //       setKeys(Object.keys(data[0]));
  //     }
  //   }, [data]);

  if (!data) return;
  return (
    <div className="Table">
      <TableHead keys={keys} />
      {data.map((item) => (
        <TableBody key={item.phonenumber} data={item} />
      ))}
    </div>
  );
}

export default Table;
