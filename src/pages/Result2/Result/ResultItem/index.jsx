import "./index.css";

function ResultItem({ index, result }) {
  return (
    <div className="ResultItem">
      <div className="title">
        <b>
          {index + 1}. {result.title}
        </b>
      </div>
      <div className="content">{result.content}</div>
    </div>
  );
}

export default ResultItem;
