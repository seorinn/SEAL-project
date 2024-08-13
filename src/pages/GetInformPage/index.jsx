import { useNavigate } from "react-router-dom";
import Code from "../../components/Code";
import "./index.css";

function GetInformPage({ userInfo, setUserInfo, isUser, setIsUser }) {
  const navigation = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { name, company, affiliation, position, email, phonenumber } =
      userInfo;
    if (name && company && affiliation && position && email && phonenumber)
      navigation("/test");
    else alert("항목을 모두 입력해주세요");
  };

  if (!isUser)
    return (
      <Code
        isValid={isUser}
        setIsValid={setIsUser}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    );
  return (
    <div className="GetInformPage">
      <div className="title">REAL 진단 테스트</div>
      <div className="input-container">
        <div>
          <p>참여 과정</p>
          <input value={userInfo.course} disabled />
        </div>
        <div>
          <p>이름</p>
          <input
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>회사명</p>
          <input
            name="company"
            placeholder="회사명을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>소속</p>
          <input
            name="affiliation"
            placeholder="소속을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>직급</p>
          <input
            name="position"
            placeholder="직급을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>이메일</p>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleInput}
          />
        </div>
        <div>
          <p>전화번호</p>
          <input
            type="tel"
            name="phonenumber"
            placeholder="'-' 없이 입력해주세요."
            onChange={handleInput}
          />
        </div>
      </div>
      <button className="btn-submit" onClick={handleSubmit}>
        진단 시작하기
      </button>
    </div>
  );
}

export default GetInformPage;
