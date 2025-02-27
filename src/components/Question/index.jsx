import { useEffect, useState } from "react";
import ButtonItem from "./ButtonItem";
import "./index.css";

function Question({
  id,
  content,
  isPos,
  checked,
  setChecked,
  sumChecked,
  setSumChecked,
  state,
  setState,
  scoredata,
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
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (scoredata.length > 0)
      scoredata.map((page) =>
        page.map((item) => {
          if (item.id === id) setScores({ ...item });
        })
      );
  }, []);

  const handleSelection = (buttonId) => {
    if (scoredata.length > 0) return;
    if (!isChecked) {
      setChecked(checked + 1);
      setSumChecked(sumChecked + 1);
    }
    setSelectedBtn(buttonId);
    setIsChecked(true);

    const value = isPos ? buttons.length - buttonId : buttonId + 1;

    setState(
      state.map((page) =>
        page.map((question) => {
          if (id === question.id)
            return {
              ...question,
              value: value,
            };
          else return { ...question };
        })
      )
    );

    const scrollAmount = 14.2 * 16;
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
        <div className={`buttons ${scoredata.length > 0}`}>
          {buttons.map((item, index) => (
            <ButtonItem
              key={index}
              {...item}
              selectedBtn={selectedBtn}
              handleSelection={handleSelection}
              scoredata={scoredata}
              scores={scores}
            />
          ))}
        </div>
        <p className="agree">동의하지 않음</p>
      </div>
    </div>
  );
}

export default Question;
