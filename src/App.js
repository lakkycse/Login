import './App.css';
// import Update from './components/update';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Registration from './components/registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import Users from './components/users';
import React from 'react'

function App() {
  return (
    <Router>
      <div className="main">
        {/* <div> */}
          <Route exact path='/registration' component={Registration} />
        {/* </div> */}
        {/* <div> */}
          <Route exact path='/' component={Login} />
        {/* </div> */}
        {/* <div style={{ marginTop: 20 }}> */}
          <Route exact path='/users' component={Users} />
        {/* </div> */}

        {/* <Route path='/update' component={Update} /> */}
      </div>
    </Router>
  );
}

export default App;
