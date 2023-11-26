import React from 'react'
import './RenderSubtask.css';

export default function RenderSubtasks({ subtask }) {
    return (
        <div className='subtask-box'>
            {subtask.isComplete == "1" ?
                <div className='sub-icon-box'>
                    <i className="fa-regular fa-square-check"></i>
                </div>
                :
                <div className='sub-icon-box'>
                    <i className="fa-regular fa-square"></i>
                </div>
            }
            <h2 className='sub-title'>
                {subtask.title}
            </h2>
        </div>
    )
}
