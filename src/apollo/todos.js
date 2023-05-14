import { gql } from '@apollo/client';

export const ALL_TODOS = gql`
query AllTodo($sortField: String, $filter: TodoFilter) {
  todos: allTodos(sortField: $sortField, filter: $filter) {
    id
    title
    completed
  }
}
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $user_id: ID!, $completed: Boolean!) {
    newTodo: createTodo(
      title: $title
      user_id: $user_id
      completed: $completed
    ) {
      title
      id
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    removeTodo(id: $id) {
      id
    }
  }
`;

