import { useState } from "react";
import "./index.css";

function Search({ setKeyword, isDetail }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit();
  };
  const onSubmit = () => {
    setKeyword(input);
  };

  return (
    <div className={`Search${isDetail ? "_detail" : ""}`}>
      <input
        placeholder={isDetail ? "결과 내 재검색" : "검색어를 입력하세요."}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}

export default Search;
