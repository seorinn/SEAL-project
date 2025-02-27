import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie } from "../../util";
import Code from "../../components/Code";
import "./index.css";

function GetInformPage() {
  const userInfo = getCookie("userinfo");
  const navigation = useNavigate();

  const [isUser, setIsUser] = useState(false);
  const [userInput, setUserInput] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: name === "email" ? value.replace(/_/g, `&`) : value,
    });
  };

  const handleSubmit = () => {
    let { name, company, affiliation, position, email, phonenumber } =
      userInput;
    if (!email || email == "") email = "null";
    if (!phonenumber || phonenumber == "") phonenumber = "null";

    if (!(name && company && affiliation && position)) {
      alert("항목을 모두 입력해주세요");
      return;
    } else if (!isChecked) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    if (
      [name, company, affiliation, position, phonenumber]
        .join(" ")
        .includes("_")
    )
      alert("이메일 외 항목에 사용 불가능한 문자( _ )가 포함되어 있습니다.");
    else if (
      [name, company, affiliation, position, email, phonenumber]
        .join(" ")
        .includes("/")
    )
      alert("사용 불가능한 문자( / )가 포함되어 있습니다.");
    else if (
      phonenumber !== "null" &&
      (!phonenumber.startsWith("010") || phonenumber.length !== 11)
    )
      alert("잘못된 전화번호입니다.");
    else if (email !== "null" && (!email.includes("@") || !email.includes(".")))
      alert("잘못된 형식의 이메일입니다.");
    else {
      setCookie("isadmin", false);
      setCookie(`userinfo`, {
        ...getCookie("userinfo"),
        name: name,
        company: company,
        affiliation: affiliation,
        position: position,
        email: email,
        phonenumber: phonenumber,
      });
      setCookie("statistic", false);
      navigation("/test");
    }
  };

  if (!isUser || !userInfo)
    return <Code isValid={isUser} setIsValid={setIsUser} />;
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
          <p>이메일(선택)</p>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleInput}
          />
        </div>
        <div className="informbox">
          <p>전화번호(선택)</p>
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
