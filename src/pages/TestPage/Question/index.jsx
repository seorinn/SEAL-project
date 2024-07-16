import { useState } from "react";
import ButtonItem from "./ButtonItem";
import "./index.css";

function Question({
  keyId,
  title,
  isPositive,
  checked,
  setChecked,
  setState,
  state,
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
    }
    setSelectedBtn(buttonId);
    setIsChecked(true);

    const value = isPositive ? buttons.length - buttonId : buttonId + 1;

    setState(
      state.map((page) =>
        page.map((question) => {
          if (keyId === question.keyId)
            return {
              ...question,
              value: keyId === question.keyId ? value : question.value || 0,
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
      <div className="title">{title}</div>
      <div className="button-container" id={`${keyId}`}>
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
