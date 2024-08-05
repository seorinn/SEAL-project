import "./index.css";

function CoverPage({ step }) {
  return (
    <div className="CoverPage resultpage">
      <div className="logo-container">
        <img alt="logo_SEAL" src={``} />
        {step === 2 ? (
          <p>
            당신이 어디에 있든
            <br />
            함께하는 사람들과 최적의 결과
          </p>
        ) : (
          <p>
            ANYWHERE YOU ARE, <br /> BEYOND EXPECTATION
          </p>
        )}
      </div>
    </div>
  );
}

export default CoverPage;
