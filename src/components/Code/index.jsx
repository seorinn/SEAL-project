import { useState } from "react";
import { getCourseList } from "../../util";
import logo_REAL from "../../assets/images/logo_REAL.png";
import "./index.css";

function Code({ code, isValid, setIsValid, userInfo, setUserInfo }) {
  const [input, setInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  const onSubmit = async () => {
    // if (code) {
    //   setIsValid(code === input);
    // } else {
    // const courseList = getCourseList();
    // (await courseList).map((item) => {
    //   if (item.code === input) {
    //     setUserInfo({ ...userInfo, course: item.name });
    //     setIsValid(true);
    //     return;
    //   }
    // });
    // }

    setUserInfo({ ...userInfo, course: input });
    setIsValid(true);

    setIsSubmitted(true);
  };

  return (
    <div className="Code">
      <div className="logo-background" />
      <img className="logo" alt="logo_REAL" src={logo_REAL} />
      <p>{code && "관리자"} 코드를 입력해주세요.</p>
      <input
        type={code ? "password" : ""}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      {isSubmitted && !isValid && (
        <div className="wrong-code">잘못된 코드입니다.</div>
      )}
      <button onClick={onSubmit}>제출</button>
      {/* <img className="texture" alt="" src={texture} /> */}
    </div>
  );
}

export default Code;
