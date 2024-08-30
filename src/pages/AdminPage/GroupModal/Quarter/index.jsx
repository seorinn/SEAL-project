import "./index.css";

function Quarter({ countData, total, current }) {
  return (
    <div className="Quarter">
      <div
        className="top-left"
        style={current.includes("분석형") ? { scale: "1.1", opacity: 1 } : {}}
      >
        <div className="inner">R</div>
        <div className="counts">
          <div className="percentage">
            {Math.round((countData["분석형"] / total) * 100 * 10) / 10}%
          </div>
          <div className="count">{countData["분석형"]}명</div>
        </div>
      </div>
      <div
        className="top-right"
        style={current.includes("관계형") ? { scale: "1.1", opacity: 1 } : {}}
      >
        <div className="inner">E</div>
        <div className="counts">
          <div className="percentage">
            {Math.round((countData["관계형"] / total) * 100 * 10) / 10}%
          </div>
          <div className="count">{countData["관계형"]}명</div>
        </div>
      </div>
      <div
        className="bottom-left"
        style={current.includes("도전형") ? { scale: "1.1", opacity: 1 } : {}}
      >
        <div className="inner">A</div>
        <div className="counts">
          <div className="percentage">
            {Math.round((countData["도전형"] / total) * 100 * 10) / 10}%
          </div>
          <div className="count">{countData["도전형"]}명</div>
        </div>
      </div>
      <div
        className="bottom-right"
        style={current.includes("안정형") ? { scale: "1.1", opacity: 1 } : {}}
      >
        <div className="inner">L</div>
        <div className="counts">
          <div className="percentage">
            {Math.round((countData["안정형"] / total) * 100 * 10) / 10}%
          </div>
          <div className="count">{countData["안정형"]}명</div>
        </div>
      </div>
    </div>
  );
}

export default Quarter;
