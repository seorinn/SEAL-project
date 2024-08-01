import { useNavigate } from "react-router-dom";
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
  return (
    <div className="Header">
      <div>
        <p onClick={goMain}>루트컨설팅</p>
        <button onClick={() => navigation(`/admin`)}>관리자로 이동</button>
      </div>
    </div>
  );
}
export default Header;
