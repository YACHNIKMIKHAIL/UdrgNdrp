import React, {useState} from 'react';
import {v1} from 'uuid';
import './../App.css';


const initialState: BoardType[] = [
    {
        id: v1(), title: 'What to do?', items: [
            {id: v1(), title: 'Go to shop'},
            {id: v1(), title: 'Clear room'}
        ]
    },
    {
        id: v1(), title: 'What to check?', items: [
            {id: v1(), title: 'Code review'},
            {id: v1(), title: 'Task for DnD'}
        ]
    },
    {
        id: v1(), title: 'What is done?', items: [
            {id: v1(), title: 'Call to detka'},
            {id: v1(), title: 'Wrote app '}
        ]
    }
]
type ItemType = {
    id: string
    title: string
}
type BoardType = {
    id: string
    title: string
    items: ItemType[]
}
const Difficult = () => {
    const [boards, setBoards] = useState<any>(initialState)
    const [currentBoard, setCurrentBoard] = useState<any>(null)
    const [currentItem, setCurrentItem] = useState<any>(null)

    const onDragItemStartHandler = (e: React.SyntheticEvent, board: BoardType, card: ItemType) => {
        setCurrentBoard(board)
        setCurrentItem(card)
    }
    const onDragItemLeaveHandler = (e: any) => {
        e.target.style.boxShadow = 'none'

    }
    const onDragItemEndHandler = (e: any) => {
        e.target.style.boxShadow = 'none'
    }
    const onDragItemOverHandler = (e: any) => {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray '
        }

    }
    const onDropItemHandler = (e: React.SyntheticEvent, board: BoardType, card: ItemType) => {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(card)
        board.items.splice(dropIndex + 1, 0, currentItem)

        setBoards(boards.map((b: BoardType) => {
            if (b) {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }
        }))
    }

    const onDropCardHandler = (e: any, board: any) => {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map((b: BoardType) => {
            if (b?.id === board.id) {
                return board
            }
            if (b?.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }

    const sortBoards = (a: BoardType, b: BoardType) => {
        return a.id > b.id ? 1 : -1
    }
    const onDragStartBoardHandler = (e: React.SyntheticEvent, board: BoardType) => {
        setCurrentBoard(board)
    }
    const onDropBoardHandler = (e: React.SyntheticEvent, board: BoardType) => {
        e.preventDefault()
        setBoards(boards.map((b: BoardType) => {
                if (b.id === board.id) {
                    return {...b, id: currentBoard.id}
                }
                if (b.id === currentBoard.id) {
                    return {...b, id: board.id}
                }
                return b
            }
        ))
    }
    return (
        <div className={'app'}>
            {boards.sort(sortBoards).map((board: BoardType) => {
                return <div className={'board'} key={board?.id}
                            onDragStart={(e) => onDragStartBoardHandler(e, board)}
                            onDragOver={(e) => onDragItemOverHandler(e)}
                            onDrop={(e) => {
                                onDropCardHandler(e, board)
                            }}
                >
                    <div className={'board__title'}>
                        {board?.title}
                    </div>
                    {board.items.map(item => {
                            return <div className={'item'} key={item.id}
                                        draggable
                                        onDragStart={(e) => onDragItemStartHandler(e, board, item)}
                                        onDragLeave={(e) => onDragItemLeaveHandler(e)}
                                        onDragEnd={(e) => onDragItemEndHandler(e)}
                                        onDragOver={(e) => onDragItemOverHandler(e)}
                                        onDrop={(e) => onDropItemHandler(e, board, item)}
                            >
                                {item.title}
                            </div>
                        }
                    )}
                </div>
            })
            }
        </div>
    );
};

export default Difficult;
