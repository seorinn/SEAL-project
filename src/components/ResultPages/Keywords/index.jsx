import KeywordItem from "./KeywordItem";
import "./index.css";

const keywordsList = [
  "일관성",
  "공감",
  "객관성",
  "지원",
  "근면",
  "신뢰",
  "빠른 의사결정",
  "논리",
  "주도성",
  "성취욕",
  "협력",
  "지속가능",
  "공정성",
  "세부사항",
  "정확성",
  "혁신",
  "책임감",
  "목표달성",
];

function Keywords({ keywords }) {
  return (
    <div className="Keywords">
      <div className="section">
        {keywordsList.slice(0, 4).map((item) => (
          <KeywordItem key={item} name={item} isOn={keywords.includes(item)} />
        ))}
      </div>
      <div className="section" style={{ width: "55%" }}>
        {keywordsList.slice(4, 7).map((item) => (
          <KeywordItem key={item} name={item} isOn={keywords.includes(item)} />
        ))}
      </div>
      <div className="section">
        {keywordsList.slice(7, 11).map((item) => (
          <KeywordItem key={item} name={item} isOn={keywords.includes(item)} />
        ))}
      </div>
      <div className="section" style={{ width: "55%" }}>
        {keywordsList.slice(11, 14).map((item) => (
          <KeywordItem key={item} name={item} isOn={keywords.includes(item)} />
        ))}
      </div>
      <div className="section">
        {keywordsList.slice(14, keywordsList.length).map((item) => (
          <KeywordItem key={item} name={item} isOn={keywords.includes(item)} />
        ))}
      </div>
    </div>
  );
}

export default Keywords;
