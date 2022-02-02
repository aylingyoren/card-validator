import { useState } from "react";
import Card from "../Card";
import "./App.css";

function App() {
  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(false);

  enum ModeTypes {
    LightMode = 'light',
    DarkMode = 'dark'
  }

  const switchModes = (mode: ModeTypes) => {
    if (mode === ModeTypes.LightMode) {
      setIsDarkModeActive(false);
    } else if (mode === ModeTypes.DarkMode) {
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
        <h4 className="light-mode" onClick={() => switchModes(ModeTypes.LightMode)}>
          Light
        </h4>
        <h4 className="dark-mode" onClick={() => switchModes(ModeTypes.DarkMode)}>
          Dark
        </h4>
      </div>
      <h1 className={isDarkModeActive ? "header light-text" : "header"}>
        Card Validator
      </h1>
      <Card isDarkModeActive={isDarkModeActive} onSubmit={() => {}} />
    </div>
  );
}

export default App;
