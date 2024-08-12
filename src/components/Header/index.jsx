import { useNavigate } from "react-router-dom";
import logo_root_header from "../../assets/images/logo_root_header.png";
import "./index.css";

function Header({ setUserInfo, setIsUser }) {
  const navigation = useNavigate();

  const goMain = () => {
    navigation("/");
    setIsUser(false);
    setUserInfo({
      course: "",
      name: "",
      company: "",
      affiliation: "",
      position: "",
      phonenumber: "",
      isChecked: false,
    });
  };

  const state = [
    [
      { type: "분석형", value: 1, tier: 3 },
      { type: "관계형", value: 1, tier: 3 },
      { type: "도전형", value: 1, tier: 3 },
      { type: "안정형", value: 1, tier: 3 },
    ],
    [
      { type: "분석형", value: 1, tier: 3 },
      { type: "관계형", value: 1, tier: 3 },
      { type: "도전형", value: 1, tier: 3 },
      { type: "안정형", value: 1, tier: 3 },
    ],
    [
      { type: "촉진자", value: 1, tier: 3 },
      { type: "상담가", value: 1, tier: 3 },
      { type: "중재자", value: 1, tier: 3 },
      { type: "모험가", value: 1, tier: 3 },
      { type: "발명가", value: 1, tier: 3 },
      { type: "비전가", value: 1, tier: 3 },
      { type: "수호자", value: 1, tier: 3 },
      { type: "설계자", value: 1, tier: 3 },
      { type: "학자", value: 1, tier: 3 },
      { type: "분석가", value: 1, tier: 3 },
      { type: "비평가", value: 1, tier: 3 },
      { type: "전략가", value: 1, tier: 3 },
    ],
    [
      { type: "촉진자", value: 1, tier: 3 },
      { type: "상담가", value: 1, tier: 3 },
      { type: "중재자", value: 1, tier: 3 },
      { type: "모험가", value: 1, tier: 3 },
      { type: "발명가", value: 1, tier: 3 },
      { type: "비전가", value: 1, tier: 3 },
      { type: "수호자", value: 1, tier: 3 },
      { type: "설계자", value: 1, tier: 3 },
      { type: "학자", value: 1, tier: 3 },
      { type: "분석가", value: 1, tier: 3 },
      { type: "비평가", value: 1, tier: 3 },
      { type: "전략가", value: 1, tier: 3 },
    ],
  ];
  const scoreMain = [
    { 분석형: 7 },
    { 관계형: 7 },
    { 도전형: 11 },
    { 안정형: 28 },
  ];
  const scoreSub = [
    { 촉진자: 8 },
    { 상담가: 5 },
    { 중재자: 5 },
    { 모험가: 5 },
    { 발명가: 5 },
    { 비전가: 8 },
    { 수호자: 8 },
    { 설계자: 8 },
    { 학자: 11 },
    { 분석가: 8 },
    { 비평가: 8 },
    { 전략가: 8 },
  ];

  return (
    <div className="Header">
      <div>
        <img alt="logo_root" src={logo_root_header} onClick={goMain} />
        <button
          onClick={() =>
            navigation(`/result`, {
              state: { state: state, scoreMain: scoreMain, scoreSub: scoreSub },
            })
          }
        >
          결과 예시
        </button>
        <button onClick={() => navigation(`/admin`)}>관리자로 이동</button>
      </div>
    </div>
  );
}
export default Header;
