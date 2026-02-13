import { useState } from "react";
import "../css/HomePage.css";

export default function HomePage() {
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="menu-container">
      <MenuBox
        title="Questionário"
        isOpen={openMenu === "questionario"}
        onClick={() => handleClick("questionario")}
      >
        <Option>Registar</Option>
        <Option>Listar</Option>
      </MenuBox>

      <MenuBox
        title="Impressos"
        isOpen={openMenu === "impressos"}
        onClick={() => handleClick("impressos")}
      >
        <Option>Registar</Option>
        <Option>Listar</Option>
      </MenuBox>

      <MenuBox
        title="Emails"
        isOpen={openMenu === "emails"}
        onClick={() => handleClick("emails")}
      >
        <Option>Registar</Option>
        <Option>Listar</Option>
      </MenuBox>
    </div>
  );
}

function MenuBox({ title, isOpen, onClick, children }) {
  return (
    <div className={`menu-box ${isOpen ? "open" : ""}`}>
      <button className="menu-title" onClick={onClick}>
        {title}
      </button>

      {isOpen && <div className="menu-content">{children}</div>}
    </div>
  );
}


function Option({ children }) {
  return <div className="option">{children}</div>;
}
