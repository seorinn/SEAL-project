import { useEffect, useState } from "react";
import { getStorage, ref, listAll } from "firebase/storage";
import Code from "../../components/Code";
import Search from "../../components/Search";
import "./index.css";
import Table from "./Table";

function AdminPage({ isAdmin, setIsAdmin }) {
  const code = process.env.REACT_APP_ADMIN;
  const [keyword, setKeyword] = useState("");
  const [detailKeyword, setDetailKeyword] = useState("");
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = getStorage();
    const listRef = ref(storage, "userdata");
    let userlist = [];

    listAll(listRef)
      .then((res) => {
        setLoading(true);
        res.prefixes.forEach((folderRef) => {});
        res.items.forEach((itemRef) => {
          const [company, affiliation, position, name, phonenumber] =
            itemRef._location.path_.split("/")[1].split(".")[0].split("_");
          userlist.push({ company, affiliation, position, name, phonenumber });
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setData(userlist);
        setSearchedData(userlist);
        setLoading(false);
      });
  }, []);

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
      {loading ? (
        "불러오는 중입니다"
      ) : (
        <Table data={detailKeyword ? detailData : searchedData} />
      )}
    </div>
  );
}

export default AdminPage;
