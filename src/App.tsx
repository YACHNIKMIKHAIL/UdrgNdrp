import React, {useState} from 'react';
import './App.css';

type CardType = {
    id: number
    order: number
    text: string
}

function App() {
    const [cardList, setCardList] = useState<CardType[]>([
        {id: 1, order: 3, text: 'card 3'},
        {id: 2, order: 1, text: 'card 1'},
        {id: 3, order: 2, text: 'card 2'},
        {id: 4, order: 4, text: 'card 4'},
    ])


    return (
        <div className="app">
            {cardList.map(card=><div className={'card'}>{card.text}</div>)}
        </div>
    );
}

export default App;
