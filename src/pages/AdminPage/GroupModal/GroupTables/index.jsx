import { useEffect, useState } from "react";
import { fetchData, fourTypes, twelveChar } from "../../../../util";
import CharTable from "../../../../assets/images/chartable.png";
import Quarter from "../Quarter";
import BoxTitle from "./BoxTitle";
import GroupHeader from "../GroupHeader";
import "./index.css";

function GroupTables({
  groupinfo,
  countDataMain,
  countDataSub,
  total,
  excelDataMain,
  excelDataSub,
}) {
  const [highMain, setHighMain] = useState([]);
  const [highSub, setHighSub] = useState([]);
  const [contentMain, setContentMain] = useState([]);
  const [contentSub, setContentSub] = useState([]);
  const [resultTeam, setResultTeam] = useState();

  useEffect(() => {
    const maxValueM = Math.max(...Object.values(countDataMain));
    setHighMain(
      Object.keys(countDataMain).filter(
        (key) => countDataMain[key] === maxValueM
      )
    );
    const maxValueS = Math.max(...Object.values(countDataSub));
    setHighSub(
      Object.keys(countDataSub).filter((key) => countDataSub[key] === maxValueS)
    );
    try {
      fetchData("result-team.xlsx").then((res) => setResultTeam(res));
    } catch (error) {
      console.log(error);
    }
  }, [countDataMain, countDataSub]);

  useEffect(() => {
    let typename = "";
    if (highMain.length === 1) {
      typename = highMain[0];
      let array = excelDataMain.filter((item) => item.type === typename);
      setContentMain({
        strength: array.filter((item) => item.category === "strength_example"),
        changes: array.filter((item) => item.category === "change_res"),
        motivation: array.filter((item) => item.category === "motivation"),
        stress: array.filter((item) => item.category === "stress_tendency")[0],
      });
    } else if (resultTeam) {
      fourTypes.map((type) => {
        if (highMain.includes(type.name))
          typename = typename + type.nameEng.slice(0, 1);
      });
      let array = resultTeam.filter((item) => item.type === typename);
      setContentMain({
        content: [
          array.filter((item) => item.category === "strength")[0],
          array.filter((item) => item.category === "weakness")[0],
        ],
        changes: array.filter((item) => item.category === "changes"),
        motivation: array.filter((item) => item.category === "motivation"),
        stress: array.filter((item) => item.category === "stress")[0],
      });
    }
  }, [highMain, resultTeam]);

  useEffect(() => {
    if (highSub.length === 1) {
      let array = excelDataSub.filter((item) => item.type === highSub[0]);
      setContentSub(
        array.filter((item) => item.category === "strength").slice(0, 1)
      );
    } else if (resultTeam) {
      setContentSub(resultTeam.filter((item) => item.type === "SUB"));
    }
  }, [highSub, resultTeam]);

  return (
    <div className="GroupTables page">
      <GroupHeader groupinfo={groupinfo} />
      <div className="intro">
        {groupinfo.companyname} {groupinfo.groupname} ({total}명 진단) 주요
        결과입니다.
      </div>
      <div className="container">
        <div className="content">
          <div className="boxcontent">
            <div className="quarter-box box">
              <div className="table-container">
                <Quarter
                  countData={countDataMain}
                  total={total}
                  current={highMain}
                />
              </div>
              <div className="bottom-text">
                <b>{groupinfo.groupname} REAL 유형별 분포에 따르면,</b>
                {contentMain.content
                  ? contentMain.content.map((item) => (
                      <div key={item.content}>{item.content}</div>
                    ))
                  : fourTypes.map((type) => {
                      if (type.name === highMain[0]) {
                        return <div key={type.name}>- {type.content}</div>;
                      }
                    })}
              </div>
            </div>
            <div className="char-box box">
              <div className="table-container">
                <img alt="" src={CharTable} />
              </div>
              <div className="bottom-text">
                <b>12 캐릭터 분포에 따르면,</b>
                {contentSub.map((item) => (
                  <div key={item.detail}>- {item.detail}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-box box">
            {highMain.length === 1 && (
              <div className="text-container">
                <BoxTitle title={`(${groupinfo.groupname}) 업무 스타일`} />
                <div className="text-body">
                  {contentMain.strength &&
                    contentMain.strength.map((item) => (
                      <div key={item.content}>
                        {item.detail.replace(/\\n/g, ` `)}
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className="text-container motivation">
              <BoxTitle title={`(${groupinfo.groupname}) 동기부여 핵심요소`} />
              <div className={`text-body ${highMain.length > 1}`}>
                {contentMain.motivation &&
                  contentMain.motivation.map((item) => (
                    <div key={item.content} className="item">
                      {item.content}
                    </div>
                  ))}
              </div>
            </div>
            <div className="text-container changes">
              <BoxTitle title={`(${groupinfo.groupname}) 변화 대응 방법`} />
              <div className={`text-body ${highMain.length > 1}`}>
                {contentMain.changes &&
                  contentMain.changes.map((item) => (
                    <div key={item.content} className="item">
                      {highMain.length > 1
                        ? item.content
                        : item.content.replace(/\\n/g, ` `)}
                    </div>
                  ))}
              </div>
            </div>
            <div className="text-container">
              <BoxTitle title={`(${groupinfo.groupname}) 스트레스 반응`} />
              <div className="text-body">
                {contentMain.stress && contentMain.stress.content}
              </div>
            </div>
            <div className="url-container">
              추가 정보와 자세한 해석이 필요하시면
              <br />
              root@rootconsulting.co.kr로 문의하세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupTables;
