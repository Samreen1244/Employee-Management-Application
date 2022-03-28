import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import cec from './components/cec';
import background from "./img/bgblue.jpg";


function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
            <p>
              <div style={{ backgroundImage: `url(${background})`} }>
                   <div className="container">
                   <Switch> 
                   {/*<img src={img} alt="this is car image" />*/}
                    <Route path = "/login" exact component = {cec}></Route>
                    <Route path = "/add-login/:id" exact component = {CreateEmployeeComponent}></Route>
                          <Route path = "/" exact component = {ListEmployeeComponent}></Route>
                          <Route path = "/employees" component = {ListEmployeeComponent}></Route>
                          <Route path = "/add-employee/:id" component = {CreateEmployeeComponent}></Route>
                          {/*<Route path = "/view-employee/:id" component = {CreateEmployeeComponent}></Route>*/}
                          <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                          {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                          
                    </Switch>
                    </div>
                    <br></br>.</div></p>
              <FooterComponent />
        </Router>
    </div>
   
  );
}

export default App;
