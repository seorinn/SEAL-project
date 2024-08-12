import "./index.css";

function BarChart({ mainType, scoreData }) {
  const data = scoreData.map((item) => ({
    maintype: Object.keys(item)[0],
    score:
      (Object.values(item)[0] * 55) / 36 +
      (Object.keys(item)[0] === mainType ? 5 : 0),
  }));

  const setColor = (name) => {
    switch (name) {
      case "분석형":
        return "var(--navy700)";
      case "관계형":
        return "var(--navy500)";
      case "도전형":
        return "var(--navy300)";
      case "안정형":
        return "var(--navy400)";
      default:
        return "var(--navy-r)";
    }
  };

  const lines = Array.from({ length: 11 }, (_, index) => index);

  return (
    <div className="BarChart">
      <div className="background">
        {lines.map((item, index) => (
          <div key={index} className="line-item">
            <div className="num">{60 - item * 6}</div>
            <div className="line" />
          </div>
        ))}
      </div>
      <div className="bars">
        {data.map((item) => (
          <div key={item.maintype} className="item">
            <div
              key={item.maintype}
              className="bar-item"
              style={{
                height: `${item.score * 0.5}rem`,
                backgroundColor: setColor(item.maintype),
              }}
            ></div>
            <div className="bar-item-name">{item.maintype}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
