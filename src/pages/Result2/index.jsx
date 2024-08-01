import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/server";
import { useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import html2pdf from "html2pdf.js";
import { getUserList, getStoragePath, getFileName } from "../../util";
import Layout0 from "../../components/ResultPages/Layout0";
import Layout1 from "../../components/ResultPages/Layout1";
import Layout2 from "../../components/ResultPages/Layout2";
import CoverPage from "../../components/ResultPages/Cover/CoverPage";
import "./index.css";

function Result2Page({ userInfo }) {
  const location = useLocation();
  const { course, name, company, affiliation, position, phonenumber } =
    userInfo;
  const { scoreMain, scoreSub } = location.state;

  const [highestType, setHighestType] = useState("");
  const [highestPersona, setHighestPersona] = useState("");
  const [step, setStep] = useState(0);

  const formattedDate = `${new Date().getFullYear()}.${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`;

  useEffect(() => {
    setHighestType(findMaxValue(scoreMain));
    setHighestPersona(findMaxValue(scoreSub));
  }, []);

  const findMaxValue = (arr) => {
    let max = 0;
    arr.forEach((item) => {
      let value = Object.values(item)[0];
      if (value > max) {
        max = value;
      }
    });
    return max;
  };

  // useEffect(() => {
  //   setHighestType(findHighest(scoreData));
  //   let data = [];
  //   scoreData.map((item) => {
  //     if (item.type === findHighest(scoreData)) {
  //       const [type, value] = [
  //         Object.keys(item.personas),
  //         Object.values(item.personas),
  //       ];
  //       for (var i = 0; i < type.length; i++) {
  //         if (!type[i].includes("none"))
  //           data.push({ type: type[i], value: value[i] });
  //       }
  //     }
  //   });
  //   setHighestPersona(findHighest(data));
  //   setSubtypes(data);
  //   fetchData("result-data.xlsx").then((res) => {
  //     setResults(
  //       res.filter((item) => item.persona.split(" ")[0] === findHighest(data))
  //     );
  //   });
  // }, [scoreData]);

  // useEffect(() => {
  //   if (results.length > 0 && name) {
  //     generatePDF(false);
  //   }
  // }, [results]);

  const generatePDF = async (isClickedDownload) => {
    const pages = [
      <CoverPage />,
      // <Layout0
      //   scoreData={scoreData}
      //   name={name}
      //   affiliation={affiliation}
      //   position={position}
      //   highestType={highestType}
      //   highestPersona={highestPersona}
      //   subtypes={subtypes}
      //   results={results}
      //   date={formattedDate}
      // />,
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
    if (isClickedDownload) html2pdf().from(html).save(getFileName(name));
    else {
      const storage = getStorage();
      const pdfRef = ref(storage, getStoragePath(userInfo));
      const userList = getUserList();
      (await userList).map((user) => {
        if (phonenumber === user.phonenumber) {
          const oldRef = ref(storage, getStoragePath(user));
          deleteObject(oldRef).catch((error) => console.log(error));
        }
      });
      const pdfOptions = {
        filename: getFileName(name),
        html2canvas: {},
        jsPDF: {},
      };
      const pdfBlob = await new Promise((resolve, reject) => {
        html2pdf()
          .from(html)
          .set(pdfOptions)
          .outputPdf("blob")
          .then(resolve)
          .catch(reject);
      });

      uploadBytes(pdfRef, pdfBlob)
        .then((snapshot) => {
          console.log("PDF uploaded to storage");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="ResultPage">
      {/* {step === 0 && (
        <Layout0
          scoreData={scoreData}
          name={name}
          affiliation={affiliation}
          position={position}
          highestType={highestType}
          highestPersona={highestPersona}
          subtypes={subtypes}
          results={results}
          date={formattedDate}
        />
      )} */}
      {step === 0 && <Layout1 />}
      {step === 2 && <Layout2 />}
      <button className="btnPDF" onClick={() => generatePDF(true)}>
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
export default Result2Page;
