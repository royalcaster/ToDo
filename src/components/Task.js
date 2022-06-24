import React from "react";
import '../App.css';

const Task = ({ id, title, theme, onChangeTitle, onDelete }) => {

    const handleDelete = () => {
        document.getElementById(id).classList.add("delete-task");
        setTimeout(() => onDelete(id),300);
    }
    
    return (
        <div id={id} className="task-container" style={{backgroundColor: theme.font_color_3}}>
            <div style={{flexGrow: 4}}>
                <input spellCheck={false} key={"random1"} value={title} onChange={(e) => {e.preventDefault(); onChangeTitle(id, e.target.value);}} type="text" className="task-input" style={{color: theme.font_color_1}}/>
            </div>

            <button className="button-done" onClick={() => handleDelete()}>
                <i class="material-icons icon" style={{fontSize: "12pt", marginBottom: "2px"}}>&#xe5ca;</i>
                &nbsp;Done
            </button>
        </div>
    )
}

export default Task;