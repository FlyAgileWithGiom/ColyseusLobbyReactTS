import React, {useEffect, useState} from 'react';

interface TimerProps {
    time: number | undefined;
}

const Timer: React.FC<TimerProps> = (props) => {
    const [timeLeft, setTimeLeft] = useState(props.time);

    useEffect(() => {
        if (props.time === undefined) {
            return;
        }
        setTimeLeft(props.time);
        const intervalId = setInterval(() => {
            setTimeLeft((timeLeft) => {
                if (timeLeft === 0) {
                    clearInterval(intervalId);
                }
                return timeLeft! - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [props.time]);

    return <div className="timer">Time left: {timeLeft}</div>;
}

export default Timer;
