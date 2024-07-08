import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigation = useNavigate();

  useEffect(() => {
    navigation("/", { replace: true });
  }, []);

  return <></>;
}

export default NotFoundPage;
