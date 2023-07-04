import logo from "./logo.svg";
import "./App.css";
import TodoList from "./Todos/TodoList";

function App() {
  return (
    <div className="App">
      <h1>My TO-DO LIST</h1>
      <TodoList />
    </div>
  );
}

export default App;
