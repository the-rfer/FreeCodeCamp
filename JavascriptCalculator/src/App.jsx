import { useState } from 'react';

function App() {
    const [currentValue, setCurrentValue] = useState('0');
    const [result, setResult] = useState(null);

    const getValue = (e) => {
        const argument = e.target.getAttribute('value');

        if (argument === 'clear') {
            setCurrentValue('0');
            setResult(null);
        } else if (argument === '=') {
            try {
                const evaluatedResult = eval(currentValue);
                setCurrentValue(String(evaluatedResult));
                setResult(evaluatedResult);
            } catch (error) {
                setCurrentValue('Error');
                setResult(null);
            }
        } else if (currentValue === '0' && argument === '0') {
            setCurrentValue(argument);
        } else if (currentValue === '0' && argument !== '0') {
            setCurrentValue(argument);
        } else if (argument === '.' && currentValue.includes('.')) {
            let test = currentValue.split(/[/*\-+]/);

            if (!test[test.length - 1].includes('.')) {
                setCurrentValue(currentValue + argument);
            } else {
                return;
            }

            return;
        } else if (
            argument === '+' &&
            currentValue[currentValue.length - 1] === '-'
        ) {
            if (
                currentValue[currentValue.length - 2] === '*' ||
                currentValue[currentValue.length - 2] === '/'
            ) {
                let newValue = currentValue.slice(0, -2) + '+';

                setCurrentValue(newValue);
            } else {
                let newValue = currentValue.slice(0, -1) + '+';
                setCurrentValue(newValue);
            }
        } else {
            setCurrentValue(currentValue + argument);
            setResult(null);
        }
    };

    return (
        <>
            <div id='calculator'>
                <div id='display'>
                    {result !== null ? result : currentValue}
                </div>
                <div id='button-group'>
                    <div
                        className='button'
                        id='clear'
                        value='clear'
                        onClick={(e) => getValue(e)}
                    >
                        AC
                    </div>
                    <div
                        className='button'
                        id='divide'
                        value='/'
                        onClick={(e) => getValue(e)}
                    >
                        /
                    </div>
                    <div
                        className='button'
                        id='multiply'
                        value='*'
                        onClick={(e) => getValue(e)}
                    >
                        X
                    </div>
                    <div
                        className='button'
                        id='seven'
                        value='7'
                        onClick={(e) => getValue(e)}
                    >
                        7
                    </div>
                    <div
                        className='button'
                        id='eight'
                        value='8'
                        onClick={(e) => getValue(e)}
                    >
                        8
                    </div>
                    <div
                        className='button'
                        id='nine'
                        value='9'
                        onClick={(e) => getValue(e)}
                    >
                        9
                    </div>
                    <div
                        className='button'
                        id='subtract'
                        value='-'
                        onClick={(e) => getValue(e)}
                    >
                        -
                    </div>
                    <div
                        className='button'
                        id='four'
                        value='4'
                        onClick={(e) => getValue(e)}
                    >
                        4
                    </div>
                    <div
                        className='button'
                        id='five'
                        value='5'
                        onClick={(e) => getValue(e)}
                    >
                        5
                    </div>
                    <div
                        className='button'
                        id='six'
                        value='6'
                        onClick={(e) => getValue(e)}
                    >
                        6
                    </div>
                    <div
                        className='button'
                        id='add'
                        value='+'
                        onClick={(e) => getValue(e)}
                    >
                        +
                    </div>
                    <div
                        className='button'
                        id='one'
                        value='1'
                        onClick={(e) => getValue(e)}
                    >
                        1
                    </div>
                    <div
                        className='button'
                        id='two'
                        value='2'
                        onClick={(e) => getValue(e)}
                    >
                        2
                    </div>
                    <div
                        className='button'
                        id='three'
                        value='3'
                        onClick={(e) => getValue(e)}
                    >
                        3
                    </div>
                    <div
                        className='button'
                        id='equals'
                        value='='
                        onClick={(e) => getValue(e)}
                    >
                        =
                    </div>
                    <div
                        className='button'
                        id='zero'
                        value='0'
                        onClick={(e) => getValue(e)}
                    >
                        0
                    </div>
                    <div
                        className='button'
                        id='decimal'
                        value='.'
                        onClick={(e) => getValue(e)}
                    >
                        .
                    </div>
                </div>
            </div>
            <p id='signature'>
                FreeCodeCamp project <br /> Completed by{' '}
                <a href='https://github.com/the-rfer' target='_blank'>
                    _KNC
                </a>
            </p>
        </>
    );
}

export default App;
