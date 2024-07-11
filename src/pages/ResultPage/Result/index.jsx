import { useEffect, useState } from "react";
import ResultItem from "./ResultItem";

function Result({ resultData, persona }) {
  const [results, setresults] = useState([]);

  useEffect(() => {
    if (resultData.length > 0)
      setresults(
        resultData.filter((item) => item.persona.split(" ")[0] === persona)
      );
  }, [resultData]);

  return (
    <div>
      {results.map((item, index) => (
        <ResultItem key={index} index={index} result={item} />
      ))}
    </div>
  );
}

export default Result;
