import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SessionTimeout = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
console.log("Header timeLeft:", timeLeft);
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    alert("Session expired due to inactivity.");

    navigate("/");
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 30 minutes = 30 * 60 * 1000 ms
    timerRef.current = setTimeout(logout, 30 * 60 * 1000);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    // Start timer on page load
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);

  return null;
};

export default SessionTimeout;