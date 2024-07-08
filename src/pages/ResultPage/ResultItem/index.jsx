import "./index.css";

function ResultItem({ index, result }) {
  const resultList = [
    "주요 관심사 (Key Interests)",
    "행동 지침 (Do)",
    "하지 말아야 할 행동 (Don't)",
    "이들이 보는 자신 (How They See Themselves)",
    "다른 이들이 보는 이들 (How They May Be Seen By Others)",
    "기대하는 바 (They Expect You To)",
    "극단적 대비 유형 (Polar Tilt)",
    "스트레스 반응 (Stress Reaction)",
    "불만일 때 (If You Think They Are Unhappy With You)",
    "강점 (Strengths)",
    "개선점 (Areas for Improvement)",
    "리더십 스타일 (Leadership Style)",
    "갈등 해결 (Conflict Resolution)",
    "스트레스 해결 (Stress Management)",
    "다른 유형과 협업하는 방법 (Collaboration with Other Types)",
    "성장하기 위한 다음 단계 (Next Steps for Growth)",
  ];

  return (
    <div className="ResultItem">
      <div className="title">
        <b>{resultList[index]}</b>
      </div>
      <div className="content">{result}</div>
    </div>
  );
}

export default ResultItem;
