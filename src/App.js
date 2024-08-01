import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import GetInformPage from "./pages/GetInformPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

import ResultForTest from "./pages/ResultForTest";
import Test2Page from "./pages/Test2";
import Result2Page from "./pages/Result2";

function App() {
  const [userInfo, setUserInfo] = useState({
    course: "",
    name: "",
    company: "",
    affiliation: "",
    position: "",
    phonenumber: "",
    isChecked: false,
  });
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
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
            path="/noauth"
            element={
              <GetInformPage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isUser={isUser}
                setIsUser={setIsUser}
              />
            }
          />
          <Route path="/test" element={<Test2Page userInfo={userInfo} />} />
          <Route path="/result" element={<Result2Page userInfo={userInfo} />} />
          <Route
            path="/admin"
            element={<AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
          />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
          <Route path="/resultfortest" element={<ResultForTest />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
