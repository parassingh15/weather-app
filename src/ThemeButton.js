import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeButton() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };
  return (
    <button
      className={
        darkMode
          ? "btn btn-floating fa fa-toggle-on"
          : "btn btn-floating fa fa-toggle-off"
      }
      onClick={handleTheme}
    ></button>
  );
}

export default ThemeButton;