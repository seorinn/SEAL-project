import React from "react";

import CoverPage from "../../../components/ResultPages/CoverPage";
import RootInfo from "../../../components/ResultPages/Introduction/RootInfo";
import Introduction from "../../../components/ResultPages/Introduction/Introduction";
import Overview from "../../../components/ResultPages/Introduction/Overview";
import Character from "../../../components/ResultPages/Introduction/Character";
import ReportCover from "../../../components/ResultPages/MainType/ReportCover";
import Summary from "../../../components/ResultPages/Summary";
import BarPage from "../../../components/ResultPages/MainType/BarPage";
import KeywordPage from "../../../components/ResultPages/MainType/KeywordPage";
import WorkingStyle from "../../../components/ResultPages/MainType/WorkingStyle";
import Weak from "../../../components/ResultPages/MainType/Weakness";
import Justifying from "../../../components/ResultPages/MainType/Justifying";
import Motivation from "../../../components/ResultPages/MainType/Motivation";
import Changes from "../../../components/ResultPages/MainType/Changes";
import Stress from "../../../components/ResultPages/MainType/Stress";
import Cowork from "../../../components/ResultPages/MainType/Cowork";
import SubTable from "../../../components/ResultPages/SubCharacter/SubTable";
import Strength from "../../../components/ResultPages/SubCharacter/Strength";
import Weakness from "../../../components/ResultPages/SubCharacter/Weakness";
import Behavior from "../../../components/ResultPages/SubCharacter/Behavior";
import ScoreGraph from "../../../components/ResultPages/SubCharacter/ScoreGraph";
import TextPage from "../../../components/ResultPages/AfterTest/TextPage";
import SheetPage from "../../../components/ResultPages/AfterTest/SheetPage";

const PdfModal = ({ dataMain, dataSub }) => {
  if (!dataMain || !dataSub) return;
  return (
    <div className="PdfModal pdfPage">
      <CoverPage />
      <RootInfo />
      <Introduction />
      <Overview />
      <Character />
      <ReportCover />
      <Summary keywordData={dataMain.keywords} />
      <BarPage />
      <KeywordPage data={dataMain.keywords} />
      <WorkingStyle data={dataMain.strength} />
      <Weak data={dataMain.weakness} />
      <Justifying data={dataMain.work_style} />
      <Motivation data={dataMain.motivation} />
      <Changes data={dataMain.changes} />
      <Stress data={dataMain.stress} />
      <Cowork data={dataMain.cowork} />
      <SubTable />
      <Strength data={dataSub.strength} />
      <Weakness data={dataSub.weakness} />
      <Behavior data={dataSub.behavior} />
      <ScoreGraph />
      <TextPage />
      <SheetPage />
    </div>
  );
};

export default PdfModal;
