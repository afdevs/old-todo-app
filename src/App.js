import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Todos from './Components/Todos';
import Header from './Components/Layout/Header';
import AddTodo from './Components/AddTodo';
import About from './Components/Pages/About';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state ={
    todos: [
      {
        id: uuidv4(),
        title:'Takek out the trash',
        completed:true
      },
      {
        id: uuidv4(),
        title:'Dinner with wife',
        completed:false
      },
      {
        id: uuidv4(),
        title:'Meeting with boss',
        completed:false 
      }
    ]
  }

  //Toggle Todo
  markComplete =(id)=>{
    this.setState({
      todos: this.state.todos.map(todo =>{
        if(todo.id===id){
          todo.completed= !todo.completed;
        }
        return todo;
      }) 
    });
  }

  //Delete Todo
  delTodoItem=(id)=>{
    this.setState({ todos: [...this.state.todos.filter((todo)=>{
      return todo.id !== id;
    })]
    });
  }

  //Add Todo
  addTodo= (title)=>{
    const newTodo={
      id: uuidv4(),
      title,
      completed: false
    }

    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }

  render() {
    return ( 
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props=> (
                <React.Fragment>                
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markComplete={this.markComplete} delTodoItem={this.delTodoItem} />
                </React.Fragment>
              )} 
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
