import { createContext } from "react";
import { useTodo } from "./hooks/useTodo";

export const TodoStoreContext = createContext({} as ReturnType<typeof useTodo>);
