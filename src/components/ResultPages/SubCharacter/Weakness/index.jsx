import { useEffect, useState } from "react";
import Bottom from "../../Bottom";
import Header from "../../Header";
import SubHeader from "../../SubHeader";
import MoreInfoBox from "../../MoreInfoBox";
import "./index.css";

function Weakness({ data }) {
  const [weaknesses, setWeaknesses] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    setWeaknesses(data.filter((item) => item.category === "weakness"));
    setCases(data.filter((item) => item.category === "weakness_case"));
  }, []);

  const mockStrength = [
    {
      content:
        "실행 부족: 분석과 연구에 치중하다 보니 실행력이 저하될 수 있습니다.",
      detail:
        "사례: 학자는 프로젝트 중에 지나치게 많은 데이터를 분석하는 데 시간을 소비하여, 실행 시기를 놓친 경험이 있습니다. 이로 인해 그는 실질적인 결과를 빠르게 도출하는 것이 중요하다는 것을 깨달았습니다.",
    },
    {
      content:
        "융통성 부족: 고정된 사고방식으로 인해 변화에 적응하기 어려울 수 있습니다.",
      detail:
        "사례: 학자는 새로운 트렌드를 수용하지 못하여 시장 변화에 뒤처진 경험이 있습니다. 이를 통해 그는 변화에 적응하고 혁신을 수용하는 자세를 기르게 되었습니다.",
    },
    {
      content:
        "과도한 분석: 분석에 집중하다 보니 중요한 결정을 미루거나 지연시킬 수 있습니다.",
      detail:
        "사례: 학자는 복잡한 문제를 분석하는 데 지나치게 많은 시간을 소비하여, 중요한 결정을 지연시킨 경험이 있습니다. 이를 통해 그는 분석과 실행의 균형이 필요하다는 것을 깨달았습니다.",
    },
  ];
  const mockData = [
    {
      content: "사례 1: 제너럴 일렉트릭의 R&D 혁신",
      detail:
        "제너럴 일렉트릭(GE)은 R&D에 대한 과감한 투자를 통해 다양한 산업에서 혁신을 주도했습니다. GE의 학자들은 새로운 기술 개발과 시장 트렌드를 분석하여, 이를 바탕으로 혁신적인 제품을 개발했습니다. 이러한 연구 기반의 접근은 GE가 항공, 에너지, 의료 등 다양한 분야에서 경쟁력을 유지하는 데 기여했습니다.",
    },
    {
      content: "사례 2: 파이저의 신약 개발 과정",
      detail:
        "파이저는 의약품 개발에 있어 철저한 연구와 데이터를 기반으로 한 접근을 통해 혁신을 이끌어냈습니다. 파이저의 학자들은 새로운 화합물을 연구하고, 임상 데이터를 분석하여 신약을 개발했습니다. 이러한 데이터 기반의 접근은 파이저가 글로벌 제약 산업에서 선두를 유지하는 데 기여했습니다. 연구와 개발에 대한 학자들의 끊임없는 노력이 신약 개발의 성공을 이끌었습니다.",
    },
  ];

  return (
    <div className="Weakness resultpage">
      <div className="container">
        <Header
          reportname="Personal Behavior Report"
          title="2. 나의 REAL 대표 캐릭터"
        />
        <div className="top-section"></div>
        <div className="bottom-section">
          <SubHeader title="약점 (개발 필요점)" />
          <div className="text-section">
            {weaknesses.map((item) => (
              <div key={item.content} className="strength-item">
                <div className="item-content">▶ {item.content}</div>
                <div className="item-detail">{item.detail}</div>
              </div>
            ))}
          </div>
          <div className="case-example-box">
            <MoreInfoBox title="실제사례" contents={cases} />
          </div>
        </div>
      </div>
      <Bottom pageIndex={0} />
    </div>
  );
}

export default Weakness;
