import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import GetInformPage from "./pages/GetInformPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState({
    course: "",
    name: "",
    company: "",
    affiliation: "",
    position: "",
    phonenumber: "",
  });
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
      <Header
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setIsUser={setIsUser}
      />
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
          <Route path="/test" element={<TestPage userInfo={userInfo} />} />
          <Route
            path="/result"
            element={
              <ResultPage userInfo={userInfo} setUserInfo={setUserInfo} />
            }
          />
          {/* <Route
            path="/admin"
            element={<AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
          /> */}
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
