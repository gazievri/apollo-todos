import './AddTodo.sass';
import { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO, ALL_TODOS } from '../../apollo/todos';

const AddTodo = ({ isOpened, setIsOpened }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const [addTodo, { error }] = useMutation(ADD_TODO, {
    update(cache, {data: {newTodo} }) {
      const {todos} = cache.readQuery({query: ALL_TODOS});

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: [newTodo, ...todos]
        }
      })
    }
  });
 
  if (error) {
    return <h2>Ups...</h2>;
  }

  // Обработчик добавления новой задачи
  const handleAddTodo = () => {
    if (value.trim().length) {
      addTodo({
        variables: {
            title: value,
            completed: false,
            user_id: 123
        },
      });
      setValue('');
      setIsOpened(false);
    }
  };

  // Обновляю значение в стейте при вводе символов в инпут
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Обработчик нажатия на клавишу enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  // Обработчик закрытия модлаьного окна при клике по оверлею
  const handleClickOnOverlay = (e) => {
    if (e.currentTarget === e.target) setIsOpened(false);
  };


  return (
    <div
      className={`add-todo ${isOpened && 'add-todo_opened'}`}
      onClick={handleClickOnOverlay}
    >
      <div className="add-todo__container">
        <h2 className="add-todo__title">Add Todo</h2>
        <input
          className="add-todo__input"
          value={value}
          onChange={handleChange}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <div className="add-todo__icon"></div>
        <button type="button" className="add-todo__btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
