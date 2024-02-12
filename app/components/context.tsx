"use client";
import { State, Action, defaultState, reducer } from "./reducer";
import { createContext, Dispatch, useReducer } from "react";

interface ContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

export const Context = createContext({} as ContextValue);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
