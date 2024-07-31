import { useState } from "react";
import "./index.css";
import { getCourseList } from "../../util";

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
    if (code) {
      setIsValid(code === input);
    } else {
      const courseList = getCourseList();
      (await courseList).map((item) => {
        if (item.code === input) {
          setUserInfo({ ...userInfo, course: item.name });
          setIsValid(true);
          return;
        }
      });
    }
    setIsSubmitted(true);
  };

  return (
    <div className="Code">
      <p>코드를 입력해주세요.</p>
      {code && `(임시 코드 : ${code})`}
      <input type="password" onChange={handleInput} onKeyDown={handleKeyDown} />
      <button onClick={onSubmit}>제출</button>
      {isSubmitted && !isValid && <>잘못된 코드입니다.</>}
    </div>
  );
}

export default Code;
