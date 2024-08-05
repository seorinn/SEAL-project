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
  const { state, scoreMain, scoreSub } = location.state;

  const [mainType, setMainType] = useState("");
  const [subType, setSubType] = useState("");
  const [step, setStep] = useState(0);

  const formattedDate = `${new Date().getFullYear()}.${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`;

  useEffect(() => {
    setMainType(setType(scoreMain));
    setSubType(setType(scoreSub));
  }, []);

  useEffect(() => {
    console.log(mainType, subType);
  }, [mainType, subType]);

  const setType = (scoreData) => {
    const resultTotal = findHighest(scoreData);
    if (resultTotal.length === 1) return resultTotal[0];
    else {
      const resultAbs = checkAbsTier(resultTotal);
      if (resultAbs.length === 1) {
        return resultAbs[0];
      } else {
        const resultRel = checkRelTier(resultTotal);
        if (resultRel.length === 1) {
          return resultRel[0];
        } else return checkPriority(resultTotal);
      }
    }
  };

  const findMaxValue = (array) => {
    let max = 0;
    array.forEach((item) => {
      let value = Object.values(item)[0];
      if (value > max) max = value;
    });
    return max;
  };

  const findHighest = (arr) => {
    const max = findMaxValue(arr);
    let array = [];
    arr.forEach((item) => {
      let key = Object.keys(item)[0];
      let value = item[key];
      if (value === max) array.push(key);
    });
    return array;
  };

  const checkAbsTier = (array) => {
    const targetData = state[0].filter((item) => array.includes(item.type));
    for (let i = 1; i < 4; i++) {
      let targetArr = [];
      const filteredData = targetData.filter((item) => item.tier === i);
      filteredData.map((question) =>
        targetArr.push({ [question.type]: question.value })
      );
      const result = findHighest(targetArr);
      if (result.length === 1) return result;
    }
    return array;
  };

  const checkRelTier = (array) => {
    let targetData = state[2].filter((item) => array.includes(item.type));
    for (let i = 1; i < 5; i++) {
      const filteredData = targetData.filter((item) => item.tier === i);
      const counts = {};
      let arr = [];
      filteredData.forEach((item) => {
        counts[item.type] = (counts[item.type] || 0) + 1;
      });

      Object.entries(counts).map(([key, value]) => {
        arr.push({ [key]: value });
      });

      if (findHighest(arr).length === 1) return findHighest(arr);
      else if (arr !== findHighest(arr))
        targetData = state[2].filter((item) =>
          findHighest(arr).includes(item.type)
        );
    }
    return array;
  };

  const checkPriority = (array) => {
    const targetData = state[2].filter((item) => array.includes(item.type));
    let resultType;
    let min = 5;
    targetData.forEach((item) => {
      if (item.priority < min) {
        resultType = item.type;
        min = item.priority;
      }
    });
    return resultType;
  };

  const generatePDF = async (isClickedDownload) => {
    const pages = [<CoverPage />, <Layout1 />, <Layout2 />];
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
