import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPlay,
  faPause,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Pomodoro Clock</h1>
      <div className="length-container">
        <div className="break">
          <div id="break-label">Break Length</div>
          <div className="length">
            <div id="break-decrement">
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div id="break-length">5</div>
            <div id="break-increment">
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </div>
        </div>
        <div className="session">
          <div id="session-label">Session Length</div>
          <div className="length">
            <div id="session-decrement">
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div id="session-length">5</div>
            <div id="session-increment">
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </div>
        </div>
      </div>
      <div className="timer">
        <div id="timer-label">Session</div>
        <div id="time-left">25 : 00</div>
      </div>
      <div className="options">
        <div id="start_stop">
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} />
        </div>
        <div id="reset">
          <FontAwesomeIcon icon={faSyncAlt} />
        </div>
      </div>
    </div>
  );
}

export default App;
