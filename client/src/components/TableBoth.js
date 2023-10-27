import React, { useState } from "react";
import Usermanage from "./Usermanage";
import TableAdmin from "./Admintable";

const TableBoth = () => {
  const [showUserTable, setShowUserTable] = useState(true);

  const toggleTable = () => {
    setShowUserTable(!showUserTable);
  };

  const buttonLabel = showUserTable ? "Switch to Admin" : "Switch to User";

  return (
    <div style={{ marginLeft: '4%', marginTop: '' }}>
      <div>
        <button
          onClick={toggleTable}
          style={{
            marginTop: '9%',
            position: 'absolute',
            marginLeft: '48%',
            padding: '8px 16px',
            border:'none',
            color:'white',
            backgroundColor:'#0097e6',
            borderRadius:'8px',
          }}
        >
          {buttonLabel}
        </button>
        {showUserTable ? <Usermanage /> : <TableAdmin />}
      </div>
    </div>
  );
};

export default TableBoth;
