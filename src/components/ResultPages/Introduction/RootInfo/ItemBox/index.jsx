import img_review_box from "../../../../../assets/images/img_review-box.png";
import "./index.css";

function ItemBox({ title, content }) {
  return (
    <div className="ItemBox">
      <img alt="review_box" src={img_review_box} />
      <div className="item-content">
        <p>
          <span className="item-title">{title}</span>
        </p>
        <span className="item-content">{content}</span>
      </div>
    </div>
  );
}

export default ItemBox;
