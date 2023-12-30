import React,{useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import defaultPNG from '../default.png'


function Todo({ todos,clearEdit, completeTodo, removeTodo, updateTodo}) {
  const [edit,setEdit]=useState({
    id:null,
    value:''
  })
  useEffect(() => {
    setEdit({id: null, value: ''})
  }, [clearEdit]);


  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return(
    !todos.length?
      <>
      <div>
        <h1>NO TO-DO TASKS</h1>
        <img src={defaultPNG} height="420px" width="500px" alt='NO TASKS FOUND'/>
      </div>
      </>:
      <>
      {
      todos.map((todo, index) => (
      <div
        className={todo.isCompleted ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        <div key={todo.id}>
        <input type="checkbox" id="topping" defaultChecked={todo.isCompleted? 'checked': ''} style={{ "marginRight": "5px","cursor": "pointer"}} onClick={() => completeTodo(todo.id)}/>
          {todo.title}
        </div>
        <div className='icons'>
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className='delete-icon'
          />
          <TiEdit
            onClick={() => {setEdit({ id: todo.id, value: todo.title })}}
            className='edit-icon'
          />
        </div>
      </div>
    ))}</>
  )
};

export default Todo