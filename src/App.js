import React from "react";
import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Header from "../src/components/Header";
import GetInformPage from "./pages/GetInformPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <Header />
        <div className="App-Body">
          <Routes>
            <Route path="/" element={<GetInformPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </CookiesProvider>
  );
}

export default App;
