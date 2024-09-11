import React, { useState, useEffect } from "react";
import { fetchData } from "../../../util";
import "./index.css";

import GroupQuarter from "./GroupQuarter";
import GroupCharacter from "./GroupCharacters";
import GroupTables from "./GroupTables";
import Statistic from "./Statistic";

const GroupModal = ({
  groupUsers,
  groupscore,
  input,
  excelDataMain,
  excelDataSub,
}) => {
  const [userdata, setUserdata] = useState([]);
  const [countDataMain, setCountDataMain] = useState([]);
  const [countDataSub, setCountDataSub] = useState([]);
  const [state, setState] = useState([[], [], [], []]);

  useEffect(() => {
    setUserdata(
      groupUsers.map((user) => {
        return {
          name: user.name,
          mainType: user.mainType,
          subType: user.subType,
        };
      })
    );

    fetchData("newquestion-data.xlsx").then((res) => {
      let count = 0;
      let answers = [];
      let currentKey = null;
      let transformedData = res.map((item) =>
        item.map((i) => {
          if (i.id.startsWith("ABS")) {
            count++;
            return i;
          }
          if (i.id.startsWith("REL")) {
            count++;
            currentKey = i.id;
            answers.push({ [currentKey]: [] });
            return {
              ...i,
              answers: answers[answers.length - 1][currentKey],
            };
          } else {
            answers[answers.length - 1][currentKey].push(i);
          }
        })
      );
      const foramttedData = transformedData.map((item) =>
        item.slice().filter((i) => i !== undefined)
      );
      setState(foramttedData);
    });
  }, []);

  useEffect(() => {
    let countM = { 분석형: 0, 관계형: 0, 도전형: 0, 안정형: 0 };
    let countS = {
      촉진자: 0,
      상담가: 0,
      중재자: 0,
      비전가: 0,
      발명가: 0,
      모험가: 0,
      분석가: 0,
      전략가: 0,
      비평가: 0,
      설계자: 0,
      학자: 0,
      수호자: 0,
    };
    userdata.map((user) => {
      countM = {
        ...countM,
        [user.mainType]: (countM[user.mainType] || 0) + 1,
      };
      countS = {
        ...countS,
        [user.subType]: (countS[user.subType] || 0) + 1,
      };
    });
    setCountDataMain(countM);
    setCountDataSub(countS);
  }, [userdata]);

  if (!groupUsers) return;
  return (
    <div className="GroupModal">
      <GroupTables
        groupinfo={input}
        countDataMain={countDataMain}
        countDataSub={countDataSub}
        total={userdata.length}
        excelDataMain={excelDataMain}
        excelDataSub={excelDataSub}
      />
      <GroupQuarter userdata={userdata} groupinfo={input} />
      <GroupCharacter userdata={userdata} groupinfo={input} />
      <Statistic
        groupinfo={input}
        groupscore={groupscore}
        state={state[0]}
        total={userdata.length}
      />
      <Statistic
        groupinfo={input}
        groupscore={groupscore}
        state={state[1]}
        total={userdata.length}
      />
      <Statistic
        groupinfo={input}
        groupscore={groupscore}
        state={state[2]}
        total={userdata.length}
      />
      <Statistic
        groupinfo={input}
        groupscore={groupscore}
        state={state[3]}
        total={userdata.length}
      />
    </div>
  );
};

export default GroupModal;
