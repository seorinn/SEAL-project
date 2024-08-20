import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "./firebase-config";
import * as XLSX from "xlsx";

import logo_watermark from "../src/assets/images/logo_watermark.png";
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

const storage = getStorage();
export const getUserList = async () => {
  const listRef = ref(storage, "userdata/pdfs/");
  let userlist = [];

  await listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {});
      res.items.forEach((itemRef) => {
        const [
          company,
          affiliation,
          position,
          name,
          email,
          phonenumber,
          course,
          mainType,
          subType,
        ] = itemRef._location.path_
          .split("/")[2]
          .split(".")
          .slice(0, -1)
          .join(".")
          .split("_");
        userlist.push({
          isChecked: false,
          company,
          affiliation,
          position,
          name,
          email,
          phonenumber,
          course,
          mainType,
          subType,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return userlist;
};

export const getCourseList = async () => {
  const storage = getStorage();
  const listRef = ref(storage, "courses/");
  let courselist = [];

  await listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {});
      res.items.forEach((itemRef) => {
        const [name, code] = itemRef._location.path_
          .split("/")[1]
          .split(".")[0]
          .split("_");
        courselist.push({
          name,
          code,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return courselist;
};

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

export const getStoragePath = (body) => {
  return `userdata/pdfs/${body.company}_${body.affiliation}_${body.position}_${body.name}_${body.email}_${body.phonenumber}_${body.course}_${body.mainType}_${body.subType}.pdf`;
};

export const getStorageCoursePath = (body) => {
  return `courses/${body.name}_${body.code}`;
};

export const getFileName = (name) => {
  return `REAL 진단 결과지_${name}.pdf`;
};

export const getLogoImage = async (coursename) => {
  const courseList = getCourseList();
  let imageUrl = "";
  (await courseList).map((item) => {
    if (item.name === coursename) imageUrl = getStorageCoursePath(item);
  });

  const pathReference = ref(storage, imageUrl);
  try {
    const url = await getDownloadURL(pathReference);
    const response = await fetch(url);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    return link.href;
  } catch (error) {
    console.log(error);
  }
};

export const fourTypes = [
  {
    adj: "스마트한",
    img: "",
    name: "분석형",
    nameEng: "REASONER",
    intro: "체계적이고 논리적인 사고를 중시하는 유형",
    content:
      "분석형은 데이터를 기반으로 한 논리적 사고와 체계적인 접근을 통해 문제를 해결합니다.\n이 유형의 사람들은 사실과 증거를 중시하며, \n결정을 내리기 전에 철저히 분석하는 경향이 있습니다.",
  },
  {
    adj: "친근한",
    img: "",
    name: "관계형",
    nameEng: "ENGAGER",
    intro: "사람들과의 관계와 소통을 중시하는 유형",
    content:
      "관계형은 다른 사람들과의 관계를 중요시하며, 효과적인 소통을 통해 팀워크를 촉진합니다.\n이 유형의 사람들은 타인의 감정을 잘 이해하고,\n이를 바탕으로 원활한 협력을 이끌어내는 데 능숙합니다.",
  },
  {
    adj: "열정적인",
    img: "",
    name: "도전형",
    nameEng: "ACTIVATOR",
    intro: "목표 지향적이고 도전을 즐기는 유형",
    content:
      "도전형은 목표를 설정하고 이를 달성하기 위해 적극적으로 행동합니다.\n이 유형의 사람들은 도전을 즐기며,\n목표 달성을 위해 필요한 모든 모력을 기울입니다.",
  },
  {
    adj: "믿음직한",
    img: "",
    name: "안정형",
    nameEng: "LINER",
    intro: "안정성과 예측 가능성을 중시하는 유형",
    content:
      "안정형은 조직 내에서 안정성과 일관성을 유지하는 데 주력합니다.\n이 유형의 사람들은 신뢰할 수 있으며,\n예측 가능한 행동을 통해 팀의 안정성을 높입니다.",
  },
];

export const twelveChar = [
  {
    adj: "CheerUp,",
    name: "촉진자",
    nameEng: "Facilitator",
    content:
      "역할: 팀의 소통을 활성화하고 협력을 촉진합니다., 특징: 협력적 관계 구축에 집중합니다., 그러나 가끔: 자율성을 저해할 수 있습니다.",
  },
  {
    adj: "따뜻한",
    name: "상담가",
    nameEng: "Advisor",
    content:
      "역할: 감정 이해와 공감을 통해 지원합니다., 특징: 긍정적 환경 조성에 기여합니다., 그러나 가끔: 객관성을 잃기 쉽습니다.",
  },
  {
    adj: "따뜻한",
    name: "중재자",
    nameEng: "Mediator",
    content:
      "역할: 팀원 지원과 성장을 촉진합니다., 특징: 목표 달성에 헌신적입니다., 그러나 가끔: 독립성을 저해할 수 있습니다.",
  },
  {
    adj: "미래를 보는",
    name: "비전가",
    nameEng: "Visionary",
    content:
      "역할: 미래의 비전을 제시하고, 사람들을 동기부여합니다., 특징: 장기적인 목표 설정과 영감을 줍니다., 그러나 가끔: 현실적인 제약을 간과할 수 있습니다.",
  },
  {
    adj: "아이디어 뱅크,",
    name: "발명가",
    nameEng: "Innovator",
    content:
      "역할: 새로운 아이디어를 도입합니다., 특징: 변화와 혁신을 주도합니다., 그러나 가끔: 도전이 과도할 수 있습니다.",
  },
  {
    adj: "추진력 좋은",
    name: "모험가",
    nameEng: "Adventurer",
    content:
      "역할: 새로운 도전과 경험을 즐깁니다., 특징: 위험 감수와 모험을 적극적으로 추구합니다., 그러나 가끔: 예기치 않은 문제가 발생합니다.",
  },
  {
    adj: "냉철한",
    name: "분석가",
    nameEng: "Analyst",
    content:
      "역할: 데이터 기반 의사결정을 내립니다., 특징: 통찰력 발전을 중시합니다., 그러나 가끔: 실행이 지연될 수 있습니다.",
  },
  {
    adj: "치밀한",
    name: "전략가",
    nameEng: "Strategist",
    content:
      "역할: 장기 목표 설정과 전략을 수립합니다., 특징: 가능성을 고려하며 적응합니다., 그러나 가끔: 유연성이 부족할 수 있습니다.",
  },
  {
    adj: "논리적인",
    name: "비평가",
    nameEng: "Evaluator",
    content:
      "역할: 객관적 데이터로 문제를 해결합니다., 특징: 정확성과 피드백을 중시합니다., 그러나 가끔: 사기를 저하할 수 있습니다.",
  },
  {
    adj: "빈틈없는",
    name: "설계자",
    nameEng: "Planner",
    content:
      "역할: 계획적 행동으로 성과를 냅니다., 특징: 예측 가능한 결과를 중시합니다., 그러나 가끔: 유연성이 부족할 수 있습니다.",
  },
  {
    adj: "지식의 보고,",
    name: "학자",
    nameEng: "Scholor",
    content:
      "역할: 깊은 전문성과 철저한 연구를 바탕으로 지식을 공유합니다., 특징: 지식과 경험을 통해 문제를 해결합니다., 그러나 가끔: 실천보다는 이론에 치중할 수 있습니다.",
  },
  {
    adj: "든든한",
    name: "수호자",
    nameEng: "Guardian",
    content:
      "역할: 기존 절차와 방식을 철저히 따릅니다., 특징: 안정적이고 신뢰할 수 있는 환경을 선호합니다., 그러나 가끔: 변화를 적응하기 어렵습니다.",
  },
];

export const formattedDate = `${new Date().getFullYear()}.${String(
  new Date().getMonth() + 1
).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`;

export const getTableImage = (current) => {
  return `tables/table_${current.toLowerCase()}.png`;
};

export const getIconImage = (typename, isWhite) => {
  switch (typename) {
    case "분석형":
      return isWhite ? icon_r_white : icon_r;
    case "관계형":
      return isWhite ? icon_e_white : icon_e;
    case "도전형":
      return isWhite ? icon_a_white : icon_a;
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

export const WatermarkImage = logo_watermark;
