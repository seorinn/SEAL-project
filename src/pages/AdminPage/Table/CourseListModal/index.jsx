import { useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { getCourseList } from "../../../../util";
import "./index.css";
import CourseItem from "./CourseItem";

function CourseListModal({
  modalIsOpen,
  setModalIsOpen,
  setShowAddCourse,
  initData,
}) {
  const modalRef = useRef();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const closeModal = () => setModalIsOpen(false);

  const modalOutsideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") closeModal();
  };

  const getCourses = async () => {
    setLoading(true);
    try {
      const courseList = await getCourseList();
      setCourses(courseList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
    document.addEventListener("keydown", handleKeyPress);
  }, [modalIsOpen]);

  if (!modalIsOpen) return;
  return (
    <div
      className="CourseModal"
      ref={modalRef}
      onClick={(e) => modalOutsideClick(e)}
    >
      {loading && (
        <div className="loading">
          <PulseLoader color="hsla(194, 56%, 63%, 1)" />
        </div>
      )}
      <div className="modal-container">
        <div className="title">진단 과정 수정</div>
        <div className="course-container">
          <div className="header">
            <p className="logo">이미지</p>
            <p className="coursename">과정 명</p>
            <p className="code">접근 코드</p>
            <div className="button-container">
              <button
                className="btn_add"
                onClick={() => {
                  setShowAddCourse(true);
                  closeModal();
                }}
              >
                추가
              </button>
            </div>
          </div>
          {courses.map((course) => (
            <CourseItem
              key={course.name}
              {...course}
              setLoading={setLoading}
              getCourses={getCourses}
              initData={initData}
            />
          ))}
        </div>
        <button className="btn_back" onClick={closeModal}>
          이전
        </button>
      </div>
    </div>
  );
}

export default CourseListModal;
