import ResultItem from "../../../pages/ResultPage/Result/ResultItem";

function Layout0({
  scoreData,
  name,
  affiliation,
  position,
  highestType,
  highestPersona,
  subtypes,
  results,
  date,
}) {
  return (
    <div id="download" className="result-container page">
      <div className="result-header">
        <h1>SEAL Diagnostic Result Example</h1>
        <h2>Participant Information</h2>
        <p>이름: {name}</p>
        <p>소속: {affiliation}</p>
        <p>직급: {position}</p>
        <p>날짜: {date}</p>
      </div>
      <div className="result-body">
        <h1>Diagnostic Summary </h1>
        <h2>
          Main Type: <b>{highestType}</b>
        </h2>
        <h3>
          Sub Type: <b>{highestPersona}</b>
        </h3>
        {results.map((item, index) => (
          <ResultItem key={index} index={index} result={item} />
        ))}
      </div>
      <div className="result-table">
        <div className="score-box">
          <b>주요 유형 점수</b>
          {scoreData.map((item) => (
            <div key={item.type}>{`${item.type}: ${item.value}점`}</div>
          ))}
        </div>
        <div className="score-box">
          <b>하위 유형 점수 ({highestType} 내)</b>
          {subtypes.map((item, index) => (
            <div key={index}>{`${item.type}: ${item.value}점`}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Layout0;
