import { useState } from "react";
import SetInformModal from "./SetInformModal";
import "./index.css";

function TableBody({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values] = [Object.values(data)];

  const handleDelete = () => {
    window.confirm(`${data.name}님의 정보를 삭제하시겠습니까?`);
  };

  if (!data) return;
  return (
    <div className="TableBody">
      {values.map((item, index) => (
        <div key={index} className="body-item">
          {item}
        </div>
      ))}
      <div className="button-container">
        <button className="btn-mod">수정</button>
        <button className="btn-del" onClick={handleDelete}>
          삭제
        </button>
      </div>
      {isModalOpen && <SetInformModal />}
    </div>
  );
}

export default TableBody;
