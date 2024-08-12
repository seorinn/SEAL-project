import img_programs1 from "../../../../assets/images/img_programs1.png";
import img_programs2 from "../../../../assets/images/img_programs2.png";
import img_programs3 from "../../../../assets/images/img_programs3.png";
import img_programs4 from "../../../../assets/images/img_programs4.png";
import Bottom from "../../Bottom";
import Header from "../../Header";
import ItemBox from "./ItemBox";
import "./index.css";

function RootInfo() {
  const reviews = [
    {
      title: "제 성격을 그대로 스캔한 것",
      content:
        "작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 ",
    },
    {
      title: "구체적인 HOW-TO가 제시되어 있어 좋아요.",
      content:
        "작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 ",
    },
    {
      title: "동료들의 성향을 확인할 수 있어서 의미 있었어요.",
      content:
        "작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 ",
    },
    {
      title: "제 성격을 그대로 스캔한 것",
      content:
        "작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 작성 내용 ",
    },
  ];
  return (
    <div className="RootInfo resultpage">
      <div className="container">
        <Header reportname="Personal Behavior Report" title="루트컨설팅 소개" />
        <div className="content">
          <div className="text">
            기술과 산업 변화로 인해 기존 방법으로 차별화 된 성과를 만들 수
            없습니다.
            <br />
            현재 조직구성원의 역량 수준을 파악하고 필요한 역랑을 신속하게
            육성하는 것이 우리의 현실적 과제입니다.
            <br />
            미래산업에 필요한 역량과 현재 역량 차이를 파악하고, 선제적으로
            육성계획을 실천할 수 있는 체계가 필요합니다.
            <br />
            <br />
            루트컨설팅은 기업 상황과 필요에 맞는 실천적 솔루션을 제공합니다.
            루트컨설팅은 '배움의 본질'을 추구하고, '즐거운 나눔'을 실천하는
            여러분의 든든한 파트너입니다.
          </div>
          <div className="root-contents">
            <div className="box">
              <img alt="img_root_program" src={img_programs1} />
              <div className="title">
                <span>HRD 컨설팅/진단</span>
              </div>
              <div className="content">
                <span>
                  직무역량/중장기교육 체계구축
                  <br />
                  진단 기반 Consulting
                </span>
              </div>
            </div>
            <div className="box">
              <img alt="img_root_program" src={img_programs2} />
              <div className="title">
                <span>
                  교육 프로그램
                  <br />
                  강의/운영
                </span>
              </div>
              <div className="content">
                <span>
                  리더십, 셀프리더십, 정서지능,
                  <br />
                  워크스킬, 조직개발, HRD스킬 등
                </span>
              </div>
            </div>
            <div className="box">
              <img alt="img_root_program" src={img_programs3} />
              <div className="title">
                <span>
                  교육프로그램
                  <br />
                  개발/Customizing
                </span>
              </div>
              <div className="content">
                <span>
                  고객요청에 따른 프로그램 개발 및 <br /> 콘텐츠 Customizing
                </span>
              </div>
            </div>
            <div className="box">
              <img alt="img_root_program" src={img_programs4} />
              <div className="title">
                <span>미디어콘텐츠 개발</span>
              </div>
              <div className="content">
                <span>
                  미디어콘텐츠 제작
                  <br />
                  (영상, 오디오, 인터렉티브 콘텐츠)
                  <br />
                  온라인 디지털 콘텐츠 러닝 서비스 개발
                  <br />
                  자체 교육 콘텐츠 IP 개발 및 확장
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="header">
          <span>진단 후기</span>
        </div>
        <div className="content">
          <div className="boxs">
            {reviews.map((item, index) => (
              <ItemBox key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
      <Bottom pageIndex={0} />
    </div>
  );
}

export default RootInfo;
