import { useState } from "react";
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

  const onSubmit = () => {
    setIsValid(code === input);
    setIsSubmitted(true);
  };

  return (
    <div className="Code">
      <p>코드를 입력해주세요.</p>
      (임시 코드 : {code})
      <input type="password" onChange={handleInput} onKeyDown={handleKeyDown} />
      <button onClick={onSubmit}>제출</button>
      {isSubmitted && !isValid && <>잘못된 코드입니다.</>}
    </div>
  );
}

export default Code;
