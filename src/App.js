import { useEffect, useState } from 'react';
import './App.css';

//eigene Komponenten
import NavBar from './components/Navbar';
import Task from './components/Task';
import Done from './components/Done';
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

  //States für Aufgabenliste und Farbschema
  const [user, setUser] = useState()
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(dark);

  useEffect(() => {
    checkForUser()
  }, []);

  //fügt Neue Aufgabe an 0. Stelle im Tasks-Array hinzu
  const addTask = () => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    .then((response) => response.json())
    .then((json) => {
      let userdata = json[getRandomInt(1,20)];
      setTasks([{
        id: uuid(),
        title: userdata.title
      },...tasks]);
    });
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
    if (theme.type === 'light') {
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
    setTasks(tasks.filter(task => task.id !== id));
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

  const checkForUser = () => {

    let username = getCookie("username")
    let email = getCookie("email")

    console.log(email)

    if (username != null && email != null) {
      setUser({
        username: username,
        email: email
      })
    }
  }

  const handleLogin = () => {
    loadRandomUser()
  }

  const handleLogout = () => {
    setUser(null)
    deleteCookie("username");
    deleteCookie("email")
  }

  const loadRandomUser = () => {
    fetch('https://jsonplaceholder.typicode.com/users/' + getRandomInt(1,10))
      .then(response => response.json())
      .then(json => {
        setUser(json);
        document.cookie = "username=" + json.username + ";";
        document.cookie = "email=" + json.email + ";";
      })
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  }

  var deleteCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  return (
    <div className="App" style={{backgroundColor: theme.background_color}}>

      <NavBar user={user} theme={theme} onHandleLogin={handleLogin} onHandleLogout={handleLogout} onToggleTheme={onToggleTheme}/>

      <div style={{display: "flex", flexDirection: "column"}}>

        <div className="username_container" style={{flex: 1}}>
            <p className="username" style={{color: theme.font_color_1}}>{user ? user.username : "Guest"}</p>
            <br></br>
            <p className="email" style={{color: theme.font_color_1}}>{user ? user.email : null}</p>
        </div>

        <div style={{flex: 1, display: "flex", flexDirection: "row", maxWidth: "700px", minWidth: "400px", alignSelf: "center"}}>
          <div style={{flex: 1}}>
            <button
              onClick={addTask}
              className="button create-list"
              style={{color: theme.font_color_1}}>
                <i className="material-icons icon">&#xe03b;</i>&nbsp;&nbsp;Add task
            </button>
          </div>

          <div style={{flex: 1}}>
            {tasks.length === 0 ? null 
            : <button className='button clear-list' onClick={() => clearTasks()}>
                <i className="material-icons icon" style={{marginBottom: "3px"}}>&#xe16c;</i>
                &nbsp;Clear all
            </button>}
          </div>
        </div>

      </div>

      <div className="content-container">
        {tasks.length === 0 ? <Done theme={theme}/> :
          <>
            {tasks.map(task => {
              return <Task key={task.id} id={task.id} title={task.title} theme={theme} onChangeTitle={changeTitle} onDelete={deleteTask}/>
            })}
          </>
        }
      </div>

      <p style={{color: theme.font_color_2, position: "absolute", bottom: 0, left: 30, fontSize: "10pt"}}>
        &copy; Gabriel Pechstein 2023
      </p>

    </div>
  );
}

export default App;
