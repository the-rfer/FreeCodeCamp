import { useState, useEffect, useRef } from 'react';

function App() {
    const [timerValue, setTimerValue] = useState(25);
    const [breakValue, setBreakValue] = useState(5);
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isSessionRunning, setIsSessionRunning] = useState(true); // false = break, true = session
    const intervalRef = useRef(null);

    const audio = document.getElementById('beep');

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime < -1) {
                        return Math.abs(prevTime) - 1;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (!isActive && intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    useEffect(() => {
        if (time === -1) {
            audio.play();
            setIsSessionRunning((prev) => !prev);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    useEffect(() => {
        if (isSessionRunning) {
            setTime(timerValue * 60);
        } else {
            setTime(breakValue * 60);
        }
    }, [timerValue, breakValue, isSessionRunning]);

    const handleStartPause = () => {
        setIsActive((prev) => !prev);
    };

    const handleReset = () => {
        setIsSessionRunning(true);
        setIsActive(false);
        setTime(25 * 60);
        setTimerValue(25);
        setBreakValue(5);
        audio.pause();
        audio.currentTime = 0;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleUpdate = (type, value) => {
        switch (type) {
            case 'break':
                if (value === 'increment' && breakValue < 60) {
                    setBreakValue((prevtimer) => prevtimer + 1);
                }
                if (value === 'decrement' && breakValue > 1) {
                    setBreakValue((prevtimer) => prevtimer - 1);
                }
                break;
            case 'session':
                if (value === 'increment' && timerValue < 60) {
                    setTimerValue((prevbreak) => prevbreak + 1);
                }
                if (value === 'decrement' && timerValue > 1) {
                    setTimerValue((prevbreak) => prevbreak - 1);
                }
                break;
        }
    };

    return (
        <>
            <div id='timer'>
                <h1>Focus Timer</h1>
                <div className='labels'>
                    <div id='break-label'>
                        Break Length
                        <div id='break-length'>{breakValue}</div>
                        <div className='button-controls'>
                            <div
                                id='break-decrement'
                                onClick={() =>
                                    handleUpdate('break', 'decrement')
                                }
                            >
                                <div className='svg-container'>
                                    <button className='svg-default'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='size-6'
                                            height={50}
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                            />
                                        </svg>
                                    </button>
                                    <button className='svg-hover'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            fill='currentColor'
                                            className='size-6'
                                            height={50}
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div
                                id='break-increment'
                                onClick={() =>
                                    handleUpdate('break', 'increment')
                                }
                            >
                                <div className='svg-container'>
                                    <button className='svg-default'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='size-6'
                                            height={50}
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                            />
                                        </svg>
                                    </button>
                                    <button className='svg-hover'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            fill='currentColor'
                                            className='size-6'
                                            height={50}
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='session-label'>
                        Session Length{' '}
                        <div id='session-length'>{timerValue}</div>
                        <div className='button-controls'>
                            <div
                                id='session-decrement'
                                onClick={() =>
                                    handleUpdate('session', 'decrement')
                                }
                            >
                                <div className='svg-container'>
                                    <button className='svg-default'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='size-6'
                                            height={50}
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                            />
                                        </svg>
                                    </button>
                                    <button className='svg-hover'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            fill='currentColor'
                                            className='size-6'
                                            height={50}
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div
                                id='session-increment'
                                onClick={() =>
                                    handleUpdate('session', 'increment')
                                }
                            >
                                <div className='svg-container'>
                                    <button className='svg-default'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='size-6'
                                            height={50}
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                            />
                                        </svg>
                                    </button>
                                    <button className='svg-hover'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            fill='currentColor'
                                            className='size-6'
                                            height={50}
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='current-timer'>
                    <div id='timer-label'>
                        {isSessionRunning ? 'Session' : 'Break'}
                    </div>
                    <div id='time-left'>{formatTime(time)}</div>

                    <div className='controls'>
                        <div
                            className='svg-container'
                            id='start_stop'
                            onClick={handleStartPause}
                        >
                            <button className='svg-default'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='size-6'
                                    height={50}
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z'
                                    />
                                </svg>
                            </button>
                            <button className='svg-hover'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='size-6'
                                    height={50}
                                >
                                    <path d='M15 6.75a.75.75 0 0 0-.75.75V18a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75H15ZM20.25 6.75a.75.75 0 0 0-.75.75V18c0 .414.336.75.75.75H21a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75h-.75ZM5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L5.055 7.061Z' />
                                </svg>
                            </button>
                        </div>
                        <button
                            id='reset'
                            className='svg-default'
                            onClick={handleReset}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='size-6'
                                height={50}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <audio
                    src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav'
                    id='beep'
                ></audio>
            </div>
            <p id='signature'>
                FreeCodeCamp project <br />
                Completed by{' '}
                <a href='https://github.com/the-rfer' target='_blank'>
                    _KNC
                </a>
            </p>
        </>
    );
}

export default App;
