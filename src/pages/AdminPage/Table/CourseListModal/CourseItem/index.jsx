import { useState, useRef } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import "./index.css";
import {
  getStorageCoursePath,
  getStoragePath,
  getUserList,
} from "../../../../../util";

function CourseItem({ name, code, url, setLoading, getCourses, initData }) {
  const fileInputRef = useRef(null);
  const [course, setCourse] = useState({
    name: name,
    code: code,
    url: url,
  });

  const storage = getStorage();
  const pathReference = ref(storage, getStorageCoursePath({ name, code, url }));

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };
  const handleFindImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCourse({
          ...course,
          image: selectedFile,
          url: event.target.result,
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleModifyCourse = async () => {
    const oldPath = getStorageCoursePath({ name, code, url });
    const newPath = getStorageCoursePath(course);
    const oldFileRef = pathReference;
    if (oldPath === newPath) return;
    if (course.name === "" || course.code === "" || course.url === "") {
      alert("빈 항목이 존재합니다.");
      return;
    }
    setLoading(true);
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
        deleteObject(oldFileRef)
          .then(() => {
            getCourses();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.error(error);
      });
    const userList = getUserList();
    (await userList).map((user) => {
      if (user.course === name) {
        const oldUserFileRef = ref(storage, getStoragePath(user));
        const newUserPath = getStoragePath({ ...user, course: course.name });

        getDownloadURL(oldUserFileRef)
          .then((url) => {
            return fetch(url);
          })
          .then((response) => response.blob())
          .then((blob) => {
            const newUserFileRef = ref(storage, newUserPath);
            return uploadBytes(newUserFileRef, blob);
          })
          .then(() => {
            setLoading(false);
            deleteObject(oldUserFileRef)
              .then(() => {
                initData();
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }
    });
  };

  const handleDeleteCourse = () => {
    if (window.confirm(`"${name}" 과정을 삭제하시겠습니까?`)) {
      setLoading(true);
      deleteObject(pathReference)
        .then(() => {
          setLoading(false);
          getCourses();
          alert("삭제되었습니다");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className="CourseItem">
      <div className="image-container">
        <img
          alt="logo"
          src={`data:image/${course.url}`}
          onClick={handleFindImage}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <input
        className="input-name"
        name="name"
        value={course.name}
        placeholder={course.name}
        onChange={handleOnChange}
      />
      <input
        className="input-code"
        name="code"
        value={course.code}
        placeholder={course.code}
        onChange={handleOnChange}
      />
      <div className="course-buttons">
        <button className="btn_save" onClick={handleModifyCourse}>
          저장
        </button>
        <button className="btn_delete" onClick={handleDeleteCourse}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default CourseItem;
