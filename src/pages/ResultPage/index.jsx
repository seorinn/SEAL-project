import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/server";
import { useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import html2pdf from "html2pdf.js";
import Layout0 from "../../components/ResultPages/Layout0";
import Layout1 from "../../components/ResultPages/Layout1";
import Layout2 from "../../components/ResultPages/Layout2";
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
  const location = useLocation();
  const { name, company, affiliation, position, phonenumber } = userInfo;
  const [highstType, setHighstType] = useState("");
  const [highstPersona, setHighstPersona] = useState("");
  const [subtypes, setSubtypes] = useState([]);
  const [scoreData, setScoreData] = useState(location.state);
  const [results, setResults] = useState([]);
  const [step, setStep] = useState(0);

  const formattedDate = `${new Date().getFullYear()}.${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`;

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
  }, [scoreData]);

  useEffect(() => {
    if (resultData.length > 0)
      setResults(
        resultData.filter(
          (item) => item.persona.split(" ")[0] === highstPersona
        )
      );
  }, [resultData, highstPersona]);

  useEffect(() => {
    if (results.length > 0) saveToStorage();
  }, [results]);

  const findHighest = (data) => {
    let max = { type: "", value: 0 };
    for (var i = 0; i < data.length; i++) {
      if (max.value < data[i].value) max = data[i];
    }
    return max.type;
  };

  const generatePDF = () => {
    const pages = [
      <Layout0
        scoreData={scoreData}
        name={name}
        affiliation={affiliation}
        position={position}
        highstType={highstType}
        highstPersona={highstPersona}
        subtypes={subtypes}
        results={results}
        date={formattedDate}
      />,
      <Layout1 />,
      <Layout2 />,
    ];
    const element = (
      <div className="ResultPage">
        {pages.map((page, index) => (
          <div key={index} className="pdfPage">
            {page}
          </div>
        ))}
      </div>
    );
    const html = ReactDOM.renderToStaticMarkup(element);
    html2pdf().from(html).save("my-pdf.pdf");
  };

  const saveToStorage = () => {
    const storage = getStorage();
    const filename = `${company}_${affiliation}_${position}_${name}_${phonenumber}`;
    const storageRef = ref(storage, `userdata/${filename}.txt`);
    uploadString(
      storageRef,
      `date=${formattedDate}/scoreData=${scoreData[0].value}$${
        scoreData[1].value
      }$${scoreData[2].value}$${
        scoreData[3].value
      }/highstType=${highstType}/highstPersona=${highstPersona}/subtypes=${
        subtypes[0].type
      }-${subtypes[0].value}
      $${subtypes[1].type}-${subtypes[1].value}$${subtypes[2].type}-${
        subtypes[2].value
      }results=${results.map((result) => `${result.title}-${result.content}$`)}`
    )
      .then((response) => {
        console.log("Success to save!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ResultPage">
      {step === 0 && (
        <Layout0
          scoreData={scoreData}
          name={name}
          affiliation={affiliation}
          position={position}
          highstType={highstType}
          highstPersona={highstPersona}
          subtypes={subtypes}
          results={results}
          date={formattedDate}
        />
      )}
      {step === 1 && <Layout1 />}
      {step === 2 && <Layout2 />}
      <button className="btnPDF" onClick={generatePDF}>
        PDF 저장하기
      </button>
      <div className="button-container">
        {step > 0 && (
          <button className="btn-back" onClick={() => setStep(step - 1)}>
            ◀
          </button>
        )}
        {step < 2 && (
          <button className="btn-next" onClick={() => setStep(step + 1)}>
            ▶
          </button>
        )}
      </div>
    </div>
  );
}
export default ResultPage;
