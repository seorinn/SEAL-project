import { useNavigate } from "react-router-dom";
import logo_root_header from "../../assets/images/logo_root_header.png";
import "./index.css";

function Header() {
  const navigation = useNavigate();

  const goMain = () => {
    navigation("/");
  };

  return (
    <div className="Header">
      <div>
        <img alt="logo_root" src={logo_root_header} onClick={goMain} />
        <button onClick={() => navigation(`/admin`)}>관리자로 이동</button>
      </div>
    </div>
  );
}
export default Header;
