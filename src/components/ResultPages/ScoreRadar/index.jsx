import * as React from "react";
import { ResponsiveRadar } from "@nivo/radar";

import "./index.css";
function ScoreRadar({ scoreData, subType }) {
  const data = scoreData.map((item) => ({
    subtype: Object.keys(item)[0],
    score:
      (Object.values(item)[0] * 14.5) / 11 +
      (Object.keys(item)[0] === subType ? 0.5 : 0),
  }));

  return (
    <div className="ScoreRadar">
      <div className="radar-container">
        <ResponsiveRadar
          data={data}
          keys={["score"]}
          indexBy="subtype"
          maxValue={15}
          valueFormat=">-.2f"
          margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderColor={{ from: "color", modifiers: [] }}
          gridLevels={3}
          gridLabelOffset={20}
          dotSize={0}
          dotLabelYOffset={-10}
          colors={{ scheme: "category10" }}
          fillOpacity={0.2}
        />
      </div>
      <div className="background">
        <div className="circle-container">
          <div className="quarter top-left"></div>
          <div className="quarter top-right"></div>
          <div className="quarter bottom-left"></div>
          <div className="quarter bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

export default ScoreRadar;
