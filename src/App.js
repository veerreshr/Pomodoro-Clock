import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPlay,
  faPause,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import beep from "./beep.mp3";

function App() {
  const initialState = {
    break_length: 5,
    session_length: 25,
    start: false,
    session_active: true,
    complete_seconds: 25 * 60,
  };
  let audiobeep;
  const [state, setstate] = useState(initialState);
  const clock = () => {
    if (state.session_active) {
      if (state.complete_seconds === 0) {
        setstate((prev) => ({
          ...prev,
          start: true,
          session_active: false,
          complete_seconds: prev.break_length * 60,
        }));
        audiobeep.play();
        return;
      } else {
        setstate((prev) => {
          return {
            ...prev,
            start: true,
            complete_seconds: prev.complete_seconds - 1,
          };
        });
      }
    } else {
      if (state.complete_seconds === 0) {
        setstate((prev) => {
          return {
            ...prev,
            start: true,
            session_active: !prev.session_active,
            complete_seconds: prev.session_length * 60,
          };
        });
      } else {
        setstate((prev) => {
          return {
            ...prev,
            start: true,
            complete_seconds: prev.complete_seconds - 1,
          };
        });
      }
    }
    if (state.complete_seconds < 0) {
      audiobeep.play();
    }
  };
  const play = () => {
    window.myInterval = setInterval(clock, 1000);
  };
  const pause = () => {
    clearInterval(window.myInterval);
    setstate({ ...state, start: false });
  };

  const breakdecrement = () => {
    if (state.start || state.break_length === 0) {
      return;
    } else {
      if (!state.session_active) {
        setstate((prev) => {
          return {
            ...prev,
            break_length: prev.break_length - 1,
            complete_seconds: (prev.break_length - 1) * 60,
          };
        });
      } else {
        setstate((prev) => {
          return {
            ...prev,
            break_length: prev.break_length - 1,
          };
        });
      }
    }
  };
  const sessiondecrement = () => {
    if (state.start || state.session_length === 0) {
      return;
    } else {
      if (state.session_active) {
        setstate((prev) => {
          return {
            ...prev,
            session_length: prev.session_length - 1,
            complete_seconds: (prev.session_length - 1) * 60,
          };
        });
      } else {
        setstate((prev) => {
          return {
            ...prev,
            session_length: prev.session_length - 1,
          };
        });
      }
    }
  };
  const breakincrement = () => {
    if (state.start || state.break_length === 60) {
      return;
    } else {
      if (!state.session_active) {
        setstate((prev) => {
          return {
            ...prev,
            break_length: prev.break_length + 1,
            complete_seconds: (prev.break_length + 1) * 60,
          };
        });
      } else {
        setstate((prev) => {
          return {
            ...prev,
            break_length: prev.break_length + 1,
          };
        });
      }
    }
  };
  const sessionincrement = () => {
    if (state.start || state.session_length === 60) {
      return;
    } else {
      if (state.session_active) {
        setstate((prev) => {
          return {
            ...prev,
            session_length: prev.session_length + 1,
            complete_seconds: (prev.session_length + 1) * 60,
          };
        });
      } else {
        setstate((prev) => {
          return {
            ...prev,
            session_length: prev.session_length + 1,
          };
        });
      }
    }
  };

  const playpause = () => {
    if (state.start) {
      pause();
    } else {
      play();
    }
  };
  const reset = () => {
    audiobeep.pause();
    clearInterval(window.myInterval);

    setstate(initialState);
  };
  return (
    <div className="container">
      <audio
        id="beep"
        preload="auto"
        src={beep}
        ref={(audio) => {
          audiobeep = audio;
        }}
      ></audio>
      <h1>Pomodoro Clock</h1>
      <div className="length-container">
        <div className="break">
          <div id="break-label">Break Length</div>
          <div className="length">
            <div id="break-decrement">
              <FontAwesomeIcon icon={faArrowDown} onClick={breakdecrement} />
            </div>
            <div id="break-length">{state.break_length}</div>
            <div id="break-increment">
              <FontAwesomeIcon icon={faArrowUp} onClick={breakincrement} />
            </div>
          </div>
        </div>
        <div className="session">
          <div id="session-label">Session Length</div>
          <div className="length">
            <div id="session-decrement">
              <FontAwesomeIcon icon={faArrowDown} onClick={sessiondecrement} />
            </div>
            <div id="session-length">{state.session_length}</div>
            <div id="session-increment">
              <FontAwesomeIcon icon={faArrowUp} onClick={sessionincrement} />
            </div>
          </div>
        </div>
      </div>
      <div className={state.complete_seconds < 60 ? "timer red" : "timer"}>
        <div id="timer-label">{state.session_active ? "Session" : "Break"}</div>
        <div id="time-left">
          {Math.floor(state.complete_seconds / 60) < 10
            ? `0${Math.floor(state.complete_seconds / 60)}`
            : Math.floor(state.complete_seconds / 60)}
          :
          {state.complete_seconds % 60 < 10
            ? `0${state.complete_seconds % 60}`
            : state.complete_seconds % 60}
        </div>
      </div>
      <div className="options">
        <div
          id="start_stop"
          onClick={() => {
            playpause();
          }}
        >
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} />
        </div>
        <div id="reset">
          <FontAwesomeIcon icon={faSyncAlt} onClick={reset} />
        </div>
      </div>
    </div>
  );
}

export default App;
