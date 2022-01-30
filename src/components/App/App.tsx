import { useState } from "react";
import Card from "../Card";
import "./App.css";

function App() {
  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(false);
  const switchModes = (mode: any) => {
    if (mode === "light") {
      setIsDarkModeActive(false);
    } else if (mode === "dark") {
      setIsDarkModeActive(true);
    }
  };
  return (
    <div className={isDarkModeActive ? "App dark-bg" : "App"}>
      <div
        className={
          isDarkModeActive
            ? "toggle-dark box-dark-border"
            : "toggle-light box-light-border"
        }
      >
        <h4 className="light-mode" onClick={() => switchModes("light")}>
          Light
        </h4>
        <h4 className="dark-mode" onClick={() => switchModes("dark")}>
          Dark
        </h4>
      </div>
      <h1 className={isDarkModeActive ? "header light-text" : "header"}>
        Card Validator
      </h1>
      <Card isDarkModeActive={isDarkModeActive} onSubmit />
    </div>
  );
}

export default App;
