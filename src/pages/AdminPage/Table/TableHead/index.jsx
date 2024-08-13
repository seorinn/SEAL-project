// import { useEffect, useState } from "react";
// import "./index.css";

// function TableHead({ data, setData, keys, widths }) {
//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     data.map((user) => {
//       if (!user.isChecked) setIsChecked(false);
//     });
//   });

//   const handleCheckBox = (e) => {
//     setIsChecked(e.target.checked);
//     setData(
//       data.map((user) => ({
//         ...user,
//         isChecked: e.target.checked,
//       }))
//     );
//   };

//   return (
//     <div className="TableHead">
//       {keys.map((item, index) => (
//         <div
//           key={index}
//           className="head-item"
//           style={{ width: widths[index] + "%" }}
//         >
//           {item === "checkbox" ? (
//             <input
//               type="checkbox"
//               checked={isChecked}
//               onChange={handleCheckBox}
//             />
//           ) : (
//             item.name
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TableHead;
