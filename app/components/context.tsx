"use client";
import { State, Action, reducer } from "./reducer";
import { createContext, Dispatch, useReducer } from "react";

interface ContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

export const Context = createContext({} as ContextValue);

export const Provider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: State;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
