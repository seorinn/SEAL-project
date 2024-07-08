import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";

function GetInformPage({ userInfo, setUserInfo }) {
  const navigation = useNavigate();
  const [isSended, setIsSended] = useState(false);
  const [submitCode, setSubmitCode] = useState(false);
  const [isCorrectCode, setIsCorrectCode] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { name, affiliation, position, phonenumber } = userInfo;
    if (name && affiliation && position && phonenumber && isCorrectCode) {
      navigation("/test");
    } else {
      alert("항목을 입력해주세요");
    }
  };

  return (
    <div className="GetInformPage">
      <h2>SEAL 진단 테스트</h2>
      <div className="input-container">
        <div>
          <p>이름</p>
          <input
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>소속</p>
          <input
            name="affiliation"
            placeholder="소속을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>직급</p>
          <input
            name="position"
            placeholder="직급을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>전화번호</p>
          <div className="inputAndButton">
            <input
              name="phonenumber"
              placeholder="전화번호를 입력해주세요"
              onChange={handleInput}
            />
            <button
              onClick={() => {
                if (userInfo.phonenumber) setIsSended(true);
              }}
            >
              {isSended ? "인증번호 재요청" : "인증번호 요청"}
            </button>
          </div>
          {isSended && <span>인증번호가 발송되었습니다.</span>}
        </div>
        <div>
          <p>인증번호 확인</p>
          <div className="inputAndButton">
            <input
              name="code"
              placeholder="인증번호를 입력해주세요"
              // onChange={handleInput}
            />
            <button
              onClick={() => {
                if (isSended) setSubmitCode(true);
              }}
            >
              인증번호 확인
            </button>
          </div>
          {isSended && submitCode && !isCorrectCode && (
            <span className="wrong-code">인증번호가 일치하지 않습니다.</span>
          )}
        </div>
      </div>
      <button className="btn-submit" onClick={handleSubmit}>
        진단 시작하기
      </button>
    </div>
  );
}

export default GetInformPage;
