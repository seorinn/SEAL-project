import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/server";
import { useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import html2pdf from "html2pdf.js";
import {
  fetchData,
  getUserList,
  getStoragePath,
  getFileName,
} from "../../util";

import CoverPage from "../../components/ResultPages/CoverPage";
import Overview from "../../components/ResultPages/Introduction/Overview";
import Character from "../../components/ResultPages/Introduction/Character";

import "./index.css";
import RootInfo from "../../components/ResultPages/Introduction/RootInfo";
import Introduction from "../../components/ResultPages/Introduction/Introduction";
import ReportCover from "../../components/ResultPages/MainType/ReportCover";
import WorkingStyle from "../../components/ResultPages/MainType/WorkingStyle";
import Weak from "../../components/ResultPages/MainType/Weakness";
import Justifying from "../../components/ResultPages/MainType/Justifying";
import Changes from "../../components/ResultPages/MainType/Changes";
import Stress from "../../components/ResultPages/MainType/Stress";
import Cowork from "../../components/ResultPages/MainType/Cowork";
import SubTable from "../../components/ResultPages/SubCharacter/SubTable";
import Strength from "../../components/ResultPages/SubCharacter/Strength";
import Weakness from "../../components/ResultPages/SubCharacter/Weakness";
import Behavior from "../../components/ResultPages/SubCharacter/Behavior";
import Motivation from "../../components/ResultPages/MainType/Motivation";
import ScoreGraph from "../../components/ResultPages/SubCharacter/ScoreGraph";
import BarChart from "../../components/ResultPages/MainType/BarChart";
import Keywords from "../../components/ResultPages/MainType/Keywords";

function ResultPage({ userInfo, setUserInfo }) {
  const location = useLocation();
  const { state, scoreMain, scoreSub } = location.state;
  const [step, setStep] = useState(1);
  const [scale, setScale] = useState(1);
  const max = 20;

  useEffect(
    () =>
      setUserInfo({
        ...userInfo,
        mainType: setType(scoreMain),
        subType: setType(scoreSub),
      }),
    []
  );
  const [dataMain, setDataMain] = useState([]);
  const [dataSub, setDataSub] = useState([]);

  useEffect(() => {
    if (
      userInfo.mainType &&
      userInfo.subType
      // && userInfo.phonenumber
    ) {
      console.log(userInfo.mainType, userInfo.subType);

      fetchData("result-sub.xlsx").then((res) => {
        let array = res.filter((item) => item.type === userInfo.subType);
        setDataSub({
          strength: array.filter(
            (item) =>
              item.category.includes("strength") || item.category === "content"
          ),
          weakness: array.filter((item) => item.category.includes("weakness")),
          behavior: array.filter(
            (item) =>
              item.category.includes("like") ||
              item.category.includes("opposite")
          ),
        });
      });

      fetchData("result-main.xlsx").then((res) => {
        let array = res.filter((item) => item.type === userInfo.mainType);
        setDataMain({
          keywords: array.filter((item) => item.category === "keywords"),
          strength: array.filter(
            (item) =>
              item.category.includes("strength") &&
              !item.category.includes("stress")
          ),
          weakness: array.filter((item) => item.category.includes("weakness")),
          work_style: array.filter(
            (item) =>
              item.category === "work_style" || item.category === "leadership"
          ),
          changes: array.filter(
            (item) =>
              item.category === "change_res" || item.category === "conflict"
          ),
          motivation: array.filter((item) =>
            item.category.includes("motivation")
          ),
          stress: array.filter((item) => item.category.includes("stress")),
          cowork: array.filter((item) => item.category === "cowork"),
        });
      });

      // generatePDF();
    }
  }, [userInfo]);

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
    state[0].map((item) => {
      if (array.includes(item.type)) {
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
      }
    });
    let arr = [];
    const targetData = state[1].filter((item) => array.includes(item.type));
    targetData.map((question) => arr.push({ [question.type]: question.value }));
    return findHighest(arr);
  };

  const checkRelTier = (array) => {
    let targetState = state[2];
    state[3].map((item) => {
      if (array.includes(item.type)) targetState = state[3];
    });
    let targetData = targetState.filter((item) => array.includes(item.type));
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
      else if (array.length !== findHighest(arr).length)
        targetData = targetState.filter((item) =>
          findHighest(arr).includes(item.type)
        );
    }
    return array;
  };

  const checkPriority = (array) => {
    let targetState = state[2];
    let min = 5;
    state[3].map((item) => {
      if (array.includes(item.type)) {
        targetState = state[3];
        min = 13;
      }
    });
    const targetData = targetState.filter((item) => array.includes(item.type));
    let resultType;
    targetData.forEach((item) => {
      if (item.priority < min) {
        resultType = item.type;
        min = item.priority;
      }
    });
    return resultType;
  };

  const generatePDF = async (isClickedDownload) => {
    const pages = [
      // <CoverPage userInfo={userInfo} />,
      <RootInfo />,
      <Introduction />,
      <Overview />,
      <Character />,
      <ReportCover />,
      // <BarChart mainType={userInfo.mainType} scoreMain={scoreMain} />,
      // <Keywords mainType={userInfo.mainType} />,
      // <WorkingStyle mainType={userInfo.mainType} />,
      // <Weak mainType={userInfo.mainType} />,
      // <Justifying />,
      // <Motivation mainType={userInfo.mainType} />,
      // <Changes />,
      // <Stress mainType={userInfo.mainType} />,
      // <Cowork mainType={userInfo.mainType} />,
      // <SubTable subType={userInfo.subType} />,
      // <Strength subType={userInfo.subType} />,
      // <Weakness subType={userInfo.subType} />,
      // <Behavior subType={userInfo.subType} />,
      // <ScoreGraph subType={userInfo.subType} scoreSub={scoreSub} />,
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
      html2pdf().from(html).save(getFileName(userInfo.name));
    else {
      const storage = getStorage();
      const pdfRef = ref(storage, getStoragePath(userInfo));
      const userList = getUserList();
      (await userList).map((item) => {
        if (userInfo.phonenumber === item.phonenumber) {
          const oldRef = ref(storage, getStoragePath(item));
          deleteObject(oldRef).catch((error) => console.log(error));
        }
      });
      const pdfOptions = {
        filename: getFileName(userInfo.name),
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

  if (dataMain.length === 0 || dataSub.length === 0) return;
  return (
    <div className="ResultPage">
      <div
        className={`page-container`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${scale > 1 ? "top" : "50% 50%"}`,
        }}
      >
        {step === 1 && <CoverPage userInfo={userInfo} />}
        {/* {step === 1 && <RootInfo />} */}
        {step === 2 && <Introduction />}
        {step === 3 && <Overview />}
        {step === 4 && <Character />}

        {step === 5 && <ReportCover />}
        {step === 6 && (
          <BarChart mainType={userInfo.mainType} scoreMain={scoreMain} />
        )}
        {step === 7 && <Keywords data={dataMain.keywords} />}
        {step === 8 && <WorkingStyle data={dataMain.strength} />}
        {step === 9 && <Weak data={dataMain.weakness} />}
        {step === 10 && <Justifying data={dataMain.work_style} />}
        {step === 11 && <Motivation data={dataMain.motivation} />}
        {step === 12 && <Changes data={dataMain.changes} />}
        {step === 13 && <Stress data={dataMain.stress} />}
        {step === 14 && <Cowork data={dataMain.cowork} />}

        {step === 15 && <SubTable subType={userInfo.subType} />}
        {step === 16 && <Strength data={dataSub.strength} />}
        {step === 17 && <Weakness data={dataSub.weakness} />}
        {step === 18 && <Behavior data={dataSub.behavior} />}
        {step === 19 && (
          <ScoreGraph subType={userInfo.subType} scoreSub={scoreSub} />
        )}
      </div>
      {/* <button className="btnPDF" onClick={() => generatePDF(true)}>
        PDF 저장하기
      </button> */}
      <div className="page-buttons">
        {step > 1 && (
          <button
            className="btn-back"
            onClick={() => {
              setStep(step - 1);
            }}
          >
            ◀
          </button>
        )}
        {step < max && (
          <button className="btn-next" onClick={() => setStep(step + 1)}>
            ▶
          </button>
        )}
      </div>
      <div className="scale-buttons">
        <button
          className="btn-reduce"
          onClick={() => {
            scale > 0.5 && setScale(scale - 0.2);
          }}
        >
          -
        </button>
        <button
          className="btn-zoom"
          onClick={() => {
            scale < 3 && setScale(scale + 0.2);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
export default ResultPage;
