import React, {useState} from 'react';
import './../App.css';


const initialState: BoardType[] = [
    {
        id: 1, title: 'What to do?', items: [
            {id: 1, title: 'Go to shop'},
            {id: 2, title: 'Clear room'}
        ]
    },
    {
        id: 2, title: 'What to check?', items: [
            {id: 3, title: 'Code review'},
            {id: 4, title: 'Task for DnD'}
        ]
    },
    {
        id: 3, title: 'What is done?', items: [
            {id: 5, title: 'Call to detka'},
            {id: 6, title: 'Wrote app '}
        ]
    }
]
type ItemType = {
    id: number
    title: string
}
type BoardType = {
    id: number
    title: string
    items: ItemType[]
}
const Difficult = () => {
    const [boards, setBoards] = useState<BoardType[]>(initialState)
    return (
        <div className={'app'}>
            {boards.map(board =>
                <div className={'board'} key={board.id}>
                    <div className={'board__title'}>
                        {board.title}
                    </div>
                    {board.items.map(item =>
                        <div className={'item'} key={item.id}>
                            {item.title}
                        </div>
                    )}
                </div>)}
        </div>
    );
};

export default Difficult;
