import { useEffect, useRef, useState } from "react";
import "./index.css";

function ModifyModal({
  modalIsOpen,
  setModalIsOpen,
  data,
  handleModifyUserInfo,
}) {
  const [changedData, setChangedData] = useState({
    company: data.company,
    affiliation: data.affiliation,
    position: data.position,
    name: data.name,
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
      <div className="modal-container">
        <div className="title">고객 정보 수정</div>
        <div className="user-info">
          <div className="company">
            <p>회사</p>
            <input
              name="company"
              value={changedData.company}
              placeholder={data.company}
              onChange={handleOnChange}
            />
          </div>
          <div className="affiliation">
            <p>소속</p>
            <input
              name="affiliation"
              value={changedData.affiliation}
              placeholder={data.affiliation}
              onChange={handleOnChange}
            />
          </div>
          <div className="position">
            <p>직급</p>
            <input
              name="position"
              value={changedData.position}
              placeholder={data.position}
              onChange={handleOnChange}
            />
          </div>
          <div className="name">
            <p>이름</p>
            <input
              name="name"
              value={changedData.name}
              placeholder={data.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="phonenumber">
            <p>전화번호</p>
            <input name="phonenumber" value={data.phonenumber} disabled />
          </div>
          <div className="name">
            <p>Main Type</p>
            <input name="mainType" value={data.mainType} disabled />
          </div>
          <div className="name">
            <p>Sub Type</p>
            <input name="subType" value={data.subType} disabled />
          </div>
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
