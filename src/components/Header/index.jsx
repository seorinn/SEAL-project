import { useNavigate } from "react-router-dom";
import "./index.css";

function Header({ setUserInfo }) {
  const navigation = useNavigate();
  const goMain = () => {
    navigation("/");
    setUserInfo({
      name: "",
      affiliation: "",
      position: "",
    });
  };
  return (
    <div className="Header">
      <div>
        <p onClick={goMain}>루트컨설팅</p>
        <button>menu</button>
      </div>
    </div>
  );
}
export default Header;
