import "./index.css";

function Header({ reportname, title }) {
  return (
    <div className="resultheader">
      <p>{reportname}</p>
      <div className="title">
        <span>{title}</span>
      </div>
    </div>
  );
}

export default Header;
