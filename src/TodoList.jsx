import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
  return (
    todos.map(todo => {
        return (
        <div className='todo-text'>
            <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            <hr className='hr'/>
        </div>
        
        )
    })
  )
}
