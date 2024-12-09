import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [countdown, setCountdown] = useState(Math.floor(props.items.expiryDate - Date.now()));

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    const interval = setInterval(() => {
      if (isMounted) {
        setCountdown(Math.floor(props.items.expiryDate - Date.now())); // Update the countdown
      }
    }, 1000); // Update every second

    // Cleanup the interval and flag when the component unmounts
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [props.items.expiryDate]); // Re-run effect if the expiryDate changes

  function times() {
    if (countdown > 0) {
      const seconds = countdown / 1000;
      const minutes = seconds / 60;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.floor(minutes % 60);
      const remainingSeconds = Math.floor((seconds % 60) % 60);
      return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
    }

    if (countdown <= 0) {
      return "EXPIRED";
    } else {
      return "Null";
    }
  }

  return (
    <>
      {countdown > 0 ? (
        <div className="countdown">{times()}</div>
      ) : (
        "EXPIRED"
      )}
    </>
  );
};

export default Timer;
