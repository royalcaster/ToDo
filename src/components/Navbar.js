import React from "react";
import '../App.css';

const NavBar = ({ user, theme, onHandleLogin, onHandleLogout, onToggleTheme }) => {
    return (
        <div className="nav-container" style={{backgroundColor: theme.background_color, borderBottomColor: theme.font_color_2}}>
            <div style={{maxWidth: "1200px", margin: "auto"}}>
                <p className="main-title" style={{color: theme.font_color_1}}>
                    &nbsp;ToDo
                </p>

                <button onClick={() => {!user? onHandleLogin() : onHandleLogout()}} style={{float: "right", display: "inline", color: theme.font_color_1, backgroundColor: user ? "#de5246" : "#4c8bf5"}} className="button">
                    {!user? 
                        <>
                            <span className="material-symbols-outlined icon" style={{fontSize: "12pt", marginBottom: "2px"}}>login</span>
                            &nbsp;Sign in
                        </> : 
                        <>
                            <span className="material-symbols-outlined icon" style={{fontSize: "12pt", marginBottom: "2px"}}>logout</span>
                            &nbsp;Sign Out
                        </>
                            }
                </button>

                <button onClick={() => onToggleTheme()} style={{float: "right", display: "inline", color: theme.font_color_1, backgroundColor: theme.font_color_3}} className="button">
                    {theme.type === 'light' ? 
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