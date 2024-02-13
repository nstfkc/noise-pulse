"use client";
import { useRouter } from "next/navigation";
import { State, Action, reducer } from "./reducer";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import { compressState } from "./helpers";

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
  const { push } = useRouter();

  useEffect(() => {
    if (compressState(state) === compressState(initialState)) return;
    push(`/${compressState(state)}`, {});
  }, [state, push, initialState]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
