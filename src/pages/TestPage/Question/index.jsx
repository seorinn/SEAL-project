import { useState } from "react";
import ButtonItem from "./ButtonItem";
import "./index.css";

function Question({ id, title, checked, setChecked, setState, state }) {
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

    setState(
      state.map((page) =>
        page.map((question) => {
          if (id === question.id)
            return {
              ...question,
              value:
                id === question.id
                  ? buttons.length - buttonId
                  : question.value || 0,
            };
          else return { ...question };
        })
      )
    );

    document.getElementById(`q${id}`).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`Question ${isChecked}`}>
      <div className="title">{title}</div>
      <div className="button-container" id={`q${id}`}>
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
