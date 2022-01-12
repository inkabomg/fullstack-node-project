import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import UserComponent from './User';
import AdminComponent from './Admin';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <ul>
              <li className="nav-item">
                <Link to="/">USER</Link>
              </li>
              <li className="last-nav-item">
                <Link to="/admin">ADMIN</Link>
              </li>
            </ul>

          <Routes>
            <Route path="/" element={<UserComponent/>} />
            <Route path="admin" element={<AdminComponent />} />
            <Route path="*" element={<h1>Do not do that!</h1>} />
          </Routes>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
