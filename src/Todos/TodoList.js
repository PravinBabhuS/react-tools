import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { removeTodoRequest, markToDoAsCompletedRequest } from "./thunks";
import {
  getTodos,
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";
import { displayAlert } from "./thunks";
import TodoListItem from "./TodoListItem";
import { loadTodos } from "./thunks";
import "./TodoList.css";
import NewTodoForm from "./NewTodoForm";
import { isLoading } from "./reducers";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  completedTodos,
  incompleteTodos,
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    //<div className="list-wrapper">
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      <h3>Completed:</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      </ListWrapper>
    //</div>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (text) => dispatch(markToDoAsCompletedRequest(text)),
  onDisplayAlertClicked: (id) => dispatch(displayAlert(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
