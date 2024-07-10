import { resultdata } from "./datas/result-data";

export const ResultList = (persona) => {
  let data = [];
  resultdata.map((item) => {
    if (persona === item[0]) {
      data = item.slice(1);
    }
  });
  return data;
};
