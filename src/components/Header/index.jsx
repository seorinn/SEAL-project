import { useNavigate } from "react-router-dom";
import "./index.css";
import { getLogoImage } from "../../util";
import { useEffect, useState } from "react";

function Header({ userInfo, setUserInfo, setIsUser }) {
  const navigation = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (userInfo.course !== "")
      getLogoImage(userInfo.course).then((res) => setImageUrl(res));
  }, [userInfo]);

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
        {userInfo.course && <img alt={userInfo.course} src={imageUrl} />}
        <button onClick={() => navigation(`/admin`)}>관리자로 이동</button>
      </div>
    </div>
  );
}
export default Header;
