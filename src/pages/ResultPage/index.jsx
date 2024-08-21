import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getCookie, setCookie, fetchData, getStoragePath } from "../../util";

import CoverPage from "../../components/ResultPages/CoverPage";
import Overview from "../../components/ResultPages/Introduction/Overview";
import Character from "../../components/ResultPages/Introduction/Character";
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
import "./index.css";

function ResultPage() {
  const navigaton = useNavigate();
  const userInfo = getCookie("userinfo");
  const location = useLocation();
  const pdfRef = useRef(null);

  const state = location.state.state || [];
  const scoreMain = location.state.scoreMain || getCookie("scoremain");
  const scoreSub = location.state.scoreSub || getCookie("scoresub");

  const [mainType, setMainType] = useState("");
  const [subType, setSubType] = useState("");
  const [dataMain, setDataMain] = useState([]);
  const [dataSub, setDataSub] = useState([]);

  if (
    getCookie("isadmin") ||
    !getCookie("userinfo") ||
    (!location.state && !getCookie("userinfo").mainType)
  )
    navigaton("/");

  useEffect(() => {
    if (location.state) {
      setCookie("scoremain", location.state.scoreMain);
      setCookie("scoresub", location.state.scoreSub);
      setCookie("userinfo", {
        ...getCookie("userinfo"),
        mainType: setType(location.state.scoreMain),
        subType: setType(location.state.scoreSub),
      });
      setMainType(setType(location.state.scoreMain));
      setSubType(setType(location.state.scoreSub));
    } else {
      setMainType(getCookie("userinfo").mainType);
      setSubType(getCookie("userinfo").subType);
    }
  }, []);

  useEffect(() => {
    if (mainType !== "" && subType !== "" && getCookie("userinfo").name) {
      console.log(mainType, subType);
      try {
        fetchData("result-sub.xlsx").then((res) => {
          let array = res.filter((item) => item.type === subType);
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
          let array = res.filter((item) => item.type === mainType);
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
  }, [mainType, subType]);

  useEffect(() => {
    if (dataMain.strength && dataSub.strength) saveToStorage();
  }, [dataMain, dataSub]);

  const setType = (scoreData) => {
    if (!scoreData) return;
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
    if (!array) return;
    let max = 0;
    array.forEach((item) => {
      let value = Object.values(item)[0];
      if (value > max) max = value;
    });
    return max;
  };

  const findHighest = (arr) => {
    if (!arr) return;
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
    if (!state) return;
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
    if (!state) return;
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
    if (!state) return;
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
    const combinedData = {
      scoreMain: scoreMain,
      scoreSub: scoreSub,
      dataMain: dataMain,
      dataSub: dataSub,
    };
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

  if (dataMain.length === 0 || dataSub.length === 0) return;
  return (
    <div className="ResultPage">
      <div
        className={`page-container`}
        style={{
          backgroundColor: "white",
        }}
        ref={pdfRef}
      >
        <CoverPage />
        <RootInfo />
        <Introduction />
        <Overview />
        <Character />
        <ReportCover />
        <Summary keywordData={dataMain.keywords} />
        <BarPage />
        <KeywordPage data={dataMain.keywords} />
        <WorkingStyle data={dataMain.strength} />
        <Weak data={dataMain.weakness} />
        <Justifying data={dataMain.work_style} />
        <Motivation data={dataMain.motivation} />
        <Changes data={dataMain.changes} />
        <Stress data={dataMain.stress} />
        <Cowork data={dataMain.cowork} />
        <SubTable />
        <Strength data={dataSub.strength} />
        <Weakness data={dataSub.weakness} />
        <Behavior data={dataSub.behavior} />
        <ScoreGraph />
        <TextPage />
        <SheetPage />
      </div>
    </div>
  );
}
export default ResultPage;
