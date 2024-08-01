import { useState } from "react";
import ButtonItem from "./ButtonItem";
import "./index.css";

function Question({
  id,
  content,
  checked,
  setChecked,
  sumChecked,
  setSumChecked,
  state,
  setState,
}) {
  const buttons = [
    { id: 0, type: "agree" },
    { id: 1, type: "agree" },
    { id: 2, type: "none" },
    { id: 3, type: "disagree" },
    { id: 4, type: "disagree" },
  ];
  const [selectedBtn, setSelectedBtn] = useState(-1);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelection = (buttonId) => {
    if (!isChecked) {
      setChecked(checked + 1);
      setSumChecked(sumChecked + 1);
    }
    setSelectedBtn(buttonId);
    setIsChecked(true);

    setState(
      state.map((page) =>
        page.map((question) => {
          if (id === question.id)
            return {
              ...question,
              value: buttons.length - buttonId,
            };
          else return { ...question };
        })
      )
    );

    const scrollAmount = 15 * 16;
    window.scrollTo({
      top: window.pageYOffset + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`Question ${isChecked}`}>
      <div className="title">{content}</div>
      <div className="button-container" id={`${id}`}>
        <p className="agree">동의함</p>
        <div className="buttons">
          {buttons.map((item, index) => (
            <ButtonItem
              key={index}
              {...item}
              selectedBtn={selectedBtn}
              handleSelection={handleSelection}
            />
          ))}
        </div>
        <p className="agree">동의하지 않음</p>
      </div>
    </div>
  );
}

export default Question;
