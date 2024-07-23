import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/server";
import { useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import html2pdf from "html2pdf.js";
import { fetchData, getUserList } from "../../util";
import Layout0 from "../../components/ResultPages/Layout0";
import Layout1 from "../../components/ResultPages/Layout1";
import Layout2 from "../../components/ResultPages/Layout2";
import "./index.css";

function ResultPage({ userInfo }) {
  const location = useLocation();
  const { course, name, company, affiliation, position, phonenumber } =
    userInfo;

  const [highestType, setHighestType] = useState("");
  const [highestPersona, setHighestPersona] = useState("");
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
    setHighestType(findHighest(scoreData));
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
    setHighestPersona(findHighest(data));
    setSubtypes(data);
  }, [scoreData]);

  useEffect(() => {
    fetchData("result-data.xlsx").then((res) => {
      setResults(
        res.filter((item) => item.persona.split(" ")[0] === highestPersona)
      );
    });
  }, [highestPersona]);

  useEffect(() => {
    if (results.length > 0 && name) {
      generatePDF(false);
    }
  }, [results]);

  const findHighest = (data) => {
    let max = { type: "", value: 0 };
    for (var i = 0; i < data.length; i++) {
      if (max.value < data[i].value) max = data[i];
    }
    return max.type;
  };

  const generatePDF = async (isClickedDownload) => {
    const pages = [
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
    if (isClickedDownload)
      html2pdf().from(html).save(`SEAL 진단 결과지_${name}.pdf`);
    else {
      const storage = getStorage();
      const pdfRef = ref(
        storage,
        `userdata/pdfs/${company}_${affiliation}_${position}_${name}_${phonenumber}_${course}_${highestType}_${highestPersona}.pdf`
      );
      const userList = getUserList();
      (await userList).map((user) => {
        if (phonenumber === user.phonenumber) {
          const oldRef = ref(
            storage,
            `userdata/pdfs/${user.company}_${user.affiliation}_${user.position}_${user.name}_${user.phonenumber}_${user.course}_${user.mainType}_${user.subType}.pdf`
          );
          deleteObject(oldRef).catch((error) => console.log(error));
        }
      });
      const pdfOptions = {
        filename: `SEAL 진단 결과지_${name}.pdf`,
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
      {step === 0 && (
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
      )}
      {step === 1 && <Layout1 />}
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
export default ResultPage;
