import TypeItem from "./TypeItem";
import "./index.css";

function CircleGraph() {
  const types = [
    {
      name: "Smart Planner",
      content: "content1",
      subtypes: ["subtype1", "subtype2", "subtype3"],
    },
    {
      name: "Empathetic Connector",
      content: "content2",
      subtypes: ["subtype1", "subtype2", "subtype3"],
    },
    {
      name: "Active Achiever",
      content: "content3",
      subtypes: ["subtype1", "subtype2", "subtype3"],
    },
    {
      name: "Loyal Supporter",
      content: "content4",
      subtypes: ["subtype1", "subtype2", "subtype3"],
    },
  ];
  return (
    <div className="CircleGraph">
      <div className="circle-container">
        {types.map((item, index) => (
          <TypeItem key={item.name} index={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default CircleGraph;
