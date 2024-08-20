import { useEffect, useState } from "react";
import styled from "styled-components";
import "./index.css";

const Bar = styled.div`
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
`;

function ProgressBar({ sumChecked, total }) {
  const [progressRate, setProgressRate] = useState(0);
  useEffect(() => {
    setProgressRate(Math.round((sumChecked / total) * 100 * 10) / 10);
  }, [sumChecked, total]);

  return (
    <div className="ProgressBar">
      <div>{progressRate}%</div>
      <div className="progressbar">
        <div className="background-progress"></div>
        <Bar className="rate" width={progressRate} color={"black"} />
      </div>
    </div>
  );
}

export default ProgressBar;
