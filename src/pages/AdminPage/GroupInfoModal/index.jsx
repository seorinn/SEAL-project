import "./index.css";

function GroupInfoModal({
  setShowInputModal,
  setShowGroupModal,
  input,
  setInput,
}) {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { companyname, groupname, date } = input;
    if (companyname && groupname && date) {
      setShowInputModal(false);
      setShowGroupModal(true);
    } else alert("모든 항목에 대해 입력해주세요");
  };

  return (
    <div className="GroupInfoModal">
      <div className="input-container">
        <div className="boxs">
          <div className="input-box">
            <div className="title">회사 명</div>
            <input
              name="companyname"
              placeholder="(주)루트컨설팅"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box">
            <div className="title">그룹 명</div>
            <input
              name="groupname"
              placeholder=" P&C 1그룹"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box">
            <div className="title">진단 날짜</div>
            <input name="date" onChange={handleOnChange} type="date" />
          </div>
        </div>
        <button className="btn-close" onClick={() => setShowInputModal(false)}>
          ×
        </button>
        <button className="btn-submit" onClick={() => handleSubmit()}>
          확인
        </button>
      </div>
    </div>
  );
}

export default GroupInfoModal;
