import { useEffect, useState } from "react";
import CoverPage from "../../components/ResultPages/Cover/CoverPage";
import InnerCoverPage from "../../components/ResultPages/Cover/InnerCoverPage";
import Overview from "../../components/ResultPages/Introduction/Overview";
import Character from "../../components/ResultPages/Introduction/Character";
import MainInform from "../../components/ResultPages/MainInform";
import "./index.css";

function ResultForTest() {
  const max = 10;
  const [step, setStep] = useState(0);
  const [scale, setScale] = useState(1);
  // const pages = [CoverPage, Overview, Overview2];

  // const showCurrentPage = () => {
  //   const Page = pages[step];
  //   return <Page />;
  // };
  useEffect(() => console.log(scale), [scale]);
  // const [show, setShow] = useState(false);
  return (
    <div className="ResultForTest">
      {/* <div className={`page-container ${show}`}>
        {step < 10 && showCurrentPage()}
      </div> */}
      {/* {pages.map((Page, index) => (
        <div key={index} className="page-container">
          <Page />
        </div>
      ))} */}
      <div
        className={`page-container`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${scale > 1 ? "top" : "50% 50%"}`,
        }}
      >
        {/* {step < 3 && <CoverPage step={step} />} */}
        {step === 0 && <CoverPage step={step} />}
        {step === 1 && <CoverPage step={step} />}
        {step === 2 && <CoverPage step={step} />}
        {step === 3 && <InnerCoverPage />}
        {step === 4 && <Overview />}
        {step === 5 && <Character />}
        {step === 6 && <MainInform />}
      </div>
      <div className="page-buttons">
        {step > 0 && (
          <button
            className="btn-back"
            onClick={() => {
              setStep(step - 1);
            }}
          >
            ◀
          </button>
        )}
        {step < max && (
          <button className="btn-next" onClick={() => setStep(step + 1)}>
            ▶
          </button>
        )}
      </div>
      <div className="scale-buttons">
        <button
          className="btn-reduce"
          onClick={() => {
            scale > 0.5 && setScale(scale - 0.2);
          }}
        >
          -
        </button>
        <button
          className="btn-zoom"
          onClick={() => {
            scale < 3 && setScale(scale + 0.2);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ResultForTest;
