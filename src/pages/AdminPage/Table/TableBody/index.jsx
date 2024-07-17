import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import icon_download from "../../../../assets/icons/icon_download.png";
import "./index.css";

function TableBody({ data, getUserList, widths }) {
  const [values] = [Object.values(data)];

  const storage = getStorage();
  const pathReference = ref(
    storage,
    `userdata/pdfs/${data.company}_${data.affiliation}_${data.position}_${data.name}_${data.phonenumber}.pdf`
  );

  const handleDelete = () => {
    if (window.confirm(`${data.name}님의 정보를 삭제하시겠습니까?`)) {
      deleteObject(pathReference)
        .then(() => {
          alert("삭제되었습니다");
          getUserList();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDownload = async () => {
    try {
      const url = await getDownloadURL(pathReference);
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `SEAL 진단 결과지_${data.name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return;
  return (
    <div className="TableBody">
      {values.map((item, index) => (
        <div
          key={index}
          className="body-item"
          style={{ width: widths[index] + "%" }}
        >
          {item}
        </div>
      ))}
      <div
        className="button-container"
        style={{ width: widths[widths.length - 1] + "%" }}
      >
        <button className="btn_download" onClick={handleDownload}>
          진단결과
          <img className="icon_download" alt="download" src={icon_download} />
        </button>
        <button className="btn-mod">수정</button>
        <button className="btn-del" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default TableBody;
