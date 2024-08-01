import { useEffect, useState, useRef } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { PulseLoader } from "react-spinners";
import "./index.css";
import {
  getLogoImage,
  getCourseList,
  getStorageCoursePath,
  getStoragePath,
  getUserList,
} from "../../../../../util";

function CourseItem({ name, code, setLoading, getCourses, setIsChanged }) {
  const fileInputRef = useRef(null);
  const [course, setCourse] = useState({
    name: name,
    code: code,
  });

  const storage = getStorage();
  const pathReference = ref(storage, getStorageCoursePath({ name, code }));

  useEffect(() => {
    getLogoImage(name).then((res) => setCourse({ ...course, url: res }));
  }, []);

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
    if (course.name === "" || course.code === "") {
      alert("빈 항목이 존재합니다.");
      return;
    }
    const restCourses = (await getCourseList()).filter(
      (item) => item.name !== name
    );
    const courseExists = restCourses.some(
      (item) => course.name === item.name || course.code === item.code
    );
    if (courseExists) {
      alert("이미 존재하는 코스 명 또는 코드입니다.");
      return;
    }

    const oldPath = getStorageCoursePath({ name, code });
    const newPath = getStorageCoursePath(course);
    const newFileRef = ref(storage, newPath);
    const oldFileRef = pathReference;

    setLoading(true);
    try {
      if (oldPath === newPath) {
        if (!course.image) return;
        uploadBytes(newFileRef, course.image);
      } else {
        let image;
        if (!course.image)
          await getDownloadURL(oldFileRef)
            .then((url) => {
              return fetch(url);
            })
            .then((response) => response.blob())
            .then((blob) => (image = blob));
        else image = course.image;
        await uploadBytes(newFileRef, image)
          .then(() => deleteObject(oldFileRef))
          .then(() => changeUserCourse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      alert("저장되었습니다.");
      getCourses();
      setLoading(false);
      setCourse({ ...course, image: undefined });
    }
  };

  const changeUserCourse = async () => {
    const userList = getUserList();
    (await userList).map((user) => {
      if (user.course === name) {
        const oldUserFileRef = ref(storage, getStoragePath(user));
        const newUserFileRef = ref(
          storage,
          getStoragePath({ ...user, course: course.name })
        );
        try {
          getDownloadURL(oldUserFileRef)
            .then((url) => {
              return fetch(url);
            })
            .then((response) => response.blob())
            .then((blob) => {
              return uploadBytes(newUserFileRef, blob);
            })
            .then(() => {
              deleteObject(oldUserFileRef).then(() => {
                setIsChanged(true);
              });
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleDeleteCourse = () => {
    if (window.confirm(`"${name}" 과정을 삭제하시겠습니까?`)) {
      setLoading(true);
      deleteObject(pathReference)
        .then(() => {
          setLoading(false);
          setIsChanged(true);
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
        {course.url ? (
          <img
            className={`${course.image !== undefined}`}
            alt="logo"
            src={course.url}
            onClick={handleFindImage}
          />
        ) : (
          <PulseLoader color="rgb(200, 200, 200)" size={7} />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <input
        className={`input-name ${name === course.name}`}
        name="name"
        value={course.name}
        placeholder={name}
        onChange={handleOnChange}
      />
      <input
        className={`input-code ${code === course.code}`}
        name="code"
        value={course.code}
        placeholder={code}
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
