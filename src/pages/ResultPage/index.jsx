import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import Result from "./Result";
import "./index.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

function ResultPage({ userInfo, resultData }) {
  const { name, company, affiliation, position, phonenumber } = userInfo;
  const { toPDF, targetRef } = usePDF({
    filename: `SEAL 진단 테스트 결과_${name}.pdf`,
  });
  const location = useLocation();
  const [scoreData, setScoreData] = useState(location.state);
  const [highstType, setHighstType] = useState("");
  const [highstPersona, setHighstPersona] = useState("");
  const [subtypes, setSubtypes] = useState([]);

  const formattedDate = `${new Date().getFullYear()}.${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`;

  const findHighest = (data) => {
    let max = { type: "", value: 0 };
    for (var i = 0; i < data.length; i++) {
      if (max.value < data[i].value) max = data[i];
    }
    return max.type;
  };

  const saveToStorage = () => {
    const storage = getStorage();
    const filename = `${company}_${affiliation}_${position}_${name}_${phonenumber}`;
    const storageRef = ref(storage, `userdata/${filename}.txt`);
    uploadString(storageRef, `${filename}`)
      .then((response) => {
        console.log("Success to save!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setScoreData(
      scoreData.map((item) => {
        const sum = Object.values(item.personas).reduce(
          (acc, curr) => acc + curr,
          0
        );
        return {
          ...item,
          value: sum,
        };
      })
    );
  }, []);

  useEffect(() => {
    setHighstType(findHighest(scoreData));
    let data = [];
    scoreData.map((item) => {
      if (item.type === findHighest(scoreData)) {
        const [type, value] = [
          Object.keys(item.personas),
          Object.values(item.personas),
        ];
        for (var i = 0; i < type.length; i++) {
          if (!type[i].includes("none"))
            data.push({ type: type[i], value: value[i] });
        }
      }
    });
    setHighstPersona(findHighest(data));
    setSubtypes(data);
    saveToStorage();
  }, [scoreData]);

  return (
    <div className="ResultPage">
      <div ref={targetRef} className="result-container">
        <div className="result-header">
          <h1>SEAL Diagnostic Result Example</h1>
          <h2>Participant Information</h2>
          <p>이름: {name}</p>
          <p>소속: {affiliation}</p>
          <p>직급: {position}</p>
          <p>날짜: {formattedDate}</p>
        </div>
        <div className="result-body">
          <h1>Diagnostic Summary </h1>
          <h2>
            Main Type: <b>{highstType}</b>
          </h2>
          <h3>
            Sub Type: <b>{highstPersona}</b>
          </h3>
          <Result resultData={resultData} persona={highstPersona} />
        </div>
        <div className="result-table">
          <div className="score-box">
            <b>주요 유형 점수</b>
            {scoreData.map((item) => (
              <div key={item.type}>{`${item.type}: ${item.value}점`}</div>
            ))}
          </div>
          <div className="score-box">
            <b>하위 유형 점수 ({highstType} 내)</b>
            {subtypes.map((item, index) => (
              <div key={index}>{`${item.type}: ${item.value}점`}</div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="btnPDF"
        onClick={() => {
          toPDF();
        }}
      >
        PDF 저장하기
      </button>
    </div>
  );
}
export default ResultPage;
