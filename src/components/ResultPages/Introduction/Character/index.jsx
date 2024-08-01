import { getFourTypes } from "../../../../util";
import Bottom from "../../Bottom";
import Header from "../../Header";
import TypeItem from "./TypeItem";
import "./index.css";

function Character() {
  const fourTypes = getFourTypes();
  return (
    <div className="Character resultpage">
      <Header />
      <div className="background">
        <div className="title">캐릭터</div>
        <div className="content">
          <p>
            세 가지 캐릭터는 당신의 유형 상위 1개 분면에 시각화(색깔)으로
            표시됩니다. 당신이 가장 많이 활용하고 표현하는 캐릭터입니다.
          </p>
        </div>
      </div>
      <div className="fourtypes-container">
        <div className="title">4가지 유형 소개</div>
        <div className="content">
          <p>
            <b>
              해당 진단은 60개의 문항을 5점 척도로 측정하여 네 가지 유형으로
              분류하였습니다.
            </b>
          </p>
          <div className="fourtypes">
            {fourTypes.map((item) => (
              <TypeItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
      <Bottom />
    </div>
  );
}

export default Character;
