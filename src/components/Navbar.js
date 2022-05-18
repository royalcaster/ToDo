import React from "react";
import '../App.css';

const NavBar = ({ theme, onToggleTheme }) => {
    return (
        <div className="nav-container" style={{backgroundColor: theme.background_color, borderBottomColor: theme.font_color_2}}>
            <div style={{maxWidth: "1200px", margin: "auto"}}>
                <p className="main-title" style={{color: theme.font_color_1}}>ToDo</p>

                <button className="button" onClick={() => onToggleTheme()} style={{float: "right", display: "inline", color: theme.font_color_1, backgroundColor: theme.font_color_3}}>
                    {theme.type == 'light' ? 'Darkmode' : 'Lightmode'}
                </button>
            </div>
        </div>
    )
}

export default NavBar;