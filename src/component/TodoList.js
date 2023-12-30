import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './Todo'
import TodoForm from './TodoForm'
import TodosFiltered from './TodosFiltered'

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [clearEdit, setClearEdit] = useState(false);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
      const fetchData = async () => {
        axios.get(`${baseUrl}/todo/`)
        .then((res)=> {
          const newData = res.data;
          setTodos(newData);
        })
        .catch((err)=> console.log('error',err));
      };
    
      fetchData();
    }, []);

    const addTodo = todo => {
      if (!todo.title || /^\s*$/.test(todo.tile)) {
        return;
      }
      axios.post(`${baseUrl}/todo/`,{
        title: todo.title
      })
      .then((res)=> console.log('dfdf',res))
      .catch((err)=> console.log('error',err));
      let newTodos;
      if(todos.length){
        newTodos = [todo, ...todos];
      }
      else{
        newTodos = [todo];
      }
      
      setTodos(newTodos);
    };
  
    const updateTodo = (todoId, newValue) => {
      if (!newValue.title || /^\s*$/.test(newValue.title)) {
        return;
      }
      axios.put(`${baseUrl}/todo/${todoId}`,{
        title: newValue.title
      })
      .then((res)=> console.log('dfdf',res))
      .catch((err)=> console.log('error',err));
      setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };
  
    const removeTodo = id => {
      axios.delete(`${baseUrl}/todo/${id}`)
      .then((res)=> console.log('dfdf',res))
      .catch((err)=> console.log('error',err));
      const removedArr = [...todos].filter(todo => todo.id !== id);
  
      setTodos(removedArr);
    };
  
    const completeTodo = id => {
      let updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
          axios.put(`${baseUrl}/todo/${id}/status/`,{
            isCompleted: todo.isCompleted
          })
          .then((res)=> console.log('dfdf',res))
          .catch((err)=> console.log('error',err));
        }
        return todo;
      });
      setTodos(updatedTodos);
    };

    const updateFilter = async(type) =>{
      
      setClearEdit(true);

      let filteredArray = [];
      let newData = [];
      axios.get(`${baseUrl}/todo/`)
        .then((res)=> {
          newData = res.data;
          if(type.toLowerCase() === 'all'){
            return setTodos(newData);
           }
           else if(type.toLowerCase() === 'active'){
             filteredArray = [...newData].filter(todo => todo.isCompleted === false);
     
           }
           else{
             filteredArray = [...newData].filter(todo => todo.isCompleted === true);
     
           }
           setTodos(filteredArray)
        })
        .catch((err)=> console.log('error',err));
      
    } 

    const searchTodo = (prop) => { 
      axios.get(`${baseUrl}/todo/`)
        .then((res)=> {
          const newData = res.data;
          setTodos(newData.filter((todo) => todo.title.toLowerCase().includes(prop.title.toLowerCase()))); 
        })
        .catch((err)=> console.log('error',err));
    }

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} onSearch={searchTodo}/>
      <div className='list-box'>
        <Todo 
        todos={todos}
        clearEdit={clearEdit}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
            updateTodo={updateTodo}
        />
     </div>
     <div>
        <TodosFiltered updateFilter={updateFilter}/>
     </div>
    </div>
  )
}

export default TodoList