import { useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  getMetadata,
  uploadBytes,
} from "firebase/storage";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  getCookie,
  fetchData,
  getUserList,
  getCourseList,
  getStoragePath,
  getFileName,
  setCookie,
} from "../../util";
import Code from "../../components/Code";
import Search from "../../components/Search";
import Table from "./Table";
import PdfModal from "./PdfModal";
import "./index.css";

function AdminPage() {
  const storage = getStorage();
  const pdfRef = useRef();
  const [isAdmin, setIsAdmin] = useState(getCookie("isadmin"));
  const [userInfo, setUserInfo] = useState(getCookie("userinfo"));
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
    { id: "email", name: "이메일" },
    { id: "phonenumber", name: "전화번호" },
    { id: "course", name: "과정명" },
    { id: "code", name: "코드" },
    { id: "mainType", name: "Main type" },
    { id: "subType", name: "Sub type" },
    "buttons",
  ];
  const widths = [4, 10, 10, 9, 8, 20, 15, 15, 5, 8, 8, 10];
  const [sortBy, setSortBy] = useState(headers[1]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [excelDataMain, setExcelDataMain] = useState([]);
  const [excelDataSub, setExcelDataSub] = useState([]);
  const [dataMain, setDataMain] = useState([]);
  const [dataSub, setDataSub] = useState([]);

  useEffect(() => {
    initData();
    getCourses();
    try {
      fetchData("result-sub.xlsx").then((res) => setExcelDataSub(res));
      fetchData("result-main.xlsx").then((res) => setExcelDataMain(res));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (userInfo && excelDataMain && excelDataSub) {
      let arraySub = excelDataSub.filter(
        (item) => item.type === userInfo.subType
      );
      setDataSub({
        strength: arraySub.filter(
          (item) =>
            item.category.includes("strength") || item.category === "content"
        ),
        weakness: arraySub.filter((item) => item.category.includes("weakness")),
        behavior: arraySub.filter(
          (item) =>
            item.category.includes("like") || item.category.includes("opposite")
        ),
      });
      let arrayMain = excelDataMain.filter(
        (item) => item.type === userInfo.mainType
      );
      setDataMain({
        keywords: arrayMain.filter((item) => item.category === "keywords"),
        strength: arrayMain.filter(
          (item) =>
            item.category.includes("strength") &&
            !item.category.includes("stress")
        ),
        weakness: arrayMain.filter((item) =>
          item.category.includes("weakness")
        ),
        work_style: arrayMain.filter(
          (item) =>
            item.category === "work_style" || item.category === "leadership"
        ),
        changes: arrayMain.filter(
          (item) =>
            item.category === "change_res" || item.category === "conflict"
        ),
        motivation: arrayMain.filter((item) =>
          item.category.includes("motivation")
        ),
        stress: arrayMain.filter((item) => item.category.includes("stress")),
        cowork: arrayMain.filter((item) => item.category === "cowork"),
      });
    }
  }, [userInfo, excelDataMain, excelDataSub]);

  useEffect(() => {
    getSearchedData();
  }, [data, detailKeyword]);

  useEffect(() => {
    setDetailKeyword("");
    getSearchedData();
  }, [keyword]);

  const initData = async () => {
    const insertAt = (obj, key, value, index) => {
      const entries = Object.entries(obj);
      entries.splice(index, 0, [key, value]);
      return Object.fromEntries(entries);
    };

    setLoading(true);
    try {
      getScoreData();
      const userList = await getUserList();
      const courseList = await getCourseList();
      const formattedList = userList.map((item) => {
        const matchedCode = courseList.filter(
          (course) => item.course === course.name
        )[0].code;
        const newItem = insertAt(item, "code", matchedCode, 8);
        return {
          ...newItem,
          email: newItem.email.replace(/&/g, `_`),
        };
      });
      setData(formattedList);
      if (!keyword) setSearchedData(formattedList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreData = async () => {
    const scoreRef = ref(storage, "userdata/scoredata");
    getDownloadURL(scoreRef)
      .then((url) => fetch(url))
      .then((response) => response.json())
      .then((data) => {
        setCookie("scoredata", data);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
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
      const compare = (a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
        return 0;
      };
      const reverseCompare = (a, b) => {
        if (a[sortBy] < b[sortBy]) return 1;
        if (a[sortBy] > b[sortBy]) return -1;
        return 0;
      };
      if (detailKeyword)
        setDetailData(detailData.sort(isAscending ? compare : reverseCompare));
      else
        setSearchedData(
          searchedData.sort(isAscending ? compare : reverseCompare)
        );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckBox = async () => {
    const scoreRef = ref(storage, "userdata/scoredata");
    const targetData = detailKeyword ? detailData : searchedData;
    let count = 0;
    for (let i = 0; i < targetData.length; i++) {
      const user = targetData[i];
      if (user.isChecked) count++;
    }
    if (count === 0) {
      alert(`삭제할 항목을 체크해주세요.`);
      return;
    } else if (!window.confirm(`${count}개 항목 삭제`)) return;

    let scoredata;
    try {
      for (let i = 0; i < targetData.length; i++) {
        const user = {
          ...targetData[i],
          email: targetData[i].email.replace(/_/g, `&`),
        };
        if (user.isChecked) {
          setLoading(true);
          const pathReference = ref(storage, getStoragePath(user));

          await getDownloadURL(scoreRef)
            .then((url) => fetch(url))
            .then((response) => response.json())
            .then((data) => {
              scoredata = data;
            });

          await getDownloadURL(pathReference)
            .then((url) => fetch(url))
            .then((response) => response.json())
            .then((data) => {
              if (data.state) {
                const updatedData = scoredata.map((pagedata) =>
                  pagedata.map((questiondata) => {
                    let newItem;
                    data.state.map((page) =>
                      page.map((question) => {
                        if (question.id === questiondata.id) {
                          if (question.id.startsWith("ABS"))
                            newItem = {
                              ...questiondata,
                              [question.isPos
                                ? question.value - 1
                                : 5 - question.value]:
                                questiondata[
                                  question.isPos
                                    ? question.value - 1
                                    : 5 - question.value
                                ] + 1,
                            };
                          else
                            newItem = {
                              ...questiondata,
                              [question.answerId.slice(3, 4) - 1]:
                                questiondata[
                                  question.answerId.slice(3, 4) - 1
                                ] + 1,
                            };
                        }
                      })
                    );
                    return newItem;
                  })
                );
                const fileContent = JSON.stringify(updatedData, null, 2);
                const blob = new Blob([fileContent], {
                  type: "application/json",
                });
                uploadBytes(scoreRef, blob)
                  .then((snapshot) => getDownloadURL(snapshot.ref))
                  .then(() => {
                    console.log("Score uploaded successfully");
                  });
              }
              deleteObject(pathReference);
            });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      initData();
      alert("삭제되었습니다");
    }
  };

  const handlePdfOpen = (user) => {
    setUserInfo(user);
    const storageRef = ref(storage, getStoragePath(user));

    getDownloadURL(storageRef)
      .then((url) => fetch(url))
      .then((response) => response.json())
      .then((data) => {
        setCookie("userinfo", user);
        setCookie("scoremain", data.scoreMain);
        setCookie("scoresub", data.scoreSub);
        setShowPdfModal(true);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const onClickDownloadPdf = async () => {
    const storageRef = ref(storage, getStoragePath(userInfo));
    const metadata = await getMetadata(storageRef);
    const contentType = metadata.contentType;
    const doc = new jsPDF("p", "mm", "a4");
    setPdfLoading(true);
    if (contentType === "application/json")
      try {
        const element = pdfRef.current;
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
          });
          const imageFile = canvas.toDataURL("image/jpeg");
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const widthRatio = pageWidth / canvas.width;
          const customHeight = canvas.height * widthRatio;
          doc.addImage(imageFile, "jpeg", 0, 0, pageWidth, customHeight);
          let heightLeft = customHeight;
          let heightAdd = -pageHeight;
          while (heightLeft >= pageHeight) {
            doc.addPage();
            doc.addImage(
              imageFile,
              "jpeg",
              0,
              heightAdd,
              pageWidth,
              customHeight
            );
            heightLeft -= pageHeight;
            heightAdd -= pageHeight;
          }
          // const pdfBlob = doc.output("blob");
          doc.save(getFileName(userInfo.name));
          // console.log(pdfBlob);
          // await Compress(pdfBlob);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setPdfLoading(false);
      }
  };

  if (!isAdmin) return <Code code={code} setIsValid={setIsAdmin} />;
  return (
    <div className="AdminPage">
      <h4>[관리자 페이지]</h4>
      <h2 onClick={() => initData()}>진단 결과 목록</h2>
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
            setLoading={setLoading}
            courses={courses}
            getCourses={getCourses}
            handlePdfOpen={handlePdfOpen}
          />
        )}
      </div>
      {showPdfModal && userInfo && (
        <div className="pdf-container">
          <div className="pdf-modal" ref={pdfRef}>
            <PdfModal dataMain={dataMain} dataSub={dataSub} />
          </div>
          <div className="pdf-buttons">
            <button onClick={onClickDownloadPdf}>다운로드</button>
            <button onClick={() => setShowPdfModal(false)}>×</button>
          </div>
          {pdfLoading && (
            <div className="pdf-loading">
              <PulseLoader color="var(--navy700)" />
              다운로드 중입니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
