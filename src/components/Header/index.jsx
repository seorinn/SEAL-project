import { useNavigate } from "react-router-dom";
import logo_root from "../../assets/images/logo_root.png";
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
        <img alt="logo_root" src={logo_root} onClick={goMain} />
        <button onClick={() => navigation(`/admin`)}>관리자로 이동</button>
      </div>
    </div>
  );
}
export default Header;
