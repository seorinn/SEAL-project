import { useEffect, useState } from "react";
import styled from "styled-components";
import "./index.css";

const Bar = styled.div`
  position: absolute;
  width: ${(props) => props.width}%;
  height: 12px;
  background-color: ${(props) => props.color};
  border-radius: 1rem;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  z-index: 1;
`;

function ProgressBar({ pageIndex, sumChecked, total }) {
  const [progressRate, setProgressRate] = useState(0);
  useEffect(() => {
    setProgressRate(
      Math.round(((pageIndex * 6 + sumChecked) / total) * 100 * 10) / 10
    );
  }, [pageIndex, sumChecked, total]);

  return (
    <div className="ProgressBar">
      <div>{progressRate}%</div>
      <div className="progressbar">
        <div className="background-progress"></div>
        <Bar width={progressRate} color={"black"} />
      </div>
    </div>
  );
}

export default ProgressBar;
