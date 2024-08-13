import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "./firebase-config";
import * as XLSX from "xlsx";

import icon_facilitator from "../src/assets/icons/icon_facilitator.png";
import icon_advisor from "../src/assets/icons/icon_advisor.png";
import icon_mediator from "../src/assets/icons/icon_mediator.png";
import icon_visionary from "../src/assets/icons/icon_visionary.png";
import icon_innovator from "../src/assets/icons/icon_innovator.png";
import icon_adventurer from "../src/assets/icons/icon_adventurer.png";
import icon_analyst from "../src/assets/icons/icon_analyst.png";
import icon_strategist from "../src/assets/icons/icon_strategist.png";
import icon_evaluator from "../src/assets/icons/icon_evaluator.png";
import icon_planner from "../src/assets/icons/icon_planner.png";
import icon_scholar from "../src/assets/icons/icon_scholar.png";
import icon_guardian from "../src/assets/icons/icon_guardian.png";
import icon_facilitator_white from "../src/assets/icons/icon_facilitator_white.png";
import icon_advisor_white from "../src/assets/icons/icon_advisor_white.png";
import icon_mediator_white from "../src/assets/icons/icon_mediator_white.png";
import icon_visionary_white from "../src/assets/icons/icon_visionary_white.png";
import icon_innovator_white from "../src/assets/icons/icon_innovator_white.png";
import icon_adventurer_white from "../src/assets/icons/icon_adventurer_white.png";
import icon_analyst_white from "../src/assets/icons/icon_analyst_white.png";
import icon_strategist_white from "../src/assets/icons/icon_strategist_white.png";
import icon_evaluator_white from "../src/assets/icons/icon_evaluator_white.png";
import icon_planner_white from "../src/assets/icons/icon_planner_white.png";
import icon_scholar_white from "../src/assets/icons/icon_scholar_white.png";
import icon_guardian_white from "../src/assets/icons/icon_guardian_white.png";
import icon_r from "../src/assets/icons/icon_rational.png";
import icon_e from "../src/assets/icons/icon_empathetic.png";
import icon_a from "../src/assets/icons/icon_action.png";
import icon_l from "../src/assets/icons/icon_loyal.png";
import icon_r_white from "../src/assets/icons/icon_rational_white.png";
import icon_e_white from "../src/assets/icons/icon_empathetic_white.png";
import icon_a_white from "../src/assets/icons/icon_action_white.png";
import icon_l_white from "../src/assets/icons/icon_loyal_white.png";

// const storage = getStorage();
// export const getUserList = async () => {
//   const listRef = ref(storage, "userdata/pdfs/");
//   let userlist = [];

//   await listAll(listRef)
//     .then((res) => {
//       res.prefixes.forEach((folderRef) => {});
//       res.items.forEach((itemRef) => {
//         const [
//           company,
//           affiliation,
//           position,
//           name,
//           phonenumber,
//           course,
//           mainType,
//           subType,
//         ] = itemRef._location.path_.split("/")[2].split(".")[0].split("_");
//         userlist.push({
//           isChecked: false,
//           company,
//           affiliation,
//           position,
//           name,
//           phonenumber,
//           course,
//           mainType,
//           subType,
//         });
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return userlist;
// };

// export const getCourseList = async () => {
//   const storage = getStorage();
//   const listRef = ref(storage, "courses/");
//   let courselist = [];

//   await listAll(listRef)
//     .then((res) => {
//       res.prefixes.forEach((folderRef) => {});
//       res.items.forEach((itemRef) => {
//         const [name, code] = itemRef._location.path_
//           .split("/")[1]
//           .split(".")[0]
//           .split("_");
//         courselist.push({
//           name,
//           code,
//         });
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return courselist;
// };

export const fetchData = async (filename) => {
  try {
    const response = await fetch(filename);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    let array = [];
    for (var i = 0; i < workbook.SheetNames.length; i++) {
      const worksheet = workbook.Sheets[workbook.SheetNames[i]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      if (workbook.SheetNames.length === 1) return jsonData;
      else array.push(jsonData);
    }
    return array;
  } catch (error) {
    console.log(error);
  }
};

// export const getStoragePath = (body) => {
//   return `userdata/pdfs/${body.company}_${body.affiliation}_${body.position}_${body.name}_${body.phonenumber}_${body.course}_${body.mainType}_${body.subType}.pdf`;
// };

// export const getStorageCoursePath = (body) => {
//   return `courses/${body.name}_${body.code}`;
// };

// export const getFileName = (name) => {
//   return `SEAL 진단 결과지_${name}.pdf`;
// };

// export const getLogoImage = async (coursename) => {
//   const courseList = getCourseList();
//   let imageUrl = "";
//   (await courseList).map((item) => {
//     if (item.name === coursename) imageUrl = getStorageCoursePath(item);
//   });

//   const pathReference = ref(storage, imageUrl);
//   try {
//     const url = await getDownloadURL(pathReference);
//     const response = await fetch(url);
//     const blob = await response.blob();

//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);

//     return link.href;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fourTypes = [
  {
    adj: "스마트한",
    img: "",
    name: "분석형",
    nameEng: "Rational Analyst",
    intro: "체계적이고 논리적인 사고를 중시하는 유형",
    content:
      "분석형은 데이터를 기반으로 한 논리적 사고와 체계적인 접근을 통해 문제를 해결합니다. 이 유형의 사람들은 사실과 증거를 중시하며, 결정을 내리기 전에 철저히 분석하는 경향이 있습니다.",
  },
  {
    adj: "친근한",
    img: "",
    name: "관계형",
    nameEng: "Empathetic Communicator",
    intro: "사람들과의 관계와 소통을 중시하는 유형",
    content:
      "관계형은 다른 사람들과의 관계를 중요시하며, 효과적인 소통을 통해 팀워크를 촉진합니다. 이 유형의 사람들은 타인의 감정을 잘 이해하고, 이를 바탕으로 원활한 협력을 이끌어내는 데 능숙합니다.",
  },
  {
    adj: "열정적인",
    img: "",
    name: "도전형",
    nameEng: "Action-Oriented Achiever",
    intro: "목표 지향적이고 도전을 즐기는 유형",
    content:
      "도전형은 목표를 설정하고 이를 달성하기 위해 적극적으로 행동합니다. 이 유형의 사람들은 도전을 즐기며, 목표 달성을 위해 필요한 모든 모력을 기울입니다.",
  },
  {
    adj: "믿음직한",
    img: "",
    name: "안정형",
    nameEng: "Loyal Stabilizer",
    intro: "안정성과 예측 가능성을 중시하는 유형",
    content:
      "안정형은 조직 내에서 안정성과 일관성을 유지하는 데 주력합니다. 이 유형의 사람들은 신뢰할 수 있으며, 예측 가능한 행동을 통해 팀의 안정성을 높입니다.",
  },
];

export const twelveChar = [
  { adj: "CheerUp,", name: "촉진자", nameEng: "Facilitator" },
  { adj: "따뜻한", name: "상담가", nameEng: "Advisor" },
  { adj: "따뜻한", name: "중재자", nameEng: "Mediator" },
  { adj: "미래를 보는", name: "비전가", nameEng: "Visionary" },
  { adj: "아이디어 뱅크,", name: "발명가", nameEng: "Innovator" },
  { adj: "추진력 좋은", name: "모험가", nameEng: "Adventurer" },
  { adj: "냉철한", name: "분석가", nameEng: "Analyst" },
  { adj: "치밀한", name: "전략가", nameEng: "Strategist" },
  { adj: "논리적인", name: "비평가", nameEng: "Evaluator" },
  { adj: "빈틈없는", name: "설계자", nameEng: "Planner" },
  { adj: "지식의 보고,", name: "학자", nameEng: "Scholor" },
  { adj: "든든한", name: "수호자", nameEng: "Guardian" },
];

export const getCoworkData = (mainType) => {
  let array = [];
  if (mainType === "안정형")
    array = [
      {
        name: "분석형 (Rational Analyst)",
        intro: "체계적이고 논리적인 사고를 중시하는 유형",
        content_cowork_title_1: "명확한 데이터와 사실 기반 접근",
        content_cowork_content_1:
          "분석형은 데이터를 중시하며, 감정보다는 사실과 논리에 기반한 결정을 선호합니다. 주관적인 의견보다는 객관적 데이터를 바탕으로 의사소통해야 합니다.",
        content_cowork_title_2: "효율적이고 체계적인 계획 ",
        content_cowork_content_2:
          "체계적이고 계획적인 업무 방식을 선호합니다. 안정형은 명확한 일정과 계획을 제시하고 이를 준수하려는 노력이 필요합니다.",
      },
      {
        name: "관계형 (Empathetic Communicator)",
        intro: "사람들과의 관계와 소통을 중시하는 유형",
        content_cowork_title_1: "감정적 지지와 공감",
        content_cowork_content_1:
          "관계형은 사람 중심의 접근을 선호하며, 감정적 지지와 공감을 중시합니다. 안정형은 관계형의 감정을 이해하고, 이를 지지하는 태도를 보일 필요가 있습니다.",
        content_cowork_title_2: "개인적 관심과 배려",
        content_cowork_content_2:
          "관계형은 개인적 관심과 배려를 중요시합니다. 안정형은 관계형의 개인적인 필요와 관심사를 이해하고, 이를 배려하는 태도를 보여야 합니다.",
      },
      {
        name: "도전형 (Action-Oriented Achiever)",
        intro: "목표 지향적이고 도전을 즐기는 유형",
        content_cowork_title_1: "목표와 속도에 대한 조율",
        content_cowork_content_1:
          "도전형은 목표 지향적이고 빠른 속도로 일하는 것을 선호합니다. 반면, 안정형은 안정적이고 일관된 속도로 일하는 것을 선호합니다. 두 유형 간의 속도 차이를 조율하는 것이 중요합니다.",
        content_cowork_title_2: "리스크 관리",
        content_cowork_content_2:
          "도전형은 리스크를 감수하는 것을 두려워하지 않지만, 안정형은 리스크 관리에 중점을 둡니다. 리스크 관리에 대한 상호 이해와 조율이 필요합니다",
      },
      {
        name: "안정형 (Loyal Stabilizer)",
        intro: "안정성과 예측 가능성을 중시하는 유형",
        content_cowork_title_1: "의사결정의 신속성",
        content_cowork_content_1:
          "안정형은 신중한 의사결정을 선호하며, 이로 인해 의사결정이 지연될 수 있습니다. 두 명의 안정형이 함께 일할 때 신속한 의사결정이 어려울 수 있습니다.",
        content_cowork_title_2: "업무 분담과 효율성",
        content_cowork_content_2:
          "안정형은 체계적인 업무 분담을 선호합니다. 두 명의 안정형이 함께 일할 때 업무 분담과 효율성을 높이는 것이 중요합니다.",
      },
    ];
  return array;
};

export const formattedDate = `${new Date().getFullYear()}.${String(
  new Date().getMonth() + 1
).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`;

export const getIconImage = (typename, isWhite) => {
  switch (typename) {
    case "분석형":
      return isWhite ? icon_r_white : icon_r;
    case "관계형":
      return isWhite ? icon_a_white : icon_e;
    case "도전형":
      return isWhite ? icon_e_white : icon_a;
    case "안정형":
      return isWhite ? icon_l_white : icon_l;
    case "촉진자":
      return isWhite ? icon_facilitator_white : icon_facilitator;
    case "상담가":
      return isWhite ? icon_advisor_white : icon_advisor;
    case "중재자":
      return isWhite ? icon_mediator_white : icon_mediator;
    case "비전가":
      return isWhite ? icon_visionary_white : icon_visionary;
    case "발명가":
      return isWhite ? icon_innovator_white : icon_innovator;
    case "모험가":
      return isWhite ? icon_adventurer_white : icon_adventurer;
    case "분석가":
      return isWhite ? icon_analyst_white : icon_analyst;
    case "전략가":
      return isWhite ? icon_strategist_white : icon_strategist;
    case "비평가":
      return isWhite ? icon_evaluator_white : icon_evaluator;
    case "설계자":
      return isWhite ? icon_planner_white : icon_planner;
    case "학자":
      return isWhite ? icon_scholar_white : icon_scholar;
    case "수호자":
      return isWhite ? icon_guardian_white : icon_guardian;
    default:
      return;
  }
};
