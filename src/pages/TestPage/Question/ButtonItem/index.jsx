import "./index.css";

function ButtonItem({
  id,
  type,
  selectedBtn,
  handleSelection,
  scoredata,
  scores,
}) {
  const keys = [0, 1, 2, 3, 4];

  const sum = keys.reduce(
    (accumulator, key) => accumulator + (scores[key] || 0),
    0
  );

  return (
    <div className={`ButtonItem ${scores.id !== undefined}`}>
      <button
        className={`${type} ${selectedBtn === id}`}
        onClick={() => {
          handleSelection(id);
        }}
        style={
          scores.id !== undefined
            ? {
                backgroundColor: "var(--navy700)",
                opacity: `${scores[4 - id] / sum + 0.1}`,
              }
            : {}
        }
      ></button>
      {scoredata.length > 0 && (
        <span style={{ fontSize: "0.875rem" }}>
          {scores[4 - id]} / {sum} (
          {Math.round((scores[4 - id] / sum) * 100 * 10) / 10}%)
        </span>
      )}
    </div>
  );
}

export default ButtonItem;
