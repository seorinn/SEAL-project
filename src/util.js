import { questiondata } from "./datas/question-data";
import { resultdata } from "./datas/result-data";

export const QuestionList = () => {
  let array1 = [];
  let array2 = [];
  questiondata.map((item) => {
    const typeName = item[0];
    const types = item.slice(1);
    types.map((item) => {
      const personaName = item[0];
      const personas = item.slice(1);
      personas.map((item) => {
        const array = {
          type: typeName,
          persona: personaName,
          id: item[0],
          keyId: item[1],
          title: item[2],
        };
        if (
          array1.length > 1 &&
          array.persona !== array1[array1.length - 2].persona
        ) {
          array2.push(array1);
          array1 = [];
        }
        array1.push(array);
        if (array.id === 100) array2.push(array1);
      });
    });
  });
  return array2;
};

export const ResultList = (persona) => {
  let data = [];
  resultdata.map((item) => {
    if (persona === item[0]) {
      data = item.slice(1);
    }
  });
  return data;
};

//for test
export const QuestionList5 = () => [
  [
    {
      id: 1,
      keyId: "adcx",
      type: "Loyal Stabilizer",
      persona: "Supporter",
      title: "나는 다른 사람들과의 관계를 중요하게 생각한다.",
    },
    {
      id: 2,
      keyId: "adqe",
      type: "Loyal Stabilizer",
      persona: "",
      title: "나는 팀의 분위기를 조성하는 데 기여한다.",
    },
    {
      id: 3,
      keyId: "adeqwtw",
      type: "Loyal Stabilizer",
      persona: "Supporter",
      title:
        "나는 다른 사람들의 감정을 이해하고 공감하는 것이 중요하다고 생각한다.",
    },
  ],
  [
    {
      id: 4,
      keyId: "adfa",
      type: "Strategic Thinker",
      persona: "Critic",
      title: "나는 팀의 협력을 촉진하기 위해 노력한다.",
    },
    {
      id: 5,
      keyId: "aasdad",
      type: "Strategic Thinker",
      persona: "Critic",
      title: "나는 다양한 의견을 조율하여 결정을 내린다.",
    },
  ],
];
