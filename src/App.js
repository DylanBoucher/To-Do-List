import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import "./style.css"
//This generates a random id
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //Make sure to not have the <React.StrictMode></React.StrictMode> wrapper in the index.js file or the useEffect functions wont wont work.
  useEffect(() => {
    const storedTodos = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <h1 className="title">To Do List</h1>
      <div className="input-div">
        <input ref={todoNameRef} type='text' className="input"/>
      </div>
      <div className="buttons">
        <button onClick={handleAddTodo}>Add</button>
        <button onClick={handleClearTodos}>Clear Completed</button>
      </div>
      <div className="todo">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
      <footer className="left-to-do">
        <p className="items-left">{todos.filter(todo => !todo.complete).length} items left to complete</p>
      </footer>
    </>
  )
}

export default App;
