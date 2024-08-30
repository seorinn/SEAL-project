import img_table from "../../../../assets/images/chartable.png";
import { useEffect, useState } from "react";
import { twelveChar } from "../../../../util";
import GroupHeader from "../GroupHeader";
import "./index.css";

function GroupCharacter({ userdata, groupinfo }) {
  const [countData, setCountData] = useState([]);

  useEffect(() => {
    let count = {
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
      count = {
        ...count,
        [user.subType]: (count[user.subType] || 0) + 1,
      };
    });
    setCountData(count);
  }, [userdata]);

  const getTypeColor = (type) => {
    if (type === "촉진자") return "red";
    else if (type === "상담가") return "orange";
    else if (type === "중재자") return "yellowgreen";
    else if (type === "비전가") return "lime";
    else if (type === "발명가") return "darkgreen";
    else if (type === "모험가") return "skyblue";
    else if (type === "분석가") return "blue";
    else if (type === "전략가") return "purple";
    else if (type === "비평가") return "salmon";
    else if (type === "설계자") return "pink";
    else if (type === "학자") return "navy";
    else if (type === "수호자") return "peru";
    else return "gray";
  };

  return (
    <div className="GroupCharacter page">
      <GroupHeader groupinfo={groupinfo} />
      <h1>REAL 12캐릭터 그룹 분포</h1>
      <div className="table-container">
        <img alt="" src={img_table} />
      </div>
      <div className="percentage">
        {twelveChar.map((type) => (
          <div key={type.name}>
            <span
              style={{
                color: getTypeColor(type.name),
                marginRight: "0.5rem",
              }}
            >
              ●
            </span>
            <br />
            {type.name}
            {Math.round((countData[type.name] / userdata.length) * 100 * 10) /
              10}
            %
          </div>
        ))}
      </div>
      <div className="user-container">
        {userdata
          .sort((a, b) => {
            if (a.subType < b.subType) {
              return -1;
            }
            if (a.subType > b.subType) {
              return 1;
            }
            return 0;
          })
          .map((user, index) => (
            <div className="user" key={index}>
              {twelveChar.map((type) => (
                <div key={type.name}>
                  {user.subType === type.name && (
                    <>
                      <span
                        style={{
                          color: getTypeColor(type.name),
                          marginRight: "0.5rem",
                        }}
                      >
                        ●
                      </span>
                      {user.name}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
      {/* <div className="table-container"> */}
      {/* {userdata.map((user, index) => (
          <div key={index}>
            {twelveChar.map((type) => (
              <>
                {user.subType === type.name && (
                  <div>
                    {type.nameEng}● {user.name}
                  </div>
                )}
              </>
            ))}
          </div>
        ))} */}
      {/* </div> */}
    </div>
  );
}

export default GroupCharacter;
