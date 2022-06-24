import { useState } from 'react';
import './App.css';

//eigene Komponenten
import NavBar from './components/Navbar';
import Task from './components/Task';
import Done from './components/Done';

//Package zum Generieren von IDs
import uuid from 'react-uuid';


function App() {

  //Farbschemen für Light und Darkmode
  const light = {
    type: "light",
    background_color: "white",
    font_color_1: "#1E1E1E",
    font_color_2: "rgba(0,0,0,0.5)",
    font_color_3: "rgba(0,0,0,0.15)",
    track_color: "rgba(0,0,0,0.15)",
    thumb_color: "rgba(0,0,0,0.25)"
  }

  const dark = {
    type: "dark",
    background_color: "#1E1E1E",
    font_color_1: "white",
    font_color_2: "rgba(255,255,255,0.5)",
    font_color_3: "rgba(255,255,255,0.2)",
    track_color: "rgba(255,255,255,0.15)",
    thumb_color: "rgba(255,255,255,0.5)"
  }

  //States für Farbschema und Aufgabenliste
  const [theme, setTheme] = useState(dark);
  const [tasks, setTasks] = useState([]);

  //fügt Neue Aufgabe an 0. Stelle im Tasks-Array hinzu
  const addTask = () => {
    setTasks([{
      id: uuid(),
      title: "New task"
    },...tasks]);
  }

  //aktualisiert den Tasks-Array jedes mal, wenn eine Eingabe getätigt wird
  const changeTitle = (id, title) => {
    var tasks_buffer = [...tasks];
    for (var i = 0; i<tasks_buffer.length; i++) {
      if (tasks_buffer[i].id === id) {
        tasks_buffer[i].title = title;
        setTasks(tasks_buffer);
      }
    }
  }

  //wechselt zu Dark-/Lightmode
  const onToggleTheme = () => {
    /* Musste hier einen kleinen Umweg über das document-Objekt einschlagen, 
    um die Scrollbar dem Farbschema anzupassen,
    da man sie nicht über Inline-CSS ansprechen kann */
    if (theme.type == 'light') {
      setTheme(dark);
      document.documentElement.style.setProperty("--track_color", dark.track_color)
      document.documentElement.style.setProperty("--thumb_color", dark.thumb_color)
    }
    else  {
      setTheme(light);
      document.documentElement.style.setProperty("--track_color", light.track_color)
      document.documentElement.style.setProperty("--thumb_color", light.thumb_color)
    }
  }

  //löscht einzelne Aufgabe
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id != id));
  }

  //leert gesamten Tasks-Array
  const clearTasks = () => {
    var elements = document.getElementsByClassName("task-container");
    for (var i = 0; i<elements.length; i++) {
      elements[i].classList.add("delete-task");
    }
    setTimeout(() => setTasks([]),200);
    /* Mit setTimeout() zu arbeiten, ist selbstverständlich nicht "Best Practice",
    aber ich wollte nicht erst noch eine Animations-Bibliothek mit ins Boot holen.
    In React Native z.B. geben die Animationen einen Callback,
    sobald diese fertig ausgeführt worden sind.*/
  }

  return (
    <div className="App" style={{backgroundColor: theme.background_color}}>

      <NavBar theme={theme} onToggleTheme={onToggleTheme}/>

      <button 
        onClick={addTask}
        className="button create-list">
          <i className="material-icons icon">&#xe03b;</i>&nbsp;&nbsp;Add task
      </button>

      <div className="content-container">
        {tasks.length == 0 ? <Done theme={theme}/> :
          <>
            {tasks.map(task => {
              return <Task key={task.id} id={task.id} title={task.title} theme={theme} onChangeTitle={changeTitle} onDelete={deleteTask}/>
            })}
          </>
        }
      </div>

      {tasks.length == 0 ? null 
      : <button className='button clear-list' onClick={() => clearTasks()}>
          <i className="material-icons icon" style={{marginBottom: "3px"}}>&#xe16c;</i>
          &nbsp;Clear all
      </button>}

      <p style={{color: theme.font_color_2, position: "absolute", bottom: 0, left: 30, fontSize: "10pt"}}>
        &copy; Gabriel Pechstein 2022
      </p>

    </div>
  );
}

export default App;
