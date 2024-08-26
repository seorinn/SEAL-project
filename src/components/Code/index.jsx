import { useState } from "react";
import { getCourseList, setCookie } from "../../util";
import logo_REAL from "../../assets/images/logo_REAL.png";
import "./index.css";

function Code({ code, isValid, setIsValid }) {
  const [input, setInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  const onSubmit = async () => {
    if (code) {
      if (code === input) {
        setCookie("isadmin", true);
        setIsValid(true);
      }
    } else {
      const courseList = getCourseList();
      (await courseList).map((item) => {
        if (item.code === input.toUpperCase()) {
          setCookie("userinfo", { course: item.name });
          setIsValid(true);
          return;
        }
      });
    }

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
    </div>
  );
}

export default Code;
