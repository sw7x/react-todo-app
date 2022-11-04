import React from 'react';
import logo from './logo.svg';
import './App.css';


import Todo from 'Todo/Todo.js';

class App extends React.Component{
  
    state = {
        typeText : ''
    }

    render(){    
        return (
            <React.Fragment>
                <div className="app">
                    <Todo />
                </div>
            </React.Fragment>

        )
    }
}

export default App;
