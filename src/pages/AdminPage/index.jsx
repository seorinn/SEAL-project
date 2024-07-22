import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PulseLoader } from "react-spinners";
import Code from "../../components/Code";
import Search from "../../components/Search";
import Table from "./Table";
import "./index.css";
import { getUserList } from "../../util";

function AdminPage({ isAdmin, setIsAdmin }) {
  const storage = getStorage();
  const code = process.env.REACT_APP_ADMIN;
  const [keyword, setKeyword] = useState("");
  const [detailKeyword, setDetailKeyword] = useState("");
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const headers = [
    "",
    { id: "company", name: "회사" },
    { id: "affiliation", name: "소속" },
    { id: "position", name: "직급" },
    { id: "name", name: "이름" },
    { id: "phonenumber", name: "전화번호" },
    { id: "course", name: "과정명" },
    { id: "mainType", name: "Main type" },
    { id: "subType", name: "Sub type" },
    "",
  ];
  const widths = [5, 11, 11, 10, 6, 15, 11, 10, 11, 9];
  const [sortBy, setSortBy] = useState(headers[1]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserListFunc();
  }, []);

  const getUserListFunc = async () => {
    setLoading(true);
    try {
      const userList = await getUserList();
      setData(
        userList.map((user) => ({
          isChecked: false,
          ...user,
        }))
      );
      setSearchedData(
        userList.map((user) => ({
          isChecked: false,
          ...user,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSortBy(headers[1]);
    setIsAscending(true);
    setDetailKeyword("");
    setSearchedData(
      data.filter((item) => {
        let hasKeyword = false;
        Object.values(item).map((i) => {
          if (
            typeof i === "string" &&
            i.toUpperCase().includes(keyword.toUpperCase())
          )
            hasKeyword = true;
        });
        return hasKeyword;
      })
    );
  }, [keyword]);

  useEffect(() => {
    setSortBy(headers[1]);
    setIsAscending(true);
    setDetailData(
      searchedData.filter((item) => {
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
  }, [detailKeyword]);

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

  const sortDataFunc = (sortBy, isAscending) => {
    if (isAscending)
      detailKeyword
        ? detailData.sort((a, b) =>
            a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
          )
        : searchedData.sort((a, b) =>
            a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
          );
    else
      detailKeyword
        ? detailData.sort((a, b) =>
            a[sortBy] < b[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0
          )
        : searchedData.sort((a, b) =>
            a[sortBy] < b[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0
          );
  };

  const handleDownloadPDF = async () => {
    const targetData = detailKeyword ? detailData : searchedData;
    let count = 0;
    for (let i = 0; i < targetData.length; i++) {
      const user = targetData[i];
      if (user.isChecked) count++;
    }
    if (count === 0) alert("다운받을 항목을 체크해주세요.");
    else {
      if (count > 1 && !window.confirm(`${count}개 항목 다운로드`)) return;
      for (let i = 0; i < targetData.length; i++) {
        const user = targetData[i];
        if (user.isChecked) {
          count++;
          const pathReference = ref(
            storage,
            `userdata/pdfs/${user.company}_${user.affiliation}_${user.position}_${user.name}_${user.phonenumber}_${user.course}_${user.mainType}_${user.subType}.pdf`
          );
          try {
            const url = await getDownloadURL(pathReference);
            const response = await fetch(url);
            const blob = await response.blob();

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", `SEAL 진단 결과지_${user.name}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.log(error);
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
        onClick={() => {
          getUserListFunc();
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
            getUserListFunc={getUserListFunc}
            handleDownloadPDF={handleDownloadPDF}
            handleDownloadExcel={handleDownloadExcel}
            sortDataFunc={sortDataFunc}
          />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
