import React, { useState } from "react";
import '../App.css';

const Task = ({id, title, theme, onChangeTitle, onDelete}) => {
    
    return (
        <div className="task-container" style={{backgroundColor: theme.font_color_3}}>
            <div style={{flexGrow: 4}}>
                <input spellCheck={false} key={"random1"} value={title} onChange={(e) => {e.preventDefault(); onChangeTitle(id, e.target.value);}} type="text" className="task-input" style={{color: theme.font_color_1}}/>
            </div>
            <button className="button-done" onClick={() => onDelete(id)}>Erledigt</button>
        </div>
    )
}

export default Task;