import React, {useState} from 'react';

const Download = () => {
    const [drag, setDrag] = useState<boolean>(false)
    const onDragStarthandler = (e: any) => {
        e.preventDefault()
        setDrag(true)
    }
    const onDragLeaveHandler = (e: any) => {
        e.preventDefault()
        setDrag(false)
    }
    const onDropHandler = (e: any) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        setDrag(false)
        const formData = new FormData()
        formData.append('file', files[0])

        alert (`File: ${files[0].name} is sended!`)
    }
    return (
        <div className={'app'}>
            {drag
                ? <div className={'drop-area'}
                       onDragStart={e => onDragStarthandler(e)}
                       onDragLeave={e => onDragLeaveHandler(e)}
                       onDragOver={e => onDragStarthandler(e)}
                       onDrop={e => onDropHandler(e)}
                >Drop file for download it</div>
                : <div
                    onDragStart={e => onDragStarthandler(e)}
                    onDragLeave={e => onDragLeaveHandler(e)}
                    onDragOver={e => onDragStarthandler(e)}
                >Drag file for download it</div>
            }
        </div>
    );
};

export default Download;
