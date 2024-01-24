import React, { useState, useEffect } from 'react';

const Timer = ({ isRunning, onTimeUp }) => {
    const initialTime = 120; // Set initial time to 120 seconds (2 minutes)
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        let timer;
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((t) => {
                    if (t === 1) { // If time is about to reach zero
                        onTimeUp(); // Call the onTimeUp function
                    }
                    return t - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, time, onTimeUp]);



    // Function to format the time as "mm:ss"
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            <p>Time Remaining: {formatTime(time)}</p>
        </div>
    );
};

export default Timer;
