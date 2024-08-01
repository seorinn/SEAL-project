import * as React from "react";
import { useState } from "react";
import { ResponsiveRadar } from "@nivo/radar";

import "./index.css";
function ScoreRadar({ scoreData }) {
  const data = [
    {
      subtype: "subtype1",
      score: 32,
    },
    {
      subtype: "subtype2",
      score: 20,
    },
    {
      subtype: "subtype3",
      score: 35,
    },
    {
      subtype: "subtype4",
      score: 28,
    },
    {
      subtype: "subtype5",
      score: 60,
    },
    {
      subtype: "subtype6",
      score: 38,
    },
    {
      subtype: "subtype7",
      score: 40,
    },
    {
      subtype: "subtype8",
      score: 59,
    },
    {
      subtype: "subtype9",
      score: 60,
    },
    {
      subtype: "subtype10",
      score: 50,
    },
    {
      subtype: "subtype11",
      score: 38,
    },
    {
      subtype: "subtype12",
      score: 40,
    },
  ];
  return (
    <div className="ScoreRadar">
      <div className="radar-container">
        <ResponsiveRadar
          data={data}
          keys={["score"]}
          indexBy="subtype"
          maxValue={70}
          valueFormat=">-.2f"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="catmullRomClosed"
          borderColor={{ from: "color", modifiers: [] }}
          gridLevels={10}
          gridLabelOffset={20}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          dotLabelYOffset={-10}
          enableDotLabel={true}
          colors={{ scheme: "category10" }}
          fillOpacity={0.2}
          motionConfig="wobbly"
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
