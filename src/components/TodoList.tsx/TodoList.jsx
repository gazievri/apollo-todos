import './TodoList.sass';
import TodoItem from '../TodoItem/TodoItem.jsx';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_TODOS, DELETE_TODO, UPDATE_TODO } from '../../apollo/todos';

const TodoList = ({ variables }) => {

  const { loading, error, data } = useQuery(ALL_TODOS);
  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);

  const [deleteTodo, { error: deleteError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error || updateError || deleteError) {
    return <h2>Ups...</h2>;
  }

  return (
    <ul className="todo-list__container">
      {data.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
