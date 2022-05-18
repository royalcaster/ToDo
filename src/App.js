import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/Navbar';

//Node-Package zum erstellen von IDs
import uuid from 'react-uuid';
import Task from './components/Task';

function App() {

  //Styles für Light und Darkmode
  const light = {
    type: "light",
    background_color: "white",
    font_color_1: "#1E1E1E",
    font_color_2: "rgba(0,0,0,0.5)",
    font_color_3: "rgba(0,0,0,0.15)"
  }

  const dark = {
    type: "dark",
    background_color: "#1E1E1E",
    font_color_1: "white",
    font_color_2: "rgba(255,255,255,0.5)",
    font_color_3: "rgba(255,255,255,0.2)"
  }

  const [theme, setTheme] = useState(light);

  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks,{
      id: uuid(),
      title: "Neue Aufgabe"
    }]);
  }

  const changeTitle = (id, title) => {
    
    var tasks_buffer = [...tasks];
    for (var i = 0; i<tasks_buffer.length; i++) {
      if (tasks_buffer[i].id === id) {
        tasks_buffer[i].title = title;
        setTasks(tasks_buffer);
      }
    }
  }

  const onToggleTheme = () => {
    theme.type === 'light' ? setTheme(dark) : setTheme(light);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id != id));
  }

  return (
    <div className="App" style={{backgroundColor: theme.background_color}}>
      <NavBar theme={theme} onToggleTheme={onToggleTheme}/>

      {//div mit fixer höhe, damit der Content nicht unter die Navbar rutscht
      }
      <div style={{height: "100px"}}></div>

      <div className="content-container">

        {tasks.length == 0 ? <p className='done-text' style={{color: theme.font_color_1}}>Sehr gut, alles erledigt!</p> :
        tasks.map(task => {
          return <Task key={task.id} id={task.id} title={task.title} theme={theme} onChangeTitle={changeTitle} onDelete={deleteTask}/>
        })
        }

      </div>

      <button onClick={addTask} className="button create-list" style={{transform: "translate(-50%,0)", left: "50%", position: "relative"}}>Aufgabe hinzufügen</button>

    </div>
  );
}

export default App;
