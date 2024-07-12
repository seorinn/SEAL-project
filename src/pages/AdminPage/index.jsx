import { useEffect, useState } from "react";
import Code from "../../components/Code";
import Search from "../../components/Search";
import "./index.css";
import Table from "./Table";

function AdminPage({ isAdmin, setIsAdmin }) {
  const code = process.env.REACT_APP_ADMIN;
  const [keyword, setKeyword] = useState("");
  const [detailKeyword, setDetailKeyword] = useState("");
  const [data, setData] = useState(mockData);
  const [searchedData, setSearchedData] = useState(data);
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
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

  if (!isAdmin)
    return <Code code={code} isValid={isAdmin} setIsValid={setIsAdmin} />;
  return (
    <div className="AdminPage">
      <h4>[관리자 페이지]</h4>
      <h2>진단 결과 목록</h2>
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
      <Table data={detailKeyword ? detailData : searchedData} />
    </div>
  );
}

const mockData = [
  {
    name: "name1",
    company: "company1",
    affiliation: "affiliation1",
    position: "position1",
    phonenumber: "01012345678",
    type: "E",
    persona: "f",
  },
  {
    name: "name2",
    company: "company1",
    affiliation: "affiliation1",
    position: "position2",
    phonenumber: "01046575678",
    type: "E",
    persona: "f",
  },
  {
    name: "name3",
    company: "company1",
    affiliation: "affiliation2",
    position: "position1",
    phonenumber: "01012456778",
    type: "E",
    persona: "f",
  },
  {
    name: "name4",
    company: "company1",
    affiliation: "affiliation2",
    position: "position3",
    phonenumber: "01012378948",
    type: "E",
    persona: "f",
  },
  {
    name: "name5",
    company: "company2",
    affiliation: "affiliation6",
    position: "position5",
    phonenumber: "01017898678",
    type: "E",
    persona: "f",
  },
  {
    name: "name6",
    company: "company2",
    affiliation: "affiliation6",
    position: "position5",
    phonenumber: "01012222278",
    type: "E",
    persona: "f",
  },
  {
    name: "name7",
    company: "company2",
    affiliation: "affiliation5",
    position: "position2",
    phonenumber: "01012569678",
    type: "E",
    persona: "f",
  },
  {
    name: "name8",
    company: "company2",
    affiliation: "affiliation4",
    position: "position9",
    phonenumber: "01012123678",
    type: "E",
    persona: "f",
  },
  {
    name: "name9",
    company: "company3",
    affiliation: "affiliation1",
    position: "position1",
    phonenumber: "01012344478",
    type: "E",
    persona: "f",
  },
  {
    name: "name10",
    company: "company3",
    affiliation: "affiliation1",
    position: "position1",
    phonenumber: "01098746678",
    type: "E",
    persona: "f",
  },
];

export default AdminPage;
