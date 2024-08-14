import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/server";
import { useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
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
import TextPage from "../../components/ResultPages/AfterTest/TextPage";
import SheetPage from "../../components/ResultPages/AfterTest/SheetPage";
import Summary from "../../components/ResultPages/Summary";
import KeywordPage from "../../components/ResultPages/MainType/KeywordPage";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResultPage({ userInfo, setUserInfo }) {
  const location = useLocation();
  const { state, scoreMain, scoreSub } = location.state;
  const [pages, setPages] = useState([]);
  const [step, setStep] = useState(1);
  const [scale, setScale] = useState(1.2);
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

  useEffect(() => {
    if (dataMain && dataSub)
      setPages([
        <CoverPage userInfo={userInfo} />,
        <RootInfo step={step} />,
        <Introduction step={step} />,
        <Overview step={step} />,
        <Character step={step} />,
        <ReportCover />,
        <Summary
          step={step}
          name={userInfo.name}
          mainType={userInfo.mainType}
          subType={userInfo.subType}
          scoreData={scoreMain}
          keywordData={dataMain.keywords}
        />,
        <BarPage
          step={step}
          mainType={userInfo.mainType}
          scoreMain={scoreMain}
        />,
        <KeywordPage step={step} data={dataMain.keywords} />,
        <WorkingStyle step={step} data={dataMain.strength} />,
        <Weak step={step} data={dataMain.weakness} />,
        <Justifying step={step} data={dataMain.work_style} />,
        <Motivation step={step} data={dataMain.motivation} />,
        <Changes step={step} data={dataMain.changes} />,
        <Stress step={step} data={dataMain.stress} />,
        <Cowork step={step} data={dataMain.cowork} />,
        <SubTable step={step} subType={userInfo.subType} />,
        <Strength step={step} data={dataSub.strength} />,
        <Weakness step={step} data={dataSub.weakness} />,
        <Behavior step={step} data={dataSub.behavior} />,
        <ScoreGraph
          step={step}
          subType={userInfo.subType}
          scoreSub={scoreSub}
        />,
        <TextPage step={step} />,
        <SheetPage step={step} />,
      ]);
  }, [dataMain, dataSub]);

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
    const element = (
      <div className="pdfPages">
        {/* {pages.map((page, index) => (
          <div
            key={index}
            className="pdfPage"
            style={{ fontFamily: "NanumSquareNeo" }}
          >
            {page}
          </div>
        ))} */}
        <CoverPage userInfo={userInfo} />,
        <RootInfo step={step} />,
        <Introduction step={step} />,
        <Overview step={step} />,
        <Character step={step} />,
        <ReportCover />,
        <Summary
          step={step}
          name={userInfo.name}
          mainType={userInfo.mainType}
          subType={userInfo.subType}
          scoreData={scoreMain}
          keywordData={dataMain.keywords}
        />
        ,
        <BarPage
          step={step}
          mainType={userInfo.mainType}
          scoreMain={scoreMain}
        />
        ,
        <KeywordPage step={step} data={dataMain.keywords} />,
        <WorkingStyle step={step} data={dataMain.strength} />,
        <Weak step={step} data={dataMain.weakness} />,
        <Justifying step={step} data={dataMain.work_style} />,
        <Motivation step={step} data={dataMain.motivation} />,
        <Changes step={step} data={dataMain.changes} />,
        <Stress step={step} data={dataMain.stress} />,
        <Cowork step={step} data={dataMain.cowork} />,
        <SubTable step={step} subType={userInfo.subType} />,
        <Strength step={step} data={dataSub.strength} />,
        <Weakness step={step} data={dataSub.weakness} />,
        <Behavior step={step} data={dataSub.behavior} />,
        <ScoreGraph
          step={step}
          subType={userInfo.subType}
          scoreSub={scoreSub}
        />
        ,
        <TextPage step={step} />,
        <SheetPage step={step} />,
      </div>
    );

    const html = ReactDOM.renderToStaticMarkup(element);
    if (isClickedDownload) html2pdf().from(html).save(userInfo.name);
    // html2pdf().from(html).save(getFileName(userInfo.name));
    // else {
    //   const storage = getStorage();
    //   const pdfRef = ref(storage, getStoragePath(userInfo));
    //   const userList = getUserList();
    //   (await userList).map((item) => {
    //     if (userInfo.phonenumber === item.phonenumber) {
    //       const oldRef = ref(storage, getStoragePath(item));
    //       deleteObject(oldRef).catch((error) => console.log(error));
    //     }
    //   });
    //   const pdfOptions = {
    //     filename: getFileName(userInfo.name),
    //     html2canvas: {},
    //     jsPDF: {},
    //   };
    //   const pdfBlob = await new Promise((resolve, reject) => {
    //     html2pdf()
    //       .from(html)
    //       .set(pdfOptions)
    //       .outputPdf("blob")
    //       .then(resolve)
    //       .catch(reject);
    //   });

    //   uploadBytes(pdfRef, pdfBlob)
    //     .then((snapshot) => {
    //       console.log("PDF uploaded to storage");
    //     })
    //     .catch((error) => console.log(error));
    // }
  };

  const pdfRef = useRef(null);
  const converToPdf = async () => {
    const element = pdfRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const imageFile = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const widthRatio = pageWidth / canvas.width;
      const customHeight = canvas.height * widthRatio;
      doc.addImage(imageFile, "png", 0, 0, pageWidth, customHeight);
      let heightLeft = customHeight;
      let heightAdd = -pageHeight;
      while (heightLeft >= pageHeight) {
        doc.addPage();
        doc.addImage(imageFile, "png", 0, heightAdd, pageWidth, customHeight);
        heightLeft -= pageHeight;
        heightAdd -= pageHeight;
      }
      doc.save("REAL Personality 진단 결과지" + "_" + userInfo.name + ".pdf");
    }
    setDownloadPdf(false);
  };

  const [downloadPdf, setDownloadPdf] = useState(false);
  useEffect(() => {
    if (downloadPdf && scale === 1.2) converToPdf();
  }, [downloadPdf]);

  if (dataMain.length === 0 || dataSub.length === 0) return;
  return (
    <div className="ResultPage">
      <div
        className={`page-container`}
        style={{
          transform: `scale(${scale})`,
          backgroundColor: "white",
        }}
        ref={pdfRef}
      >
        {step === 1 && <CoverPage userInfo={userInfo} />}
        {step === 1 && <RootInfo step={2} />}
        {step === 1 && <Introduction step={3} />}
        {step === 1 && <Overview step={4} />}
        {step === 1 && <Character step={5} />}
        {step === 1 && <ReportCover />}
        {step === 1 && (
          <Summary
            step={6}
            name={userInfo.name}
            mainType={userInfo.mainType}
            subType={userInfo.subType}
            scoreData={scoreMain}
            keywordData={dataMain.keywords}
          />
        )}
        {step === 1 && (
          <BarPage
            step={7}
            mainType={userInfo.mainType}
            scoreMain={scoreMain}
          />
        )}
        {step === 1 && <KeywordPage step={8} data={dataMain.keywords} />}
        {step === 1 && <WorkingStyle step={9} data={dataMain.strength} />}
        {step === 1 && <Weak step={10} data={dataMain.weakness} />}
        {step === 1 && <Justifying step={11} data={dataMain.work_style} />}
        {step === 1 && <Motivation step={12} data={dataMain.motivation} />}
        {step === 1 && <Changes step={13} data={dataMain.changes} />}
        {step === 1 && <Stress step={14} data={dataMain.stress} />}
        {step === 1 && <Cowork step={15} data={dataMain.cowork} />}
        {step === 1 && <SubTable step={16} subType={userInfo.subType} />}
        {step === 1 && <Strength step={17} data={dataSub.strength} />}
        {step === 1 && <Weakness step={18} data={dataSub.weakness} />}
        {step === 1 && <Behavior step={19} data={dataSub.behavior} />}
        {step === 1 && (
          <ScoreGraph
            step={20}
            subType={userInfo.subType}
            scoreSub={scoreSub}
          />
        )}
        {step === 1 && <TextPage step={21} />}
        {step === 1 && <SheetPage step={22} />}
      </div>
      <button
        className="btnPDF"
        onClick={() => {
          // generatePDF(true)
          // html2pdf()
          setScale(1.2);
          setDownloadPdf(true);
        }}
      >
        PDF 저장하기
      </button>
      {/* <div className="page-buttons">
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
      </div> */}
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
            scale < 2 && setScale(scale + 0.2);
          }}
        >
          +
        </button>
      </div>
      {downloadPdf && (
        <div className="pdf-loading">
          <div className="text">
            <div className="loader">
              <PulseLoader color="var(--navy600)" />
            </div>
            다운로드 중입니다
            <br />
            PDF 파일에 문제가 있을 경우
            <br />
            다시 한번 다운받아 주세요
          </div>
        </div>
      )}
    </div>
  );
}
export default ResultPage;
