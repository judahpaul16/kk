import React, { useState, useEffect } from 'react';
import '../App.css';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetDate = new Date('2024-10-15').getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <span className="countdown-item">{timeLeft.days} days </span>
      <span className="countdown-item">{timeLeft.hours} hrs </span>
      <span className="countdown-item">{timeLeft.minutes} mins </span>
      <span className="countdown-item">{timeLeft.seconds} secs</span>
    </div>
  );
}

export default Countdown;
