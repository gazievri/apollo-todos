import './TodoItem.sass';
import { useRef } from 'react';

const TodoItem = (props) => {
  const { id, title, completed, onToggle, onDelete } = props;

  const checkboxRef = useRef(null);

  const handleClickFakeCheckbox = () => {
    checkboxRef.current?.click();
  };

  // Обработка изменения статуса todo
  const handleToggleStatusTodo = (id) => {
    onToggle({
      variables: {
        id: id,
        completed: !completed,
      },
    });
  };

  // Удаление todo
  const handleDeleteTodo = (id) => {
    onDelete({
      variables: {
        id: id,
      },
    });
  };

  return (
    <li className={`todo__container ${completed && 'todo__container_done'}`}>
      <input
        className="todo__checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => handleToggleStatusTodo(id)}
        ref={checkboxRef}
      />
      <div
        className={
          completed ? 'todo__fake-checkbox_clicked' : 'todo__fake-checkbox'
        }
        onClick={handleClickFakeCheckbox}
      />
      <p className={`todo__text ${completed && 'todo__text_done'}`}>{title}</p>
      <button
        className="todo__delete-btn"
        onClick={() => handleDeleteTodo(id)}
        type="button"
      />
    </li>
  );
};

export default TodoItem;
