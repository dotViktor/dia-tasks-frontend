import React from 'react'
import './RenderSubtask.css';

export default function RenderSubtasks({ subtask }) {
    return (
        <div className='subtask-box'>
            <div className='sub-icon-container'>
                {subtask.isComplete == "1" ?
                    <div className='sub-icon-box'>
                        <i className="fa-regular fa-square-check"></i>
                    </div>
                    :
                    <div className='sub-icon-box'>
                        <i className="fa-regular fa-square"></i>
                    </div>
                }
            </div>
            <div className='sub-title-container'>
                <h2 className='sub-title'>
                    {subtask.title}
                </h2>
            </div>
        </div>
    )
}
