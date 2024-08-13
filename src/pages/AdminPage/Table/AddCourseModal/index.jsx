// import { useEffect, useRef, useState } from "react";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import { getCourseList, getStorageCoursePath } from "../../../../util";
// import "./index.css";

// function AddCourseModal({ modalIsOpen, setModalIsOpen, setShowCourses }) {
//   const modalRef = useRef();
//   const fileInputRef = useRef(null);
//   const [course, setCourse] = useState({ name: "", code: "" });

//   const closeModal = () => setModalIsOpen(false);

//   const initData = () => {
//     setCourse({ name: "", code: "" });
//   };

//   const modalOutsideClick = (e) => {
//     if (modalRef.current === e.target) closeModal();
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Escape") closeModal();
//   };

//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyPress);
//   }, [modalIsOpen]);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setCourse({
//       ...course,
//       [name]: value,
//     });
//   };

//   const handleFindImage = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) setCourse({ ...course, image: selectedFile });
//   };

//   const onSubmit = async () => {
//     if (course.name === "" || course.code === "" || !course.image) {
//       alert("코스 명, 코드, 이미지를 모두 등록해주세요");
//       return;
//     }
//     const storage = getStorage();
//     const pathReference = ref(storage, getStorageCoursePath(course));
//     const courseList = getCourseList();
//     const courseExists = (await courseList).some(
//       (item) => course.name === item.name || course.code === item.code
//     );
//     if (courseExists) {
//       alert("이미 존재하는 코스 명 또는 코드입니다.");
//       return;
//     }
//     uploadBytes(pathReference, course.image)
//       .then((snapshot) => {
//         alert("추가되었습니다.");
//         initData();
//         closeModal();
//         setShowCourses(true);
//       })
//       .catch((error) => console.log(error));
//   };

//   if (!modalIsOpen) return;
//   return (
//     <div
//       className="AddCourseModal"
//       ref={modalRef}
//       onClick={(e) => modalOutsideClick(e)}
//     >
//       <div className="modal-container">
//         <div className="title">진단 과정 추가</div>
//         <div className="input-container">
//           <div>
//             <p>코스 명</p>
//             <input name="name" value={course.name} onChange={handleOnChange} />
//           </div>
//           <div>
//             <p>코드</p>
//             <input name="code" value={course.code} onChange={handleOnChange} />
//           </div>
//           <div>
//             <p>고객사 로고</p>
//             {course.image && (
//               <img alt="logo" src={URL.createObjectURL(course.image)} />
//             )}
//             <button className="btn_add_file" onClick={handleFindImage}>
//               파일 찾기
//             </button>
//             <input
//               type="file"
//               accept="image/*"
//               style={{ display: "none" }}
//               ref={fileInputRef}
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>
//         <div className="modal-buttons">
//           <button
//             className="btn_back"
//             onClick={() => {
//               closeModal();
//               setShowCourses(true);
//               initData();
//             }}
//           >
//             이전
//           </button>
//           <button className="btn_submit" onClick={onSubmit}>
//             추가
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddCourseModal;
