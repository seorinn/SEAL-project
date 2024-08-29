import React, { useState, useEffect } from "react";

import GroupQuarter from "./GroupQuarter";
import GroupCharacter from "./GroupCharacters";

const GroupModal = ({ groupUsers }) => {
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    setUserdata(
      groupUsers.map((user) => {
        return {
          name: user.name,
          mainType: user.mainType,
          subType: user.subType,
        };
      })
    );
  }, []);

  if (!groupUsers) return;
  return (
    <div className="PdfModal pdfPage">
      <GroupQuarter userdata={userdata} />
      <GroupCharacter userdata={userdata} />
    </div>
  );
};

export default GroupModal;
