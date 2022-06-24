import React from "react";
import '../App.css';

const NavBar = ({ theme, onToggleTheme }) => {
    return (
        <div className="nav-container" style={{backgroundColor: theme.background_color, borderBottomColor: theme.font_color_2}}>
            <div style={{maxWidth: "1200px", margin: "auto"}}>
                <p className="main-title" style={{color: theme.font_color_1}}>
                    <i className="material-icons icon" style={{fontSize: "30pt", marginBottom: "5px"}}>&#xe235;</i>
                    &nbsp;ToDo
                </p>

                <button onClick={() => onToggleTheme()} style={{float: "right", display: "inline", color: theme.font_color_1, backgroundColor: theme.font_color_3}} className="button">
                    {theme.type == 'light' ? 
                        <>
                            <i className="material-icons icon" style={{fontSize: "12pt", marginBottom: "2px"}}>&#xe3a8;</i>
                            &nbsp;Darkmode
                        </> : 
                        <>
                            <i className="material-icons icon" style={{fontSize: "12pt", marginBottom: "2px"}}>&#xe430;</i>
                            &nbsp;Lightmode
                        </>
                            }
                </button>
            </div>
        </div>
    )
}

export default NavBar;