import { useEffect, useState } from "react";
import Quarter from "../../../../components/Quarter";
import { fourTypes } from "../../../../util";
import "./index.css";

function GroupQuarter({ userdata }) {
  const [countData, setCountData] = useState([]);

  useEffect(() => {
    let count = { 분석형: 0, 관계형: 0, 도전형: 0, 안정형: 0 };
    userdata.map((user) => {
      count = {
        ...count,
        [user.mainType]: (count[user.mainType] || 0) + 1,
      };
    });
    setCountData(count);
  }, [userdata]);

  const getTypeColor = (type) => {
    if (type === "분석형") return "red";
    else if (type === "관계형") return "skyblue";
    else if (type === "도전형") return "orange";
    else if (type === "안정형") return "darkgreen";
    else return "gray";
  };

  return (
    <div className="GroupQuarter resultpage">
      <h1>REAL 4유형 그룹 분포</h1>
      <div className="quarter-container">
        <Quarter />
      </div>
      <div className="percentage">
        {fourTypes.map((type) => (
          <div key={type.name}>
            <span
              style={{
                color: getTypeColor(type.name),
                marginRight: "0.5rem",
              }}
            >
              ●
            </span>
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
            if (a.mainType < b.mainType) {
              return -1;
            }
            if (a.mainType > b.mainType) {
              return 1;
            }
            return 0;
          })
          .map((user, index) => (
            <div className="user" key={index}>
              {fourTypes.map((type) => (
                <div key={type.name}>
                  {user.mainType === type.name && (
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
        {/* {fourTypes.map((type) => (
          <div key={type.name} className="type">
            <div className="typename">
              <b>{type.name}</b>
            </div>
            {userdata.map((user) => (
              <div className="user">
                {user.mainType === type.name && <>{user.name}</>}
              </div>
            ))}
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default GroupQuarter;
