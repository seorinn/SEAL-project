import { useState } from "react";
import "./index.css";

function MultipleChoices({
  id,
  content,
  answers,
  checked,
  setChecked,
  state,
  setState,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSelection = (index, selectedAnswer) => {
    if (!isChecked) {
      setChecked(checked + 1);
    }
    setSelectedIndex(index);
    setIsChecked(true);
    setState(
      state.map((page) =>
        page.map((question) => {
          if (question.id === id)
            return { ...question, answer: selectedAnswer };
          else return { ...question };
        })
      )
    );
  };

  return (
    <div className="MultipleChoices">
      <div className="question">{content}</div>
      <div className="button-container">
        {answers.map((item, index) => (
          <button
            key={item.id}
            className={`btn_answer ${index === selectedIndex}`}
            onClick={() => handleSelection(index, item.answer)}
          >
            {item.content}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoices;
