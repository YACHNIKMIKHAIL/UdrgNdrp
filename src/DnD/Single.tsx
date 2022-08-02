import React, {useState} from 'react';

type CardType = {
    id: number
    order: number
    text: string
}
const Single = () => {
    const [cardList, setCardList] = useState<CardType[]>([
        {id: 1, order: 3, text: 'card 3'},
        {id: 2, order: 1, text: 'card 1'},
        {id: 3, order: 2, text: 'card 2'},
        {id: 4, order: 4, text: 'card 4'},
    ])
    const [currentCard, setCurrentCard] = useState<CardType | null>(null)

    const onDragStartHandler = (e: React.SyntheticEvent, card: CardType) => {
        console.log('onDragStartHandler', card)
        setCurrentCard(card)
    }
    const onDragLeaveHandler = (e: React.SyntheticEvent) => {

    }
    const onDragEndHandler = (e: React.SyntheticEvent) => {
        //@ts-ignore
        // e.target.style.background = 'white'
    }
    const onDragOverHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        //@ts-ignore
        // e.target.style.background = 'lightgray'

    }
    const onDropHandler = (e: React.SyntheticEvent, card: CardType) => {
        e.preventDefault()
        console.log('onDropHandler', card)
        setCardList(cardList.map(c => {

            return c.id === card.id && currentCard
                ? {...c, order: currentCard.order}
                : currentCard && c.id === currentCard.id
                    ? {...c, order: card.order}
                    : c
        }))
        // e.target.style.background='white'
    }

    const sortCards = (a: CardType, b: CardType) => {
        return a.order > b.order ? 1 : -1
    }

    return (
        <div className="app">
            {cardList.sort(sortCards).map(card => <div className={'card'}

                                                       key={card.id}
                                                       draggable
                                                       onDragStart={(e) => onDragStartHandler(e, card)}
                                                       onDragLeave={(e) => onDragLeaveHandler(e)}
                                                       onDragEnd={(e) => onDragEndHandler(e)}
                                                       onDragOver={(e) => onDragOverHandler(e)}
                                                       onDrop={(e) => onDropHandler(e, card)}


            >{card.text}</div>)}
        </div>
    )
};

export default Single;
