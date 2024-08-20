import React, { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import GetInformPage from "./pages/GetInformPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

export const UserStateContext = React.createContext();
export const UserDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { ...action.payload };
    case "update":
      return { ...state, ...action.payload };
    case "init":
      return { isAdmin: false };
    default:
      throw new Error("unsupported action type: ", action.type);
  }
}

function App() {
  const [userData, dispatch] = useReducer(reducer, { isAdmin: false });

  return (
    <UserStateContext.Provider value={userData}>
      <UserDispatchContext.Provider value={dispatch}>
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
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export default App;
