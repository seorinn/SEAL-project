import { useState } from "react";
import "./index.css";

function MultipleChoices({
  id,
  content,
  answers,
  checked,
  setChecked,
  sumChecked,
  setSumChecked,
  state,
  setState,
}) {
  const [selectedItem, setSelectedItem] = useState(-1);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelection = (index, item) => {
    if (!isChecked) {
      setChecked(checked + 1);
      setSumChecked(sumChecked + 1);
    }
    setSelectedItem(index);
    setIsChecked(true);

    setState(
      state.map((page) =>
        page.map((question) => {
          if (id === question.id)
            return {
              ...question,
              type: item.type,
              tier: item.tier,
              priority: item.priority,
            };
          else return { ...question };
        })
      )
    );
  };

  return (
    <div className={`MultipleChoices ${isChecked}`}>
      <div className="title">{content}</div>
      <div className="button-container">
        {answers.map((item, index) => (
          <button
            key={item.id}
            className={`btn_answer ${selectedItem === index}`}
            onClick={() => handleSelection(index, item)}
          >
            {item.content}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoices;
