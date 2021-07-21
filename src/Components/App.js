import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  componentDidMount = () => {
    fetch(`${process.env.REACT_APP_API}/users/2`)
      .then(res => res.json())
      .then(user => document.getElementById('name').innerHTML = user.name)
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id='name'></div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
