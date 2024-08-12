import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  getUserList,
  getCourseList,
  getStoragePath,
  getFileName,
} from "../../util";
import Code from "../../components/Code";
import Search from "../../components/Search";
import Table from "./Table";
import "./index.css";

function AdminPage({ isAdmin, setIsAdmin }) {
  const storage = getStorage();
  const code = process.env.REACT_APP_ADMIN;
  const [keyword, setKeyword] = useState("");
  const [detailKeyword, setDetailKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const headers = [
    "checkbox",
    { id: "company", name: "회사" },
    { id: "affiliation", name: "소속" },
    { id: "position", name: "직급" },
    { id: "name", name: "이름" },
    { id: "phonenumber", name: "전화번호" },
    { id: "course", name: "과정명" },
    { id: "mainType", name: "Main type" },
    { id: "subType", name: "Sub type" },
    "buttons",
  ];
  const widths = [5, 11, 11, 10, 8, 16, 12, 10, 11, 4];
  const [sortBy, setSortBy] = useState(headers[1]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initData();
    getCourses();
  }, []);

  useEffect(() => {
    getSearchedData();
  }, [data, detailKeyword]);

  useEffect(() => {
    setDetailKeyword("");
    getSearchedData();
  }, [keyword]);

  const initData = async () => {
    setLoading(true);
    try {
      const userList = await getUserList();
      setData(userList);
      if (!keyword) setSearchedData(userList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  const getSearchedData = () => {
    setSortBy(headers[1]);
    setIsAscending(true);
    const searched = data.filter((item) => {
      let hasKeyword = false;
      Object.values(item).map((i) => {
        if (
          typeof i === "string" &&
          i.toUpperCase().includes(keyword.toUpperCase())
        )
          hasKeyword = true;
      });
      return hasKeyword;
    });
    setSearchedData(searched);
    if (detailKeyword)
      setDetailData(
        searched.filter((item) => {
          let hasKeyword = false;
          Object.values(item).map((i) => {
            if (
              typeof i === "string" &&
              i.toUpperCase().includes(detailKeyword.toUpperCase())
            )
              hasKeyword = true;
          });
          return hasKeyword;
        })
      );
  };

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      data.map(({ isChecked, ...rest }) => rest)
    );
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "SEAL 진단 사용자 목록.xlsx");
  };

  const sortDataFunc = async (sortBy, isAscending) => {
    setLoading(true);
    try {
      // const compare = (a, b) => {
      //   if (a[sortBy] > b[sortBy]) return 1;
      //   if (a[sortBy] < b[sortBy]) return -1;
      //   return 0;
      // };
      // const reverseCompare = (a, b) => {
      //   if (a[sortBy] < b[sortBy]) return 1;
      //   if (a[sortBy] > b[sortBy]) return -1;
      //   return 0;
      // };
      // if (detailKeyword)
      //   setDetailData(detailData.sort(isAscending ? compare : reverseCompare));
      // else
      //   setSearchedData(
      //     searchedData.sort(isAscending ? compare : reverseCompare)
      //   );
      alert("수정중");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckBox = async (button) => {
    const targetData = detailKeyword ? detailData : searchedData;
    let count = 0;
    for (let i = 0; i < targetData.length; i++) {
      const user = targetData[i];
      if (user.isChecked) count++;
    }
    if (count === 0)
      alert(`${button === "del" ? "삭제할" : "다운받을"} 항목을 체크해주세요.`);
    else {
      if (
        !window.confirm(
          `${count}개 항목 ${button === "del" ? "삭제" : "다운로드"}`
        )
      )
        return;
      for (let i = 0; i < targetData.length; i++) {
        const user = targetData[i];
        if (user.isChecked) {
          const pathReference = ref(storage, getStoragePath(user));
          try {
            if (button === "pdf") {
              const url = await getDownloadURL(pathReference);
              const response = await fetch(url);
              const blob = await response.blob();

              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.setAttribute("download", getFileName(user.name));
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else if (button === "del") {
              setLoading(true);
              deleteObject(pathReference)
                .then(() => {
                  initData();
                  alert("삭제되었습니다");
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      }
    }
  };

  if (!isAdmin)
    return <Code code={code} isValid={isAdmin} setIsValid={setIsAdmin} />;
  return (
    <div className="AdminPage">
      <h4>[관리자 페이지]</h4>
      <h2
        onClick={async () => {
          setData(await getUserList());
          setKeyword("");
        }}
      >
        진단 결과 목록
      </h2>
      <div className="search-container">
        <Search setKeyword={setKeyword} />
      </div>
      {keyword && (
        <>
          <div className="keyword">"{keyword}"에 대한 검색 결과입니다.</div>
          <div className="search-container">
            <Search setKeyword={setDetailKeyword} isDetail={true} />
          </div>
        </>
      )}
      <div className="table-container">
        {loading ? (
          <div className="loading">
            <PulseLoader color="hsla(194, 56%, 63%, 1)" />
          </div>
        ) : (
          <Table
            data={detailKeyword ? detailData : searchedData}
            setData={detailKeyword ? setDetailData : setSearchedData}
            isAscending={isAscending}
            headers={headers}
            widths={widths}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setIsAscending={setIsAscending}
            handleCheckBox={handleCheckBox}
            handleDownloadExcel={handleDownloadExcel}
            sortDataFunc={sortDataFunc}
            initData={initData}
            loading={loading}
            setLoading={setLoading}
            courses={courses}
            setCourses={setCourses}
          />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
