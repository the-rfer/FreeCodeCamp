import { getQuotes } from './api/quotes';
import { useState, useEffect } from 'react';

function App() {
    const [quoteList, setQuoteList] = useState([]);

    const [quote, setQuote] = useState(null);

    const [isFading, setIsFading] = useState(false);

    const randomQuote = () => {
        setIsFading(true);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quoteList.length);
            setQuote(quoteList[randomIndex]);

            const randomColor = Math.floor(Math.random() * 0xffffff).toString(
                16
            );
            document.documentElement.style.setProperty(
                '--fill-color',
                `#${randomColor.padStart(6, '0')}`
            );

            setIsFading(false);
        }, 500);
    };

    useEffect(() => {
        getQuotes().then((quotes) => {
            setQuoteList(quotes);
        });
        console.log(
            'Find the code repo at: https://github.com/the-rfer/FreeCodeCamp/tree/main/RandomQuoteMachine'
        );
    }, []);

    useEffect(() => {
        randomQuote();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quoteList]);

    if (!quote) return <div>Loading...</div>;

    return (
        <>
            <div id='quote-box'>
                <div id='text' className={isFading ? 'fade-out' : 'fade-in'}>
                    <svg
                        id='quotations'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                        width={50}
                        height={50}
                    >
                        <path d='M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z' />
                    </svg>
                    <span>{quote.quote}</span>
                </div>
                <div id='author' className={isFading ? 'fade-out' : 'fade-in'}>
                    &#8212; {quote.author}
                </div>
                <div id='buttons'>
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            quote.quote
                        )}`}
                        target='_blank'
                        id='tweet-quote'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 512 512'
                            width={20}
                            height={20}
                        >
                            <path d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z' />
                        </svg>
                    </a>
                    <button id='new-quote' onClick={() => randomQuote()}>
                        New quote
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
