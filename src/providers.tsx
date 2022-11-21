import { TodoStoreContext } from "./context";
import useTodo from "./hooks/useTodo";

const TodoStoreProvider = ({ children }: any) => (
  <TodoStoreContext.Provider value={useTodo()}>
    {children}
  </TodoStoreContext.Provider>
);

export default TodoStoreProvider;
