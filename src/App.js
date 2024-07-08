import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import GetInformPage from "./pages/GetInformPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    affiliation: "",
    position: "",
    phonenumber: "",
    isChecked: false,
  });

  return (
    <div className="App">
      <Header setUserInfo={setUserInfo} />
      <div className="App-Body">
        <Routes>
          <Route
            path="/"
            element={
              <GetInformPage userInfo={userInfo} setUserInfo={setUserInfo} />
            }
          />
          <Route path="/test" element={<TestPage userInfo={userInfo} />} />
          <Route path="/result" element={<ResultPage userInfo={userInfo} />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
