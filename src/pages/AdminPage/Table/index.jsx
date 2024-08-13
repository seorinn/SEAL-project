// import { useEffect, useState } from "react";
// import { getCourseList } from "../../../util";
// import icon_polygon from "../../../assets/icons/icon_polygon.png";
// import TableBody from "./TableBody";
// import TableHead from "./TableHead";
// import CourseListModal from "./CourseListModal";
// import AddCourseModal from "./AddCourseModal";
// import "./index.css";

// function Table({
//   data,
//   setData,
//   headers,
//   widths,
//   sortBy,
//   setSortBy,
//   isAscending,
//   setIsAscending,
//   handleCheckBox,
//   handleDownloadExcel,
//   sortDataFunc,
//   initData,
//   loading,
//   setLoading,
//   courses,
//   getCourses,
// }) {
//   const [showSortMenu, setShowSortMenu] = useState(false);
//   const [showCourses, setShowCourses] = useState(false);
//   const [showAddCourse, setShowAddCourse] = useState(false);

//   const handleSort = (item, ascend) => {
//     setShowSortMenu(false);
//     if (item) setSortBy(item);
//     sortDataFunc(
//       item.id || sortBy.id,
//       ascend === undefined ? isAscending : ascend
//     );
//   };

//   if (!data) return;
//   return (
//     <div className="Table">
//       <div className="button-container">
//         <div className="buttons">
//           <div className="total-number">총 {data.length}명</div>
//           <div className="sort-container">
//             <button
//               className="btn_sort"
//               onClick={() => setShowSortMenu(!showSortMenu)}
//             >
//               {sortBy.name} 순
//               <img alt="icon_polygon" src={icon_polygon} />
//             </button>
//             {showSortMenu && (
//               <div className="menu-sort">
//                 {headers.map(
//                   (item, index) =>
//                     item.id && (
//                       <button
//                         key={index}
//                         className="btn_sort_item"
//                         onClick={() => handleSort(item)}
//                       >
//                         {item.name} 순
//                       </button>
//                     )
//                 )}
//               </div>
//             )}
//             <button
//               className="btn_sort"
//               onClick={() => {
//                 handleSort(sortBy, !isAscending);
//                 setIsAscending(!isAscending);
//               }}
//             >
//               {isAscending ? "오름차순" : "내림차순"}
//             </button>
//           </div>
//           <button className="btn_delete" onClick={() => handleCheckBox("del")}>
//             삭제
//           </button>
//         </div>
//         <div className="buttons">
//           <button className="btn_pdf" onClick={() => handleCheckBox("pdf")}>
//             PDF 다운로드
//           </button>
//           <button className="btn_excel" onClick={handleDownloadExcel}>
//             전체 Excel 다운로드
//           </button>
//           <button
//             className="btn_add_course"
//             onClick={() => setShowCourses(true)}
//           >
//             과정 관리
//           </button>
//         </div>
//       </div>
//       <TableHead data={data} setData={setData} keys={headers} widths={widths} />
//       {data.map((item) => (
//         <TableBody
//           key={item.phonenumber}
//           userData={item}
//           listData={data}
//           setListData={setData}
//           widths={widths}
//           headers={headers}
//           courses={courses}
//           initData={initData}
//           loading={loading}
//           setLoading={setLoading}
//         />
//       ))}
//       <CourseListModal
//         modalIsOpen={showCourses}
//         setModalIsOpen={setShowCourses}
//         setShowAddCourse={setShowAddCourse}
//         initData={initData}
//         courses={courses}
//         getCourses={getCourses}
//       />
//       <AddCourseModal
//         modalIsOpen={showAddCourse}
//         setModalIsOpen={setShowAddCourse}
//         setShowCourses={setShowCourses}
//       />
//     </div>
//   );
// }

// export default Table;
