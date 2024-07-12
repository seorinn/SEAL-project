import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as XLSX from "xlsx";
import Header from "../src/components/Header";
import GetInformPage from "./pages/GetInformPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import AdminPage from "./pages/AdminPage";

function App() {
  const [questionData, setQuestionData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    company: "",
    affiliation: "",
    position: "",
    phonenumber: "",
    isChecked: false,
  });
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchData("questions", "question-data.xlsx");
    fetchData("results", "result-data.xlsx");
  }, []);

  const fetchData = async (type, filename) => {
    try {
      const response = await fetch(filename);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      if (type === "questions") setQuestionData(jsonData);
      else if (type === "results") setResultData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header setUserInfo={setUserInfo} />
      <div className="App-Body">
        <Routes>
          <Route
            path="/"
            element={
              <GetInformPage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isUser={isUser}
                setIsUser={setIsUser}
              />
            }
          />
          <Route
            path="/test"
            element={
              <TestPage userInfo={userInfo} questionData={questionData} />
            }
          />
          <Route
            path="/result"
            element={<ResultPage userInfo={userInfo} resultData={resultData} />}
          />
          <Route
            path="/admin"
            element={<AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
