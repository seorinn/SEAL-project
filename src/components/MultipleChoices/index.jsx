import { useState, useEffect } from "react";
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
  scoredata,
}) {
  const [selectedItem, setSelectedItem] = useState(-1);
  const [isChecked, setIsChecked] = useState(false);
  const [scores, setScores] = useState([]);
  const keys = [0, 1, 2, 3, 4];

  useEffect(() => {
    if (scoredata.length > 0)
      scoredata.map((page) =>
        page.map((item) => {
          if (item.id === id) setScores({ ...item });
        })
      );
  }, []);

  const handleSelection = (index, item) => {
    if (scoredata.length > 0) return;
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
              answerId: item.id,
            };
          else return { ...question };
        })
      )
    );
    const scrollAmount = 24 * 16;
    window.scrollTo({
      top: window.pageYOffset + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`MultipleChoices ${isChecked}`}>
      <div className="title">{content}</div>
      <div
        className="button-container"
        style={{ height: `${4.37 * answers.length}rem` }}
      >
        {answers.map((item, index) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
            {scoredata.length > 0 && (
              <div className="count-text">
                {scores[index]} /
                {keys.reduce(
                  (accumulator, key) => accumulator + (scores[key] || 0),
                  0
                )}
              </div>
            )}
            <button
              className={`btn_answer ${selectedItem === index}`}
              onClick={() => handleSelection(index, item)}
              style={
                scores.id !== undefined
                  ? {
                      backgroundColor: "var(--navy700)",
                      color: "white",
                      opacity: `${
                        scores[index] /
                          keys.reduce(
                            (accumulator, key) =>
                              accumulator + (scores[key] || 0),
                            0
                          ) +
                        0.1
                      }`,
                    }
                  : {}
              }
            >
              {item.content}
            </button>
            {scoredata.length > 0 && (
              <div className="percentage">
                {Math.round(
                  (scores[index] /
                    keys.reduce(
                      (accumulator, key) => accumulator + (scores[key] || 0),
                      0
                    )) *
                    100 *
                    10
                ) / 10}
                %
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoices;
