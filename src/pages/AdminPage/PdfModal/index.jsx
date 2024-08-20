import React, { useContext } from "react";
import { UserStateContext } from "../../../App";

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

const PdfModal = () => {
  const userData = useContext(UserStateContext);

  if (!userData) return;
  return (
    <div className="PdfModal pdfPage">
      <CoverPage />
      <RootInfo />
      <Introduction />
      <Overview />
      <Character />
      <ReportCover />
      <Summary keywordData={userData.dataMain.keywords} />
      <BarPage />
      <KeywordPage data={userData.dataMain.keywords} />
      <WorkingStyle data={userData.dataMain.strength} />
      <Weak data={userData.dataMain.weakness} />
      <Justifying data={userData.dataMain.work_style} />
      <Motivation data={userData.dataMain.motivation} />
      <Changes data={userData.dataMain.changes} />
      <Stress data={userData.dataMain.stress} />
      <Cowork data={userData.dataMain.cowork} />
      <SubTable />
      <Strength data={userData.dataSub.strength} />
      <Weakness data={userData.dataSub.weakness} />
      <Behavior data={userData.dataSub.behavior} />
      <ScoreGraph />
      <TextPage />
      <SheetPage />
    </div>
  );
};

export default PdfModal;
