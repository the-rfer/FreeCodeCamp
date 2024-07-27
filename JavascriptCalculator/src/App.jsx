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
            console.log('spoted a minus');

            if (
                currentValue[currentValue.length - 2] === '*' ||
                currentValue[currentValue.length - 2] === '/'
            ) {
                let newValue = currentValue.slice(0, -2) + '+';
                console.log('novo valor', newValue);
                setCurrentValue(newValue);
            } else {
                let newValue = currentValue.slice(0, -1) + '+';
                setCurrentValue(newValue);
            }
        } else {
            setCurrentValue(currentValue + argument);
            setResult(null);
        }

        // TODO: FIX AUTO CALC DEVE APRESENTAR RESULT SEM SEQUER CLICAR =; CORRIGIR SITUAÇÃO COM ENTRADA DE /*-+ EM SITUAÇÕES EM QUE JA EXISTEM ESSES SIMBOLOS ANTES; REAVALIAR AS NESTED ELSE IFS QUE INCLUI

        // APENAS 13 ainda produz erro 5 * - + 5 = 10 e ta a resultar em -25
        // outros testes apresentam erro mas dão certo somehow
    };

    return (
        <>
            <div id='calculator'>
                <div id='display'>
                    {result !== null ? result : currentValue}
                </div>
                <div id='button-group'>
                    {/* 4*5 grid */}
                    <div id='clear' value='clear' onClick={(e) => getValue(e)}>
                        AC
                    </div>
                    <div id='divide' value='/' onClick={(e) => getValue(e)}>
                        /
                    </div>
                    <div id='multiply' value='*' onClick={(e) => getValue(e)}>
                        X
                    </div>
                    <div id='seven' value='7' onClick={(e) => getValue(e)}>
                        7
                    </div>
                    <div id='eight' value='8' onClick={(e) => getValue(e)}>
                        8
                    </div>
                    <div id='nine' value='9' onClick={(e) => getValue(e)}>
                        9
                    </div>
                    <div id='subtract' value='-' onClick={(e) => getValue(e)}>
                        -
                    </div>
                    <div id='four' value='4' onClick={(e) => getValue(e)}>
                        4
                    </div>
                    <div id='five' value='5' onClick={(e) => getValue(e)}>
                        5
                    </div>
                    <div id='six' value='6' onClick={(e) => getValue(e)}>
                        6
                    </div>
                    <div id='add' value='+' onClick={(e) => getValue(e)}>
                        +
                    </div>
                    <div id='one' value='1' onClick={(e) => getValue(e)}>
                        1
                    </div>
                    <div id='two' value='2' onClick={(e) => getValue(e)}>
                        2
                    </div>
                    <div id='three' value='3' onClick={(e) => getValue(e)}>
                        3
                    </div>
                    <div id='equals' value='=' onClick={(e) => getValue(e)}>
                        =
                    </div>
                    <div id='zero' value='0' onClick={(e) => getValue(e)}>
                        0
                    </div>
                    <div id='decimal' value='.' onClick={(e) => getValue(e)}>
                        .
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
