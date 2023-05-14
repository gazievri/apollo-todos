import './Main.sass';
import { useState } from 'react';
import TodoList from '../../components/TodoList.tsx/TodoList.jsx';
import AddTodo from '../../components/AddTodo/AddTodo.jsx';
import { useQuery } from '@apollo/client';
import { ALL_TODOS } from '../../apollo/todos';

const Main = () => {
  const [isOpened, setIsOpened] = useState(false);

  const [variables, setVariables] = useState({
    variables: {
      sortField: 'completed',
    },
  });

  const { data } = useQuery(ALL_TODOS);

  // Обработка клика по кнопке открыть модальное окно Добавление нового todo
  const handleOpenAddTodo = () => {
    setIsOpened(true);
  };

  // Применение фильтров с запросом на сервер
  const handleClickFilter = (key) => {
    if (key === 'done') {
      setVariables({
        variables: {
          sortField: 'completed',
          filter: {
            completed: true,
          },
        },
      });
    } else if (key === 'todo') {
      setVariables({
        variables: {
          sortField: 'completed',
          filter: {
            completed: false,
          },
        },
      });
    } else {
      setVariables({
        variables: {
          sortField: 'completed',
        },
      });
    }
  };

  return (
    <section className="main">
      <div className="main__header">
        <div className="main__filters">
          <button
            type="button"
            className="main__filter"
            onClick={() => handleClickFilter('')}
          >
            All
          </button>
          <button
            type="button"
            className="main__filter"
            onClick={() => handleClickFilter('todo')}
          >
            Todo
          </button>
          <button
            type="button"
            className="main__filter"
            onClick={() => handleClickFilter('done')}
          >
            Done
          </button>
        </div>
        <div className="main__info">
          <div className="main__info-icon" />
          {data?.todos ? (
            <h2 className="main__info-data">{`${
              data.todos.filter((item) => item.completed === true).length
            } / ${data.todos.length}`}</h2>
          ) : (
            <h2 className="main__info-data">0 / 0</h2>
          )}

          <button
            className="main__add-btn"
            type="button"
            onClick={handleOpenAddTodo}
          />
        </div>
      </div>
      <TodoList variables={variables} />
      <AddTodo isOpened={isOpened} setIsOpened={setIsOpened} />
    </section>
  );
};

export default Main;
