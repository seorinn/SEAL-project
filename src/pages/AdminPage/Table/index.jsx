import { useEffect, useState } from "react";
import { fetchData } from "../../../util";
import icon_polygon from "../../../assets/icons/icon_polygon.png";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "./index.css";

function Table({
  data,
  setData,
  headers,
  widths,
  sortBy,
  setSortBy,
  isAscending,
  setIsAscending,
  handleDownloadPDF,
  handleDownloadExcel,
  sortDataFunc,
  initData,
}) {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData("course-data.xlsx").then((res) => setCourses(res));
  }, []);

  const handleSort = (item, ascend) => {
    setShowSortMenu(false);
    if (item) setSortBy(item);
    sortDataFunc(
      item.id || sortBy.id,
      ascend === undefined ? isAscending : ascend
    );
  };

  if (!data) return;
  return (
    <div className="Table">
      <p className="total-number">{data.length}명</p>
      <div className="buttons">
        <div className="sort-container">
          <button
            className="btn_sort"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            {sortBy.name} 순
            <img alt="icon_polygon" src={icon_polygon} />
          </button>
          {showSortMenu && (
            <div className="menu-sort">
              {headers.map(
                (item, index) =>
                  item.id && (
                    <button
                      key={index}
                      className="btn_sort_item"
                      onClick={() => handleSort(item)}
                    >
                      {item.name} 순
                    </button>
                  )
              )}
            </div>
          )}
          <button
            className="btn_sort"
            onClick={() => {
              handleSort(sortBy, !isAscending);
              setIsAscending(!isAscending);
            }}
          >
            {isAscending ? "오름차순" : "내림차순"}
          </button>
        </div>
        <button className="btn_pdf" onClick={handleDownloadPDF}>
          PDF 다운로드
        </button>
        <button className="btn_excel" onClick={handleDownloadExcel}>
          전체 Excel 다운로드
        </button>
      </div>
      <TableHead data={data} setData={setData} keys={headers} widths={widths} />
      {data.map((item) => (
        <TableBody
          key={item.phonenumber}
          userData={item}
          listData={data}
          setListData={setData}
          widths={widths}
          headers={headers}
          courses={courses}
          initData={initData}
        />
      ))}
    </div>
  );
}

export default Table;
