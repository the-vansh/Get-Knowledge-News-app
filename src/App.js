import './App.css';

import React, { useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import Login from './login/Login';
import About from './components/About';
import Signup from './signup/Signup'
import Alert from './components/Alert';
import Home from './components/Home';
import Notestate from './context/notes/Notestate';

const App = ()=> {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);

  // showAlert function

  const [alert,setAlert] = useState(null);

  const showAlert =(message,type)=>{
      setAlert({
        msg: message,
        type:type
      })

      setTimeout(()=>{
          setAlert(null);
      },1000)
  }
 //console.log("Hello Vansh");
    return (
      <>
      <div>
        <Notestate>
      <Router>
        <NavBar/> 
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
       />
       
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}/>
          <Route exact path="/business"element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}/>
          <Route exact path="/entertainment" element={ <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
          <Route exact path="/TakeNote" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} /> 
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} /> 
        </Routes>
        </Router>
        </Notestate>
        <Alert alert={alert}/>
      </div>
      </>
    )
 
}

export default App;