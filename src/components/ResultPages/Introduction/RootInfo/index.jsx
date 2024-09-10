import logo_gray from "../../../../assets/images/logo_root_gray.png";
import Header from "../../Header";
import Bottom from "../../Bottom";
import "./index.css";
import Watermark from "../../Watermark";

function RootInfo({}) {
  return (
    <div className="RootInfo resultpage">
      <div className="container">
        <Header reportname="Personal Behavior Report" title="루트컨설팅 소개" />
        <div className="content">
          <div className="text">
            루트컨설팅은 2001년 선후배 세 명이 같은 부서에서 일하며 품었던 작은
            꿈에서 출발했습니다.
            <br />
            그들은 '우리가 배우고 익힌 지식과 경험을 더 많은 조직과 사람들과
            나누자'는 열정을 가지고 이 모험을 <br />
            시작했습니다. 이제 그 작은 꿈은 대한민국을 대표하는
            HRD(성인/기업교육) 교육기관으로 성장하며, 지난 <br />
            23년간 수많은 도전과 성공, 실패를 통해 탄탄한 기반을 다졌습니다.
            <br />
            <br />이 기간 동안 우리는 20만 명이 넘는 사람들을 만나며 2만 회
            이상의 교육을 실시했습니다. 전혀 예상하지 <br />
            못했던 팬데믹 속에서도, 우리는 온라인과 미디어, 디지털 기반의
            콘텐츠와 운영 시스템을 구축하며 어떻게 <br />
            위기를 기회로 전환하는지 배웠습니다.
            <br />
            <br />
            루트컨설팅은 창업 초기부터 글로벌 시야를 넓히기 위해 다양한 나라의
            전문가들과 협업을 모색했습니다. 미국, 영국, 싱가포르, 호주, 중국 등
            다양한 국가의 파트너들과 함께 새로운 콘텐츠와 진단 도구, 매체를
            도입하거나
            <br /> 공동으로 개발하면서 세계적인 교육 트렌드에 발맞춘 방법론을
            개발해 왔습니다. 이러한 국제적인 협업은 <br />
            우리가 창업 20년을 맞이하여 '우리만의 진단 도구'를 개발하는 데
            결정적인 영감을 제공했습니다.
            <br />
            <br />
            'REAL' 진단은 루트컨설팅이 실제와 실용에 기반한 데이터와
            루트컨설팅의 철학을 검증된 이론 위에 세운
            <br /> 응용 방법론입니다. 지금 보고 계시는 'REAL Personality' 의
            경우 'REAL' 시리즈의 직무 유형 진단 리포트로,
            <br /> 조직 진단, DEI(다양성, 평등, 포용), 정서, 지능, 코칭, 리더십
            등 다양한 성과 분야에서 필요한 솔루션과
            <br /> 연계될 수 있습니다.
            <br />
            <br />이 프로그램은 조직 내에서 개인과 팀의 성장을 지원하며, 각
            개인의 잠재력을 최대한 발휘할 수 있도록 <br />
            돕습니다. 루트컨설팅은 이를 통해 여러분에게 조용하지만 강력한 지원을
            제공하며, 교육의 새로운 장을
            <br /> 함께 열어갈 준비가 되어 있습니다.
            <br />
            <br />
            루트 컨설팅과 함께 더 큰 성장과 새로운 가능성을 발견해 보세요.
          </div>
          <div className="logo-container">
            <img alt="루트컨설팅" src={logo_gray} />
            <p>
              "변화를 원하는 사람들과 <b>성장의 즐거움</b>을 나눈다"
            </p>
          </div>
        </div>
      </div>
      <Bottom pageIndex={1} />
      <Watermark />
    </div>
  );
}

export default RootInfo;
