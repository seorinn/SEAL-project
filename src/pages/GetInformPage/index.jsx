import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Code from "../../components/Code";
import "./index.css";

function GetInformPage({ userInfo, setUserInfo, isUser, setIsUser }) {
  const navigation = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { name, company, affiliation, position, email, phonenumber } =
      userInfo;
    if (
      name &&
      company &&
      affiliation &&
      position &&
      email &&
      phonenumber &&
      isChecked
    )
      navigation("/test");
    else if (!isChecked) alert("개인정보 수집 및 이용에 동의해주세요.");
    else alert("항목을 모두 입력해주세요");
  };

  if (!isUser)
    return (
      <Code
        isValid={isUser}
        setIsValid={setIsUser}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    );
  return (
    <div className="GetInformPage">
      <div className="title">REAL 진단 테스트</div>
      <div className="input-container">
        <div className="informbox">
          <p>참여 과정</p>
          <input value={userInfo.course} disabled />
        </div>
        <div className="informbox">
          <p>이름</p>
          <input
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div className="informbox">
          <p>회사명</p>
          <input
            name="company"
            placeholder="회사명을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div className="informbox">
          <p>소속</p>
          <input
            name="affiliation"
            placeholder="소속을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div className="informbox">
          <p>직급</p>
          <input
            name="position"
            placeholder="직급을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div className="informbox">
          <p>이메일</p>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleInput}
          />
        </div>
        <div className="informbox">
          <p>전화번호</p>
          <input
            type="tel"
            name="phonenumber"
            placeholder="'-' 없이 입력해주세요."
            onChange={handleInput}
          />
        </div>
        <div className="agreement">
          <div className="agree-text">
            <b>개인정보 수집 및 이용 동의</b>
            진단 참여를 위해 개인정보 수집과 이용에 대한 동의가 필요합니다.
            <br />
            • 수집 항목 : 이름, 이메일, 전화번호, 진단결과
            <br />
            • 목적: 진단결과 분석 및 통계처리 (회사,국가,대륙 단위 등)
            <br />
            • 보유 기간: 2년
            <br />
            개인정보 수집에 동의하십니까?
            <br />
          </div>
          <div className="agree-check">
            <input type="checkbox" onChange={() => setIsChecked(!isChecked)} />
            <span>동의함</span>
          </div>
        </div>
      </div>
      <button className="btn-submit" onClick={handleSubmit}>
        진단 시작하기
      </button>
    </div>
  );
}

export default GetInformPage;
