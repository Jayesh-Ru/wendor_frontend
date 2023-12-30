import React from 'react';


function TodosFiltered({ updateFilter}){
  return (
    <div className='bottom-box'>
      <button
        onClick={() => updateFilter('all')}
        className='btm-button'
      >
        All
      </button>

      <button
        onClick={() => updateFilter('active')}
        className='btm-button'
      >
        Active
      </button>

      <button
        onClick={() => updateFilter('completed')}
        className='btm-button'
      >
        Completed
      </button>
    </div>
  );
}


export default TodosFiltered;