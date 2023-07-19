import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeaderChar.css";

const Header = ({ destination }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShow(window.scrollY > 100);
    });
  }, []);

  return (
    <>
      <header className={`header ${show && "header-black"}`}>
        <h1 className="title">Magic World</h1>
        <div className="btn-return">
          <Link to={destination}>
            <button className="btn-characters">Return</button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
