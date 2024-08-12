import "./index.css";

function BehaviorItem({ title, contents }) {
  return (
    <div className="BehaviorItem">
      <div
        className="item-header"
        style={{
          backgroundColor: title.includes("선호하는")
            ? "var(--navy700)"
            : "var(--navy400)",
        }}
      >
        {title}
      </div>
      <div className="box">
        {contents.map((item, index) => (
          <div key={index} className="item">
            <div className="item-content">{item.content}</div>
            <div className="item-detail">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BehaviorItem;
