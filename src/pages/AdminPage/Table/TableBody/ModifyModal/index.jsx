import { useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import "./index.css";

function ModifyModal({
  modalIsOpen,
  setModalIsOpen,
  data,
  handleModifyUserInfo,
  headers,
  courses,
  loading,
}) {
  const [changedData, setChangedData] = useState({
    company: data.company,
    affiliation: data.affiliation,
    position: data.position,
    name: data.name,
    course: data.course,
  });
  const modalRef = useRef();
  const closeModal = () => setModalIsOpen(false);

  const modalOutsideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") closeModal();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setChangedData({
      ...changedData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const { name, company, affiliation, position } = changedData;
    if (name && company && affiliation && position)
      handleModifyUserInfo(changedData);
    else alert("모든 항목을 입력해주세요");
  };

  useEffect(() => {
    if (!modalIsOpen)
      setChangedData({
        company: data.company,
        affiliation: data.affiliation,
        position: data.position,
        name: data.name,
        course: data.course,
        phonenumber: data.phonenumber,
        mainType: data.mainType,
        subType: data.subType,
      });
    document.addEventListener("keydown", handleKeyPress);
  }, [modalIsOpen]);

  if (!modalIsOpen) return;
  return (
    <div
      className="ModifyModal"
      ref={modalRef}
      onClick={(e) => modalOutsideClick(e)}
    >
      {loading && (
        <div className="loading">
          <PulseLoader color="hsla(194, 56%, 63%, 1)" />
        </div>
      )}
      <div className="modal-container">
        <div className="title">고객 정보 수정</div>
        <div className="user-info">
          {headers.slice(1, -1).map((item) => (
            <div className={`${item.id}`}>
              <p>{item.name}</p>

              {item.id === "course" ? (
                <select
                  value={changedData.course}
                  onChange={(e) =>
                    setChangedData({ ...changedData, course: e.target.value })
                  }
                >
                  {courses.map((course) => (
                    <option key={course.name} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={`${item.id}`}
                  value={changedData[item.id]}
                  placeholder={data[item.id]}
                  onChange={handleOnChange}
                  disabled={
                    item.id === "phonenumber" ||
                    item.id === "mainType" ||
                    item.id === "subType"
                  }
                />
              )}
            </div>
          ))}
        </div>
        <div className="buttons">
          <button className="btn_back" onClick={() => setModalIsOpen(false)}>
            이전
          </button>
          <button className="btn_save" onClick={onSubmit}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyModal;
