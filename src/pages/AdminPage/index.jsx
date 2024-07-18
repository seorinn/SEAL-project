import { useEffect, useState } from "react";
import { getStorage, ref, listAll } from "firebase/storage";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Code from "../../components/Code";
import Search from "../../components/Search";
import Table from "./Table";
import "./index.css";
import { getUserList } from "../../util";

function AdminPage({ isAdmin, setIsAdmin }) {
  const code = process.env.REACT_APP_ADMIN;
  const [keyword, setKeyword] = useState("");
  const [detailKeyword, setDetailKeyword] = useState("");
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserListFunc();
  }, []);

  const getUserListFunc = async () => {
    setLoading(true);
    try {
      const userList = await getUserList();
      setData(userList);
      setSearchedData(userList);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDetailKeyword("");
    setSearchedData(
      data.filter((item) => {
        let hasKeyword = false;
        Object.values(item).map((i) => {
          if (i.includes(keyword)) hasKeyword = true;
        });
        return hasKeyword;
      })
    );
  }, [keyword]);

  useEffect(() => {
    setDetailData(
      searchedData.filter((item) => {
        let hasKeyword = false;
        Object.values(item).map((i) => {
          if (i.includes(detailKeyword)) hasKeyword = true;
        });
        return hasKeyword;
      })
    );
  }, [detailKeyword]);

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "SEAL 진단 사용자 목록.xlsx");
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
      {loading ? (
        "불러오는 중입니다..."
      ) : (
        <Table
          data={detailKeyword ? detailData : searchedData}
          getUserListFunc={getUserListFunc}
          handleDownloadExcel={handleDownloadExcel}
        />
      )}
    </div>
  );
}

export default AdminPage;
