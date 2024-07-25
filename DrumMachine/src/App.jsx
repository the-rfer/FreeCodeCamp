import { useEffect, useState } from 'react';

console.log(
    'Project completed by _KNC aka the-rfer.\nFind the source code at https://github.com/the-rfer/FreeCodeCamp/tree/main/DrumMachine'
);

function App() {
    const [displayText, setDisplayText] = useState('Press any key to start...');

    const playAudio = (key, id) => {
        const audio = document.getElementById(key);
        if (audio) {
            audio.play();
        }
        setDisplayText(id);
    };

    const handleKeyPress = (e) => {
        const key = e.key.toUpperCase();
        const audioElement = document.getElementById(key);
        if (audioElement) {
            const id = audioElement.parentElement.id;
            playAudio(key, id);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <>
            <div id='drum-machine'>
                <div id='display'>{displayText}</div>
                <div id='keyboard'>
                    <div
                        className='drum-pad'
                        id='Heater 1'
                        onClick={(e) => playAudio('Q', e.target.id)}
                    >
                        Q
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'
                            id='Q'
                        />
                    </div>
                    <div
                        className='drum-pad'
                        id='Heater 2'
                        onClick={(e) => playAudio('W', e.target.id)}
                    >
                        W{' '}
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'
                            id='W'
                        />
                    </div>
                    <div
                        className='drum-pad'
                        id='Heater 3'
                        onClick={(e) => playAudio('E', e.target.id)}
                    >
                        E{' '}
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'
                            id='E'
                        />
                    </div>
                    <div
                        className='drum-pad'
                        id='Heater 4'
                        onClick={(e) => playAudio('A', e.target.id)}
                    >
                        A{' '}
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'
                            id='A'
                        />
                    </div>
                    <div
                        className='drum-pad'
                        id='Clap'
                        onClick={(e) => playAudio('S', e.target.id)}
                    >
                        S{' '}
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'
                            id='S'
                        />
                    </div>
                    <div
                        className='drum-pad'
                        id='Open-HH'
                        onClick={(e) => playAudio('D', e.target.id)}
                    >
                        D{' '}
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'
                            id='D'
                        />
                    </div>
                    <div
                        className='drum-pad'
                        id="Kick-n'-Hat"
                        onClick={(e) => playAudio('Z', e.target.id)}
                    >
                        Z{' '}
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'
                            id='Z'
                        />
                    </div>
                    <div
                        className='drum-pad'
                        id='Kick'
                        onClick={(e) => playAudio('X', e.target.id)}
                    >
                        X{' '}
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'
                            id='X'
                        />
                    </div>
                    <div
                        className='drum-pad'
                        id='Closed-HH'
                        onClick={(e) => playAudio('C', e.target.id)}
                    >
                        C{' '}
                        <audio
                            className='clip'
                            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'
                            id='C'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
