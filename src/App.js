import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import GetInformPage from "./pages/GetInformPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    affiliation: "",
    position: "",
    phonenumber: "",
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
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage userInfo={userInfo} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
