import { useEffect, useState } from "react";
import { fourTypes, getIconImage } from "../../../../util";
import Header from "../../Header";
import Bottom from "../../Bottom";
import Keywords from "../../Keywords";
import "./index.css";

const keywordsList = [
  "일관성",
  "공감",
  "객관성",
  "지원",
  "근면",
  "신뢰",
  "신속한 의사결정",
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

function KeywordPage({ step, data }) {
  const [name, setName] = useState("");
  const [nameEng, setNameEng] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    setName(data[0].type);
    fourTypes.map((item) => {
      if (item.name === data[0].type) {
        setNameEng(item.nameEng);
        setIntro(item.intro);
        setContent(item.content);
      }
    });
    setKeywords(data[0].content.split(", "));
  }, []);

  return (
    <div className="KeywordPage resultpage">
      <div className="container">
        <Header reportname="Work Style Report" title="1. 나의 REAL 대표 유형" />
        <div className="result-text-main">
          <div className="main-title">나의 대표 유형의 상세 리포트</div>
          <div className="main-content">
            당신은 매우 강한 특성을 가진 <b>{name}</b> 유형입니다.
          </div>
        </div>
        <div className="main-info">
          <div className="top-section">
            <div className="img-container">
              <img className="left" alt={name} src={getIconImage(name, true)} />
            </div>
            <div className="right">
              <div className="typename">
                {name}
                <b> ({nameEng})</b>
              </div>
              <div className="typeintro">{intro}</div>
            </div>
          </div>
          <div className="description">{content}</div>
        </div>
        <div className="keyword-section">
          <div className="title">주요 키워드</div>
          <div className="keyword-container">
            <Keywords keywords={keywords} />
          </div>
        </div>
      </div>
      <Bottom pageIndex={step - 1} />
    </div>
  );
}

export default KeywordPage;
