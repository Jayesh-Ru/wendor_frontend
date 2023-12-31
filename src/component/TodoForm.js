
import React,{useState, useEffect, useRef} from 'react'

const TodoForm = (props) => {
    
    const [input,setInput]=useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    
      useEffect(() => {
        inputRef.current.focus();
      });

        const handleChange=e=>{
            setInput(e.target.value);
        }
    
    
       const handleSubmit=e=>{
        e.preventDefault();
        var id = null;
        if(props.edit){
         id = props.edit.id;
        }
        props.onSubmit({
            id: id ,
            title:input
        });
        setInput('');
    };
    const handleSearch = e =>{
      e.preventDefault();

      props.onSearch({
          title:input
      });
    };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
             {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
          <button className='todo-button search-btn' onClick={handleSearch}> Search</button>

        </>
      )}
        </form>
  )
}

export default TodoForm