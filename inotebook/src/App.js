
import './App.css';
import { useState } from "react"
import NavbarNav from './components/NavbarNav';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert'
import Login from './components/Login'
import Signup from './components/Signup'
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }
  return (
    <div className="App">
      <NoteState>
        <Router>


          <NavbarNav />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/home" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About showAlert={showAlert} />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>


            </Routes>
          </div>
        </Router>
      </NoteState>



      {/* <h1>This is iNotebook</h1>
      <p>Lorem34 </p> */}
    </div>
  );
}

export default App;
