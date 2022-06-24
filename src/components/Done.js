import React from "react";
import '../App.css';

const Done = ({ theme }) => {
    
    return (
        <div className="done-container" style={{display: "block", top: "50%", left: "50%", position: "absolute", transform: "translate(-50%,-50%)"}}>
          <i className="material-icons" style={{fontSize: "50pt", color: theme.font_color_3, textAlign: 'center', width: "100%"}}>&#xe541;</i>
          <p className='done-text' style={{color: theme.font_color_2}}>Good job, you're done!</p>
        </div>
    )
}

export default Done;