import { useState, useEffect } from "react";
import "./App.css";
import sound from "./assets/rooster-crowing-type-01-293308.mp3";

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 890); // Ensure accurate interval
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && running) {
      playAlarm();
      setRunning(false);
    }
  }, [timeLeft, running]);

  const startTimer = () => {
    setRunning(!running);
  };

  const playAlarm = () => {
    const audio = new Audio(sound);
    audio
      .play()
      .catch((error) => console.error("Audio playback failed:", error));
  };

  const incrementTime = () => {
    setTimeLeft((prev) => prev + 60);
  };

  const decrementTime = () => {
    setTimeLeft((prev) => Math.max(prev - 60, 0)); // Prevents negative time
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 rounded-lg shadow-lg w-96 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-blue-600">Express Alarm</h1>
      <div className="flex-col items-center gap-3">
        <div className="flex flex-col items-center">
          <select
            value={timeLeft / 60}
            onChange={(e) => setTimeLeft(+e.target.value * 60)}
            className="w-24 p-2 border border-gray-300 rounded-lg text-center"
          >
            {[0, 1, 2, 5, 10, 15, 20].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={decrementTime}
            className="p-2 bg-gray-200 rounded-full mr-2"
          >
            -1
          </button>
          <button
            onClick={incrementTime}
            className="p-2 bg-gray-200 rounded-full"
          >
            +1
          </button>
        </div>
      </div>

      <button
        onClick={startTimer}
        className={`px-4 py-2 ${
          running ? "bg-red-500" : "bg-blue-500"
        } text-white rounded-lg hover:bg-blue-600`}
      >
        {running ? "Stop Countdown" : "Start Countdown"}
      </button>

      <h2 className="text-lg font-semibold text-red-600">
        Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
      </h2>
    </div>
  );
}

export default App;
