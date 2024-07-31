import { useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getStoragePath, getUserList } from "../../../../util";
// import icon_download from "../../../../assets/icons/icon_download.png";
import ModifyModal from "./ModifyModal";
import "./index.css";

function TableBody({
  userData,
  listData,
  setListData,
  widths,
  headers,
  courses,
  initData,
  loading,
  setLoading,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [values] = [Object.values(userData)];

  const storage = getStorage();
  const pathReference = ref(storage, getStoragePath(userData));

  const handleDelete = () => {
    if (window.confirm(`${userData.name}님의 정보를 삭제하시겠습니까?`)) {
      setLoading(true);
      deleteObject(pathReference)
        .then(() => {
          setLoading(false);
          initData();
          alert("삭제되었습니다");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  const handleModifyUserInfo = (changedData) => {
    setLoading(true);
    const oldFileRef = pathReference;
    const newPath = getStoragePath(changedData);
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
        setLoading(false);
        setModalIsOpen(false);
        deleteObject(pathReference)
          .then(() => {
            initData();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setModalIsOpen(false);
      });
  };

  // const handleDownload = async () => {
  //   try {
  //     const url = await getDownloadURL(pathReference);
  //     const response = await fetch(url);
  //     const blob = await response.blob();

  //     const link = document.createElement("a");
  //     link.href = window.URL.createObjectURL(blob);
  //     link.setAttribute("download", getFileName(userData.name));
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (!userData) return;
  return (
    <div className="TableBody">
      {values.map((item, index) => (
        <div
          key={index}
          className="body-item"
          style={{ width: widths[index] + "%" }}
        >
          {typeof item !== "string" ? (
            <input
              type="checkbox"
              checked={userData.isChecked}
              onChange={() =>
                setListData(
                  listData.map((user) => ({
                    ...user,
                    isChecked:
                      user.phonenumber === userData.phonenumber
                        ? !user.isChecked
                        : user.isChecked,
                  }))
                )
              }
            />
          ) : item.startsWith("010") ? (
            item.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
          ) : (
            item
          )}
        </div>
      ))}
      <div
        className="button-container"
        style={{ width: widths[widths.length - 1] + "%" }}
      >
        {/* <button className="btn_download" onClick={handleDownload}>
          PDF
          <img className="icon_download" alt="download" src={icon_download} />
        </button> */}
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
        data={userData}
        handleModifyUserInfo={handleModifyUserInfo}
        headers={headers}
        courses={courses}
        loading={loading}
      />
    </div>
  );
}

export default TableBody;
