import "./index.css";

function ButtonItem({ id, type, selectedBtn, handleSelection }) {
  return (
    <button
      className={`${type} ${selectedBtn === id}`}
      onClick={() => {
        handleSelection(id);
      }}
    ></button>
  );
}

export default ButtonItem;
