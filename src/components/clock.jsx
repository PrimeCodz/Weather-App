import React, { useState, useEffect } from 'react';

const Clock = ({ format = '24', timezone = 'UTC' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: format === '12',
      timeZone: timezone,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div>
      <div className="text-xl md:text-3xl" aria-live="polite">
        {formatTime(time)}
      </div>
      <div className="text-xl md:text-2xl">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default Clock;