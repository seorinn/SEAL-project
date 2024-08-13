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
import BarPage from "../../components/ResultPages/MainType/BarPage";
import Keywords from "../../components/ResultPages/MainType/Keywords";
import TextPage from "../../components/ResultPages/AfterTest/TextPage";
import SheetPage from "../../components/ResultPages/AfterTest/SheetPage";
import Summary from "../../components/ResultPages/Summary";
import KeywordPage from "../../components/ResultPages/MainType/KeywordPage";

function ResultPage({ userInfo, setUserInfo }) {
  const location = useLocation();
  const { state, scoreMain, scoreSub } = location.state;
  const [step, setStep] = useState(1);
  const [scale, setScale] = useState(1);
  const max = 23;

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
      try {
        fetchData("result-sub.xlsx").then((res) => {
          let array = res.filter((item) => item.type === userInfo.subType);
          setDataSub({
            strength: array.filter(
              (item) =>
                item.category.includes("strength") ||
                item.category === "content"
            ),
            weakness: array.filter((item) =>
              item.category.includes("weakness")
            ),
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
            weakness: array.filter((item) =>
              item.category.includes("weakness")
            ),
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
      } catch (error) {
        console.log(error);
      } finally {
        // generatePDF();
      }
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

  // const generatePDF = async (isClickedDownload) => {
  //   const pages = [
  //     // <CoverPage userInfo={userInfo} />,
  //     <Introduction />,
  //     <Overview />,
  //     <Character />,
  //     <ReportCover />,
  //     <BarPage mainType={userInfo.mainType} scoreMain={scoreMain} />,
  //     // <Keywords data={dataMain.keywords} />,
  //     <WorkingStyle data={dataMain.strength} />,
  //     <Weak data={dataMain.weakness} />,
  //     <Justifying data={dataMain.work_style} />,
  //     <Motivation data={dataMain.motivation} />,
  //     <Changes data={dataMain.changes} />,
  //     <Stress data={dataMain.stress} />,
  //     <Cowork data={dataMain.cowork} />,
  //     <SubTable subType={userInfo.subType} />,
  //     <Strength data={dataSub.strength} />,
  //     <Weakness data={dataSub.weakness} />,
  //     <Behavior data={dataSub.behavior} />,
  //     <ScoreGraph subType={userInfo.subType} scoreSub={scoreSub} />,
  //   ];
  //   const element = (
  //     <div className="ResultPage">
  //       {pages.map((page, index) => (
  //         <div key={index} className="pdfPage">
  //           {page}
  //         </div>
  //       ))}
  //     </div>
  //   );
  //   const html = ReactDOM.renderToStaticMarkup(element);
  //   if (isClickedDownload)
  //     html2pdf().from(html).save(getFileName(userInfo.name));
  //   else {
  //     const storage = getStorage();
  //     const pdfRef = ref(storage, getStoragePath(userInfo));
  //     const userList = getUserList();
  //     (await userList).map((item) => {
  //       if (userInfo.phonenumber === item.phonenumber) {
  //         const oldRef = ref(storage, getStoragePath(item));
  //         deleteObject(oldRef).catch((error) => console.log(error));
  //       }
  //     });
  //     const pdfOptions = {
  //       filename: getFileName(userInfo.name),
  //       html2canvas: {},
  //       jsPDF: {},
  //     };
  //     const pdfBlob = await new Promise((resolve, reject) => {
  //       html2pdf()
  //         .from(html)
  //         .set(pdfOptions)
  //         .outputPdf("blob")
  //         .then(resolve)
  //         .catch(reject);
  //     });

  //     uploadBytes(pdfRef, pdfBlob)
  //       .then((snapshot) => {
  //         console.log("PDF uploaded to storage");
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

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
        {step === 2 && <RootInfo step={step} />}
        {step === 3 && <Introduction step={step} />}
        {step === 4 && <Overview step={step} />}
        {step === 5 && <Character step={step} />}
        {step === 6 && <ReportCover />}
        {step === 7 && (
          <Summary
            step={step}
            name={userInfo.name}
            mainType={userInfo.mainType}
            subType={userInfo.subType}
            scoreData={scoreMain}
            keywordData={dataMain.keywords}
          />
        )}
        {step === 8 && (
          <BarPage
            step={step}
            mainType={userInfo.mainType}
            scoreMain={scoreMain}
          />
        )}
        {step === 9 && <KeywordPage step={step} data={dataMain.keywords} />}
        {step === 10 && <WorkingStyle step={step} data={dataMain.strength} />}
        {step === 11 && <Weak step={step} data={dataMain.weakness} />}
        {step === 12 && <Justifying step={step} data={dataMain.work_style} />}
        {step === 13 && <Motivation step={step} data={dataMain.motivation} />}
        {step === 14 && <Changes step={step} data={dataMain.changes} />}
        {step === 15 && <Stress step={step} data={dataMain.stress} />}
        {step === 16 && <Cowork step={step} data={dataMain.cowork} />}
        {step === 17 && <SubTable step={step} subType={userInfo.subType} />}
        {step === 18 && <Strength step={step} data={dataSub.strength} />}
        {step === 19 && <Weakness step={step} data={dataSub.weakness} />}
        {step === 20 && <Behavior step={step} data={dataSub.behavior} />}
        {step === 21 && (
          <ScoreGraph
            step={step}
            subType={userInfo.subType}
            scoreSub={scoreSub}
          />
        )}
        {step === 22 && <TextPage step={step} />}
        {step === 23 && <SheetPage step={step} />}
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
