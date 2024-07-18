import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import icon_download from "../../../../assets/icons/icon_download.png";
import "./index.css";
import { useState } from "react";
import ModifyModal from "./ModifyModal";

function TableBody({ data, getUserListFunc, widths }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [values] = [Object.values(data)];

  const storage = getStorage();
  const pathReference = ref(
    storage,
    `userdata/pdfs/${data.company}_${data.affiliation}_${data.position}_${data.name}_${data.phonenumber}_${data.mainType}_${data.subType}.pdf`
  );

  const handleDelete = () => {
    if (window.confirm(`${data.name}님의 정보를 삭제하시겠습니까?`)) {
      deleteObject(pathReference)
        .then(() => {
          alert("삭제되었습니다");
          getUserListFunc();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleModifyUserInfo = (changedData) => {
    setModalIsOpen(false);
    const oldFileRef = pathReference;
    const newPath = `userdata/pdfs/${changedData.company}_${changedData.affiliation}_${changedData.position}_${changedData.name}_${data.phonenumber}_${changedData.mainType}_${changedData.subType}.pdf`;
    getDownloadURL(oldFileRef)
      .then((url) => {
        return fetch(url);
      })
      .then((response) => response.blob())
      .then((blob) => {
        const newFileRef = ref(storage, newPath);
        return uploadBytes(newFileRef, blob);
      })
      .then(() => {
        alert("저장되었습니다.");
        deleteObject(pathReference)
          .then(() => {
            getUserListFunc();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDownload = async () => {
    try {
      const url = await getDownloadURL(pathReference);
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `SEAL 진단 결과지_${data.name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return;
  return (
    <div className="TableBody">
      {values.map((item, index) => (
        <div
          key={index}
          className="body-item"
          style={{ width: widths[index] + "%" }}
        >
          {item.startsWith("010")
            ? item.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
            : item}
        </div>
      ))}
      <div
        className="button-container"
        style={{ width: widths[widths.length - 1] + "%" }}
      >
        <button className="btn_download" onClick={handleDownload}>
          PDF
          <img className="icon_download" alt="download" src={icon_download} />
        </button>
        <button className="btn-mod" onClick={() => setModalIsOpen(true)}>
          수정
        </button>
        <button className="btn-del" onClick={handleDelete}>
          삭제
        </button>
      </div>
      <ModifyModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        data={data}
        handleModifyUserInfo={handleModifyUserInfo}
      />
    </div>
  );
}

export default TableBody;
