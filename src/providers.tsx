import { TodoStoreContext } from "./context";
import { useTodo } from "./hooks/useTodo";

export const TodoStoreProvider = ({ children }: any) => (
  <TodoStoreContext.Provider value={useTodo()}>
    {children}
  </TodoStoreContext.Provider>
);
