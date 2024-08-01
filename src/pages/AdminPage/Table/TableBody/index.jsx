import { useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getStoragePath } from "../../../../util";
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

  const handleModifyUserInfo = (changedData) => {
    setLoading(true);
    const oldFileRef = pathReference;
    const newFileRef = ref(storage, getStoragePath(changedData));
    try {
      getDownloadURL(oldFileRef)
        .then((url) => {
          return fetch(url);
        })
        .then((response) => response.blob())
        .then((blob) => {
          return uploadBytes(newFileRef, blob);
        })
        .then(() => {
          deleteObject(pathReference);
        })
        .then(() => {
          initData();
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setModalIsOpen(false);
    }
  };

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
      <button
        className="btn-mod"
        onClick={() => setModalIsOpen(true)}
        style={{ width: widths[widths.length - 1] + "%" }}
      >
        수정
      </button>
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
