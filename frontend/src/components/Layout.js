import React, { useState, useEffect, useRef } from "react";

import Header from "./Header";

function MainLayout({ children,moduleName  }) {
  const SESSION_TIME = 30 * 60; // 1800 seconds

  const [timeLeft, setTimeLeft] = useState(SESSION_TIME);
  const logoutTimer = useRef();

  const resetTimer = () => {
    setTimeLeft(SESSION_TIME);

    clearTimeout(logoutTimer.current);

    logoutTimer.current = setTimeout(() => {
      alert("Session Expired");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      window.location.href = "/";
    }, SESSION_TIME * 1000);
  };

  useEffect(() => {
    resetTimer();

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((e) =>
      window.addEventListener(e, resetTimer)
    );

    return () => {
      clearInterval(interval);
      clearTimeout(logoutTimer.current);

      events.forEach((e) =>
        window.removeEventListener(e, resetTimer)
      );
    };
  }, []);

  return (
    <div>
      
      <main className="main-content">
        <Header timeLeft={timeLeft} moduleName={moduleName} />
        {children}
      </main>
    </div>
  );
}

export default MainLayout;