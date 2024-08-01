// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
import "./index.css";
import Code from "../../components/Code";

// const getPhoneNumberFromUserInput = (phonenumber) => {
//   return `+82${phonenumber.slice(1)}`;
// };

// const auth = getAuth();

function GetInformPage({ userInfo, setUserInfo, isUser, setIsUser }) {
  const navigation = useNavigate();
  // const [isValidPhone, setIsValidPhone] = useState();
  // const [isValidCode, setIsValidCode] = useState();
  // const [isSended, setIsSended] = useState(false);
  // const [submitCode, setSubmitCode] = useState(false);
  // const [code, setCode] = useState("");
  // const [isChecked, setIsChecked] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    // if (name === "code") setCode(value);
    // else
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // const handleSendCode = () => {
  //   const phoneRegex = /^010\d{8}$/;
  //   setIsValidPhone(phoneRegex.test(userInfo.phonenumber));
  //   if (!userInfo.phonenumber || !phoneRegex.test(userInfo.phonenumber)) return;
  //   setIsSended(true);
  //   window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
  //     size: "invisible",
  //     callback: (response) => {},
  //   });
  //   auth.languageCode = "ko";
  //   const phonenumber = getPhoneNumberFromUserInput(userInfo.phonenumber);
  //   const appVerifier = window.recaptchaVerifier;
  //   signInWithPhoneNumber(auth, phonenumber, appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //     })
  //     .catch((error) => {
  //       setIsSended(false);
  //       firebaseError(error);
  //       console.log(error);
  //     });
  // };

  // const handleCheckCode = () => {
  //   setIsValidCode(code.length === 6);
  //   if (!isSended || !(code.length === 6)) return;
  //   setSubmitCode(true);
  //   window.confirmationResult
  //     .confirm(code)
  //     .then((result) => {
  //       setIsChecked(true);
  //       setUserInfo({
  //         ...userInfo,
  //         isChecked: true,
  //       });
  //     })
  //     .catch((error) => {
  //       setIsChecked(false);
  //       firebaseError(error);
  //       console.log(error);
  //     });
  // };

  // const firebaseError = (error) => {
  //   if (error.code === "auth/invalid-verification-code") {
  //     alert("인증번호가 유효하지 않습니다.");
  //   } else if (error.code === "auth/session-expired") {
  //     alert("인증번호가 만료되었습니다.");
  //   } else if (error.code === "auth/too-many-requests") {
  //     alert("잠시 후 다시 시도해 주세요.");
  //   } else {
  //     alert(error);
  //   }
  // };

  const handleSubmit = () => {
    const { name, company, affiliation, position, phonenumber, isChecked } =
      userInfo;
    if (
      name &&
      company &&
      affiliation &&
      position &&
      phonenumber
      // && isChecked
    )
      navigation("/test");
    // else if (!isChecked) alert("전화번호 인증을 완료해주세요.");
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
      <h2>SEAL 진단 테스트</h2>
      <div className="input-container">
        <div>
          <p>참여 과정</p>
          <input value={userInfo.course} disabled />
        </div>
        <div>
          <p>이름</p>
          <input
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>회사명</p>
          <input
            name="company"
            placeholder="회사명을 입력해주세요"
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
          {/* <div className="inputAndButton"> */}
          <input
            type="tel"
            name="phonenumber"
            placeholder="'-' 없이 입력해주세요."
            onChange={handleInput}
          />
          {/* <button
              className={`${isSended}`}
              onClick={!isSended ? handleSendCode : null}
            >
              인증 요청
            </button>
          </div> */}
          {/* {isSended && <span>인증번호가 발송되었습니다.</span>}
          {isValidPhone === false && (
            <span className="wrong">잘못된 형식의 전화번호입니다.</span>
          )} */}
        </div>
        {/* <div>
          <p>인증번호 확인</p>
          <div className="inputAndButton">
            <input
              name="code"
              placeholder="인증번호 6자리를 입력해주세요."
              onChange={handleInput}
            />
            <button
              className={`${!isSended || submitCode}`}
              onClick={!(!isSended || submitCode) ? handleCheckCode : null}
            >
              인증번호 확인
            </button>
          </div>
          <div id="sign-in-button"></div>
          {isSended && submitCode && isChecked === null && (
            <span>확인중입니다...</span>
          )}
          {isSended && submitCode && isChecked === true && (
            <span>인증되었습니다.</span>
          )}
          {isSended && submitCode && isChecked === false && (
            <span className="wrong">인증번호가 일치하지 않습니다.</span>
          )}
          {isValidCode === false && (
            <span className="wrong">6자리의 인증번호를 입력해주세요.</span>
          )}
          <div id="recaptcha-container"></div>
        </div> */}
      </div>
      <button className="btn-submit" onClick={handleSubmit}>
        진단 시작하기
      </button>
    </div>
  );
}

export default GetInformPage;
