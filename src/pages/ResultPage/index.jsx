import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/server";
import { useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
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

function ResultPage({ userInfo, setUserInfo }) {
  const pdfRef = useRef(null);
  const location = useLocation();
  const { state, scoreMain, scoreSub } = location.state;
  const [scale, setScale] = useState(1);

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
    if (userInfo.mainType && userInfo.subType && userInfo.phonenumber) {
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
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (dataMain.strength && dataSub.strength) saveToStorage();
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

  const saveToStorage = async () => {
    const storage = getStorage();
    const userList = getUserList();
    console.log(scoreMain, scoreSub, dataMain, dataSub);
    const combinedData = {
      scoreMain: scoreMain,
      scoreSub: scoreSub,
      dataMain: dataMain,
      dataSub: dataSub,
    };
    (await userList).map((item) => {
      if (userInfo.phonenumber === item.phonenumber) {
        const oldRef = ref(storage, getStoragePath(item));
        deleteObject(oldRef).catch((error) => console.log(error));
      }
    });
    const fileContent = JSON.stringify(combinedData, null, 2);
    const blob = new Blob([fileContent], { type: "application/json" });

    const storageRef = ref(storage, getStoragePath(userInfo));

    uploadBytes(storageRef, blob)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((downloadURL) => {
        console.log("File uploaded successfully:", downloadURL);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  // const converToPdf = async () => {
  //   const element = pdfRef.current;
  //   if (element) {
  //     const canvas = await html2canvas(element);
  //     const imageFile = canvas.toDataURL("image/png");
  //     const doc = new jsPDF("p", "mm", "a4");
  //     const pageWidth = doc.internal.pageSize.getWidth();
  //     const pageHeight = doc.internal.pageSize.getHeight();
  //     const widthRatio = pageWidth / canvas.width;
  //     const customHeight = canvas.height * widthRatio;
  //     doc.addImage(imageFile, "png", 0, 0, pageWidth, customHeight);
  //     let heightLeft = customHeight;
  //     let heightAdd = -pageHeight;
  //     while (heightLeft >= pageHeight) {
  //       doc.addPage();
  //       doc.addImage(imageFile, "png", 0, heightAdd, pageWidth, customHeight);
  //       heightLeft -= pageHeight;
  //       heightAdd -= pageHeight;
  //     }
  //     doc.save("REAL Personality 진단 결과지" + "_" + userInfo.name + ".pdf");
  //   }
  //   setDownloadPdf(false);
  // };

  // const [downloadPdf, setDownloadPdf] = useState(false);
  // useEffect(() => {
  //   if (downloadPdf && scale === 1.2) converToPdf();
  // }, [downloadPdf]);

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
        <CoverPage userInfo={userInfo} />
        <RootInfo />
        <Introduction />
        <Overview />
        <Character />
        <ReportCover />
        <Summary
          name={userInfo.name}
          course={userInfo.course}
          mainType={userInfo.mainType}
          subType={userInfo.subType}
          scoreData={scoreMain}
          keywordData={dataMain.keywords}
        />
        <BarPage mainType={userInfo.mainType} scoreMain={scoreMain} />{" "}
        <KeywordPage data={dataMain.keywords} />
        <WorkingStyle data={dataMain.strength} />
        <Weak data={dataMain.weakness} />
        <Justifying data={dataMain.work_style} />
        <Motivation data={dataMain.motivation} />
        <Changes data={dataMain.changes} />
        <Stress data={dataMain.stress} />
        <Cowork data={dataMain.cowork} />
        <SubTable subType={userInfo.subType} />
        <Strength data={dataSub.strength} />
        <Weakness data={dataSub.weakness} />
        <Behavior data={dataSub.behavior} />
        <ScoreGraph subType={userInfo.subType} scoreSub={scoreSub} />
        <TextPage />
        <SheetPage />
      </div>
      {/* <button
        className="btnPDF"
        onClick={() => {
          setScale(1.2);
          setDownloadPdf(true);
        }}
      >
        PDF 저장하기
      </button> */}
      {/* <div className="scale-buttons">
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
      </div> */}
      {/* {downloadPdf && (
        <div className="pdf-loading">
          <div className="text">
            <div className="loader">
              <PulseLoader color="var(--navy600)" />
            </div>
            다운로드 중입니다
          </div>
        </div>
      )} */}
    </div>
  );
}
export default ResultPage;
